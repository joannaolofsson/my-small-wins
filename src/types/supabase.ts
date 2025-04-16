
export type Database = {
    public: {
      Tables: {
        inputs: {
          Row: {
            id: string;
            user_id: string;
            category: "Habit" | "Accomplishment" | "Gift";
            name: string;
            created_at: string;
          };
          Insert: {
            id?: string;
            user_id: string;
            category: "Habit" | "Accomplishment" | "Gift";
            name: string;
            created_at?: string;
          };
          Update: {
            id?: string;
            category?: "Habit" | "Accomplishment" | "Gift";
            name?: string;
          };
        };
      };
    };
  };
  