import { useEffect } from "react";
import forms from "../Forms.module.css";
import editCSS from "./EditForm.module.css";

function EditForm({ title, fields, onSubmit, onClose, error, disabled }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className={editCSS.overlay}>
      <div className={editCSS.modal} role="dialog" aria-modal="true">
        <form onSubmit={onSubmit} className={forms.form}>
          <h2>{title}</h2>

          {fields &&
            fields.map((field) => (
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

          <div className={editCSS.actions}>
            <button type="submit" className={forms.btn} disabled={disabled}>
              {disabled ? "Aguarde..." : "Salvar"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className={forms.btnCancel}
              disabled={disabled}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditForm;
