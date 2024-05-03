import { createContext } from "react";
import { FormProviderProps, useForm } from "react-hook-form";
import { CreateDocumentForm } from "../../interfaces/createDocument";
import { State } from "./interfaces";

export const FormContext = createContext({} as State);

export const FormProvider = ({ children }: FormProviderProps) => {
  const props = useForm<CreateDocumentForm>();

  return <FormContext.Provider value={props}>{children}</FormContext.Provider>;
};
