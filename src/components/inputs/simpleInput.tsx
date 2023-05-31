import Input from "./input.module.scss";

export enum InputTypes {
  Password = "password",
  Text = "text",
}

type SimpleInputProps = {
  placeholder: string;
  type: InputTypes;
  value?: string;
  isDisabled?: boolean;
  setValue: (arg: string) => any;
};

export const SimpleInput = ({
  placeholder,
  type,
  value,
  setValue,
  isDisabled
}: SimpleInputProps) => {
  return (
    <>
      <input
        className={Input.simpleInput}
        type={type}
        placeholder={placeholder}
        value={value}
        disabled={isDisabled}
        onChange={(e) => {
          setValue(e.currentTarget.value);
        }}
      />
    </>
  );
};
