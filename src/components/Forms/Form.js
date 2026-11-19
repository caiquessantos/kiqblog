import forms from "./Forms.module.css";

function Form({
  title,
  fields,
  buttonText,
  buttonType = "submit",
  onSubmit,
  error,
  disabled,
}) {
  return (
    <div>
      <form onSubmit={onSubmit} className={forms.form}>
        <h2>{title}</h2>
        {fields.map((field) => (
          <label key={field.name} className={forms.label}>
            <span className={forms.title}>{field.label}</span>
            <input
              type={field.type}
              name={field.name}
              placeholder={field.placeholder}
              value={field.value}
              onChange={field.onChange}
              required={field.required ?? true}
            />
          </label>
        ))}
        {error && <p className={forms.error}>{error}</p>}

        <button
          type={buttonType === "onSubmit" ? "submit" : buttonType}
          className={forms.btn}
          disabled={disabled}
        >
          {buttonText}
        </button>
      </form>
    </div>
  );
}

export default Form;
