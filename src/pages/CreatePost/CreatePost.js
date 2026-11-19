import { useAuthValue } from "../../context/AuthContext";
import { useNotification } from "../../context/Notifications/Notification";
import { useState } from "react";
import forms from "../../components/Forms/Forms.module.css";
import Form from "../../components/Forms/Form";
import { useInsertDocument } from "../../hooks/inset/useInsertDocument";
import { useNavigate } from "react-router-dom";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState("");
  const [error, setError] = useState("");

  const { insertDocument, response } = useInsertDocument("posts");
  const { showNotification } = useNotification();
  const { user } = useAuthValue();
  const navigate = useNavigate();

  const fields = [
    {
      name: "title",
      label: "Título",
      type: "text",
      placeholder: "Título",
      value: title,
      onChange: (e) => setTitle(e.target.value),
    },
    {
      name: "image",
      label: "Imagem",
      type: "url",
      placeholder: "Coloque aqui a URL da sua imagem.",
      value: image,
      onChange: (e) => setImage(e.target.value),
    },
    {
      name: "body",
      label: "Descrição",
      type: "text",
      placeholder: "Descreva aqui a sua imagem.",
      value: body,
      onChange: (e) => setBody(e.target.value),
    },
    {
      name: "tags",
      label: "Tags",
      type: "text",
      placeholder: "Insira tags separadas por vírgula",
      value: tags,
      onChange: (e) => setTags(e.target.value),
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!title.trim() || !image.trim() || !tags.trim() || !body.trim()) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    const tagsArray = tags
      .split(",")
      .map((tag) => tag.trim().toLowerCase())
      .filter(Boolean);

    await insertDocument({
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName,
    });

    showNotification("Post criado com sucesso!");
    navigate("/");
  };

  return (
    <div className={forms.container}>
      <Form
        title={"Postar imagem"}
        fields={fields}
        buttonText={!response.loading ? "Postar" : "Aguarde..."}
        buttonType={"submit"}
        onSubmit={handleSubmit}
        error={error || response.error}
        disabled={response.loading}
      />
    </div>
  );
}

export default CreatePost;
