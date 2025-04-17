
import { iconsByType, messagesByType, ValidType } from "./smallData";

let idCounter = 0;

export function generateRandomSmallWin(type: ValidType) {
  const icons = iconsByType[type];
  const messages = messagesByType[type];

  const icon = icons[Math.floor(Math.random() * icons.length)];
  const message = messages[Math.floor(Math.random() * messages.length)];

  idCounter++;

  return {
    id: `${type}-${idCounter}`,
    category: type,
    icon,
    message,

  };
}

