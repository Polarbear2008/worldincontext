import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarDays, Clock, ArrowRight, BookOpen, MapPin } from "lucide-react";
import { articlesService } from "@/lib/database";
import { Article } from "@/lib/supabase";

const Geografiya = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const data = await articlesService.getArticles({ category: 'Geografiya', status: 'published' });
        setArticles(data);
      } catch (error) {
        console.error('Error fetching articles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const getCategoryColor = (category: string) => {
    return "bg-amber-100 text-amber-800";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-muted-foreground">Maqolalar yuklanmoqda...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-amber-50 to-amber-100">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <MapPin className="h-4 w-4" />
                Geografiya kategoriyasi
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
                Geografiya <span className="text-gradient">Maqolalari</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Jismoniy geografiya, madaniy landshaftlar va atrof muhit tadqiqotlari haqida
              </p>
            </div>
          </div>
        </section>

        {/* Articles Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              {articles.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-muted-foreground mb-4">
                    <MapPin className="h-16 w-16 mx-auto opacity-50" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Maqolalar topilmadi</h3>
                  <p className="text-muted-foreground">Hozircha bu kategoriyada maqola yo'q.</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {articles.map((article, index) => (
                    <Card
                      key={article.id}
                      className="shadow-elegant hover:shadow-glow hover-lift group relative overflow-hidden border-0 bg-gradient-to-br from-background to-amber-50 animate-fade-in"
                      style={{animationDelay: `${index * 0.1}s`}}
                    >
                      <CardHeader className="pb-4">
                        <div className="flex items-center justify-between mb-3">
                          <Badge className={`${getCategoryColor(article.category)} shadow-sm`}>
                            {article.category}
                          </Badge>
                          <div className="flex items-center text-xs text-muted-foreground space-x-2">
                            <CalendarDays className="h-3 w-3" />
                            <span>{new Date(article.created_at).toLocaleDateString('uz-UZ')}</span>
                          </div>
                        </div>
                        <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors duration-300">
                          {article.title}
                        </CardTitle>
                        <CardDescription className="text-sm text-muted-foreground">
                          {article.excerpt?.substring(0, 100)}...
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                          {article.excerpt}
                        </p>
                        <div className="flex items-center justify-between pt-2 border-t border-border/30">
                          <span className="text-xs text-muted-foreground flex items-center">
                            <BookOpen className="h-3 w-3 mr-1" />
                            Tarjimon: {article.translator || 'Unknown'}
                          </span>
                          <Button variant="ghost" size="sm" className="hover-scale group" asChild>
                            <a href={`/article/geografiya/${article.id}`} className="story-link">
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

export default Geografiya;
