import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { Database } from '@/types/supabase';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { category, name, user_id } = body;

  const supabase = createServerClient<Database>({
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    getRequestHeaders: () => ({
      cookie: req.headers.get('cookie') || '',
    }),
  });

  const { data, error } = await supabase
    .from('inputs')
    .insert([{ category, name, user_id }])
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
