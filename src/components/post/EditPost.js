import EditForm from "../Forms/Edit/EditForm";
import { useEditPost } from "./EditPostAux";

function EditPost({ post, onClose }) {
  const { fields, handleSubmit, error, loading } = useEditPost(post, onClose);

  return (
    <EditForm
      title="Editar post"
      fields={fields}
      onSubmit={handleSubmit}
      onClose={onClose}
      error={error}
      disabled={loading}
    />
  );
}

export default EditPost;
