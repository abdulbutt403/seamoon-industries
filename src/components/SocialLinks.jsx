import { socialMedia } from "../constants";

const iconPaths = {
  facebook: <path d="M13.4 21v-8h2.7l.4-3.1h-3.1v-2c0-.9.3-1.5 1.6-1.5h1.7V3.6c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.1H7.2V13H10v8h3.4Z" />,
  instagram: <><rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5" fill="none" stroke="currentColor" strokeWidth="1.8"/><circle cx="12" cy="12" r="4.1" fill="none" stroke="currentColor" strokeWidth="1.8"/><circle cx="17.7" cy="6.6" r="1.1"/></>,
  linkedin: <><path d="M5.1 8.6H2.2V21h2.9V8.6ZM3.65 2.5a1.7 1.7 0 1 0 0 3.4 1.7 1.7 0 0 0 0-3.4ZM21.8 13.9c0-3.7-2-5.5-4.7-5.5a4.1 4.1 0 0 0-3.7 2v-1.8h-2.9V21h2.9v-6.1c0-1.6.3-3.2 2.3-3.2s2 1.9 2 3.3V21h3v-7.1h1.1Z" /></>,
  youtube: <><path d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12a31 31 0 0 0 .5 4.8 3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.8 31 31 0 0 0-.5-4.8ZM9.7 15.5v-7l6.1 3.5-6.1 3.5Z" /></>,
  pinterest: <path d="M12 2a10 10 0 0 0-3.6 19.3c0-.8 0-1.8.2-2.7l1.3-5.4s-.3-.6-.3-1.5c0-1.4.8-2.5 1.9-2.5.9 0 1.3.7 1.3 1.6 0 1-.6 2.4-.9 3.7-.3 1.1.5 2 1.6 2 1.9 0 3.4-2 3.4-4.9 0-2.5-1.8-4.3-4.4-4.3-3 0-4.8 2.2-4.8 4.5 0 .9.3 1.9.8 2.4.1.2.2.3.1.5l-.3 1c-.1.3-.2.4-.5.3-1.3-.6-2.1-2.3-2.1-3.8 0-3.1 2.2-6 6.4-6 3.4 0 6 2.4 6 5.6 0 3.3-2.1 6.1-5 6.1-1 0-2-.6-2.4-1.2l-.7 2.7c-.2 1-.9 2-1.3 2.7A10 10 0 1 0 12 2Z" />,
  tiktok: <path d="M19.6 7.2a6.4 6.4 0 0 1-4-1.4v8.1a6 6 0 1 1-5.2-6v3.3a2.8 2.8 0 1 0 1.9 2.7V2.5h3.3c.3 2.4 1.8 4.3 4 4.9v-.2Z" />,
};

const SocialLinks = ({ className = "" }) => (
  <div className={`social-links ${className}`}>
    {socialMedia.map(({ id, name, link }) => (
      <a
        key={id}
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Seamoon Industries on ${name}`}
        className="social-links__item"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          {iconPaths[id]}
        </svg>
      </a>
    ))}
  </div>
);

export default SocialLinks;
