import { Linkedin, Mail, MessageCircle, Youtube } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    categories: [
      { name: "Siyosat", href: "/siyosat" },
      { name: "Iqtisod", href: "/iqtisod" },
      { name: "Geografiya", href: "/geografiya" },
      { name: "Tarix", href: "/tarix" },
      { name: "Diplomatiya", href: "/diplomatiya" },
    ],
    about: [
      { name: "Biz Haqimizda", href: "/about" },
      { name: "Jamoamiz", href: "/about" },
      { name: "Aloqa", href: "/about" },
    ],
  };

  const socialLinks = [
    { name: "Telegram", icon: MessageCircle, href: "https://t.me/worldincontext" },
    { name: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/company/world-in-context/" },
    { name: "YouTube", icon: Youtube, href: "https://www.youtube.com/@worldincontextuz" },
    { name: "Email", icon: Mail, href: "mailto:worldincontextuz@gmail.com" },
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <img src="/logo.png" alt="World in Context" className="h-12 w-auto" />
            </div>
            <p className="text-primary-foreground/80 mb-6 max-w-md">
              Ilmiy maqolalarni sifatli tarjimalari orqali global bilimlarni o'zbek o'quvchilari uchun taqdim etish.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    className="text-primary-foreground/60 hover:text-primary-foreground transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                  >
                    <IconComponent className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold text-primary-foreground mb-4">Kategoriyalar</h3>
            <ul className="space-y-2">
              {footerLinks.categories.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="font-semibold text-primary-foreground mb-4">Haqida</h3>
            <ul className="space-y-2">
              {footerLinks.about.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-primary-foreground/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-primary-foreground/60 text-sm">
              © {currentYear} World in Context. Barcha huquqlar himoyalangan.
            </p>
            <p className="text-primary-foreground/60 text-sm mt-2 md:mt-0">
              <a 
                href="https://t.me/samandar_vibe" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-primary-foreground transition-colors"
              >
                Numonov Samandar
              </a> tomonidan yaratilgan
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;