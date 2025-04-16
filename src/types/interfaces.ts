

// Interfaces for futureself client

export interface FutureSectionProps {
    type: InputType;
    placeholder: string;
    onAdd: (category: InputType, name: string) =>Promise<void>;
}

//Types for futureselfclient & for usecontext

export type InputType = "Habit" | "Accomplishment" | "Gift";

export interface InputItem {
    id: string;
    user_id: string;
    category: InputType;
    name: string;
}

export interface InputProps {
    username: string;
    userId: string;
    initialInputs: any[];
}

export interface FutureProviderProps {
  inputs: InputItem[];
  addInput: (category: InputType, name: string) => Promise<void>;
}


