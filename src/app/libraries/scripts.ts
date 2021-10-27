export const print = (text: string, type: "success" | "error" | "info") => {
  let color = "";
  switch (type) {
    case "error":
      color = "red";
      break;
    case "info":
      color = "blue";
      break;
    default:
      color = "green";
      break;
  }
  console.log(
    `%c${type.toUpperCase()}` + ` %c${text}`,
    `color: white; background: ${color}; text-align:center; padding-left: 8px; margin-right: 5px`,
    "color: white"
  );
};
