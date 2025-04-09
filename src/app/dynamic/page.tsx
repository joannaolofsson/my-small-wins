import supabase from "@/utils/supabase"

export default async function Futures() {
    const { data } = await supabase.from('futures').select()
    return (
        <pre>{JSON.stringify(data, null, 2)}</pre>
    )
}