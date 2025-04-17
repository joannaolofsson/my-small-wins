

export interface FutureSectionProps {
    type: InputType;
    placeholder: string;
    onAdd: (category: InputType, name: string) =>Promise<void>;
}

export type InputType = "Habit" | "Accomplishment" | "Gift";

export interface InputItem {
    id: string;
    //user_id: string;
    category: string;
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

export type SmallWinCategory = "habit" | "accomplishment" | "gift" | "manual";

export interface SmallWinItem {
  uniqueKey: string;
  category: string;
  icon: string; 
  message: string;
  encouragement: string;
}

export interface icons {
    habit: string[];
    accomplishment: string[];
    gift: string[];
    encouragement: string[];
  }


