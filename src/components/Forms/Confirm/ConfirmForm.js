import { useEffect } from "react";
import forms from "../Forms.module.css";
import confirmCSS from "./ConfirmForm.module.css";

function ConfirmForm({ title, children, onSubmit, onClose, error, disabled }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className={confirmCSS.overlay}>
      <div className={confirmCSS.modal} role="dialog" aria-modal="true">
        <h2 className={confirmCSS.title}>{title}</h2>

        {children && <div className={confirmCSS.content}>{children}</div>}

        {error && <p className={forms.error}>{error}</p>}

        <div className={confirmCSS.actions}>
          <button
            type="button"
            onClick={onSubmit}
            className={forms.btn}
            disabled={disabled}
          >
            {disabled ? "Aguarde..." : "Confirmar"}
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
      </div>
    </div>
  );
}

export default ConfirmForm;
