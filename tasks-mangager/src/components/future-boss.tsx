'use client'

import { supabase } from "@/supabase-client";
import { useEffect, useState } from "react";

interface Future {
    user_id: string;
    id: number;
    name: string;
    category: string;
    created_at: string;
}

export function Futuremanager() {
    const [newFuture, setNewFuture] = useState({ name: "", category: "" }); // Är detta name som columnen heter 
    const [futureSelf, setFutureSelf] = useState<Future[]>([]); // Detta är staten för listan som skall genereras
    const [newName, setNewName] = useState("")

    // Denna hämtar datan till vår lista
    const fetchFuture = async () => {
        const { error, data } = await supabase
            .from("future_inputs")
            .select("*")
            .order("created_at", { ascending: true });

        if (error) {
            console.error("Error adding task: ", error.message);
            return;
        }

        setFutureSelf(data)
    };

    useEffect(() => {
        fetchFuture()
    }, []);

    console.log(futureSelf)

    // Här tar vi bort en en rad
    const deleteFutureRow = async (id: number) => {
        const { error } = await supabase // ev skall det vara data, error
            .from("future_inputs")
            .delete()
            .eq("id", id);

        if (error) {
            console.error("Error deleting task: ", error.message);
            return;
        }
    }

    const updateFutureRow = async (id: number) => {
        const { error } = await supabase // ev skall det vara data, error
            .from("future_inputs")
            .update({ name: 'newName' })
            .eq("id", id)
            .select()

        if (error) {
            console.error("Error updating task: ", error.message);
            return;
        }
    }


    // Denna ger vår knapp funktion
    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const { error } = await supabase // ev skall det vara data, error
            .from("future_inputs")
            .insert({ ...newFuture, category: "category", name: "name", created_at: "new Date" }) //  { user_id: "user.id" } enligt supabase 
            .select();

        if (error) {
            console.error("Error adding task: ", error.message);
            return;
        }
        setNewFuture({ name: "", category: "" })
    }

    return (
        <div>
            <div>
                <h2>Future self</h2>
                <p>Who is your future self?</p>
            </div>
            <section>
                <input
                    type="text"
                    placeholder="Habit"
                    onChange={(e) =>
                        setNewFuture((prev) => ({ ...prev, name: e.target.value }))
                    }
                />
                <button type="submit">Add</button> {/* Add a listrow */}
                <input
                    type="text"
                    placeholder="Accomplishment"
                    onChange={(e) =>
                        setNewFuture((prev) => ({ ...prev, name: e.target.value }))
                    }
                />
                <button type="submit">Add</button> {/* Add a listrow */}
                <input
                    type="text"
                    placeholder="Gift"
                    onChange={(e) =>
                        setNewFuture((prev) => ({ ...prev, name: e.target.value }))
                    }
                />
                <button type="submit">Add</button> {/* Add a listrow */}
            </section>


            {/* List of Tasks */}
            <section>
                <ul>
                    {futureSelf.map((future, key) => (
                        <li key={key}
                        >
                            <div>
                                <h3>{future.name}</h3>
                                <div>
                                    <input placeholder="Updated name" onChange={(e) => (
                                        setNewName(e.target.value)
                                    )}/>
                                    <button onClick={() => updateFutureRow(future.id)}>Edit</button>
                                </div>
                                <div>
                                    <button onClick={() => deleteFutureRow(future.id)}>Delete</button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
}   