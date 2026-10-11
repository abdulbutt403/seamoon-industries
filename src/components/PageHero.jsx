import SectionEyebrow from "./SectionEyebrow";

const PageHero = ({ eyebrow, title, description }) => (
  <header className="page-hero">
    <SectionEyebrow>{eyebrow}</SectionEyebrow>
    <h1>{title}</h1>
    <p>{description}</p>
  </header>
);

export default PageHero;
