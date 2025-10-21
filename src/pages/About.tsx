import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Globe, Users, BookOpen, Target, Award, Heart, Mail, MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { contactMessagesService } from "@/lib/database";

const About = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await contactMessagesService.createMessage({
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message
      });

      toast.success("Xabaringiz uchun rahmat! Tez orada siz bilan bog'lanamiz.");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error: any) {
      console.error('Error submitting contact form:', error);
      toast.error("Xatolik yuz berdi. Iltimos, qayta urinib ko'ring.");
    } finally {
      setIsSubmitting(false);
    }
  };


  const team = [
    {
      name: "Mirzayev Ibrohim",
      role: "Co-Founder",
      description: "World in Context platformasining asoschilaridan biri"
    },
    {
      name: "Jalilova Nozima",
      role: "Co-Founder",
      description: "World in Context platformasining asoschilaridan biri"
    },
    {
      name: "Tursonov Abdumalik",
      role: "Article Branch Manager",
      description: "Maqolalar bo'limi rahbari"
    },
    {
      name: "Nabiyev Mehriddin",
      role: "Video Branch Manager",
      description: "Video bo'limi rahbari"
    },
    {
      name: "Numonov Samandar",
      role: "Designer / Tech Support",
      description: "Dizayner va texnik qo'llab-quvvatlash"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-primary/5 to-accent/5">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
                World in Context Haqida
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8">
                Biz dunyoning eng yaxshi ta'lim mazmunini o'zbek tiliga tarjima qilamiz, shunda global bilim ochiq bo'ladi.
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
                Bizning Missiyamiz
              </h2>
              <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-8 md:p-12">
                <p className="text-lg md:text-xl text-muted-foreground text-center leading-relaxed">
                  Til hech qachon o'rganish uchun to'siq bo'lmasligiga ishonamiz. World in Context iqtisod, siyosat, tarix, diplomatiya va geografiya bo'yicha ta'lim maqolalarini yuqori sifatli tarjimalarini taqdim etish orqali global bilim va o'zbek o'quvchilari o'rtasidagi bo'shliqni to'ldirish uchun tashkil etildi.                </p>
                <div className="flex justify-center mt-8">
                  <Heart className="h-8 w-8 text-accent" />
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* Team Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Jamoamiz Bilan Tanishing
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Sizga aniq va madaniy jihatdan mos mazmunni olib kelish uchun bag'ishlangan ekspert tarjimonlar va mavzu mutaxassislari
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {team.map((member, index) => (
                <Card key={index} className="shadow-elegant text-center">
                  <CardHeader>
                    <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Award className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{member.name}</CardTitle>
                    <CardDescription className="text-accent font-medium">
                      {member.role}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{member.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-accent/5">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
                  Biz bilan bog'laning
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Savollaringiz, takliflaringiz yoki hamkorlik takliflar bilan bizga murojaat qiling.
                  Jamoamiz sizning xabarlaringizga tezda javob beradi.
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-12">
                {/* Contact Form */}
                <Card className="shadow-glow hover-lift group relative overflow-hidden border-0 bg-gradient-to-br from-background to-primary/5">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <CardHeader className="relative z-10 pb-6">
                    <CardTitle className="text-2xl flex items-center gap-3">
                      <Send className="h-6 w-6 text-primary" />
                      Xabar yuborish
                    </CardTitle>
                    <CardDescription className="text-base">
                      Quyidagi formani to'ldiring va biz tez orada siz bilan bog'lanamiz
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Ismingiz *</Label>
                          <Input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="To'liq ismingizni kiriting"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="glass-effect hover:border-primary/50 focus:border-primary transition-colors"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email manzilingiz *</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="email@example.com"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="glass-effect hover:border-primary/50 focus:border-primary transition-colors"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="subject">Mavzu *</Label>
                        <Input
                          id="subject"
                          name="subject"
                          type="text"
                          placeholder="Xabaringiz mavzusini kiriting"
                          value={formData.subject}
                          onChange={handleInputChange}
                          required
                          className="glass-effect hover:border-primary/50 focus:border-primary transition-colors"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Xabaringiz *</Label>
                        <Textarea
                          id="message"
                          name="message"
                          placeholder="Xabaringizni batafsil yozing..."
                          value={formData.message}
                          onChange={handleInputChange}
                          required
                          rows={5}
                          className="glass-effect hover:border-primary/50 focus:border-primary transition-colors resize-none"
                        />
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full shadow-accent hover-lift group relative overflow-hidden bg-gradient-to-r from-primary to-accent text-primary-foreground"
                        disabled={isSubmitting}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        {isSubmitting ? (
                          <span className="relative z-10">Yuborilmoqda...</span>
                        ) : (
                          <>
                            <span className="relative z-10">Xabar Yuborish</span>
                            <Send className="ml-2 h-4 w-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>

                {/* Contact Information */}
                <div className="space-y-8">
                  <Card className="shadow-elegant hover-lift group relative overflow-hidden border-0 bg-gradient-to-br from-background to-accent/5">
                    <CardHeader>
                      <CardTitle className="text-2xl flex items-center gap-3">
                        <Mail className="h-6 w-6 text-accent" />
                        Aloqa ma'lumotlari
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="flex items-start gap-4 p-4 rounded-lg bg-gradient-to-r from-primary/10 to-accent/10 border border-border/50 hover-scale">
                        <Mail className="h-6 w-6 text-primary mt-1" />
                        <div>
                          <h4 className="font-semibold text-foreground mb-1">Email</h4>
                          <p className="text-muted-foreground">worldincontextuz@gmail.com</p>
                          <p className="text-sm text-muted-foreground mt-1">24/7 qo'llab-quvvatlash</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4 p-4 rounded-lg bg-gradient-to-r from-primary/10 to-accent/10 border border-border/50 hover-scale">
                        <MapPin className="h-6 w-6 text-primary mt-1" />
                        <div>
                          <h4 className="font-semibold text-foreground mb-1">Manzil</h4>
                          <p className="text-muted-foreground">Toshkent, O'zbekiston</p>
                          <p className="text-sm text-muted-foreground mt-1">Markaziy ofis</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4 p-4 rounded-lg bg-gradient-to-r from-primary/10 to-accent/10 border border-border/50 hover-scale">
                        <Phone className="h-6 w-6 text-primary mt-1" />
                        <div>
                          <h4 className="font-semibold text-foreground mb-1">Telefon</h4>
                          <p className="text-muted-foreground">+998 97 210 47 78</p>
                          <p className="text-sm text-muted-foreground mt-1">Dushanba-Juma, 9:00-18:00</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="shadow-elegant hover-lift group relative overflow-hidden border-0 bg-gradient-to-br from-background to-secondary/5">
                    <CardHeader>
                      <CardTitle className="text-xl">Tezkor javob kafolati</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">
                        Barcha xabarlar 24 soat ichida ko'rib chiqiladi va 48 soat ichida javob beriladi.
                      </p>
                      <div className="flex items-center gap-2 text-sm text-primary">
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                        Hozir onlayn
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;