// Define types
export type IconType = "FaCalendarCheck" | "GiMeditation" | "BSFillHeartFill" | "FaTrophy" | "GiAchievement" | "FaGift";
export type MessageType = string;
export type ValidType = "habit" | "accomplishment" | "gift" | "manual";
export type DataByType = Record<ValidType, string[]>;

// Define data
export const iconsByType: DataByType = {
  habit: ["FaCalendarCheck", "GiMeditation", "BSFillHeartFill"],
  accomplishment: ["FaTrophy", "GiAchievement", "FaCalendarCheck"],
  gift: ["FaGift", "BSFillHeartFill"],
  manual: ["FaEdit", "FaPencilAlt"],
};

export const messagesByType: DataByType = {
  habit: [
    "You're building something amazing!",
    "Habits shape the future — nice work!",
    "Consistency is key and you're crushing it.",
  ],
  accomplishment: [
    "What a win!",
    "You’re making moves!",
    "Future you is proud!",
  ],
  gift: [
    "You deserve this!",
    "Such a sweet gift to yourself.",
    "Self-love for the win 💖",
  ],
  manual: [
    "You named your own win — love the intention!",
    "Your words, your power.",
    "Custom win? That's next-level mindful ✨",
  ],
};
