import { useQuery } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import { Article, Category } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
import ArticleCard from "@/components/ArticleCard";
import Pagination from "@/components/Pagination";
import Newsletter from "@/components/Newsletter";

const CategoryPage = () => {
  const [match, params] = useRoute("/category/:slug");
  const slug = params?.slug || "";
  const isAllCategories = slug === "all";
  
  // Get current page from URL
  const searchParams = new URLSearchParams(window.location.search);
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const ITEMS_PER_PAGE = 9;
  
  // Fetch category
  const { data: categories } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });
  
  const category = categories?.find(cat => cat.slug === slug);
  
  // Fetch articles based on category
  const {
    data: articles,
    isLoading,
    error,
  } = useQuery<Article[]>({
    queryKey: isAllCategories 
      ? ["/api/articles", { limit: ITEMS_PER_PAGE, offset: (currentPage - 1) * ITEMS_PER_PAGE }]
      : ["/api/articles/category/" + slug, { limit: ITEMS_PER_PAGE, offset: (currentPage - 1) * ITEMS_PER_PAGE }],
    enabled: isAllCategories || !!category,
  });
  
  // Calculate total pages - in real app, this would come from the API
  const totalPages = Math.ceil((articles?.length || 0) / ITEMS_PER_PAGE) || 5; // Fallback to 5 pages for now
  
  if (!isAllCategories && !category && categories) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-primary mb-4">Category Not Found</h1>
          <p className="text-gray-600 mb-6">The category you're looking for doesn't exist.</p>
          <Link href="/">
            <a className="text-blue-600 hover:underline">Return to Home</a>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main>
      <section className="py-8 md:py-12 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-primary mb-4">
            {isAllCategories ? "All Articles" : category?.name || "Loading..."}
          </h1>
          {!isAllCategories && category && (
            <p className="text-gray-600 max-w-3xl">
              Latest news and updates about {category.name.toLowerCase()} in the startup and venture capital world.
            </p>
          )}
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
              <p className="text-red-500">Failed to load articles. Please try again later.</p>
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
                  basePath={`/category/${slug}`} 
                />
              </div>
            </>
          ) : (
            <div className="text-center p-8 bg-gray-100 rounded-lg">
              <p>No articles available in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <Newsletter />
    </main>
  );
};

export default CategoryPage;
