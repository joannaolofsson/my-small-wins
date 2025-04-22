
// Futureself

// Futureself/types
export type InputType = "Habit" | "Accomplishment" | "Gift";

// Futureself/interface

export interface InputItem {
  id: string;
  user_id: string;
  category: "Habit" | "Accomplishment" | "Gift";
  name: string;
  created_at?: string;
}

export interface FutureInput {
  name: string; // Name of the item
  category?: string; // Habit, Gift, Accomplishment
  created_at?: string; // Timestamp
  [key: string]: any; // Additional dynamic fields (if needed)
}

export interface InputProps {
    username: string;
    userId: string;
    initialInputs: InputItem[];
}

export interface FutureContextProps {
  inputs: InputItem[];
  addInput: (category: string, name: string) => Promise<void>;
  deleteInput: (id: string) => Promise<void>;
  fetchInputs: () => Promise<void>;
}


// Smallwin

// Smallwin / types
export type SmallWinCategory = "habit" | "accomplishment" | "gift" | "manual";

export type WinFormValues = {
  message: string;
  emotion: string;
};

//export interface SmallWinItem {
  //uniqueKey: string;
  //category: string;
  //icon: string; 
  //winmessage: string;
  //encouragement: string;
  //color: string;
//}

export interface WinInput {
  id: string;
  inputId: string;
  message: string;
  icon: string;
  encouragement: string;
  color: string;
  emotion?: string;
  category?: SmallWinCategory;
}

//export interface icons {
    //habit: string[];
    //accomplishment: string[];
    //gift: string[];
    //encouragement: string[];
    //color: string[];
  //}

  //export interface SmallWin {
    //inputId: string;
    //id: string;
    //winmessage: string;
    //icon: string;
    //encouragement: string;
    //color: string;
    //category?: string;
    //emotion?: string;
  //}

  export interface WinProviderProps {
    smallWins: WinInput[]; // Array of wins
    addWin: (input: Omit<WinInput, 'id'>) => Promise<void>; // Function to add a win
    clearAllWins: () => void; // Function to clear all wins
    existingWin?: WinInput; // Single win for comparison
  }
  
export interface BoosterProp {
  limit: number;
}

// Optional mapping for icons and categories