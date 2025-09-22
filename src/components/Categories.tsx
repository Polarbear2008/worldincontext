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

const Categories = () => {
  const categories = [
    {
      title: "Business",
      description: "Corporate strategy, entrepreneurship, and market analysis from global perspectives.",
      icon: Briefcase,
      count: "125",
      href: "/category/business",
      color: "text-blue-600"
    },
    {
      title: "Politics",
      description: "International relations, governance, and political developments worldwide.",
      icon: Landmark,
      count: "98",
      href: "/category/politics",
      color: "text-purple-600"
    },
    {
      title: "Economics",
      description: "Economic theories, market trends, and financial insights explained simply.",
      icon: TrendingUp,
      count: "87",
      href: "/category/economics",
      color: "text-green-600"
    },
    {
      title: "Geography",
      description: "Physical geography, cultural landscapes, and environmental studies.",
      icon: MapPin,
      count: "76",
      href: "/category/geography",
      color: "text-amber-600"
    },
    {
      title: "History",
      description: "Historical events, civilizations, and lessons from the past.",
      icon: Clock,
      count: "93",
      href: "/category/history",
      color: "text-red-600"
    },
    {
      title: "Diplomacy",
      description: "International negotiations, treaties, and diplomatic relations.",
      icon: Users,
      count: "54",
      href: "/category/diplomacy",
      color: "text-indigo-600"
    }
  ];

  return (
    <section className="py-16 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Explore Knowledge Categories
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover translated content across six major fields of study, carefully curated for Uzbek readers.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                      {category.count} articles
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
                      Explore {category.title}
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