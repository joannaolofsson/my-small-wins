import supabase from "@/utils/supabase";
import { notFound } from "next/navigation";

export const revalidate = 60;

export async function generateStaticParams() {
    const { data: futures, error } = await supabase.from('futures').select('id');
    if (error) {
        console.error("Error fetching futures:", error);
    }
    console.log("Fetched futures:", futures);
    return (
        (futures ?? []).map(future => ({
            id: future.id?.toString(), 
        }))
    );
}



export default async function Future({
    params: { id }, 
}: {
    params: {id: string}; 
}) {
    const {data: future} = await supabase
    .from("futures")
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