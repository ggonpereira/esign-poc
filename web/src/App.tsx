import { FormProvider, useForm } from "react-hook-form";
import { Toaster } from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import { UserProvider } from "./contexts/UserContextProvider";
import { Documents } from "./pages/Documents";

const initialData = {
  name: "",
  recipients: [
    {
      id: uuidv4(),
      name: "",
      email: "",
    },
  ],
  fields: [],
  files: [],
};

export const App = () => {
  const methods = useForm({
    defaultValues: initialData,
    mode: "onBlur",
  });

  return (
    <UserProvider>
      <FormProvider {...methods}>
        <Toaster />
        <Documents />
      </FormProvider>
    </UserProvider>
  );
};
