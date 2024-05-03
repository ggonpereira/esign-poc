import { useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/TextLayer.css";
import { CreateDocumentForm } from "../../interfaces/createDocument";
import { ClickedElement } from "./ClickedElement";
import { FileRendererProps } from "./interfaces";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

export const FileRenderer = ({ fileData }: FileRendererProps) => {
  const { watch, control } = useFormContext<CreateDocumentForm>();

  const { fields, append, update } = useFieldArray({
    control,
    name: "fields",
    rules: {
      minLength: 1,
    },
  });

  const [numPages, setNumPages] = useState<number | null>(null);

  const [currentRecipient, setCurrentRecipient] = useState("");
  const [currentItemType, setCurrentItemType] = useState("signature");

  const recipients = watch("recipients");

  const handleDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const handlePageClick = (
    event: React.MouseEvent<HTMLCanvasElement>,
    pageNumber: number
  ) => {
    if (!numPages || !currentRecipient || !currentItemType) return;

    const canvas = event.currentTarget;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const existingFieldIndex = fields.findIndex(
      (field) =>
        field.recipient_id === currentRecipient &&
        field.type === currentItemType
    );

    if (existingFieldIndex !== -1) {
      update(existingFieldIndex, {
        page: pageNumber,
        recipient_id: currentRecipient,
        type: currentItemType,
        x,
        y,
      });

      return;
    }

    append({
      page: pageNumber,
      recipient_id: currentRecipient,
      type: currentItemType,
      x,
      y,
    });
  };

  const filledRecipients = recipients.filter(
    (item) => item.name !== "" && item.email !== ""
  );

  if (filledRecipients.length === 0) {
    return (
      <div className="font-medium text-lg">
        To view the document, fill the Signers information
      </div>
    );
  }

  const selectedRecipient = recipients.find(
    (recipient) => recipient.id === currentRecipient
  );

  return (
    <div className="flex flex-col gap-6 w-fit">
      <span className="text-lg">
        Click in the document to determine where the signature should be. <br />
        To do so, select a Signer and a specific Signing field (Signature or
        Date).
      </span>

      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2 w-80">
          Signer to insert signature in the document
          <select
            onChange={(e) => {
              setCurrentRecipient(e.target.value);
            }}
            defaultValue="0"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-blue-500 dark:border-blue-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="0" disabled>
              Empty
            </option>

            {filledRecipients.map((recipient) => (
              <option key={recipient.id} value={recipient.id}>
                {recipient.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2 w-80 mt-2">
          Field type
          <select
            onChange={(e) => {
              setCurrentItemType(e.target.value);
            }}
            defaultValue="signature"
            className="block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
            dark:bg-blue-500 dark:border-blue-900 
            dark:placeholder-gray-400 dark:text-white"
          >
            <option value="signature">Signature</option>
            <option value="date">Date</option>
          </select>
        </div>

        {currentItemType && currentRecipient && selectedRecipient && (
          <div className="mt-4">
            You can now click anywhere in the document you want to place a field
            of {currentItemType} type for {selectedRecipient.email}
          </div>
        )}

        <div className="w-full h-0.5 bg-gray-200 mt-6 mb-6" />
      </div>

      <div className="relative w-fit">
        <Document
          file={`data:application/pdf;base64,${fileData}`}
          onLoadSuccess={handleDocumentLoadSuccess}
        >
          {Array.from(new Array(numPages), (_, index) => (
            <Page
              key={`page_${index + 1}`}
              pageNumber={index + 1}
              onClick={(e) => handlePageClick(e, index + 1)}
              renderMode="canvas"
              renderAnnotationLayer={false}
              scale={1.335}
              className="outline outline-gray-200"
            />
          ))}
        </Document>

        {selectedRecipient &&
          fields.map((field) => (
            <ClickedElement
              key={field.id}
              recipient={selectedRecipient}
              field={field}
            />
          ))}
      </div>
    </div>
  );
};
