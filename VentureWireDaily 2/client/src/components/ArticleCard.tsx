import { Link } from "wouter";
import { formatDistanceToNow } from "date-fns";
import { Article, Category } from "@shared/schema";
import CategoryBadge from "./CategoryBadge";
import { useQuery } from "@tanstack/react-query";

interface ArticleCardProps {
  article: Article;
}

const ArticleCard = ({ article }: ArticleCardProps) => {
  const { data: categories } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  const category = categories?.find((cat) => cat.id === article.categoryId);

  return (
    <article className="group">
      <Link href={`/article/${article.slug}`}>
        <div className="overflow-hidden rounded-lg aspect-video mb-4">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div>
          {category && (
            <CategoryBadge
              categoryName={category.name}
              categorySlug={category.slug}
            />
          )}
          <h3 className="mt-2 text-xl font-bold text-primary group-hover:text-blue-600 transition-colors">
            {article.title}
          </h3>
          <p className="mt-2 text-gray-600 line-clamp-2">
            {article.excerpt}
          </p>
          <div className="mt-3 flex items-center text-sm text-gray-500">
            <span>By VentureWireDaily Staff</span>
            <span className="mx-2">•</span>
            <span>
              {formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true })}
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default ArticleCard;
