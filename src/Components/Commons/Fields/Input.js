import React, { memo } from "react";
const InputField = memo((props) => {
  const {
    placeholder,
    disabled = false,
    defaultValue,
    field: { name, value },
    form: { setFieldValue, touched, errors },
    type = "text",
  } = props;

  const showError = errors[name] && touched[name]

  const handleBlur = (e) => {
    touched[name] = true;
    setFieldValue(name, e.target.value);
  }
  const handleChange = (e) => {
    touched[name] = true;
    setFieldValue(name, e.target.value);
  };
  return (
    <>
      <input
        name={name}
        value={value}
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        disabled={disabled}
        onChange={handleChange}
        onBlur={handleBlur}
      />

      {showError && <label className="sd-error-text">{errors[name]}</label>}
    </>
  );
});

export default InputField;
