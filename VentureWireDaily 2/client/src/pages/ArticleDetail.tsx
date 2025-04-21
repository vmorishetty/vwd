import { useQuery } from "@tanstack/react-query";
import { Link, useRoute } from "wouter";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import { Article, Category, User } from "@shared/schema";
import Newsletter from "@/components/Newsletter";
import CategoryBadge from "@/components/CategoryBadge";
import SocialShare from "@/components/SocialShare";
import { ThumbsUp, MessageSquare, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const ArticleDetail = () => {
  const [match, params] = useRoute("/article/:slug");
  const slug = params?.slug || "";
  
  // Fetch article
  const { 
    data: article, 
    isLoading: isArticleLoading,
    error: articleError
  } = useQuery<Article>({
    queryKey: ["/api/articles/" + slug],
  });
  
  // Fetch categories
  const { data: categories } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });
  
  // Fetch related articles
  const { 
    data: relatedArticles, 
    isLoading: isRelatedLoading 
  } = useQuery<Article[]>({
    queryKey: ["/api/articles/" + slug + "/related"],
    enabled: !!article,
  });
  
  // Get the category of the article
  const category = categories?.find(cat => cat.id === article?.categoryId);
  
  if (articleError) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-primary mb-4">Article Not Found</h1>
          <p className="text-gray-600 mb-6">The article you're looking for doesn't exist or has been removed.</p>
          <Link href="/">
            <Button>Return to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main>
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="mb-6">
              <Link href="/" className="inline-flex items-center text-sm text-blue-600 hover:underline">
                <ChevronLeft className="h-4 w-4 mr-1" /> Back to Articles
              </Link>
            </div>
            
            {isArticleLoading ? (
              <div>
                <Skeleton className="h-6 w-32 mb-4" />
                <Skeleton className="h-10 w-full mb-4" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-6" />
                <Skeleton className="h-64 w-full mb-2" />
                <Skeleton className="h-4 w-3/4 mb-8" />
                <Skeleton className="h-6 w-full mb-4" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-6" />
              </div>
            ) : article ? (
              <>
                {category && (
                  <CategoryBadge 
                    categoryName={category.name} 
                    categorySlug={category.slug} 
                    className="mb-4" 
                  />
                )}
                <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                  {article.title}
                </h1>
                <div className="flex items-center text-sm text-gray-500 mb-6">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full overflow-hidden mr-3 bg-gray-200">
                      {/* Avatar placeholder */}
                      <div className="w-full h-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
                        VW
                      </div>
                    </div>
                    <span className="font-medium text-gray-800">VentureWireDaily Staff</span>
                  </div>
                  <span className="mx-2">•</span>
                  <span>{format(new Date(article.publishedAt), "MMMM d, yyyy")}</span>
                  <span className="mx-2">•</span>
                  <span>{article.readTime} min read</span>
                </div>
                <div className="mb-8">
                  <img 
                    src={article.imageUrl} 
                    alt={article.title} 
                    className="w-full rounded-lg" 
                  />
                  <p className="text-sm text-gray-500 mt-2 italic">
                    Image: Venture Wire Daily
                  </p>
                </div>
                <div 
                  className="prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />
                <div className="border-t border-b border-gray-200 py-6 my-8">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600">
                        <ThumbsUp className="h-5 w-5" />
                        <span>326</span>
                      </button>
                      <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600">
                        <MessageSquare className="h-5 w-5" />
                        <span>42 comments</span>
                      </button>
                    </div>
                    <div className="flex items-center space-x-4">
                      <SocialShare 
                        title={article.title} 
                        url={window.location.href} 
                      />
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center p-8 bg-gray-100 rounded-lg">
                <p>Article not found</p>
              </div>
            )}
            
            {/* Related Articles */}
            <div className="mb-12">
              <h3 className="text-xl font-bold text-primary mb-6">Related Articles</h3>
              {isRelatedLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Array(2).fill(0).map((_, i) => (
                    <div key={i} className="border border-gray-200 rounded-lg overflow-hidden">
                      <Skeleton className="h-48 w-full" />
                      <div className="p-4">
                        <Skeleton className="h-3 w-20 mb-2" />
                        <Skeleton className="h-5 w-full mb-2" />
                        <Skeleton className="h-5 w-3/4 mb-2" />
                        <Skeleton className="h-3 w-24" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : relatedArticles && relatedArticles.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {relatedArticles.map(relatedArticle => {
                    const relatedCategory = categories?.find(cat => cat.id === relatedArticle.categoryId);
                    return (
                      <Link 
                        key={relatedArticle.id} 
                        href={`/article/${relatedArticle.slug}`}
                        className="group"
                      >
                        <div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                          <div className="h-48 overflow-hidden">
                            <img 
                              src={relatedArticle.imageUrl} 
                              alt={relatedArticle.title} 
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                            />
                          </div>
                          <div className="p-4">
                            <span className="text-xs font-medium text-blue-600">
                              {relatedCategory?.name || "Category"}
                            </span>
                            <h4 className="mt-2 text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                              {relatedArticle.title}
                            </h4>
                            <div className="mt-2 text-sm text-gray-500">
                              {format(new Date(relatedArticle.publishedAt), "MMMM d, yyyy")}
                            </div>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center p-4 bg-gray-100 rounded-lg">
                  <p>No related articles found</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <Newsletter />
    </main>
  );
};

export default ArticleDetail;
