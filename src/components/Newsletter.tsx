import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Send, MessageCircle, Users, TrendingUp, Zap, Star } from "lucide-react";
import { toast } from "sonner";
import { newsletterService } from "@/lib/database";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await newsletterService.subscribe(email);
      toast.success("Obuna uchun rahmat! Tez orada haftalik xulosani olasiz.");
      setEmail("");
    } catch (error: any) {
      if (error.message?.includes('duplicate')) {
        toast.error("Bu email allaqachon obuna bo'lgan!");
      } else {
        toast.error("Xatolik yuz berdi. Iltimos, qayta urinib ko'ring.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="newsletter-section" className="py-12 md:py-16 lg:py-20 bg-gradient-to-br from-primary/5 via-background to-accent/5 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-8 md:mb-12 lg:mb-16">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Zap className="h-4 w-4" />
              Eng so'nggi yangilanishlar
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 md:mb-6 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent px-4">
              Aloqada Bo'ling
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4">
              Dunyoning eng qiziqarli va foydali ma'lumotlarni oling.
              Har hafta eng yaxshi tarjima qilingan maqolalar sizning elektron pochtangizga yetkaziladi.
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Email Newsletter - Takes up 2 columns */}
            <div className="lg:col-span-2">
              <Card className="shadow-2xl hover-lift group relative overflow-hidden border-0 bg-gradient-to-br from-background via-background to-primary/5 h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Animated background elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-2xl opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-accent/20 to-transparent rounded-full blur-2xl opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>

                <CardHeader className="relative z-10 pb-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full group-hover:scale-110 transition-transform duration-300">
                      <Mail className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl group-hover:text-gradient transition-all duration-300">
                        Email Xabarnoma
                      </CardTitle>
                      <CardDescription className="text-base">
                        Yangi maqolalardan xabardor bo'ling.
                      </CardDescription>
                    </div>
                  </div>

                  {/* Benefits */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-3 p-3 bg-secondary/30 rounded-lg">
                      <Star className="h-5 w-5 text-primary" />
                      <span className="text-sm font-medium">Eng yaxshi maqolalar tanlovi</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-secondary/30 rounded-lg">
                      <TrendingUp className="h-5 w-5 text-accent" />
                      <span className="text-sm font-medium">Haftalik yangilanishlar</span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="relative z-10">
                  <form onSubmit={handleEmailSubmit} className="space-y-6">
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input
                        type="email"
                        placeholder="Email manzilingizni kiriting..."
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="pl-12 h-14 text-base glass-effect hover:border-primary/50 focus:border-primary transition-colors rounded-xl"
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full h-14 text-base shadow-accent hover-lift group relative overflow-hidden bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-xl"
                      disabled={isSubmitting}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      {isSubmitting ? (
                        <span className="relative z-10 flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Obuna Bo'lmoqda...
                        </span>
                      ) : (
                        <>
                          <span className="relative z-10">Hozir Obuna Bo'ling</span>
                          <Send className="ml-2 h-5 w-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </Button>
                  </form>

                  <p className="text-sm text-muted-foreground text-center mt-4">
                    Bizga obuna bo'ling.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Telegram Channel - Takes up 1 column */}
            <Card className="shadow-xl hover-lift group relative overflow-hidden border-0 bg-gradient-to-br from-background to-accent/5 h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <CardHeader className="text-center relative z-10">
                <div className="mx-auto mb-4 p-4 bg-gradient-to-br from-accent/20 to-primary/20 rounded-full w-fit group-hover:scale-110 transition-transform duration-300">
                  <MessageCircle className="h-10 w-10 text-accent" />
                </div>
                <CardTitle className="text-2xl group-hover:text-gradient transition-all duration-300">
                  Telegram Kanal
                </CardTitle>
                <CardDescription className="text-base">
                  Tezkor yangilanishlar va jamoa
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6 relative z-10">
                <div className="text-center space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    Yangi maqolalar, muhokamalar va to'g'ridan-to'g'ri tarjimonlar bilan aloqa
                  </p>

                  <div className="bg-gradient-to-r from-secondary to-accent/10 p-4 rounded-xl border border-border/50 hover-scale cursor-pointer">
                    <div className="flex items-center justify-center gap-2">
                      <MessageCircle className="h-5 w-5 text-accent" />
                      <p className="font-mono text-accent font-semibold">@WorldInContext</p>
                    </div>
                  </div>
                </div>

                <Button variant="outline" size="lg" className="w-full hover-scale glass-effect hover:border-accent/50 group rounded-xl" asChild>
                  <a
                    href="https://t.me/WorldInContext"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="story-link"
                  >
                    Telegram Kanaliga Qo'shiling
                    <MessageCircle className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                  </a>
                </Button>

                <div className="text-center space-y-2">
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>100+ a'zo</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Qo'shilish bepul • Telefon raqami talab qilinmaydi
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;