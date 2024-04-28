import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/TextLayer.css";
import { ClickedElement } from "./ClickedElement";
import { Coordinates, FileRendererProps } from "./interfaces";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

// TODO: when implementing, we should implement a way to say
// what's the type of field (like, 'signature'), and what's
// the recipient_id it should be assigned to
// in this POC, it's harcoded to: 'signature' and '1'
export const FileRenderer = ({ fileData, handleChange }: FileRendererProps) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [clickedPage, setClickedPage] = useState<number | null>(null);
  const [coordinates, setCoordinates] = useState({} as Coordinates);

  const handleDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const handlePageClick = (
    event: React.MouseEvent<HTMLCanvasElement>,
    pageNumber: number
  ) => {
    if (!numPages) return;

    const canvas = event.currentTarget;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    setCoordinates({
      x,
      y,
    });

    setClickedPage(pageNumber);
  };

  const handleFinished = () => {
    const data = {
      page: clickedPage || 1,
      recipient_id: `${1}`,
      x: coordinates.x,
      y: coordinates.y,
      type: "signature",
    };

    handleChange({
      fields: [[data]],
    });
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="relative">
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
              className="outline outline-2 outline-offset-2"
            />
          ))}
        </Document>
        {clickedPage && <ClickedElement x={coordinates.x} y={coordinates.y} />}
      </div>

      {coordinates.x && (
        <button
          onClick={handleFinished}
          className="flex p-4 bg-gray-300 w-fit rounded-md"
        >
          Done? Click here
        </button>
      )}
    </div>
  );
};
