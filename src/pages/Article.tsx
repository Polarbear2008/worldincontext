import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  CalendarDays,
  Clock,
  Download,
  Share2,
  BookOpen,
  ArrowLeft,
  Printer,
  Loader2,
  FileText,
  Maximize
} from "lucide-react";
import { toast } from "sonner";
import { articlesService, filesService } from "@/lib/database";
import { Article as ArticleType, FileRecord } from "@/lib/supabase";

const Article = () => {
  const { category, id } = useParams();
  const [article, setArticle] = useState<ArticleType | null>(null);
  const [fileData, setFileData] = useState<FileRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pdfContainerRef, setPdfContainerRef] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const data = await articlesService.getArticle(parseInt(id));

        if (data) {
          setArticle(data);
          
          // If article is a file type, fetch the file data
          if (data.article_type === 'file' && data.file_id) {
            const file = await filesService.getFile(data.file_id);
            setFileData(file);
          }
          
          // Increment view count
          await articlesService.incrementViewCount(parseInt(id));
        } else {
          setError('Maqola topilmadi');
        }
      } catch (err) {
        console.error('Error fetching article:', err);
        setError('Maqolani yuklashda xatolik yuz berdi');
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  const handlePDFDownload = () => {
    if (!article) return;

    toast.success("PDF yuklanmoqda...");

    // Create a simple text file as PDF replacement
    setTimeout(() => {
      const element = document.createElement('a');
      const file = new Blob([article.content], { type: 'text/plain' });
      element.href = URL.createObjectURL(file);
      element.download = `${article.title.replace(/\s+/g, '_')}.txt`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      toast.success("PDF muvaffaqiyatli yuklandi!");
    }, 1500);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article?.title || 'Maqola',
          text: article?.excerpt || '',
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast.success("Havola nusxalandi!");
    }
  };

  const toggleFullscreen = async () => {
    if (!pdfContainerRef) return;

    try {
      if (!document.fullscreenElement) {
        // Enter fullscreen
        await pdfContainerRef.requestFullscreen();
        toast.success("To'liq ekran rejimi");
      } else {
        // Exit fullscreen
        await document.exitFullscreen();
        toast.success("Oddiy rejim");
      }
    } catch (error) {
      console.error('Fullscreen error:', error);
      toast.error("To'liq ekran rejimiga o'tishda xatolik");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Maqola yuklanmoqda...</p>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error || 'Maqola topilmadi'}</p>
          <Button onClick={() => window.history.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Orqaga
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Article Hero Section */}
      <section className="py-12 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Button
              variant="outline"
              className="mb-6 hover:bg-primary hover:text-primary-foreground"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Orqaga
            </Button>

            <div className="text-center mb-8">
              <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground">
                {article.category}
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                {article.title}
              </h1>
              {article.excerpt && (
                <p className="text-xl text-muted-foreground mb-6 max-w-2xl mx-auto">
                  {article.excerpt}
                </p>
              )}

              <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  <span>{article.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4" />
                  <span>{new Date(article.created_at).toLocaleDateString('uz-UZ')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{article.view_count || 0} ko'rish</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="shadow-lg">
              <CardContent className="prose prose-lg max-w-none p-8 md:p-12">
                {/* Article Header */}
                <div className="border-b border-border pb-8 mb-8">
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground mb-4">
                      {article.category} • {new Date(article.created_at).toLocaleDateString('uz-UZ')}
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                      {article.title}
                    </h1>
                    <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
                      <span>{article.author}</span>
                      <span>{article.view_count || 0} ko'rish</span>
                    </div>
                  </div>
                </div>

                {/* Article Body */}
                {article.article_type === 'file' && fileData ? (
                  <div className="space-y-6">
                    {/* File Info Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg border border-primary/20">
                      <div className="flex items-center gap-3">
                        <div className="p-3 bg-primary/20 rounded-lg">
                          <FileText className="h-6 w-6 text-primary" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-semibold text-foreground truncate">{fileData.original_name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {fileData.mime_type} • {(fileData.size_bytes / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2 flex-shrink-0">
                        <Button 
                          variant="outline"
                          size="sm"
                          onClick={toggleFullscreen}
                          className="hover:bg-primary hover:text-primary-foreground flex-1 sm:flex-none"
                        >
                          <Maximize className="h-4 w-4 sm:mr-2" />
                          <span className="hidden sm:inline">To'liq ekran</span>
                        </Button>
                        <Button 
                          size="sm"
                          onClick={() => window.open(fileData.public_url, '_blank')}
                          className="bg-primary hover:bg-primary/90 flex-1 sm:flex-none"
                        >
                          <Download className="h-4 w-4 sm:mr-2" />
                          <span className="hidden sm:inline">Yuklash</span>
                        </Button>
                      </div>
                    </div>
                    
                    {/* PDF Viewer */}
                    {fileData.public_url ? (
                      <div 
                        ref={setPdfContainerRef}
                        className="relative rounded-xl overflow-hidden border-2 border-border shadow-2xl bg-black"
                      >
                        <iframe
                          src={fileData.public_url}
                          className="w-full h-[800px] bg-white"
                          title={fileData.original_name}
                          style={{ border: 'none' }}
                          allowFullScreen
                        />
                      </div>
                    ) : (
                      <div className="text-center py-12 bg-muted/30 rounded-lg border-2 border-dashed border-border">
                        <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-primary" />
                        <p className="text-lg font-medium text-foreground mb-2">Fayl yuklanmoqda...</p>
                        <p className="text-sm text-muted-foreground">Iltimos, kuting</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-lg leading-relaxed text-foreground">
                    {article.content.split('\n\n').map((paragraph, index) => (
                      <p key={index} className="mb-6 last:mb-0">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                )}

                {/* Article Footer */}
                <Separator className="my-8" />
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-4">
                    <span>Yaratilgan: {new Date(article.created_at).toLocaleDateString('uz-UZ')}</span>
                    {article.updated_at && (
                      <span>Yangilangan: {new Date(article.updated_at).toLocaleDateString('uz-UZ')}</span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Article;
