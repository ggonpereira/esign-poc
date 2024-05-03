import { useFieldArray, useFormContext } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { CreateDocumentForm } from "../../interfaces/createDocument";
import { InputGroup } from "../InputGroup";
import { TrashIcon } from "./icons";

const emailRegex = /^[\w-.+]+@([\w-]+\.)+[\w-]{2,4}$/g;

export const Recipient = () => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<CreateDocumentForm>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "recipients",
    rules: {
      minLength: 1,
    },
  });

  const addRecipient = () => {
    append({ name: "", email: "", id: uuidv4() });
  };

  return (
    <div className="flex flex-col gap-3">
      {fields.map((recipient, index) => (
        <div key={recipient.id} className="flex gap-2">
          <div className="flex gap-8">
            <div className="flex flex-col gap-1">
              <InputGroup
                label={`Name of Signer`}
                errorMessage={errors?.recipients?.[index]?.name}
                {...register(`recipients.${index}.name`, {
                  required: "You must insert a name for the signer",
                })}
              />
            </div>

            <div className="flex flex-col gap-1">
              <InputGroup
                label={`Email`}
                errorMessage={errors?.recipients?.[index]?.email}
                {...register(`recipients.${index}.email`, {
                  required: "You must insert an email for the signer",
                  pattern: {
                    value: emailRegex,
                    message: "Should be a valid email",
                  },
                })}
              >
                {index > 0 && (
                  <button
                    onClick={() => remove(index)}
                    className="flex h-fit self-end text-blue-500 p-2 justify-center rounded-md"
                  >
                    <TrashIcon />
                  </button>
                )}
              </InputGroup>
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={addRecipient}
        type="button"
        className="text-blue-500 w-fit mt-5"
      >
        + Add Another Signer
      </button>
    </div>
  );
};
