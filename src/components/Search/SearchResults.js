import { useState, useEffect } from "react";
import feedCSS from "../../pages/FeedPage.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useFetchDocuments } from "../../hooks/fetch/useFetchDocuments";
import { useQuery } from "../../hooks/fetch/useQuery";
import Posts from "../../components/post/Post";
import SearchForm from "../../components/Forms/SearchForm";

function SearchResults({
  uid = null,
  basePath = "/search",
  titlePrefix = "Resultados para",
  placeholder = "Buscar por uma tag...",
  emptyMessage = "Não foram encontrados posts a partir da sua busca...",
  backPath = "/",
  backText = "Voltar",
}) {
  const query = useQuery();
  const search = query.get("q") || "";
  const navigate = useNavigate();

  const [newQuery, setNewQuery] = useState(search);
  const [formError, setFormError] = useState("");
  const {
    documents: posts,
    loading,
    error,
  } = useFetchDocuments("posts", search, uid);

  useEffect(() => {
    setNewQuery(search);
    setFormError("");
  }, [search]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    if (!newQuery.trim()) {
      setFormError("Por favor, digite uma tag para buscar.");
      return;
    }

    navigate(`${basePath}?q=${newQuery.trim()}`);
  };

  return (
    <div className={feedCSS.container}>
      <h1 className={feedCSS.title}>
        {titlePrefix}: {search}
      </h1>

      <SearchForm
        placeholder={placeholder}
        value={newQuery}
        onChange={(e) => {
          setNewQuery(e.target.value);
          if (formError) setFormError("");
        }}
        onSubmit={handleSubmit}
        disabled={loading}
        error={formError || error}
      />

      <div className={feedCSS.postsContainer}>
        {loading && <p>Carregando...</p>}

        {posts && posts.map((post) => <Posts key={post.id} post={post} />)}

        {posts && posts.length === 0 && (
          <div className={feedCSS.noPosts}>
            <p>{emptyMessage}</p>
            <Link to={backPath} className={feedCSS.btn}>
              {backText}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchResults;
