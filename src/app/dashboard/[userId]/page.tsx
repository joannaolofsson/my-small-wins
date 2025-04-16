
import { createSupabaseClient } from "@/utils/clients";
import ClientComponent from "@/components/ClientComponent";
import { notFound } from "next/navigation";

export const revalidate = 0;

export default async function Dashboard({

    params: { id },
}: {
    params: { id: string };
}) {

    const supabase = createSupabaseClient();
    const { data: future } = await supabase
        .from("future_input")
        .select()
        .match({ id })
        .single();

    if (!future) {
        notFound();
    }
    return (
        <>
            <pre>{JSON.stringify(future, null, 2)}</pre>
            <ClientComponent />
            <div className="flex flex-row items-start gap-6">
                <div>Futureself</div>
                <div>Small wins</div>
            </div>
        </>
    )
}