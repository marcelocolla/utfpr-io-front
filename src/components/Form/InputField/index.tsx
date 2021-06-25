import { TextField } from "@material-ui/core";
import { useField } from "formik";
import styled from "styled-components";

const StyledTextField = styled(TextField)`
  label {
    font-size: 1.5rem;
  }
  label.Mui-focused:not(.Mui-error) {
    color: var(--color-orange-default);
  }
  input {
    font-size: 1.7rem;
  }
  p {
    font-size: 1rem;
  }

  .MuiInputBase-root {
    &.MuiInput-underline:before {
      border-bottom: 1px solid var(--color-label);
    }
    &.MuiInput-underline:not(.Mui-error):after {
      border-bottom: 2px solid var(--color-orange-default);
    }
    &.MuiInput-underline:hover:not(.Mui-disabled):before {
      border-bottom: 2px solid var(--color-label);
    }
  }
` as typeof TextField;

type InputFieldProps = {
  onBlur?:any;
  name: string;
  type?: string;
  label?: string;
  select?: boolean;
  disabled?: boolean;
  required?: boolean;
  children?: React.ReactNode;
};

const InputField = ({ name, select, children, disabled, ...props }: InputFieldProps) => {
  const [field, meta] = useField(name);

  const configTextField = {
    ...field,
    ...props,
    select,
    error: false,
    helperText: "",
    fullWidth: true,
    disabled: disabled ? true : false,
  };

  if (meta && meta.touched && meta.error) {
    configTextField.error = true;
    configTextField.helperText = meta.error;
  }

  return (
    <StyledTextField {...configTextField}>
      {children}
    </StyledTextField>
  );
};

export default InputField;
