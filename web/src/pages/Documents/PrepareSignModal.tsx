import { useFormContext } from "react-hook-form";
import { FileRenderer } from "../../components/FileRenderer";
import { RequiredFields } from "../../components/RequiredFields/RequiredFields";

interface PrepareSignModalProps {
  base64File: string;
  onCancel: () => void;
}

export const PrepareSignModal = ({
  base64File,
  onCancel,
}: PrepareSignModalProps) => {
  const {
    formState: { isValid },
  } = useFormContext();

  return (
    <div
      id="default-modal"
      tabIndex={-1}
      className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
    >
      <div className="w-full h-full absolute bg-gray-400 opacity-50 z-51" />

      <div className="w-full h-full flex items-center justify-center z-52 relative">
        <div className="bg-white w-fit p-8 rounded-lg max-h-[75vh] overflow-y-auto max-w-[95vw]">
          <RequiredFields />

          <div className="w-full h-0.5 bg-gray-200 mt-6 mb-6" />

          <FileRenderer fileData={base64File} />

          <div className="flex gap-8 mt-8">
            <button
              type="button"
              onClick={onCancel}
              className="py-2 text-blue-500 bg-gray-50 font-semibold border-gray-400 border-2 w-32 rounded-md"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={!isValid}
              className="py-2 text-white disabled:opacity-60 bg-blue-500 font-semibold border-blue-500 border-2 w-32 rounded-md"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
