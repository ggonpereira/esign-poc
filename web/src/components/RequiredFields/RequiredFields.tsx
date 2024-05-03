import { useFormContext } from "react-hook-form";
import { InputGroup } from "../InputGroup";
import { Recipient } from "./Recipient";

export const RequiredFields = () => {
  const { register } = useFormContext();

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-1">
        <InputGroup
          {...register("name", {
            required: "Document name is required",
          })}
          label="Document Name"
        />
      </div>

      <Recipient />
    </div>
  );
};
