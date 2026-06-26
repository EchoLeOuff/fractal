import { ArticleCard } from "./ArticleCard";
import type { Article } from "@/types/article";

export function ArticleList({ articles }: { articles: Article[] }) {
  if (!articles.length) {
    return <p className="py-16 text-center text-muted">Aucun article pour le moment.</p>;
  }
  return (
    <div className="grid gap-5">
      {articles.map((a, i) => (
        <ArticleCard key={`${a.titre_newsletter}-${i}`} article={a} />
      ))}
    </div>
  );
}
