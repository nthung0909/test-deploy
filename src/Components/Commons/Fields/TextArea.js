import React, { memo } from "react";
const TextArea = memo((props) => {
  const {
    placeholder,
    disabled = false,
    defaultValue = "",
    field: { name },
    form: { setFieldValue , touched},
    rows = 3,
  } = props;
  const handleBlur = (e) => {
    touched[name] = true;
    setFieldValue(name, e.target.value);
  }
  const handleChange = (e) => {
    touched[name] = true;
    setFieldValue(name, e.target.value);
  };
  return (
    <textarea
      name={name}
      defaultValue={defaultValue}
      placeholder={placeholder}
      disabled={disabled}
      onChange={handleChange}
      rows={rows}
      onBlur={handleBlur}
    />
  );
});

export default TextArea;
