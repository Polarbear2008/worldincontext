import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Clock, ArrowRight } from "lucide-react";
import { articlesService } from "@/lib/database";
import { Article } from "@/lib/supabase";

const LatestArticles = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const data = await articlesService.getArticles({
          status: 'published',
          limit: 6
        });
        setArticles(data);
      } catch (err) {
        console.error('Error fetching latest articles:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const getCategoryColor = (category: string) => {
    const colors = {
      Siyosat: "bg-purple-100 text-purple-800",
      Geografiya: "bg-amber-100 text-amber-800",
      Tarix: "bg-red-100 text-red-800",
      Iqtisod: "bg-green-100 text-green-800",
      Diplomatiya: "bg-indigo-100 text-indigo-800"
    };
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  if (loading) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Eng So'nggi Maqolalar
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </CardHeader>
                <CardContent>
                  <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Eng So'nggi Maqolalar
            </h2>
            <p className="text-lg text-muted-foreground">
              Jamoamiz tomonidan yaqinda nashr etilgan tarjimalar
            </p>
          </div>
          <Button variant="outline" size="lg">
            Barcha Maqolalarni Ko'rish
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, index) => (
            <Card 
              key={article.id} 
              className="shadow-elegant hover:shadow-glow hover-lift group relative overflow-hidden border-0 bg-gradient-to-br from-background to-secondary/10 animate-fade-in"
              style={{animationDelay: `${index * 0.1}s`}}
            >
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/2 to-accent/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <CardHeader className="pb-3 relative z-10">
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
              <CardContent className="space-y-4 relative z-10">
                {article.content && (
                  <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                    {article.content.substring(0, 150)}...
                  </p>
                )}
                <div className="flex items-center justify-between pt-2 border-t border-border/30">
                  <span className="text-xs text-muted-foreground flex items-center">
                    <div className="w-1 h-1 bg-accent rounded-full mr-2"></div>
                    {article.author}
                  </span>
                  <Button variant="ghost" size="sm" className="hover-scale group" asChild>
                    <a href={`/article/${article.category.toLowerCase()}/${article.id}`} className="story-link">
                      Ko'proq O'qish
                      <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestArticles;