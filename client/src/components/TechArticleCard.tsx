import { Link } from "wouter";
import { format } from "date-fns";
import { Article } from "@shared/schema";

interface TechArticleCardProps {
  article: Article;
}

const TechArticleCard = ({ article }: TechArticleCardProps) => {
  return (
    <article className="border-b border-gray-200 pb-6 last:border-0">
      <Link href={`/article/${article.slug}`} className="group">
        <div className="flex gap-4">
          <div className="flex-shrink-0 w-24 h-24 bg-gray-100 rounded-md overflow-hidden">
            <img
              src={article.imageUrl}
              alt={article.title}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex-1">
            <h3 className="text-base font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
              {article.title}
            </h3>
            <p className="mt-1 text-sm text-gray-600 line-clamp-2">
              {article.excerpt}
            </p>
            <div className="mt-2 flex items-center text-xs text-gray-500">
              <span>By VentureWireDaily Staff</span>
              <span className="mx-2">•</span>
              <span>{format(new Date(article.publishedAt), "MMM d, yyyy")}</span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default TechArticleCard;
