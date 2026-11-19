import { useState } from "react";
import ConfirmForm from "../Forms/Confirm/ConfirmForm";
import removeCSS from "./RemovePost.module.css";
import { useDeleteDocument } from "../../hooks/delete/useDeleteDocument";
import { useNotification } from "../../context/Notifications/Notification";

function RemovePost({ post, onClose }) {
  const [error, setError] = useState("");
  const { deleteDocument, response } = useDeleteDocument("posts");
  const { showNotification } = useNotification();

  const handleRemove = async (e) => {
    e?.preventDefault();
    setError("");

    if (!post?.id) {
      setError("Algo deu errado, tente novamente.");
      return;
    }

    const deleted = await deleteDocument(post.id);

    if (deleted) {
      showNotification("Post removido com sucesso!");
      onClose();
    }
  };

  return (
    <ConfirmForm
      title="Deseja excluir o post?"
      onSubmit={handleRemove}
      onClose={onClose}
      error={error || response.error}
      disabled={response.loading}
    >
      <div className={removeCSS.preview}>
        <img
          src={post.image}
          alt={post.title}
          className={removeCSS.previewImage}
        />
        <div className={removeCSS.previewInfo}>
          <p className={removeCSS.previewTitle}>{post.title}</p>
          {post.createdAt && (
            <span className={removeCSS.previewDate}>
              Criado em: {post.createdAt.toDate().toLocaleDateString()}
            </span>
          )}
        </div>
      </div>
    </ConfirmForm>
  );
}

export default RemovePost;
