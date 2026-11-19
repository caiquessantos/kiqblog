import forms from "../Forms.module.css";
import Form from "../Form";
import { useAuthentication } from "../../../hooks/auth/useAuthentication";
import { useNotification } from "../../../context/Notifications/Notification";
import { useState, useEffect } from "react";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { loginUser, error: authError, loading } = useAuthentication();
  const { showNotification } = useNotification();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    const user = {
      email,
      password,
    };

    const res = await loginUser(user);

    if (res) {
      showNotification("Login efetuado com sucesso!");
    }
  };

  const fields = [
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
  ];

  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  return (
    <div className={forms.container}>
      <Form
        title={"Entrar"}
        fields={fields}
        buttonText={!loading ? "Entrar" : "Aguarde..."}
        buttonType={"onSubmit"}
        onSubmit={handleSubmit}
        error={error}
        disabled={loading}
      />
    </div>
  );
}

export default LoginForm;
