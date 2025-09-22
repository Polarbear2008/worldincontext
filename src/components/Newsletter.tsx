import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Send, MessageCircle } from "lucide-react";
import { toast } from "sonner";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success("Thank you for subscribing! You'll receive our weekly digest soon.");
    setEmail("");
    setIsSubmitting(false);
  };

  return (
    <section className="py-16 bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Stay Connected
            </h2>
            <p className="text-lg text-muted-foreground">
              Get the latest translated articles delivered to your inbox or join our Telegram channel
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Email Newsletter */}
            <Card className="shadow-glow hover-lift group relative overflow-hidden border-0 bg-gradient-to-br from-background to-primary/5 animate-fade-in">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <CardHeader className="text-center relative z-10">
                <div className="relative">
                  <Mail className="h-12 w-12 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <div className="absolute inset-0 h-12 w-12 text-primary/20 mx-auto animate-ping group-hover:opacity-0 transition-opacity"></div>
                </div>
                <CardTitle className="text-xl group-hover:text-gradient transition-all duration-300">Email Newsletter</CardTitle>
                <CardDescription>
                  Weekly digest of our best translated content, delivered every Sunday
                </CardDescription>
              </CardHeader>
              <CardContent className="relative z-10">
                <form onSubmit={handleEmailSubmit} className="space-y-4">
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="text-center glass-effect hover:border-primary/50 transition-colors"
                  />
                  <Button 
                    type="submit" 
                    className="w-full shadow-accent hover-lift group relative overflow-hidden bg-gradient-to-r from-primary to-accent text-primary-foreground"
                    disabled={isSubmitting}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    {isSubmitting ? (
                      <span className="relative z-10">Subscribing...</span>
                    ) : (
                      <>
                        <span className="relative z-10">Subscribe Now</span>
                        <Send className="ml-2 h-4 w-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </Button>
                </form>
                <p className="text-xs text-muted-foreground text-center mt-4">
                  No spam, unsubscribe anytime. Privacy policy applies.
                </p>
              </CardContent>
            </Card>

            {/* Telegram Channel */}
            <Card className="shadow-glow hover-lift group relative overflow-hidden border-0 bg-gradient-to-br from-background to-accent/5 animate-fade-in" style={{animationDelay: '0.2s'}}>
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <CardHeader className="text-center relative z-10">
                <div className="relative">
                  <MessageCircle className="h-12 w-12 text-accent mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <div className="absolute inset-0 h-12 w-12 text-accent/20 mx-auto animate-ping group-hover:opacity-0 transition-opacity"></div>
                </div>
                <CardTitle className="text-xl group-hover:text-gradient transition-all duration-300">Telegram Channel</CardTitle>
                <CardDescription>
                  Join our Telegram community for instant updates and discussions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 relative z-10">
                <div className="text-center space-y-2">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Get notifications for new articles, engage with other readers, and ask questions directly to our translators.
                  </p>
                  <div className="bg-gradient-to-r from-secondary to-accent/10 p-3 rounded-lg border border-border/50 hover-scale">
                    <p className="text-sm font-mono text-accent font-semibold">@WorldInContextUZ</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full hover-scale glass-effect hover:border-accent/50 group" asChild>
                  <a 
                    href="https://t.me/WorldInContextUZ" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="story-link"
                  >
                    Join Telegram Channel
                    <MessageCircle className="ml-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                  </a>
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  Free to join, no phone number required for reading.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pt-8 border-t border-border">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-1">2.5K+</div>
              <div className="text-sm text-muted-foreground">Email Subscribers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent mb-1">5.2K+</div>
              <div className="text-sm text-muted-foreground">Telegram Members</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-1">Weekly</div>
              <div className="text-sm text-muted-foreground">New Content</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent mb-1">100%</div>
              <div className="text-sm text-muted-foreground">Free Access</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;