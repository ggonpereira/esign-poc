import { UseFormReturn } from "react-hook-form";
import { CreateDocumentForm } from "../../interfaces/createDocument";

export interface FormProviderProps {
  children: React.ReactNode;
}

export interface State extends UseFormReturn<CreateDocumentForm, any, any> {}
