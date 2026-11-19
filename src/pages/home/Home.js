import { useState } from "react";
import SearchForm from "../../components/Forms/SearchForm";
import Posts from "../../components/post/Post";
import feedCSS from "../FeedPage.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useFetchDocuments } from "../../hooks/fetch/useFetchDocuments";

function Home() {
  const [query, setQuery] = useState("");
  const [formError, setFormError] = useState("");
  const { documents: posts, loading, error } = useFetchDocuments("posts");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    if (!query.trim()) {
      setFormError("Por favor, digite uma tag para buscar.");
      return;
    }

    navigate(`/search?q=${query.trim()}`);
  };

  return (
    <div className={feedCSS.container}>
      <h1 className={feedCSS.title}>Home</h1>
      <SearchForm
        placeholder="Buscar por uma tag..."
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
            <p>Não foram encontrados posts</p>
            <NavLink to="/createpost" className={feedCSS.btn}>
              Criar um novo post
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
