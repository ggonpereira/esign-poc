import { useState } from "react";
import { InputGroup } from "../InputGroup";
import { Recipient } from "./Recipient";

interface Recipient {
  name: string;
  email: string;
}

interface RequiredFieldsObj {
  name: string;
  subject: string;
  message: string;
  recipients: Recipient[];
}

interface RequiredFieldsProps {
  handleChange: (data: any) => void;
}

export const RequiredFields = ({ handleChange }: RequiredFieldsProps) => {
  const [fields, setFields] = useState({} as RequiredFieldsObj);

  const onDataChange = (data: Record<string, unknown>) => {
    setFields((oldValue) => ({
      ...oldValue,
      ...data,
    }));
  };

  const handleFinish = () => {
    handleChange(fields);
  };

  return (
    <div className="flex flex-col gap-2">
      <InputGroup
        label="Doc. Name"
        onChange={(v) => {
          onDataChange({ name: v });
        }}
        value={fields.name}
      />

      <InputGroup
        label="Doc. Subject"
        onChange={(v) => {
          onDataChange({ subject: v });
        }}
        value={fields.subject}
      />

      <InputGroup
        label="Doc. Message"
        onChange={(v) => {
          onDataChange({ message: v });
        }}
        value={fields.message}
      />

      <Recipient handleChange={onDataChange} />

      <button
        onClick={handleFinish}
        className="flex p-2 w-100 justify-center bg-green-300 rounded-md"
      >
        Done adding required fields
      </button>
    </div>
  );
};
