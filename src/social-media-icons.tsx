import { Mail, GithubIcon,  LinkedinIcon} from "lucide-react"
import { FaGithub, FaLinkedin } from "react-icons/fa"
import { IoMdMail } from "react-icons/io";


export function SocialMediaIcons() {
  return (
    <div className="flex gap-2">
      <a
        target="_blank"
        href="https://github.com/tamjidrahman"
        rel="noopener noreferrer"
        aria-label="Github"
        className="rounded p-2 text-xl hover:bg-accent hover:text-accent-foreground"
      >
        <FaGithub />
      </a>
      <a
        target="_blank"
        href="https://linkedin.com/in/tamjidrahman"
        rel="noopener noreferrer"
        aria-label="Linkedin"
        className="rounded p-2 text-xl hover:bg-accent hover:text-accent-foreground"
      >
        <FaLinkedin />
      </a>
      <a
        target="_blank"
        href="mailto:tamjidarrahman@gmail.com"
        rel="noopener noreferrer"
        aria-label="Linkedin"
        className="rounded p-2 text-xl hover:bg-accent hover:text-accent-foreground"
      >
      <IoMdMail/>
      </a>
    </div>
  )
}