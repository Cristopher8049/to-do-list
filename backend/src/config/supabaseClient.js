import { createClient } from '@supabase/supabase-js';

class SupabaseClient {
    constructor() {
        if (SupabaseClient.instance) {
            throw new Error("An instance of SupabaseClient already exists.");
        }

        const supabaseUrl = process.env.SUPABASE_URL;
        const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

        if (!supabaseUrl || !supabaseAnonKey) {
            throw new Error('SUPABASE_URL and SUPABASE_ANON_KEY must be defined');
        }
        this.supabase = createClient(supabaseUrl, supabaseAnonKey);
        SupabaseClient.instance = this;

    }

    getClient() {
        return this.supabase;
    }
}

const instance = new SupabaseClient();
Object.freeze(instance);

export default instance;