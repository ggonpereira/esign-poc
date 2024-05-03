import { Coordinates } from "./interfaces";

const colorIsTooLight = (color: string) => {
  const hex = color.replace("#", "");
  const c_r = parseInt(hex.substring(0, 2), 16);
  const c_g = parseInt(hex.substring(2, 2), 16);
  const c_b = parseInt(hex.substring(4, 2), 16);
  const brightness = (c_r * 299 + c_g * 587 + c_b * 114) / 1000;
  return brightness > 155;
};

const stringToColour = function (str: string) {
  let hash = 0;

  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  let colour = "#";
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    colour += ("00" + value.toString(16)).substr(-2);
  }
  return colour;
};

export const ClickedElement = ({ recipient, field }: Coordinates) => {
  const recipientInitials = recipient.name.slice(0, 2).toUpperCase();
  const generatedColor = stringToColour(field.recipient_id);

  const isLightColor = colorIsTooLight(generatedColor);

  return (
    <div
      className="absolute py-1 px-2 rounded-md flex gap-2"
      style={{
        top: field.y,
        left: field.x,
        backgroundColor: generatedColor,
        color: isLightColor ? "black" : "white",
      }}
    >
      <span>{recipientInitials}</span>
      <span>{field.type}</span>
    </div>
  );
};
