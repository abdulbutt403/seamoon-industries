import { Reveal, SplitHeading } from "../motion/components";

const PageHero = ({ eyebrow, title, description }) => (
  <header className="page-hero">
    <Reveal as="span">{eyebrow}</Reveal>
    <h1 aria-label={title}><SplitHeading>{title}</SplitHeading></h1>
    <Reveal as="p">{description}</Reveal>
  </header>
);

export default PageHero;
