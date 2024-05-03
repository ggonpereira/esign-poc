import { CreateDocumentForm } from "../interfaces/createDocument";

export const haveAllData = ({
  name,
  recipients,
  files,
  fields,
}: CreateDocumentForm) => {
  const hasFields = fields?.length > 0;
  const hasFiles = files?.length > 0;
  const hasRecipients = recipients?.length > 0;

  return name && hasFields && hasFiles && hasRecipients;
};
