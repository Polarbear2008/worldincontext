import { Facebook, Twitter, Linkedin, Mail, MessageCircle } from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    categories: [
      { name: "Business", href: "/category/business" },
      { name: "Politics", href: "/category/politics" },
      { name: "Economics", href: "/category/economics" },
      { name: "Geography", href: "/category/geography" },
      { name: "History", href: "/category/history" },
      { name: "Diplomacy", href: "/category/diplomacy" },
    ],
    about: [
      { name: "About Us", href: "/about" },
      { name: "Our Team", href: "/team" },
      { name: "Translation Process", href: "/process" },
      { name: "Contact", href: "/contact" },
    ],
    legal: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Cookie Policy", href: "/cookies" },
    ]
  };

  const socialLinks = [
    { name: "Facebook", icon: Facebook, href: "https://facebook.com/worldincontext" },
    { name: "Twitter", icon: Twitter, href: "https://twitter.com/worldincontext" },
    { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com/company/worldincontext" },
    { name: "Email", icon: Mail, href: "mailto:contact@worldincontext.uz" },
    { name: "Telegram", icon: MessageCircle, href: "https://t.me/WorldInContextUZ" },
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <img src={logo} alt="World in Context" className="h-8 w-auto filter brightness-0 invert" />
            </div>
            <p className="text-primary-foreground/80 mb-6 max-w-md">
              Making global knowledge accessible to Uzbek readers through high-quality translations of educational content.
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
            <h3 className="font-semibold text-primary-foreground mb-4">Categories</h3>
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
            <h3 className="font-semibold text-primary-foreground mb-4">About</h3>
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

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-primary-foreground mb-4">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
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
              © {currentYear} World in Context. All rights reserved.
            </p>
            <p className="text-primary-foreground/60 text-sm mt-2 md:mt-0">
              Made with ♥ for Uzbek readers worldwide
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;