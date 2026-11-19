import { useState } from "react";
import SearchForm from "../../components/Forms/SearchForm";
import Posts from "../../components/post/Post";
import { NavLink, useNavigate } from "react-router-dom";
import { useFetchDocuments } from "../../hooks/fetch/useFetchDocuments";
import { useAuthValue } from "../../context/AuthContext";
import feedCSS from "../FeedPage.module.css";

function Dashboard() {
  const { user } = useAuthValue();
  const uid = user.uid;

  const [query, setQuery] = useState("");
  const [formError, setFormError] = useState("");
  const navigate = useNavigate();

  const {
    documents: posts,
    loading,
    error,
  } = useFetchDocuments("posts", null, uid);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    if (!query.trim()) {
      setFormError("Por favor, digite uma tag para buscar.");
      return;
    }

    navigate(`/dashboard/search?q=${query.trim()}`);
  };

  return (
    <div className={feedCSS.container}>
      <h1 className={feedCSS.title}>Dashboard</h1>
      <SearchForm
        placeholder="Buscar nos seus posts por tag..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          if (formError) setFormError("");
        }}
        onSubmit={handleSubmit}
        disabled={loading}
        error={formError || error}
      />

      <div className={feedCSS.postsContainer}>
        {loading && <p>Carregando...</p>}

        <div>
          {posts &&
            posts.map((post) => {
              return <Posts key={post.id} post={post} />;
            })}
        </div>

        {posts && posts.length === 0 && (
          <div className={feedCSS.noPosts}>
            <p>Você ainda não possui posts publicados</p>
            <NavLink to="/createpost" className={feedCSS.btn}>
              Criar primeiro post
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
