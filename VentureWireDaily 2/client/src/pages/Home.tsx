import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Skeleton } from "@/components/ui/skeleton";
import { Article, Category } from "@shared/schema";
import CategoryBadge from "@/components/CategoryBadge";
import Newsletter from "@/components/Newsletter";
import ArticleCard from "@/components/ArticleCard";
import TrendingArticleCard from "@/components/TrendingArticleCard";
import FundingArticleCard from "@/components/FundingArticleCard";
import TechArticleCard from "@/components/TechArticleCard";
import { format } from "date-fns";

const Home = () => {
  // Fetch featured article
  const { data: featuredArticle, isLoading: isFeaturedLoading } = useQuery<Article[]>({
    queryKey: ["/api/articles/featured"],
  });

  // Fetch trending articles
  const { data: trendingArticles, isLoading: isTrendingLoading } = useQuery<Article[]>({
    queryKey: ["/api/articles/trending"],
  });

  // Fetch latest articles
  const { data: latestArticles, isLoading: isLatestLoading } = useQuery<Article[]>({
    queryKey: ["/api/articles"],
  });

  // Fetch categories
  const { data: categories } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  // Fetch funding articles
  const { data: fundingArticles, isLoading: isFundingLoading } = useQuery<Article[]>({
    queryKey: ["/api/articles/category/funding", { limit: 3 }],
  });

  // Fetch tech articles
  const { data: techArticles, isLoading: isTechLoading } = useQuery<Article[]>({
    queryKey: ["/api/articles/category/tech", { limit: 3 }],
  });

  const getFeaturedCategory = (categoryId?: number) => {
    return categories?.find(cat => cat.id === categoryId);
  };

  return (
    <main>
      {/* Hero Section */}
      <section className="py-6 md:py-12 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
            <div className="flex-1">
              {isFeaturedLoading ? (
                <div>
                  <Skeleton className="w-full aspect-video rounded-lg mb-4" />
                  <Skeleton className="h-6 w-32 mb-2" />
                  <Skeleton className="h-8 w-full mb-3" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              ) : featuredArticle && featuredArticle[0] ? (
                <Link href={`/article/${featuredArticle[0].slug}`} className="block group">
                  <div className="relative overflow-hidden rounded-lg aspect-video">
                    <img 
                      src={featuredArticle[0].imageUrl} 
                      alt={featuredArticle[0].title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                      loading="eager"
                    />
                  </div>
                  <div className="mt-4">
                    <span className="inline-block px-3 py-1 text-xs font-medium bg-blue-100 text-blue-600 rounded-full">
                      Featured
                    </span>
                    <h1 className="mt-2 text-xl sm:text-2xl md:text-3xl font-bold leading-tight text-primary group-hover:text-blue-600 transition-colors">
                      {featuredArticle[0].title}
                    </h1>
                    <p className="mt-2 md:mt-3 text-sm md:text-base text-gray-600 line-clamp-2">
                      {featuredArticle[0].excerpt}
                    </p>
                    <div className="mt-2 md:mt-3 flex flex-wrap items-center text-xs md:text-sm text-gray-500">
                      <span>By VentureWireDaily Staff</span>
                      <span className="mx-2">•</span>
                      <span className="whitespace-nowrap">{format(new Date(featuredArticle[0].publishedAt), "MMM d, yyyy")}</span>
                      <span className="mx-2">•</span>
                      <span>{featuredArticle[0].readTime} min read</span>
                    </div>
                  </div>
                </Link>
              ) : (
                <div className="text-center p-8 bg-gray-100 rounded-lg">
                  <p>No featured article available</p>
                </div>
              )}
            </div>
            
            {/* Trending section - desktop vs mobile layout */}
            <div className="w-full lg:w-96 mt-6 lg:mt-0">
              <h2 className="text-lg font-bold text-primary pb-2 border-b border-gray-200">
                Trending Now
              </h2>
              <div className="mt-4 space-y-4 md:space-y-6">
                {isTrendingLoading ? (
                  Array(3).fill(0).map((_, i) => (
                    <div key={i} className="flex gap-4">
                      <Skeleton className="h-16 w-16 md:h-24 md:w-24 rounded-md flex-shrink-0" />
                      <div className="flex-1">
                        <Skeleton className="h-3 w-12 mb-1" />
                        <Skeleton className="h-4 w-full mb-1" />
                        <Skeleton className="h-4 w-full mb-1" />
                        <Skeleton className="h-3 w-20" />
                      </div>
                    </div>
                  ))
                ) : trendingArticles && trendingArticles.length > 0 ? (
                  trendingArticles.map(article => (
                    <TrendingArticleCard key={article.id} article={article} />
                  ))
                ) : (
                  <div className="text-center p-4 bg-gray-100 rounded-lg">
                    <p>No trending articles available</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest News Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-primary">Latest News</h2>
            <Link href="/category/all" className="text-sm font-medium text-blue-600 hover:underline">
              View All
            </Link>
          </div>
          {isLatestLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array(3).fill(0).map((_, i) => (
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
          ) : latestArticles && latestArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {latestArticles.slice(0, 3).map(article => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <div className="text-center p-8 bg-gray-100 rounded-lg">
              <p>No articles available</p>
            </div>
          )}
          <div className="mt-10 flex justify-center">
            <Link href="/category/all?page=2" className="text-blue-600 hover:underline font-medium">
              Load more articles
            </Link>
          </div>
        </div>
      </section>

      {/* Category Sections */}
      <section className="py-12 border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Funding News Section */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-primary">Funding News</h2>
                <Link href="/category/funding" className="text-sm font-medium text-blue-600 hover:underline">
                  More Funding
                </Link>
              </div>
              <div className="space-y-6">
                {isFundingLoading ? (
                  Array(3).fill(0).map((_, i) => (
                    <div key={i} className="border-b border-gray-200 pb-6 last:border-0">
                      <div className="flex gap-4">
                        <Skeleton className="h-24 w-24 rounded-md" />
                        <div className="flex-1">
                          <Skeleton className="h-5 w-full mb-1" />
                          <Skeleton className="h-5 w-3/4 mb-2" />
                          <Skeleton className="h-4 w-full mb-1" />
                          <Skeleton className="h-4 w-full mb-2" />
                          <Skeleton className="h-3 w-32" />
                        </div>
                      </div>
                    </div>
                  ))
                ) : fundingArticles && fundingArticles.length > 0 ? (
                  fundingArticles.map(article => (
                    <FundingArticleCard key={article.id} article={article} />
                  ))
                ) : (
                  <div className="text-center p-4 bg-gray-100 rounded-lg">
                    <p>No funding articles available</p>
                  </div>
                )}
              </div>
            </div>

            {/* Tech News Section */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-primary">Tech Innovations</h2>
                <Link href="/category/tech" className="text-sm font-medium text-blue-600 hover:underline">
                  More Tech
                </Link>
              </div>
              <div className="space-y-6">
                {isTechLoading ? (
                  Array(3).fill(0).map((_, i) => (
                    <div key={i} className="border-b border-gray-200 pb-6 last:border-0">
                      <div className="flex gap-4">
                        <Skeleton className="h-24 w-24 rounded-md" />
                        <div className="flex-1">
                          <Skeleton className="h-5 w-full mb-1" />
                          <Skeleton className="h-5 w-3/4 mb-2" />
                          <Skeleton className="h-4 w-full mb-1" />
                          <Skeleton className="h-4 w-full mb-2" />
                          <Skeleton className="h-3 w-32" />
                        </div>
                      </div>
                    </div>
                  ))
                ) : techArticles && techArticles.length > 0 ? (
                  techArticles.map(article => (
                    <TechArticleCard key={article.id} article={article} />
                  ))
                ) : (
                  <div className="text-center p-4 bg-gray-100 rounded-lg">
                    <p>No tech articles available</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <Newsletter />
    </main>
  );
};

export default Home;
