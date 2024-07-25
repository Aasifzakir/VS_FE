import PhoneInput from "react-phone-input-2";
import "./index.css";
import "react-phone-input-2/lib/style.css";

const PhoneNumber = ({
  value,
  onChange,
  labelText,
  name,
  disabled,
  placeholder,
  onBlur = () => {},
  validcheck,
  errorMsg,
  required,
}) => {

  function findlength(country, code) {
    let count = 0;
    if (country) {
      for (let each of country) {
        if (each === ".") {
          count++;
        }
      }
    }
    return count;
  }
  return (
    <div className="input-container">
      <label className="input-label">
        {labelText}
        {required ? <span style={{ color: "red" }}>*</span> : null}
      </label>

      <PhoneInput
        country={"in"}
        disabled={disabled}
        className="input-field-password"
        enableLongNumbers={true}
        value={value}
        placeholder={placeholder}
        onBlur={(phone) => onBlur(phone)}
        isValid={(value, country) => {
          let len = findlength(country?.format, country?.countryCode);
          validcheck(len);
        }}
        onChange={(phone) => {
          onChange(name, phone);
        }}
        inputProps={{
          name: name,
          required: true,
        }}
        autocompleteSearch
      />
      {errorMsg && (
        <p className="input-field-error-msg">
          {errorMsg}
        </p>
      )}
    </div>
  );
};

export default PhoneNumber;