import postCSS from "./Post.module.css";
import { useAuthValue } from "../../context/AuthContext";
import { useState } from "react";
import EditPost from "./EditPost";
import RemovePost from "./RemovePost";

function Post({ post }) {
  const { user } = useAuthValue();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isRemoveOpen, setIsRemoveOpen] = useState(false);

  const openEditModal = (e) => {
    e.preventDefault();
    setIsEditOpen(true);
  };

  const closeEditModal = () => {
    setIsEditOpen(false);
  };

  const openRemoveModal = (e) => {
    e.preventDefault();
    setIsRemoveOpen(true);
  };

  const closeRemoveModal = () => {
    setIsRemoveOpen(false);
  };

  return (
    <div>
      {post && (
        <div className={postCSS.postContainer}>
          <div className={postCSS.header}>
            <div className={postCSS.authorGroup}>
              <span className={postCSS.avatar}>
                {post.createdBy && post.createdBy[0]}
              </span>
              <span className={postCSS.author}>{post.createdBy}</span>
            </div>

            <div className={postCSS.metaGroup}>
              <span className={postCSS.date}>
                {post.createdAt && post.createdAt.toDate().toLocaleDateString()}
              </span>

              {user && post.uid === user.uid && (
                <div className={postCSS.actionButtons}>
                  <button
                    type="button"
                    onClick={openEditModal}
                    className={postCSS.editBtn}
                    title="Editar post"
                    aria-label="Editar post"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      width="15"
                      height="15"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                  </button>

                  <button
                    type="button"
                    onClick={openRemoveModal}
                    className={postCSS.deleteBtn}
                    title="Excluir post"
                    aria-label="Excluir post"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      width="15"
                      height="15"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </div>

          <span className={postCSS.title}>{post.title}</span>

          <img src={post.image} alt={post.title} className={postCSS.image} />

          {post.body && <p className={postCSS.body}>{post.body}</p>}

          <div className={postCSS.tags}>
            {post.tagsArray &&
              post.tagsArray.map((tag) => (
                <span key={tag} className={postCSS.tag}>
                  #{tag}
                </span>
              ))}
          </div>
        </div>
      )}

      {isEditOpen && <EditPost post={post} onClose={closeEditModal} />}
      {isRemoveOpen && <RemovePost post={post} onClose={closeRemoveModal} />}
    </div>
  );
}

export default Post;
