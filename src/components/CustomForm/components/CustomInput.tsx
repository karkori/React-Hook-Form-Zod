import { Control, Controller, FieldError } from "react-hook-form";
import "./CustomInput.css";
import { FormValues } from "../models";

interface Props {
  name: keyof FormValues;
  control: Control<FormValues, unknown>;
  label: string;
  type?: string;
  error?: FieldError;
}

const InputForm = ({ name, control, label, type, error }: Props) => {
  return (
    <div className="form-group">
  <label htmlFor={name}>{label}</label>
  <Controller
    name={name}
    control={control}
    render={({ field }) => (
      <input
        {...field}
        type={type}
        id={name}
        placeholder={name}
        className={`form-control ${error ? "is-invalid" : ""}`}
      />
    )}
  />
  {error && (
    <div className="error-container">
      <div className="error">
        <p>{error.message}</p>
      </div>
    </div>
  )}
</div>
  );
};


export default InputForm;