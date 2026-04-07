import Link from "next/link";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { IconType } from "react-icons";
import { socialLinks } from "@/lib/site";

const iconMap: Record<string, IconType> = {
  GitHub: FaGithub,
  LinkedIn: FaLinkedin,
  Instagram: FaInstagram,
  Email: MdEmail,
};

type SocialLinksProps = {
  exclude?: string[];
};

export default function SocialLinks({ exclude = [] }: SocialLinksProps) {
  return (
    <div className="flex items-center gap-4">
      {socialLinks.map(({ label, href }) => {
        if (exclude.includes(label)) return null;
        const Icon = iconMap[label];
        return (
          <Link
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
          >
            <Icon size={18} />
          </Link>
        );
      })}
    </div>
  );
}