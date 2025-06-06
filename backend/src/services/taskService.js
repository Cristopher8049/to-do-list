import SupabaseClient from '../config/supabaseClient.js';
const supabase = SupabaseClient.getClient();

export async function getTasksByUser(userId) {
    const { data, error } = await supabase
        .from('tasks')
        .select(`
      *,
      categories ( id, name )
    `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
}

export async function createTask({ userId, title, description = null, category_id = null }) {
    if (category_id) {
        const { data: catExists, error: catError } = await supabase
            .from('categories')
            .select('id')
            .eq('id', category_id)
            .eq('user_id', userId)
            .single();

        if (catError || !catExists) {
            const err = new Error('Invalid category_id');
            err.code = 400;
            throw err;
        }
    }

    const { data, error } = await supabase
        .from('tasks')
        .insert([{
            user_id: userId,
            title,
            description,
            category_id,
        }])
        .select('*')
        .single();

    if (error) throw error;
    return data;
}

export async function updateTask({ taskId, userId, updates }) {
    const allowedFields = ['title', 'description', 'category_id', 'is_completed'];
    const payload = {};
    for (const key of Object.keys(updates)) {
        if (allowedFields.includes(key)) {
            payload[key] = updates[key];
        }
    }
    if (Object.keys(payload).length === 0) {
        const err = new Error('No valid fields to update');
        err.code = 400;
        throw err;
    }

    const { data: exists, error: fetchError } = await supabase
        .from('tasks')
        .select('id')
        .eq('id', taskId)
        .eq('user_id', userId)
        .single();

    if (fetchError || !exists) {
        const err = new Error('Task not found');
        err.code = 404;
        throw err;
    }

    if (payload.category_id) {
        const { data: catExists, error: catError } = await supabase
            .from('categories')
            .select('id')
            .eq('id', payload.category_id)
            .eq('user_id', userId)
            .single();
        if (catError || !catExists) {
            const err = new Error('Invalid category_id');
            err.code = 400;
            throw err;
        }
    }

    const { data, error } = await supabase
        .from('tasks')
        .update(payload)
        .eq('id', taskId)
        .select('*')
        .single();

    if (error) throw error;
    return data;
}

export async function deleteTask({ taskId, userId }) {
    const { data: exists, error: fetchError } = await supabase
        .from('tasks')
        .select('id')
        .eq('id', taskId)
        .eq('user_id', userId)
        .single();

    if (fetchError || !exists) {
        const err = new Error('Task not found');
        err.code = 404;
        throw err;
    }

    // 2) Eliminar
    const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', taskId);

    if (error) throw error;
    return;
}