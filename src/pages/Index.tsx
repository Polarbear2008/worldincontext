import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import LatestArticles from "@/components/LatestArticles";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background bg-radial-soft">
      <Header />
      <main className="space-y-16 md:space-y-24">
        <Hero />
        <Categories />
        <LatestArticles />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
