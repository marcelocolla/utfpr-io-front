import React, { useState } from "react";

import {
  FormControl,
  FormHelperText,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";

import { useField, useFormikContext } from "formik";

import styled from "styled-components";

const StyledFormControl = styled(FormControl)`
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

  .MuiSvgIcon-root {
    font-size: 2rem;
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
` as typeof FormControl;

type PasswordFieldProps = {
  name: string;
  label: string;
};

const PasswordField = ({ name, label, ...props }: PasswordFieldProps) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<any>) => {
    const { value } = e.target;
    setFieldValue(name, value);
  };

  const fieldConfig = {
    ...props,
    ...field,
    error: false,
    onChange: handleChange,
  };

  if (meta && meta.touched && meta.error) {
    fieldConfig.error = true;
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <StyledFormControl fullWidth required>
      <InputLabel
        id={`Label-para-${name}`}
        error={meta && meta.touched && meta.error ? true : false}
        htmlFor={name}
      >
        {label}
      </InputLabel>
      <Input
        id={name}
        aria-labelledby={`Label-para-${name}`}
        aria-describedby="my-helper-text"
        type={showPassword ? "text" : "password"}
        {...fieldConfig}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="Alterar visibilidade da senha"
              onClick={handleClickShowPassword}
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
      />
      {meta && meta.touched && (
        <FormHelperText error id="my-helper-text">
          {meta.error}
        </FormHelperText>
      )}
    </StyledFormControl>
  );
};

export default PasswordField;
