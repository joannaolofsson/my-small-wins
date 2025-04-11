import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";

export const revalidate = 0;

export default async function Future({
    params: { id },
}: {
    params: { id: string };
}) {
    const { data: future } = await supabase
        .from("future_input")
        .select()
        .match({ id })
        .single();

    if (!future) {
        notFound();
    }
    return (
        <pre>{JSON.stringify(future, null, 2)}</pre>
    )
}