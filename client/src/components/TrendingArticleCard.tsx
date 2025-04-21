import { Link } from "wouter";
import { formatDistanceToNow } from "date-fns";
import { Article, Category } from "@shared/schema";
import { useQuery } from "@tanstack/react-query";

interface TrendingArticleCardProps {
  article: Article;
}

const TrendingArticleCard = ({ article }: TrendingArticleCardProps) => {
  const { data: categories } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  const category = categories?.find((cat) => cat.id === article.categoryId);

  return (
    <Link href={`/article/${article.slug}`} className="block group">
      <div className="flex gap-3 md:gap-4">
        <div className="flex-shrink-0 w-16 h-16 md:w-24 md:h-24 bg-gray-100 rounded-md overflow-hidden">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="flex-1 min-w-0">
          <span className="text-xs font-medium text-blue-600 line-clamp-1">
            {category?.name}
          </span>
          <h3 className="text-xs sm:text-sm font-semibold text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2">
            {article.title}
          </h3>
          <div className="flex flex-wrap items-center">
            <span className="text-xs text-gray-500 line-clamp-1">By VentureWireDaily Staff</span>
            <span className="mx-1 text-xs text-gray-500 hidden sm:inline">•</span>
            <span className="text-xs text-gray-500 whitespace-nowrap">
              {formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true })}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TrendingArticleCard;
