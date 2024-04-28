import { useState } from "react";
import { InputGroup } from "../InputGroup";

interface RecipientProps {
  handleChange: (data: Record<string, unknown>) => void;
}

export const Recipient = ({ handleChange }: RecipientProps) => {
  const [recipients, setRecipients] = useState([
    { id: "1", name: "", email: "" },
  ]);

  const addRecipient = () => {
    const newRecipient = {
      id: `${recipients.length + 1}`,
      name: "",
      email: "",
    };
    setRecipients([...recipients, newRecipient]);
  };

  const deleteLastRecipient = () => {
    setRecipients((recipients) => recipients.slice(0, -1));
  };

  const handleRecipientChange = (id: string, field: string, value: string) => {
    setRecipients((prevRecipients) =>
      prevRecipients.map((recipient) =>
        recipient.id === id ? { ...recipient, [field]: value } : recipient
      )
    );
  };

  const handleFinish = () => {
    handleChange({
      recipients,
    });
  };

  return (
    <div className="flex flex-col gap-3">
      {recipients.map((recipient) => (
        <div key={recipient.id} className="flex flex-col gap-2">
          <InputGroup
            label={`Recipient ${recipient.id} name`}
            value={recipient.name}
            onChange={(e) => handleRecipientChange(recipient.id, "name", e)}
          />

          <InputGroup
            label={`Recipient ${recipient.id} email`}
            value={recipient.email}
            onChange={(e) => handleRecipientChange(recipient.id, "email", e)}
          />
        </div>
      ))}

      <div className="flex flex-col gap-2">
        <button
          onClick={addRecipient}
          className="flex p-2 w-100 justify-center bg-gray-300 rounded-md"
        >
          Add More Recipient
        </button>

        {recipients.length > 1 && (
          <button
            onClick={deleteLastRecipient}
            className="flex p-2 justify-center bg-gray-300 rounded-md"
          >
            Delete Last Recipient
          </button>
        )}

        <button
          onClick={handleFinish}
          className="flex p-2 w-100 justify-center bg-green-300 rounded-md"
        >
          Done adding recipients
        </button>
      </div>
    </div>
  );
};
