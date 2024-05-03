import React, { forwardRef } from "react";
import { FieldError, UseFormRegister, useFormContext } from "react-hook-form";
import { CreateDocumentForm } from "../interfaces/createDocument";

export const InputGroup = forwardRef<
  HTMLInputElement,
  {
    label: string;
    errorMessage?: FieldError;
    children?: React.ReactNode;
  } & ReturnType<UseFormRegister<CreateDocumentForm>>
>(({ onChange, onBlur, name, label, errorMessage, children }, ref) => {
  const {
    formState: { errors },
  } = useFormContext<CreateDocumentForm>();

  const errorsByName = (errors as any)[name];

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="font-medium">
        {label}
      </label>

      <div className="flex gap-2">
        <input
          name={name}
          ref={ref}
          id={name}
          onChange={onChange}
          onBlur={onBlur}
          className="border outline-1 outline-gray-400 border-gray-300 p-2 w-44 rounded-md"
        />

        {/* This is so ugly why did I do this ... */}

        {children}
      </div>

      {(errorMessage?.message || errorsByName) && (
        <p className="text-red-600 text-sm max-w-44 mt-[-8px]">
          {errorMessage?.message || errorsByName?.message}
        </p>
      )}
    </div>
  );
});
