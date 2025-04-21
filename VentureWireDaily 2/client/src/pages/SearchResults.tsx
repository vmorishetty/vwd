import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Article, Category } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
import ArticleCard from "@/components/ArticleCard";
import Pagination from "@/components/Pagination";
import Newsletter from "@/components/Newsletter";
import { Search } from "lucide-react";

const SearchResults = () => {
  const [location] = useLocation();
  const searchParams = new URLSearchParams(window.location.search);
  const query = searchParams.get("q") || "";
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const ITEMS_PER_PAGE = 9;
  
  // Fetch search results
  const {
    data: articles,
    isLoading,
    error,
  } = useQuery<Article[]>({
    queryKey: ["/api/search", { q: query, limit: ITEMS_PER_PAGE, offset: (currentPage - 1) * ITEMS_PER_PAGE }],
    enabled: !!query,
  });
  
  // Calculate total pages - in a real app, this would come from the API
  const totalPages = Math.ceil((articles?.length || 0) / ITEMS_PER_PAGE) || 5; // Fallback to 5 pages for demo
  
  if (!query) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <Search className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h1 className="text-3xl font-bold text-primary mb-4">Search Articles</h1>
          <p className="text-gray-600 mb-6">Please enter a search term to find articles.</p>
        </div>
      </div>
    );
  }

  return (
    <main>
      <section className="py-8 md:py-12 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-primary mb-4">
            Search Results for "{query}"
          </h1>
          <p className="text-gray-600">
            {isLoading 
              ? "Searching articles..." 
              : articles && articles.length > 0 
                ? `Found ${articles.length} results` 
                : "No articles found matching your search."}
          </p>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array(ITEMS_PER_PAGE).fill(0).map((_, i) => (
                <div key={i}>
                  <Skeleton className="w-full aspect-video rounded-lg mb-4" />
                  <Skeleton className="h-4 w-24 mb-2" />
                  <Skeleton className="h-6 w-full mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4 mb-2" />
                  <Skeleton className="h-3 w-40" />
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center p-8 bg-gray-100 rounded-lg">
              <p className="text-red-500">Failed to perform search. Please try again later.</p>
            </div>
          ) : articles && articles.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {articles.map(article => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
              <div className="mt-10 flex justify-center">
                <Pagination 
                  currentPage={currentPage} 
                  totalPages={totalPages} 
                  basePath={`/search?q=${encodeURIComponent(query)}`} 
                />
              </div>
            </>
          ) : (
            <div className="text-center p-8 bg-gray-100 rounded-lg">
              <p>No articles match your search criteria. Please try different keywords.</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <Newsletter />
    </main>
  );
};

export default SearchResults;
