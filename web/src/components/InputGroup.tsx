interface InputGroupProps {
  label: string;
  value: string;
  onChange: (x: string) => void;
}

export const InputGroup = ({ label, value, onChange }: InputGroupProps) => {
  return (
    <label htmlFor={label} className="flex flex-col gap-2">
      {label}

      <input
        type="text"
        id={label}
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
        }}
        className="border border-black"
      />
    </label>
  );
};
