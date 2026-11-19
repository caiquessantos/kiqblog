import { useAuthentication } from "../../../hooks/auth/useAuthentication";
import { useNotification } from "../../../context/Notifications/Notification";
import Form from "../Form";
import forms from "../Forms.module.css";
import { useState, useEffect } from "react";

function RegisterForm() {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPasword, setConfirmePassword] = useState("");
  const [error, setError] = useState("");

  const { createUser, error: authError, loading } = useAuthentication();
  const { showNotification } = useNotification();

  const fields = [
    {
      name: "user",
      label: "User",
      type: "text",
      placeholder: "Informe um nome de usuário",
      value: displayName,
      onChange: (e) => setDisplayName(e.target.value),
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "seuemail@exemplo.com",
      value: email,
      onChange: (e) => setEmail(e.target.value),
    },
    {
      name: "password",
      label: "Senha",
      type: "password",
      placeholder: "Digite sua senha",
      value: password,
      onChange: (e) => setPassword(e.target.value),
    },
    {
      name: "confirmPassword",
      label: "Senha",
      type: "password",
      placeholder: "Confirme sua senha",
      value: confirmPasword,
      onChange: (e) => setConfirmePassword(e.target.value),
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPasword) {
      setError("As senhas devem ser iguais!");
      return;
    }

    const res = await createUser({
      displayName,
      email,
      password,
    });

    if (res) {
      showNotification("Conta criada com sucesso!");
    }
  };

  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  return (
    <div className={forms.container}>
      <Form
        title={"Cadastrar"}
        fields={fields}
        buttonText={!loading ? "Cadastrar" : "Aguarde..."}
        buttonType={"submit"}
        onSubmit={handleSubmit}
        error={error}
        disabled={loading}
      />
    </div>
  );
}

export default RegisterForm;
