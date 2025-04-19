import { ReactNode } from "react";


export interface FutureSectionProps {
    type: InputType;
    placeholder: string;
    onAdd: (category: InputType, name: string) =>Promise<void>;
}
 // onAdd: (category: string, name: string) => void;


export type InputType = "Habit" | "Accomplishment" | "Gift";

export interface InputItem {
  id: string;
  user_id: string;
  category: string;
  name: string;
  created_at?: string;
}


export interface InputProps {
    username: string;
    userId: string;
    initialInputs: InputItem[];
}

export interface FutureProviderProps {
  inputs: InputItem[];
  addInput: (category: InputType, name: string, user_id: string ) => Promise<void>;
  children: React.ReactNode;
  initialInputs?: InputItem[];
}

export type SmallWinCategory = "habit" | "accomplishment" | "gift" | "manual";

export interface SmallWinItem {
  uniqueKey: string;
  category: string;
  icon: string; 
  winmessage: string;
  encouragement: string;
  color: string;
}

export interface icons {
    habit: string[];
    accomplishment: string[];
    gift: string[];
    encouragement: string[];
    color: string[];
  }

  export interface SmallWin {
    inputId: string;
    id: string;
    winmessage: string;
    icon: string;
    encouragement: string;
    color: string;
    category?: string;
    emotion?: string;
  }


