import "./index.css";

const Dropdown = ({
  value,
  onChange,
  labelText,
  name,
  setValue = "value",
  setOption = "name",
  placeholder,
  errorMsg,
  required,
  onBlur,
  data,
  multiple = false,
  disabled,
}) => {

  return (
    <div className="dropdown-container">
      <label className="input-label">
        {labelText}
        {required ? <span style={{ color: "red" }}>*</span> : null}
      </label>
      <select
      disabled={disabled}
        multiple={multiple}
        value={value || placeholder}
        className="dropdown-input"
        onChange={onChange}
        name={name}
        onBlur={onBlur}
      >
        <option value={placeholder} disabled>
          {placeholder}
        </option>
        {data?.map((each, index) => (
          <option key={index} value={each[setValue]}>
            {each[setOption]}
          </option>
        ))}
      </select>
      {errorMsg && (
        <p className="input-field-error-msg">
          {errorMsg}
        </p>
      )}
    </div>
  );
};

export default Dropdown;