import { useState } from "react";
import { FileRenderer } from "./components/FileRenderer";
import { RequiredFields } from "./components/RequiredFields/RequiredFields";
import SigningComponent from "./components/SigningComponent";
import { UploadDocument } from "./components/UploadDocument";
import { CreateDocument } from "./interfaces/createDocument";
import { submitDocument } from "./services/submitDocument";

export const App = () => {
  const [formData, setFormData] = useState({} as CreateDocument);
  const [signingUrl, setSigningUrl] = useState("");

  const onDataChange = (data: Record<string, unknown>) => {
    setFormData((oldValue) => ({
      ...oldValue,
      ...data,
    }));
  };

  const handleSubmitDocument = async () => {
    const data = await submitDocument(formData);

    if (data.success && data.embeddedUrl) {
      setSigningUrl(data.embeddedUrl);
    }
  };

  return (
    <div className="flex gap-24">
      <div className="w-fit flex flex-col gap-8">
        <div>
          <span className="font-bold">Upload your document</span>
          <UploadDocument handleChange={onDataChange} />
        </div>

        <div>
          <span className="font-bold">Fill the required fields</span>
          <RequiredFields handleChange={onDataChange} />
        </div>

        {formData?.files?.[0] && !formData?.fields && (
          <div>
            <span className="font-bold">
              Select where you want to place the fields to be signed in the
              document
            </span>
            <FileRenderer
              fileData={formData.files[0].file_base64}
              handleChange={onDataChange}
            />
          </div>
        )}

        <button
          onClick={handleSubmitDocument}
          className="flex p-2 w-100 justify-center bg-green-300 rounded-md"
        >
          Submit my document!
        </button>
      </div>

      {signingUrl && <SigningComponent embeddedSigningUrl={signingUrl} />}
    </div>
  );
};
