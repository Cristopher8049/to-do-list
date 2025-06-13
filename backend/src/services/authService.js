import SupabaseClient from '../config/supabaseClient.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const supabase = SupabaseClient.getClient();

function signToken(user) {
    return jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
    );
}

export async function registerUser(email, password) {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: '', data: {}, email_confirm: true }
    });
    if (error) throw error;
    const token = signToken(data.user);
    return { token, user: { id: data.user.id, email } };
}

export async function loginUser(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    });
    if (error) throw error;
    const token = signToken(data.user);
    return { token, user: { id: data.user.id, email } };
}
