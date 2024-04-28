import { ChangeEvent, useState } from "react";
import { fileToBase64 } from "../utils/fileToBase64";

interface UploadDocumentProps {
  handleChange: (data: Record<string, unknown>) => void;
}

export const UploadDocument = ({ handleChange }: UploadDocumentProps) => {
  // const [encodedFile, setEncodedFile] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = (event.target as HTMLInputElement)?.files?.[0];

    if (!file) return;

    setErrorMessage(null);

    const base64File = await fileToBase64(file);

    if (base64File) {
      // setEncodedFile(base64File);

      const fileToSave = {
        name: file.name,
        file_base64: base64File,
      };

      handleChange({
        files: [fileToSave],
      });
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <input type="file" onChange={handleFileChange} />
      {errorMessage && <p className="text-red-600">{errorMessage}</p>}
    </div>
  );
};
