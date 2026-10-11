import { socialMedia } from "../constants";

const iconPaths = {
  facebook: <path d="M13.5 21v-8h2.7l.4-3.1h-3.1v-2c0-.9.3-1.5 1.6-1.5h1.7V3.6c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.1H7.3V13h2.8v8h3.4Z" />,
  instagram: <><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="2" /><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" /><circle cx="17.5" cy="6.5" r="1.2" /></>,
  linkedin: <path d="M5 3.5a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM3.3 9h3.4v12H3.3V9Zm5.5 0h3.3v1.6h.1a3.7 3.7 0 0 1 3.3-1.9c3.5 0 4.2 2.3 4.2 5.3V21h-3.4v-6.2c0-1.5 0-3.4-2.1-3.4s-2.4 1.6-2.4 3.3V21H8.8V9Z" />,
  youtube: <path d="M23 7.1a3 3 0 0 0-2.1-2.2C19 4.4 12 4.4 12 4.4s-7 0-8.9.5A3 3 0 0 0 1 7.1a31 31 0 0 0-.5 4.9 31 31 0 0 0 .5 4.9 3 3 0 0 0 2.1 2.2c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.2 31 31 0 0 0 .5-4.9 31 31 0 0 0-.5-4.9ZM9.7 15.5v-7l6 3.5-6 3.5Z" />,
  pinterest: <path d="M12 2a10 10 0 0 0-3.6 19.3c0-.8 0-1.8.2-2.7l1.3-5.5s-.3-.6-.3-1.5c0-1.4.8-2.4 1.9-2.4.9 0 1.3.7 1.3 1.5 0 .9-.6 2.2-.9 3.4-.3 1 .5 1.8 1.5 1.8 1.8 0 3.2-1.9 3.2-4.6 0-2.4-1.7-4.1-4.2-4.1-2.9 0-4.6 2.2-4.6 4.4 0 .9.3 1.9.8 2.4.1.2.2.3.1.6l-.3 1c-.1.3-.3.4-.6.2-1.3-.6-2.1-2.4-2.1-3.9 0-3.2 2.3-6.2 6.7-6.2 3.5 0 6.2 2.5 6.2 5.8 0 3.5-2.2 6.4-5.3 6.4-1 0-2-.6-2.4-1.2l-.7 2.7c-.2 1-.9 2-1.3 2.7A10 10 0 1 0 12 2Z" />,
  tiktok: <path d="M19.6 7.4a6 6 0 0 1-3.7-1.3v8.1a6.2 6.2 0 1 1-5.3-6.1v3.4a2.9 2.9 0 1 0 2 2.8V2.5h3.3c.2 2 1.7 3.7 3.7 4v.9Z" />,
};

const SocialLinks = ({ className = "" }) => (
  <div className={`flex flex-wrap items-center ${className}`}>
    {socialMedia.map((social, index) => (
      <a
        key={social.id}
        href={social.link}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Seamoon Industries on ${social.name}`}
        className={`social-link flex h-11 w-11 items-center justify-center rounded-md text-white transition-transform duration-200 hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-secondary focus-visible:outline-offset-2 ${index < socialMedia.length - 1 ? "mr-2" : "mr-0"}`}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          {iconPaths[social.id]}
        </svg>
      </a>
    ))}
  </div>
);

export default SocialLinks;
