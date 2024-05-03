import { useState } from "react";
import { SubmitHandler, useFormContext } from "react-hook-form";
import { FileRenderer } from "../components/FileRenderer";
import { RequiredFields } from "../components/RequiredFields/RequiredFields";
import SigningComponent from "../components/SigningComponent";
import { UploadDocument } from "../components/UploadDocument";
import { CreateDocumentForm } from "../interfaces/createDocument";
import { downloadDocument } from "../services/downloadDocument";
import { submitDocument } from "../services/submitDocument";

interface SigningUrl {
  email: string;
  signUrl: string;
}

export const Home = () => {
  const {
    handleSubmit,
    formState: { isValid },
    reset,
    watch,
  } = useFormContext<CreateDocumentForm>();

  const base64File = watch("files");

  const [signingUrls, setSigningUrls] = useState<SigningUrl[] | null>(null);
  const [selectedUrl, setSelectedUrl] = useState("");
  const [documentId, setDocumentId] = useState("");

  const onSubmit: SubmitHandler<CreateDocumentForm> = async (formData) => {
    const { success, data } = await submitDocument({
      ...formData,
      fields: [formData.fields] as any,
    });

    if (success) {
      const urls = data.recipients.map((recipient) => ({
        email: recipient.email,
        signUrl: recipient.embedded_signing_url,
      }));

      setSigningUrls(urls);
      setDocumentId(data.id);
    }
  };

  const downloadSignedDocument = async () => {
    try {
      const response = await downloadDocument(documentId);

      if (!response) {
        console.error("Empty response received.");
        return;
      }

      const blob = new Blob([response], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "external-file.pdf");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading document:", error);
    }
  };

  return (
    <div className="flex gap-24 p-4 w-full">
      <form
        className="flex flex-col gap-8 w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <span className="font-semibold text-lg">Upload your document</span>
          <UploadDocument />

          {base64File.length > 0 && (
            <div className="flex flex-col gap-2 w-fit">
              <button
                type="button"
                onClick={() => {
                  reset();
                }}
                className="py-1 px-4 w-fit rounded-md border-2 bg-red-600 text-white mt-2 border-red-600"
              >
                Delete file
              </button>

              <small className="mt-[-6px]">
                Deleting the file will clear the form
              </small>
            </div>
          )}
        </div>

        {base64File.length > 0 && (
          <>
            <div className="flex flex-col gap-2 w-[500px]">
              <p className="font-bold text-2xl">E-Signature</p>

              <p>
                Complete the fields below to prepare the document for signature.
                If you will also be signing the document, add yourself as a
                signer.
              </p>
            </div>

            <RequiredFields />

            <div>
              <FileRenderer fileData={base64File[0].file_base64} />
            </div>

            <div className="flex gap-8">
              <button
                type="button"
                onClick={() => reset()}
                className="py-2 text-blue-500 bg-gray-50 font-semibold border-gray-400 border-2 w-32 rounded-md"
              >
                Reset
              </button>

              <button
                type="submit"
                disabled={!isValid}
                className="py-2 text-white disabled:opacity-60 bg-blue-500 font-semibold border-blue-500 border-2 w-32 rounded-md"
              >
                Done
              </button>
            </div>
          </>
        )}
      </form>

      {signingUrls && (
        <div className="flex flex-col gap-2">
          <div>
            <label className="font-semibold text-lg">
              Select which document you want to sign
            </label>
            <small className="block text-gray-500">
              In the application, we shouldn't show this. We should just store
              in the backend the respective sign url, so the users can access it
              in their accounts.
            </small>
          </div>

          <div className="flex flex-col gap-2">
            {signingUrls.map((signUrl) => (
              <button
                key={signUrl.signUrl}
                onClick={() => setSelectedUrl(signUrl.signUrl)}
                className="w-fit py-2 px-4 rounded-md bg-gray-200 border border-gray-200"
              >
                Document for {signUrl.email}
              </button>
            ))}
          </div>

          <button
            onClick={downloadSignedDocument}
            className="py-2 px-4 text-white disabled:opacity-60 bg-blue-500 font-semibold border-blue-500 border-2 w-fit rounded-md"
          >
            Download signed document
          </button>
        </div>
      )}

      {selectedUrl && (
        <SigningComponent
          onClose={() => setSelectedUrl("")}
          embeddedSigningUrl={selectedUrl}
        />
      )}
    </div>
  );
};
