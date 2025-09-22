import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, User, Clock, ArrowRight } from "lucide-react";

const FeaturedArticle = () => {
  const featuredArticle = {
    title: "The Future of Global Trade: Digital Transformation and Economic Integration",
    titleUzbek: "Global savdoning kelajagi: Raqamli transformatsiya va iqtisodiy integratsiya",
    excerpt: "An in-depth analysis of how digital technologies are reshaping international commerce and creating new opportunities for emerging economies.",
    excerptUzbek: "Raqamli texnologiyalar qanday qilib xalqaro savdoni o'zgartirayotgani va rivojlanayotgan iqtisodiyotlar uchun yangi imkoniyatlar yaratayotgani haqida chuqur tahlil.",
    category: "Economics",
    author: "Dr. Sarah Johnson",
    translator: "Aziza Karimova",
    publishDate: "2024-01-15",
    readTime: "8 min read",
    tags: ["Trade", "Technology", "Economics", "Globalization"]
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Featured Article
          </h2>
          <p className="text-lg text-muted-foreground">
            Our editors' pick for this week's must-read content
          </p>
        </div>

        <div className="max-w-4xl mx-auto animate-fade-in-up">
          <Card className="shadow-glow hover-lift group relative overflow-hidden border-0 bg-gradient-to-br from-background via-background to-secondary/20">
            {/* Animated background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/3 to-accent/3 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <CardHeader className="pb-4 relative z-10">
              <div className="flex items-center justify-between mb-4">
                <Badge variant="secondary" className="bg-gradient-to-r from-accent to-accent/80 text-accent-foreground shadow-accent/20 shadow-lg">
                  {featuredArticle.category}
                </Badge>
                <div className="flex items-center text-sm text-muted-foreground space-x-4">
                  <div className="flex items-center">
                    <CalendarDays className="h-4 w-4 mr-1" />
                    {new Date(featuredArticle.publishDate).toLocaleDateString()}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {featuredArticle.readTime}
                  </div>
                </div>
              </div>
              
              <CardTitle className="text-2xl md:text-3xl mb-2 group-hover:text-gradient transition-all duration-300">
                {featuredArticle.title}
              </CardTitle>
              <CardDescription className="text-lg font-medium text-accent mb-3 group-hover:text-accent/80 transition-colors">
                {featuredArticle.titleUzbek}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6 relative z-10">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-4 rounded-lg bg-gradient-to-br from-background to-secondary/30 border border-border/50 hover-scale">
                  <h4 className="font-semibold text-foreground mb-2 flex items-center">
                    <div className="w-1 h-4 bg-primary rounded-full mr-2"></div>
                    English Summary
                  </h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {featuredArticle.excerpt}
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-gradient-to-br from-background to-accent/5 border border-border/50 hover-scale">
                  <h4 className="font-semibold text-foreground mb-2 flex items-center">
                    <div className="w-1 h-4 bg-accent rounded-full mr-2"></div>
                    O'zbek tilidagi xulosa
                  </h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {featuredArticle.excerptUzbek}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {featuredArticle.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="space-y-1">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <User className="h-4 w-4 mr-1" />
                    <span>Author: {featuredArticle.author}</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <User className="h-4 w-4 mr-1" />
                    <span>Translator: {featuredArticle.translator}</span>
                  </div>
                </div>
                
                <Button size="lg" className="shadow-accent hover-lift group relative overflow-hidden bg-gradient-to-r from-primary to-accent text-primary-foreground">
                  <span className="relative z-10">Read Full Article</span>
                  <ArrowRight className="ml-2 h-4 w-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                  <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default FeaturedArticle;