import { Coordinates } from "./interfaces";

export const ClickedElement = ({ x, y }: Coordinates) => {
  return (
    <div
      className="absolute bg-yellow-300 w-12 h-5 rounded-3xl"
      style={{
        top: y,
        left: x,
      }}
    />
  );
};
