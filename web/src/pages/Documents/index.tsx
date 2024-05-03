import { useEffect, useMemo, useRef, useState } from "react";
import { SubmitHandler, useFormContext } from "react-hook-form";
import toast from "react-hot-toast";
import { TrashIcon } from "../../components/RequiredFields/icons";
import SigningComponent from "../../components/SigningComponent";
import { UploadDocument } from "../../components/UploadDocument";
import { useUserContext } from "../../contexts/UserContextProvider/hooks";
import { CreateDocumentForm } from "../../interfaces/createDocument";
import {
  CreatedDocumentResponse,
  submitDocument,
} from "../../services/submitDocument";
import { getDataFromLS } from "../../utils/getDataStoredInLS";
import { NavBar } from "./NavBar";
import { PrepareSignModal } from "./PrepareSignModal";

const LOCALSTORAGE_KEY = "@dtour-poc/documents";

// TODO:
// 1 - We should query the most updated state of the saved documents before showing the messages, etc

export const Documents = () => {
  const isFirstRender = useRef(true);
  const { handleSubmit, reset, watch } = useFormContext<CreateDocumentForm>();
  const { user } = useUserContext();

  const [savedDocuments, setSavedDocuments] = useState<
    CreatedDocumentResponse[]
  >(() => {
    return getDataFromLS<CreatedDocumentResponse>(LOCALSTORAGE_KEY) || [];
  });

  const [openedModal, setOpenedModal] = useState<string | null>(null);
  const [docToSign, setDocToSign] = useState("");

  const onSubmit: SubmitHandler<CreateDocumentForm> = async (formData) => {
    const { success, data } = await submitDocument({
      ...formData,
      fields: [formData.fields] as any,
    });

    if (success) {
      const docs = [...savedDocuments, data];

      setSavedDocuments(docs);
      setOpenedModal(null);
      reset();

      toast.success(
        "Document ready to be signed. Each part involved in the signing process should access their Dtour's account to sign the document.",
        {
          duration: 10000,
        }
      );
    }
  };

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;

      return;
    }

    window.localStorage.setItem(
      LOCALSTORAGE_KEY,
      JSON.stringify(savedDocuments)
    );
  }, [savedDocuments]);

  const files = watch("files");

  const toggleSignModal = (fileIndex: number) => {
    const base64File = files[fileIndex].file_base64;

    setOpenedModal(base64File);
  };

  const closeModal = () => {
    setOpenedModal(null);
    reset();
  };

  const deleteDocument = (docId: string) => {
    const docs = getDataFromLS<CreatedDocumentResponse>(LOCALSTORAGE_KEY);

    if (docs) {
      const filteredDocs = docs.filter((doc) => doc.id !== docId);

      setSavedDocuments(filteredDocs);
    }
  };

  const docsUserIsIncluded = useMemo(
    () =>
      savedDocuments.filter((document) =>
        document.recipients.some((recipient) => recipient.email === user?.email)
      ),
    [savedDocuments, user?.email]
  );

  const docStatusMap = {
    created: "Your signature is missing for this document.",
    completed: "You have already signed this document.",
    declined:
      "You have declined the signature of this document and can no longer be signed.",
  };

  return (
    <div className="h-screen flex w-full">
      <NavBar />

      <div className="flex flex-col gap-10 w-full">
        <div className="px-6 py-10 bg-gray-100">
          <h2 className="text-4xl font-thin ">Documents</h2>

          <div className="flex justify-end w-full">
            <UploadDocument />
          </div>
        </div>

        {openedModal && (
          <form
            className="flex flex-col gap-8 w-full"
            onSubmit={handleSubmit(onSubmit)}
          >
            <PrepareSignModal base64File={openedModal} onCancel={closeModal} />
          </form>
        )}

        <div className="p-6 pt-0">
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right border border-gray-500">
              <thead className="text-xs uppercase bg-gray-50 border-b border-gray-500">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Files
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Message
                  </th>
                  <th scope="col" className="px-6 py-3"></th>
                </tr>
              </thead>

              <tbody>
                {/* Uploaded documents */}
                {files.map((file, index) => (
                  <tr key={file.name} className="bg-white">
                    <td className="px-6 py-4">
                      <div className="max-w-72 break-words">{file.name}</div>
                    </td>

                    <td></td>

                    <td className="px-6 py-4 flex gap-2">
                      <button
                        className="bg-blue-400 text-white px-3 py-2 rounded-md text-base"
                        onClick={() => toggleSignModal(index)}
                      >
                        Prepare signatures
                      </button>

                      <button
                        onClick={() => {
                          reset();
                        }}
                        className="flex h-fit self-end text-blue-500 p-2 justify-center rounded-md"
                      >
                        <TrashIcon />
                      </button>
                    </td>
                  </tr>
                ))}

                {/* Saved documents */}
                {savedDocuments.map((file) => {
                  const userIsInThisDoc =
                    docsUserIsIncluded.findIndex(
                      (doc) => doc.id === file.id
                    ) !== -1;

                  const userRecipient = file?.recipients?.find(
                    (recipient) => recipient?.email === user?.email
                  );

                  const userStatus = userRecipient?.status;
                  const userSignUrl = userRecipient?.embedded_signing_url;

                  return (
                    <tr key={file?.files?.[0]?.name} className="bg-white">
                      <td className="px-6 py-4">
                        <div className="max-w-72 break-words">
                          {file?.files?.[0]?.name}
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        {userIsInThisDoc && userStatus && (
                          <div>{(docStatusMap as any)[userStatus]}</div>
                        )}
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          {userIsInThisDoc && userSignUrl && (
                            <button
                              className="bg-blue-400 text-white px-3 py-2 rounded-md text-base"
                              onClick={() => setDocToSign(userSignUrl)}
                            >
                              Sign this document
                            </button>
                          )}

                          <button
                            onClick={() => deleteDocument(file.id)}
                            className="flex h-fit self-end text-blue-500 p-2 justify-center rounded-md"
                          >
                            <TrashIcon />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {docToSign && (
        <SigningComponent
          onClose={() => setDocToSign("")}
          embeddedSigningUrl={docToSign}
        />
      )}
    </div>
  );
};
