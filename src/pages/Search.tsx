import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search as SearchIcon, Loader2, FileText, Calendar } from "lucide-react";
import { articlesService } from "@/lib/database";
import { Article } from "@/lib/supabase";

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    const query = searchParams.get("q");
    if (query) {
      setSearchQuery(query);
      performSearch(query);
    }
  }, [searchParams]);

  const performSearch = async (query: string) => {
    if (!query.trim()) return;

    setLoading(true);
    setHasSearched(true);

    try {
      // Get all articles and filter by search query
      const allArticles = await articlesService.getArticles({ limit: 100 });
      
      const searchLower = query.toLowerCase();
      const filtered = allArticles.filter((article) => {
        return (
          article.title.toLowerCase().includes(searchLower) ||
          article.content.toLowerCase().includes(searchLower) ||
          article.excerpt?.toLowerCase().includes(searchLower) ||
          article.category.toLowerCase().includes(searchLower) ||
          article.author.toLowerCase().includes(searchLower)
        );
      });

      setArticles(filtered);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchParams({ q: searchQuery.trim() });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Search Hero Section */}
      <section className="py-12 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Maqolalarni Qidirish
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Barcha maqolalar va fayllar orasidan qidiring
            </p>

            {/* Search Form */}
            <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
              <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Maqola nomi, matn, muallif yoki kategoriya..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-24 h-14 text-lg"
              />
              <Button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Qidirilmoqda
                  </>
                ) : (
                  "Qidirish"
                )}
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Search Results */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {loading ? (
              <div className="text-center py-12">
                <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-primary" />
                <p className="text-muted-foreground">Qidirilmoqda...</p>
              </div>
            ) : hasSearched ? (
              <>
                {/* Results Header */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-foreground mb-2">
                    Qidiruv natijalari
                  </h2>
                  <p className="text-muted-foreground">
                    "{searchParams.get("q")}" uchun {articles.length} ta natija topildi
                  </p>
                </div>

                {/* Results List */}
                {articles.length > 0 ? (
                  <div className="space-y-6">
                    {articles.map((article) => (
                      <Card
                        key={article.id}
                        className="hover:shadow-lg transition-shadow cursor-pointer"
                        onClick={() => window.location.href = `/article/${article.category.toLowerCase()}/${article.id}`}
                      >
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <div className="flex-shrink-0">
                              <div className="p-3 bg-primary/10 rounded-lg">
                                <FileText className="h-6 w-6 text-primary" />
                              </div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-2">
                                <Badge variant="secondary">{article.category}</Badge>
                                {article.article_type === 'file' && (
                                  <Badge variant="outline">PDF Fayl</Badge>
                                )}
                              </div>
                              <h3 className="text-xl font-semibold text-foreground mb-2 hover:text-primary transition-colors">
                                {article.title}
                              </h3>
                              {article.excerpt && (
                                <p className="text-muted-foreground mb-3 line-clamp-2">
                                  {article.excerpt}
                                </p>
                              )}
                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <span>{article.author}</span>
                                <span>•</span>
                                <div className="flex items-center gap-1">
                                  <Calendar className="h-4 w-4" />
                                  {new Date(article.created_at).toLocaleDateString('uz-UZ')}
                                </div>
                                <span>•</span>
                                <span>{article.view_count || 0} ko'rish</span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                      <SearchIcon className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      Hech narsa topilmadi
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      "{searchParams.get("q")}" uchun natija topilmadi. Boshqa so'z bilan qidiring.
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSearchQuery("");
                        setHasSearched(false);
                      }}
                    >
                      Qidiruvni tozalash
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <SearchIcon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Qidiruvni boshlang
                </h3>
                <p className="text-muted-foreground">
                  Yuqoridagi qidiruv maydoniga so'z kiriting
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Search;
