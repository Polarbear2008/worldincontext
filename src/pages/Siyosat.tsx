import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarDays, Clock, ArrowRight, BookOpen, Globe, Loader2 } from "lucide-react";
import { articlesService } from "@/lib/database";
import { Article } from "@/lib/supabase";

const Siyosat = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const data = await articlesService.getArticles({
          category: 'Siyosat',
          status: 'published',
          limit: 9
        });
        setArticles(data);
      } catch (err) {
        console.error('Error fetching articles:', err);
        setError('Maqolalarni yuklashda xatolik yuz berdi');
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const getCategoryColor = (category: string) => {
    return "bg-purple-100 text-purple-800";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Maqolalar yuklanmoqda...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>
            Qayta yuklash
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-purple-50 to-purple-100">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Globe className="h-4 w-4" />
                Siyosat kategoriyasi
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
                Siyosat <span className="text-gradient">Maqolalari</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Xalqaro aloqalar, boshqaruv va butun dunyo bo'ylab siyosiy rivojlanishlar haqida
              </p>
            </div>
          </div>
        </section>

        {/* Articles Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              {articles.length === 0 ? (
                <div className="text-center py-16">
                  <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-2xl font-semibold text-muted-foreground mb-2">
                    Hozircha maqolalar yo'q
                  </h3>
                  <p className="text-muted-foreground">
                    Siyosat kategoriyasida maqolalar tez orada qo'shiladi
                  </p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {articles.map((article) => (
                    <Card
                      key={article.id}
                      className="shadow-elegant hover:shadow-glow hover-lift group relative overflow-hidden border-0 bg-gradient-to-br from-background to-purple-50 animate-fade-in"
                    >
                      <CardHeader className="pb-4">
                        <div className="flex items-center justify-between mb-3">
                          <Badge className={`${getCategoryColor(article.category)} shadow-sm`}>
                            {article.category}
                          </Badge>
                          <div className="flex items-center text-xs text-muted-foreground space-x-2">
                            <CalendarDays className="h-3 w-3" />
                            <span>{new Date(article.created_at).toLocaleDateString()}</span>
                            <Clock className="h-3 w-3 ml-2" />
                            <span>{article.view_count || 0} ko'rish</span>
                          </div>
                        </div>
                        <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors duration-300">
                          {article.title}
                        </CardTitle>
                        {article.excerpt && (
                          <CardDescription className="text-sm text-muted-foreground">
                            {article.excerpt}
                          </CardDescription>
                        )}
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {article.content && (
                          <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                            {article.content.substring(0, 150)}...
                          </p>
                        )}
                        <div className="flex items-center justify-between pt-2 border-t border-border/30">
                          <span className="text-xs text-muted-foreground flex items-center">
                            <BookOpen className="h-3 w-3 mr-1" />
                            {article.author}
                          </span>
                          <Button variant="ghost" size="sm" className="hover-scale group" asChild>
                            <a href={`/article/siyosat/${article.id}`} className="story-link">
                              O'qish
                              <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform" />
                            </a>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Siyosat;
