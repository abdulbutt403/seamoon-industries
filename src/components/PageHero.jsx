const PageHero = ({ eyebrow, title, description }) => (
  <header className="page-hero">
    <span>{eyebrow}</span>
    <h1>{title}</h1>
    <p>{description}</p>
  </header>
);

export default PageHero;
