import { useState } from "react";
import { useUpdateDocument } from "../../hooks/update/useUpdateDocument";
import { useNotification } from "../../context/Notifications/Notification";

export function useEditPost(post, onClose) {
  const [title, setTitle] = useState(post.title || "");
  const [image, setImage] = useState(post.image || "");
  const [body, setBody] = useState(post.body || "");
  const [tags, setTags] = useState(
    post.tagsArray ? post.tagsArray.join(", ") : "",
  );
  const [error, setError] = useState("");

  const { updateDocument, response } = useUpdateDocument("posts");
  const { showNotification } = useNotification();

  const fields = [
    {
      name: "title",
      label: "Título",
      type: "text",
      placeholder: "Título do post",
      value: title,
      onChange: (e) => setTitle(e.target.value),
    },
    {
      name: "image",
      label: "Imagem",
      type: "url",
      placeholder: "URL da imagem",
      value: image,
      onChange: (e) => setImage(e.target.value),
    },
    {
      name: "body",
      label: "Descrição",
      type: "text",
      placeholder: "Descrição do post",
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

    if (!title.trim() || !image.trim() || !body.trim() || !tags.trim()) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    const tagsArray = tags
      .split(",")
      .map((tag) => tag.trim().toLowerCase())
      .filter(Boolean);

    const updated = await updateDocument(post.id, {
      title: title.trim(),
      image: image.trim(),
      body: body.trim(),
      tagsArray,
    });

    if (updated) {
      showNotification("Post atualizado com sucesso!");
      onClose();
    }
  };

  return {
    fields,
    handleSubmit,
    error: error || response.error,
    loading: response.loading,
  };
}
