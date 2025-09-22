import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Clock, ArrowRight } from "lucide-react";

const LatestArticles = () => {
  const articles = [
    {
      id: 1,
      title: "Understanding Central Asian Geopolitics",
      titleUzbek: "Markaziy Osiyo geosiyosatini tushunish",
      excerpt: "A comprehensive overview of the strategic importance of Central Asia in global politics...",
      category: "Politics",
      publishDate: "2024-01-12",
      readTime: "6 min",
      translator: "Farruh Abdullayev"
    },
    {
      id: 2,
      title: "Sustainable Development in Developing Nations",
      titleUzbek: "Rivojlanayotgan mamlakatlarda barqaror rivojlanish",
      excerpt: "Exploring sustainable practices and their economic impact on emerging economies...",
      category: "Geography",
      publishDate: "2024-01-10",
      readTime: "5 min",
      translator: "Malika Tashkentova"
    },
    {
      id: 3,
      title: "The Silk Road: Ancient Trade Routes",
      titleUzbek: "Ipak yo'li: Qadimgi savdo yo'llari",
      excerpt: "Historical analysis of the Silk Road's impact on cultural and economic exchange...",
      category: "History",
      publishDate: "2024-01-08",
      readTime: "7 min",
      translator: "Otabek Samarkandiy"
    },
    {
      id: 4,
      title: "Digital Currency and Financial Innovation",
      titleUzbek: "Raqamli valyuta va moliyaviy innovatsiyalar",
      excerpt: "How cryptocurrencies and blockchain technology are revolutionizing finance...",
      category: "Business",
      publishDate: "2024-01-05",
      readTime: "4 min",
      translator: "Nigora Bukharina"
    },
    {
      id: 5,
      title: "Climate Change and International Policy",
      titleUzbek: "Iqlim o'zgarishi va xalqaro siyosat",
      excerpt: "Examining global efforts to address climate change through diplomatic channels...",
      category: "Diplomacy",
      publishDate: "2024-01-03",
      readTime: "6 min",
      translator: "Jasur Ferganaev"
    },
    {
      id: 6,
      title: "Emerging Markets in the Global Economy",
      titleUzbek: "Jahon iqtisodiyotida rivojlanayotgan bozorlar",
      excerpt: "Analysis of how emerging markets are reshaping the global economic landscape...",
      category: "Economics",
      publishDate: "2024-01-01",
      readTime: "5 min",
      translator: "Dilnoza Andijanova"
    }
  ];

  const getCategoryColor = (category: string) => {
    const colors = {
      Politics: "bg-purple-100 text-purple-800",
      Geography: "bg-amber-100 text-amber-800",
      History: "bg-red-100 text-red-800",
      Business: "bg-blue-100 text-blue-800",
      Diplomacy: "bg-indigo-100 text-indigo-800",
      Economics: "bg-green-100 text-green-800"
    };
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Latest Articles
            </h2>
            <p className="text-lg text-muted-foreground">
              Recently published translations from our expert team
            </p>
          </div>
          <Button variant="outline" size="lg">
            View All Articles
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
                    <span>{new Date(article.publishDate).toLocaleDateString()}</span>
                    <Clock className="h-3 w-3 ml-2" />
                    <span>{article.readTime}</span>
                  </div>
                </div>
                <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors duration-300">
                  {article.title}
                </CardTitle>
                <CardDescription className="text-accent font-medium group-hover:text-accent/80 transition-colors">
                  {article.titleUzbek}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 relative z-10">
                <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                  {article.excerpt}
                </p>
                <div className="flex items-center justify-between pt-2 border-t border-border/30">
                  <span className="text-xs text-muted-foreground flex items-center">
                    <div className="w-1 h-1 bg-accent rounded-full mr-2"></div>
                    Translator: {article.translator}
                  </span>
                  <Button variant="ghost" size="sm" className="hover-scale group">
                    <span className="story-link">Read More</span>
                    <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform" />
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