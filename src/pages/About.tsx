import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, Users, BookOpen, Target, Award, Heart } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Globe,
      title: "Global Perspective",
      description: "We believe knowledge knows no borders. Our mission is to break down language barriers and make world-class educational content accessible to Uzbek readers."
    },
    {
      icon: BookOpen,
      title: "Quality Translation",
      description: "Every article is carefully translated by native Uzbek speakers with expertise in their respective fields, ensuring accuracy and cultural relevance."
    },
    {
      icon: Users,
      title: "Community Focus",
      description: "We're building a community of curious minds who want to understand the world better. Our readers are at the heart of everything we do."
    },
    {
      icon: Target,
      title: "Educational Mission",
      description: "We focus on content that educates, informs, and inspires. Our goal is to contribute to the intellectual development of our community."
    }
  ];

  const team = [
    {
      name: "Aziza Karimova",
      role: "Lead Translator - Economics",
      description: "PhD in Economics from Tashkent State Economic University"
    },
    {
      name: "Farruh Abdullayev",
      role: "Political Science Translator",
      description: "Master's in International Relations from University of World Economy and Diplomacy"
    },
    {
      name: "Malika Tashkentova",
      role: "Geography & Environmental Science",
      description: "Environmental scientist with 10+ years of experience"
    },
    {
      name: "Otabek Samarkandiy",
      role: "History Translator",
      description: "Professor of History at National University of Uzbekistan"
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
                About World in Context
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8">
                We translate the world's best educational content into Uzbek so that global knowledge becomes accessible.
              </p>
              <div className="flex items-center justify-center space-x-8 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">2023</div>
                  <div className="text-sm text-muted-foreground">Founded</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent mb-2">500+</div>
                  <div className="text-sm text-muted-foreground">Articles Translated</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">10K+</div>
                  <div className="text-sm text-muted-foreground">Monthly Readers</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
                Our Mission
              </h2>
              <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-8 md:p-12">
                <p className="text-lg md:text-xl text-muted-foreground text-center leading-relaxed">
                  We believe that language should never be a barrier to learning. World in Context was founded to bridge the gap between global knowledge and Uzbek readers by providing high-quality translations of educational content across business, economics, politics, history, diplomacy, and geography.
                </p>
                <div className="flex justify-center mt-8">
                  <Heart className="h-8 w-8 text-accent" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Our Values
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                The principles that guide our work and shape our community
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {values.map((value, index) => {
                const IconComponent = value.icon;
                return (
                  <Card key={index} className="shadow-elegant">
                    <CardHeader>
                      <IconComponent className="h-12 w-12 text-primary mb-4" />
                      <CardTitle className="text-xl">{value.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{value.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Meet Our Team
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Expert translators and subject matter specialists dedicated to bringing you accurate, culturally relevant content
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
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
        <section className="py-16 bg-gradient-to-br from-primary/5 to-accent/5">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Get in Touch
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Have questions, suggestions, or want to contribute? We'd love to hear from you.
              </p>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  <strong>Email:</strong> contact@worldincontext.uz
                </p>
                <p className="text-muted-foreground">
                  <strong>Telegram:</strong> @WorldInContextUZ
                </p>
                <p className="text-muted-foreground">
                  <strong>Address:</strong> Tashkent, Uzbekistan
                </p>
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