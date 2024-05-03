import { ChangeEvent, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { fileToBase64 } from "../utils/fileToBase64";

export const UploadDocument = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { setValue } = useFormContext();
  const inputRef = useRef<HTMLInputElement>(null);

  const uploadDocument = () => {
    inputRef.current?.click();
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = (event.target as HTMLInputElement)?.files?.[0];

    if (!file) return;

    setErrorMessage(null);

    const base64File = await fileToBase64(file);

    if (base64File) {
      const fileToSave = {
        name: file.name,
        file_base64: base64File,
      };

      setValue("files", [fileToSave]);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <button
        className="text-lg bg-blue-500 rounded-sm px-4 py-1 text-white font-normal"
        onClick={uploadDocument}
      >
        Add Document
      </button>

      <input
        accept=".pdf"
        hidden
        ref={inputRef}
        type="file"
        onChange={handleFileChange}
      />
      {errorMessage && <p className="text-red-600">{errorMessage}</p>}
    </div>
  );
};
