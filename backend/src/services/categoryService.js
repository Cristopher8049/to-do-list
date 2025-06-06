import SupabaseClient from '../config/supabaseClient.js';
const supabase = SupabaseClient.getClient();

export async function getCategoriesByUser(userId) {
    const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
}

export async function createCategory({ userId, name }) {
    const { data, error } = await supabase
        .from('categories')
        .insert([{ user_id: userId, name }])
        .select('*')
        .single();

    if (error) throw error;
    return data;
}

export async function updateCategory({ categoryId, userId, name }) {
    const { data: exists, error: fetchError } = await supabase
        .from('categories')
        .select('id')
        .eq('id', categoryId)
        .eq('user_id', userId)
        .single();

    if (fetchError || !exists) {
        const err = new Error('Category not found');
        err.code = 404;
        throw err;
    }

    const { data, error } = await supabase
        .from('categories')
        .update({ name })
        .eq('id', categoryId)
        .select('*')
        .single();

    if (error) throw error;
    return data;
}

export async function deleteCategory({ categoryId, userId }) {
    const { data: exists, error: fetchError } = await supabase
        .from('categories')
        .select('id')
        .eq('id', categoryId)
        .eq('user_id', userId)
        .single();

    if (fetchError || !exists) {
        const err = new Error('Category not found');
        err.code = 404;
        throw err;
    }

    const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', categoryId);

    if (error) throw error;
    return;
}