import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Briefcase, 
  Landmark, 
  TrendingUp, 
  MapPin, 
  Clock, 
  Users 
} from "lucide-react";
import { articlesService } from "@/lib/database";

const Categories = () => {
  const [categoryCounts, setCategoryCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    const fetchCategoryCounts = async () => {
      try {
        const articles = await articlesService.getArticles({ limit: 1000 });
        const counts: Record<string, number> = {};
        
        articles.forEach(article => {
          if (article.status === 'published') {
            counts[article.category] = (counts[article.category] || 0) + 1;
          }
        });
        
        setCategoryCounts(counts);
      } catch (error) {
        console.error('Error fetching category counts:', error);
      }
    };

    fetchCategoryCounts();
  }, []);

  const categories = [
    {
      title: "Siyosat",
      description: "Xalqaro aloqalar, boshqaruv va butun dunyo bo'ylab siyosiy rivojlanishlar.",
      icon: Landmark,
      category: "Siyosat",
      href: "/siyosat",
      color: "text-purple-600"
    },
    {
      title: "Iqtisod",
      description: "Iqtisodiy nazariyalar, bozor tendentsiyalari va soddalashtirilgan moliyaviy tushunchalar.",
      icon: TrendingUp,
      category: "Iqtisod",
      href: "/iqtisod",
      color: "text-green-600"
    },
    {
      title: "Geografiya",
      description: "Geografiya, madaniy landshaftlar va atrof muhit tadqiqotlari.",
      icon: MapPin,
      category: "Geografiya",
      href: "/geografiya",
      color: "text-amber-600"
    },
    {
      title: "Tarix",
      description: "Tarixiy voqealar, sivilizatsiyalar va o'tmishdan olingan saboqlar.",
      icon: Clock,
      category: "Tarix",
      href: "/tarix",
      color: "text-red-600"
    },
    {
      title: "Diplomatiya",
      description: "Xalqaro muzokaralar, shartnomalar va diplomatik aloqalar.",
      icon: Users,
      category: "Diplomatiya",
      href: "/diplomatiya",
      color: "text-indigo-600"
    }
  ];

  return (
    <section id="categories-section" className="py-12 md:py-16 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 md:mb-4 px-4">
            Kategoriyani Tanlang
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            O'zbek o'quvchilari uchun ehtiyotkorlik bilan tanlangan olti asosiy o'quv sohasida tarjima qilingan mazmunni kashf eting.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {categories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <Card 
                key={category.title} 
                className="shadow-elegant hover:shadow-glow hover-lift group relative overflow-hidden border-0 bg-gradient-to-br from-background to-secondary/20 animate-fade-in"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <CardHeader className="relative z-10">
                  <div className="flex items-center justify-between">
                    <div className="p-3 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className={`h-8 w-8 ${category.color} group-hover:scale-110 transition-transform duration-300`} />
                    </div>
                    <span className="text-sm font-medium text-muted-foreground bg-secondary/80 backdrop-blur-sm px-3 py-1 rounded-full border border-border/50">
                      {categoryCounts[category.category] || 0} maqola
                    </span>
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">{category.title}</CardTitle>
                  <CardDescription className="text-base">
                    {category.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="relative z-10">
                  <Button variant="outline" className="w-full hover-scale glass-effect group-hover:border-primary/50 transition-all duration-300" asChild>
                    <a href={category.href} className="story-link">
                      {category.title}ni O'rganish
                    </a>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Categories;