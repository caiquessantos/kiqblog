import { useAuthValue } from "../../context/AuthContext";
import SearchResults from "../../components/Search/SearchResults";

function DashboardSearch() {
  const { user } = useAuthValue();

  return (
    <SearchResults
      uid={user.uid}
      basePath="/dashboard/search"
      titlePrefix="Meus resultados para"
      placeholder="Buscar nos seus posts por tag..."
      emptyMessage="Não foram encontrados posts seus com essa tag..."
      backPath="/dashboard"
      backText="Voltar para o Dashboard"
    />
  );
}

export default DashboardSearch;
