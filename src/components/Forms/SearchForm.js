import forms from "./Forms.module.css";

function SearchForm({
  title,
  label,
  placeholder,
  value,
  onChange,
  onSubmit,
  error,
  disabled,
}) {
  return (
    <div className={forms.container}>
      <form onSubmit={onSubmit} className={forms.form}>
        {title && <h2>{title}</h2>}
        <label className={forms.label}>
          {label && <span className={forms.title}>{label}</span>}
          <input
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
          />
        </label>

        {error && <p className={forms.error}>{error}</p>}

        <button type="submit" className={forms.btn} disabled={disabled}>
          {disabled ? "Aguarde..." : "Pesquisar"}
        </button>
      </form>
    </div>
  );
}

export default SearchForm;
