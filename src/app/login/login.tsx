import { supabase } from '@/lib/supabase'

export const Login = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email: 'someone@email.com',
        password: 'RVFegkhIjbXeGBYHtSEd'
    });

    if (error) {
        console.error('Login failed:', error.message);
        return null;
    }

    console.log('Login successful:', data);
    return data;
};