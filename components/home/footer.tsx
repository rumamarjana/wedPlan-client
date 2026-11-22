import type { ReactNode } from "react"
import Link from "next/link"
import { HeartIcon, MailIcon, MapPinIcon, PhoneIcon } from "lucide-react"

type SocialLink = {
  label: string
  href: string
  icon: ReactNode
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className="size-4">
      <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z" />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className="size-4">
      <path d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85C2.38 3.92 3.89 2.38 7.15 2.23 8.42 2.17 8.8 2.16 12 2.16zM12 7.43a4.57 4.57 0 1 0 0 9.14 4.57 4.57 0 0 0 0-9.14zm0 7.54a2.97 2.97 0 1 1 0-5.94 2.97 2.97 0 0 1 0 5.94zm5.82-7.72a1.07 1.07 0 1 1-2.14 0 1.07 1.07 0 0 1 2.14 0z" />
    </svg>
  )
}

function YoutubeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className="size-4">
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.12C19.55 3.55 12 3.55 12 3.55s-7.55 0-9.4.53A3 3 0 0 0 .5 6.2C0 8.02 0 12 0 12s0 3.98.5 5.8a3 3 0 0 0 2.1 2.12c1.85.53 9.4.53 9.4.53s7.55 0 9.4-.53a3 3 0 0 0 2.1-2.12C24 15.98 24 12 24 12s0-3.98-.5-5.8zM9.55 15.57V8.43L15.82 12l-6.27 3.57z" />
    </svg>
  )
}

function PinterestIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className="size-4">
      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z" />
    </svg>
  )
}

const socials: SocialLink[] = [
  { label: "Facebook", href: "#", icon: <FacebookIcon /> },
  { label: "Instagram", href: "#", icon: <InstagramIcon /> },
  { label: "YouTube", href: "#", icon: <YoutubeIcon /> },
  { label: "Pinterest", href: "#", icon: <PinterestIcon /> },
]

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Browse Services", href: "/browse-services" },
  { label: "Sign In", href: "/sign-in" },
  { label: "Sign Up", href: "/sign-up" },
]

const supportLinks = [
  { label: "Help Center", href: "#" },
  { label: "Contact Us", href: "#" },
  { label: "FAQs", href: "#" },
  { label: "Terms & Conditions", href: "#" },
]

export function Footer() {
  return (
    <footer className="bg-[#4a1d2a] text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:gap-10 lg:px-8">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 font-heading text-xl font-bold">
            <HeartIcon className="size-5" aria-hidden />
            <span>Wed Plan</span>
          </div>
          <p className="mt-3 max-w-[15rem] text-xs leading-relaxed text-white/70">
            We help couples plan a memorable wedding with WedPlan.
          </p>
          <div className="mt-4 flex items-center gap-3">
            {socials.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="text-white/80 transition-colors hover:text-white"
              >
                {social.icon}
              </Link>
            ))}
          </div>
        </div>

        {/* Link columns */}
        <div>
          <h3 className="text-sm font-bold">Quick Links</h3>
          <ul className="mt-3 flex flex-col gap-2 text-xs text-white/80">
            {quickLinks.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="transition-colors hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold">For Support</h3>
          <ul className="mt-3 flex flex-col gap-2 text-xs text-white/80">
            {supportLinks.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="transition-colors hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-sm font-bold">Contact Us</h3>
          <ul className="mt-3 space-y-2.5 text-xs text-white/80">
            <li className="flex items-start gap-2">
              <PhoneIcon className="mt-0.5 size-3.5 shrink-0" aria-hidden />
              <span>
                Call us:{" "}
                <Link href="tel:+8801723232323" className="hover:text-white">
                  +8801723232323
                </Link>
              </span>
            </li>
            <li className="flex items-start gap-2">
              <MailIcon className="mt-0.5 size-3.5 shrink-0" aria-hidden />
              <Link href="mailto:hello@wedplan.com" className="hover:text-white">
                hello@wedplan.com
              </Link>
            </li>
            <li className="flex items-start gap-2">
              <MapPinIcon className="mt-0.5 size-3.5 shrink-0" aria-hidden />
              <span>Dhaka, Bangladesh</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4 text-[11px] text-white/60 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} WedPlan. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with
            <HeartIcon className="size-3 fill-rose-400 text-rose-400" aria-hidden />
            for weddings
          </p>
        </div>
      </div>
    </footer>
  )
}
