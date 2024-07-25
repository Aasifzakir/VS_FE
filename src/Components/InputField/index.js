import "./index.css";

const InputField = ({
    value,
    onChange,
    onBlur,
    name,
    labelText,
    placeholder,
    accept,
    disabled,
    type,
    multiple,
    required = false,
    errorMsg,
}) => {
    const className = "input-field";

    const containerClass = "input-container";

    const labelClass = "input-label";

    return (
        <div className={containerClass}>
            <label className={labelClass}>
                {labelText}
                {required ? <span style={{ color: "red" }}>*</span> : null}
            </label>

            <input
                disabled={disabled}
                className={className}
                value={value}
                checked={value}
                onChange={onChange}
                name={name}
                placeholder={placeholder}
                type={type}
                onBlur={onBlur}
                accept={accept}
                multiple={multiple}
            />

            {
                errorMsg && (
                    <p className={"input-field-error-msg"}>
                        {errorMsg}
                    </p>
                )
            }
        </div>
    );
};

export default InputField;