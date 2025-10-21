import { useState, useEffect, useCallback } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Upload,
  FileText,
  Plus,
  Edit,
  Trash2,
  Eye,
  LogOut,
  Shield,
  Users,
  FileUp,
  Save,
  X,
  Loader2,
  RefreshCw,
  Mail,
  CheckCircle,
  MessageSquare
} from "lucide-react";
import { toast } from "sonner";
import { articlesService, uploadService, testConnection, filesService, contactMessagesService, newsletterService } from "@/lib/database";
import { Article, FileRecord, ContactMessage, NewsletterSubscriber } from "@/lib/supabase";

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [activeTab, setActiveTab] = useState("dashboard");
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    totalArticles: 0,
    totalFiles: 0,
    totalViews: 0
  });

  const [uploadedFiles, setUploadedFiles] = useState<FileRecord[]>([]);
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>([]);
  const [newsletterSubscribers, setNewsletterSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [newArticle, setNewArticle] = useState({
    title: "",
    content: "",
    category: "Siyosat",
    excerpt: ""
  });

  const [selectedFilesForPublishing, setSelectedFilesForPublishing] = useState<number[]>([]);

  const handleFileSelectionForPublishing = useCallback((fileId: number, isSelected: boolean) => {
    if (isSelected) {
      setSelectedFilesForPublishing(prev => [...prev, fileId]);
    } else {
      setSelectedFilesForPublishing(prev => prev.filter(id => id !== fileId));
    }
  }, []);

  const loadDashboardData = useCallback(async () => {
    try {
      setLoading(true);

      // Test connection first
      const isConnected = await testConnection();
      if (!isConnected) {
        toast.error('Supabase ulanishida muammo bor. Iltimos, sozlamalarni tekshiring.');
        return;
      }

      // Load articles
      const articlesData = await articlesService.getArticles({ limit: 100 });
      setArticles(articlesData);

      // Load files
      const filesData = await filesService.getFiles();
      setUploadedFiles(filesData);

      // Load contact messages
      const messagesData = await contactMessagesService.getMessages();
      setContactMessages(messagesData);

      // Load newsletter subscribers
      const subscribersData = await newsletterService.getSubscribers();
      setNewsletterSubscribers(subscribersData);

      // Calculate stats
      const totalViews = articlesData.reduce((sum, article) => sum + (article.view_count || 0), 0);
      setStats({
        totalArticles: articlesData.length,
        totalFiles: filesData.length,
        totalViews
      });
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      toast.error('Ma\'lumotlarni yuklashda xatolik yuz berdi');
    } finally {
      setLoading(false);
    }
  }, []);

  const handlePublishFilesAsArticles = useCallback(async () => {
    if (selectedFilesForPublishing.length === 0) {
      toast.error("Hech qanday fayl tanlanmagan");
      return;
    }

    try {
      setLoading(true);

      for (const fileId of selectedFilesForPublishing) {
        const file = uploadedFiles.find(f => f.id === fileId);
        if (file) {
          const articleData = {
            title: file.original_name.replace(/\.[^/.]+$/, ""), // Remove file extension
            content: `Fayl: ${file.original_name}`,
            excerpt: `PDF fayl - ${file.original_name}`,
            category: "Siyosat", // Default category
            author: "Admin",
            status: "published" as const,
            article_type: "file" as const,
            file_id: fileId
          };

          await articlesService.createArticle(articleData);
        }
      }

      setSelectedFilesForPublishing([]);
      toast.success(`${selectedFilesForPublishing.length} fayl maqola sifatida nashr qilindi!`);
      loadDashboardData(); // Refresh data
    } catch (error: any) {
      console.error('Error publishing files as articles:', error);
      const errorMessage = error?.message || 'Fayllarni maqola sifatida nashr qilishda xatolik yuz berdi';
      toast.error(`Xatolik: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  }, [selectedFilesForPublishing, uploadedFiles, loadDashboardData]);

  useEffect(() => {
    if (isAuthenticated) {
      loadDashboardData();
    }
  }, [isAuthenticated, loadDashboardData]);

  const handleLogin = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (loginData.username === "admin" && loginData.password === "IbrohimSamandar") {
      setIsAuthenticated(true);
      toast.success("Admin paneliga muvaffaqiyatli kirildi!");
    } else {
      toast.error("Noto'g'ri foydalanuvchi nomi yoki parol");
    }
  }, [loginData.username, loginData.password]);

  const handleConnectionTest = useCallback(async () => {
    try {
      setLoading(true);
      const isConnected = await testConnection();
      if (isConnected) {
        toast.success('Supabase ulanishi muvaffaqiyatli!');
      } else {
        toast.error('Supabase ulanishida muammo bor');
      }
    } catch (error) {
      console.error('Connection test failed:', error);
      toast.error('Ulanish testida xatolik yuz berdi');
    } finally {
      setLoading(false);
    }
  }, []);

  const handleLogout = useCallback(() => {
    setIsAuthenticated(false);
    setLoginData({ username: "", password: "" });
    toast.success("Admin panelidan chiqildi");
  }, []);

  const handleCreateArticle = useCallback(async () => {
    if (!newArticle.title || !newArticle.content) {
      toast.error("Sarlavha va mazmunni kiriting");
      return;
    }

    try {
      setLoading(true);
      const articleData = {
        title: newArticle.title,
        content: newArticle.content,
        excerpt: newArticle.excerpt || newArticle.content.substring(0, 200) + "...",
        category: newArticle.category,
        author: "Admin", // In a real app, this would come from authenticated user
        status: "published" as const,
        article_type: "text" as const
      };

      await articlesService.createArticle(articleData);

      setNewArticle({
        title: "",
        content: "",
        category: "Siyosat",
        excerpt: ""
      });

      toast.success("Maqola muvaffaqiyatli yaratildi!");
      loadDashboardData(); // Refresh data
    } catch (error: any) {
      console.error('Error creating article:', error);
      const errorMessage = error?.message || 'Maqola yaratishda noma\'lum xatolik yuz berdi';
      toast.error(`Maqola yaratishda xatolik yuz berdi: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  }, [newArticle, loadDashboardData]);

  const handleDeleteArticle = useCallback(async (id: number) => {
    try {
      await articlesService.deleteArticle(id);
      toast.success('Maqola muvaffaqiyatli o\'chirildi');
      loadDashboardData(); // Refresh data
    } catch (error) {
      console.error('Error deleting article:', error);
      toast.error('Maqolani o\'chirishda xatolik yuz berdi');
    }
  }, [loadDashboardData]);

  const handleFileUploadForArticle = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    try {
      setLoading(true);

      // Upload only the first file (single file for article)
      const file = files[0];
      const uploadResult = await uploadService.uploadFile(file, 'articles');

      // Save file metadata to database
      const fileData: Omit<FileRecord, 'id' | 'created_at'> = {
        name: uploadResult.path,
        original_name: file.name,
        size_bytes: file.size,
        mime_type: file.type,
        bucket: 'articles',
        file_path: uploadResult.path,
        public_url: uploadService.getPublicUrl('articles', uploadResult.path),
        uploaded_by: 'admin'
      };

      const savedFile = await filesService.createFile(fileData);
      setUploadedFiles([savedFile]);

      toast.success('PDF fayl muvaffaqiyatli yuklandi!');
    } catch (error) {
      console.error('Error uploading file for article:', error);
      toast.error('Fayl yuklanishida xatolik yuz berdi');
    } finally {
      setLoading(false);
    }
  }, []);

  const handleCreateFileArticle = useCallback(async () => {
    if (!newArticle.title || uploadedFiles.length === 0) {
      toast.error("Sarlavha va PDF faylni kiriting");
      return;
    }

    try {
      setLoading(true);

      const fileId = uploadedFiles[0].id;
      const articleData = {
        title: newArticle.title,
        content: `PDF Fayl: ${uploadedFiles[0].original_name}`,
        excerpt: newArticle.excerpt || `PDF fayl - ${uploadedFiles[0].original_name}`,
        category: newArticle.category,
        author: "Admin",
        status: "published" as const,
        article_type: "file" as const,
        file_id: fileId
      };

      await articlesService.createArticle(articleData);

      // Reset form
      setNewArticle({
        title: "",
        content: "",
        category: "Siyosat",
        excerpt: ""
      });
      setUploadedFiles([]);

      toast.success("PDF maqola muvaffaqiyatli yaratildi!");
      loadDashboardData(); // Refresh data
    } catch (error: any) {
      console.error('Error creating file article:', error);
      const errorMessage = error?.message || 'PDF maqola yaratishda xatolik yuz berdi';
      toast.error(`Xatolik: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  }, [newArticle, uploadedFiles, loadDashboardData]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md shadow-2xl">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl">Admin Paneli</CardTitle>
            <CardDescription>
              Tizimga kirish uchun ma'lumotlaringizni kiriting
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Foydalanuvchi nomi</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="admin"
                  value={loginData.username}
                  onChange={(e) => setLoginData({...loginData, username: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Parol</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="admin123"
                  value={loginData.password}
                  onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Kirish
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        {/* Admin Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Admin Paneli</h1>
            <p className="text-muted-foreground">Mazmunni boshqarish va yuklash</p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={handleConnectionTest} disabled={loading}>
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Ulanish Testi
            </Button>
            <Button variant="outline" onClick={loadDashboardData} disabled={loading}>
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Yangilash
            </Button>
            <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2">
              <LogOut className="h-4 w-4" />
              Chiqish
            </Button>
          </div>
        </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="dashboard">Boshqaruv</TabsTrigger>
          <TabsTrigger value="articles">Maqolalar</TabsTrigger>
          <TabsTrigger value="messages">Xabarlar</TabsTrigger>
          <TabsTrigger value="newsletter">Obuna</TabsTrigger>
          <TabsTrigger value="upload">PDF Yuklash</TabsTrigger>
          <TabsTrigger value="create">Yangi Maqola</TabsTrigger>
        </TabsList>

        {/* Dashboard Tab */}
        <TabsContent value="dashboard" className="space-y-6">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Jami Maqolalar</CardTitle>
                    <FileText className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.totalArticles}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Yuklangan Fayllar</CardTitle>
                    <FileUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.totalFiles}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Jami Ko'rishlar</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.totalViews}</div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>So'nggi Faoliyat</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {articles.slice(0, 5).map((article) => (
                      <div key={article.id} className="flex items-center gap-4">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <div className="flex-1">
                          <span className="font-medium">{article.title}</span>
                          <span className="text-sm text-muted-foreground ml-2">
                            ({article.category})
                          </span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {new Date(article.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </TabsContent>

        {/* Articles Tab */}
        <TabsContent value="articles" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Maqolalar Boshqaruvi</CardTitle>
              <CardDescription>
                Barcha maqolalarni ko'rish, tahrir qilish va o'chirish
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin" />
                </div>
              ) : articles.length === 0 ? (
                <div className="text-center py-8">
                  <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Hozircha maqolalar yo'q</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {articles.map((article) => (
                    <div key={article.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium">{article.title}</h4>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant={article.status === 'published' ? 'default' : 'secondary'}>
                            {article.status === 'published' ? 'Nashr qilingan' : 'Qoralama'}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{article.category}</span>
                          <span className="text-xs text-muted-foreground">
                            {article.view_count || 0} ko'rish
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <a href={`/article/${article.category.toLowerCase()}/${article.id}`}>
                            <Eye className="h-4 w-4" />
                          </a>
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteArticle(article.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Messages Tab */}
        <TabsContent value="messages" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Kontakt Xabarlari
              </CardTitle>
              <CardDescription>
                Foydalanuvchilardan kelgan barcha xabarlar
              </CardDescription>
            </CardHeader>
            <CardContent>
              {contactMessages.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Hozircha xabarlar yo'q</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {contactMessages.map((message) => (
                    <Card key={message.id} className={`${message.status === 'unread' ? 'border-primary/50 bg-primary/5' : ''}`}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <CardTitle className="text-lg">{message.name}</CardTitle>
                              <Badge variant={message.status === 'unread' ? 'default' : message.status === 'read' ? 'secondary' : 'outline'}>
                                {message.status === 'unread' ? 'Yangi' : message.status === 'read' ? 'O\'qilgan' : 'Javob berilgan'}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Mail className="h-3 w-3" />
                                {message.email}
                              </span>
                              <span>{new Date(message.created_at).toLocaleString('uz-UZ')}</span>
                            </div>
                          </div>
                        </div>
                        <CardDescription className="text-base font-medium mt-2">
                          {message.subject}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-foreground whitespace-pre-wrap mb-4">
                          {message.message}
                        </p>
                        <div className="flex gap-2">
                          {message.status === 'unread' && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={async () => {
                                try {
                                  await contactMessagesService.updateMessageStatus(message.id, 'read');
                                  toast.success('Xabar o\'qilgan deb belgilandi');
                                  loadDashboardData();
                                } catch (error) {
                                  toast.error('Xatolik yuz berdi');
                                }
                              }}
                            >
                              <CheckCircle className="h-4 w-4 mr-2" />
                              O'qilgan
                            </Button>
                          )}
                          {message.status !== 'replied' && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={async () => {
                                try {
                                  await contactMessagesService.updateMessageStatus(message.id, 'replied');
                                  toast.success('Javob berilgan deb belgilandi');
                                  loadDashboardData();
                                } catch (error) {
                                  toast.error('Xatolik yuz berdi');
                                }
                              }}
                            >
                              <MessageSquare className="h-4 w-4 mr-2" />
                              Javob berildi
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={async () => {
                              if (confirm('Xabarni o\'chirmoqchimisiz?')) {
                                try {
                                  await contactMessagesService.deleteMessage(message.id);
                                  toast.success('Xabar o\'chirildi');
                                  loadDashboardData();
                                } catch (error) {
                                  toast.error('Xatolik yuz berdi');
                                }
                              }
                            }}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            O'chirish
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Newsletter Tab */}
        <TabsContent value="newsletter" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Newsletter Obunachilari
              </CardTitle>
              <CardDescription>
                Email xabarnomaga obuna bo'lgan foydalanuvchilar
              </CardDescription>
            </CardHeader>
            <CardContent>
              {newsletterSubscribers.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Mail className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Hozircha obunachi yo'q</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-4 p-4 bg-primary/5 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Jami Obunachi</p>
                      <p className="text-2xl font-bold text-primary">{newsletterSubscribers.length}</p>
                    </div>
                    <Button variant="outline" onClick={() => {
                      const emails = newsletterSubscribers.map(s => s.email).join(', ');
                      navigator.clipboard.writeText(emails);
                      toast.success('Emaillar nusxalandi!');
                    }}>
                      Emaillarni Nusxalash
                    </Button>
                  </div>

                  <div className="border rounded-lg overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-muted">
                        <tr>
                          <th className="text-left p-3 font-medium">Email</th>
                          <th className="text-left p-3 font-medium">Ism</th>
                          <th className="text-left p-3 font-medium">Obuna Sanasi</th>
                          <th className="text-left p-3 font-medium">Holat</th>
                          <th className="text-right p-3 font-medium">Amallar</th>
                        </tr>
                      </thead>
                      <tbody>
                        {newsletterSubscribers.map((subscriber) => (
                          <tr key={subscriber.id} className="border-t hover:bg-muted/50">
                            <td className="p-3">
                              <div className="flex items-center gap-2">
                                <Mail className="h-4 w-4 text-muted-foreground" />
                                <span className="font-medium">{subscriber.email}</span>
                              </div>
                            </td>
                            <td className="p-3 text-muted-foreground">
                              {subscriber.name || '-'}
                            </td>
                            <td className="p-3 text-sm text-muted-foreground">
                              {new Date(subscriber.subscribed_at).toLocaleDateString('uz-UZ')}
                            </td>
                            <td className="p-3">
                              <Badge variant={subscriber.status === 'active' ? 'default' : 'secondary'}>
                                {subscriber.status === 'active' ? 'Faol' : 'Bekor qilingan'}
                              </Badge>
                            </td>
                            <td className="p-3 text-right">
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={async () => {
                                  if (confirm('Obunachini o\'chirmoqchimisiz?')) {
                                    try {
                                      await newsletterService.deleteSubscriber(subscriber.id);
                                      toast.success('Obunachi o\'chirildi');
                                      loadDashboardData();
                                    } catch (error) {
                                      toast.error('Xatolik yuz berdi');
                                    }
                                  }
                                }}
                              >
                                <Trash2 className="h-4 w-4 mr-1" />
                                O'chirish
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Upload Tab */}
        <TabsContent value="upload" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>PDF Maqola Yuklash</CardTitle>
              <CardDescription>
                PDF fayl yuklang va maqola sifatida nashr qiling
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="file-title">Sarlavha</Label>
                  <Input
                    id="file-title"
                    placeholder="PDF maqola sarlavhasini kiriting"
                    value={newArticle.title}
                    onChange={(e) => setNewArticle({...newArticle, title: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="file-category">Kategoriya</Label>
                  <select
                    id="file-category"
                    className="w-full p-2 border rounded-md"
                    value={newArticle.category}
                    onChange={(e) => setNewArticle({...newArticle, category: e.target.value})}
                  >
                    <option value="Siyosat">Siyosat</option>
                    <option value="Iqtisod">Iqtisod</option>
                    <option value="Geografiya">Geografiya</option>
                    <option value="Tarix">Tarix</option>
                    <option value="Diplomatiya">Diplomatiya</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="file-excerpt">Qisqacha mazmun (ixtiyoriy)</Label>
                <Input
                  id="file-excerpt"
                  placeholder="PDF maqola qisqacha mazmunini kiriting"
                  value={newArticle.excerpt}
                  onChange={(e) => setNewArticle({...newArticle, excerpt: e.target.value})}
                />
              </div>

              <div className="space-y-4">
                <Label>PDF Fayl Yuklash</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                  <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground mb-4">
                    PDF faylni bu yerga torting yoki quyidagi tugmani bosing
                  </p>
                  <Input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileUploadForArticle}
                    className="hidden"
                    id="article-file-upload"
                  />
                  <Label htmlFor="article-file-upload">
                    <Button asChild>
                      <span>PDF Fayl Tanlash</span>
                    </Button>
                  </Label>
                </div>

                {uploadedFiles.length > 0 && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-2 text-green-700">
                      <FileText className="h-5 w-5" />
                      <span className="font-medium">{uploadedFiles[0]?.original_name}</span>
                      <span className="text-sm">
                        ({(uploadedFiles[0]?.size_bytes / (1024 * 1024)).toFixed(1)} MB)
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <Button
                onClick={handleCreateFileArticle}
                disabled={loading || !newArticle.title || uploadedFiles.length === 0}
                className="flex items-center gap-2"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
                PDF Maqolani Nashr Qilish
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Create Article Tab */}
        <TabsContent value="create" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Yangi Maqola Yaratish</CardTitle>
              <CardDescription>
                Yangi maqola yozing va nashr qiling
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Sarlavha</Label>
                  <Input
                    id="title"
                    placeholder="Maqola sarlavhasini kiriting"
                    value={newArticle.title}
                    onChange={(e) => setNewArticle({...newArticle, title: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Kategoriya</Label>
                  <select
                    id="category"
                    className="w-full p-2 border rounded-md"
                    value={newArticle.category}
                    onChange={(e) => setNewArticle({...newArticle, category: e.target.value})}
                  >
                    <option value="Siyosat">Siyosat</option>
                    <option value="Iqtisod">Iqtisod</option>
                    <option value="Geografiya">Geografiya</option>
                    <option value="Tarix">Tarix</option>
                    <option value="Diplomatiya">Diplomatiya</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="excerpt">Qisqacha mazmun (ixtiyoriy)</Label>
                <Input
                  id="excerpt"
                  placeholder="Maqola qisqacha mazmunini kiriting"
                  value={newArticle.excerpt}
                  onChange={(e) => setNewArticle({...newArticle, excerpt: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Maqola mazmuni</Label>
                <Textarea
                  id="content"
                  placeholder="Maqola mazmunini yozing..."
                  rows={15}
                  value={newArticle.content}
                  onChange={(e) => setNewArticle({...newArticle, content: e.target.value})}
                />
              </div>

              <Button
                onClick={handleCreateArticle}
                disabled={loading}
                className="flex items-center gap-2"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
                Maqolani Saqlash
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      </div>
      <Footer />
    </div>
  );
};

export default Admin;
