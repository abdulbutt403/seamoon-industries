import { Fragment } from "react";
import { Link } from "react-router-dom";

const renderInline = (text, keyPrefix) => {
  const tokenPattern = /(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*)/g;
  return text.split(tokenPattern).filter(Boolean).map((part, index) => {
    const key = `${keyPrefix}-${index}`;
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      if (link[2].startsWith("/")) return <Link key={key} to={link[2]}>{link[1]}</Link>;
      return <a key={key} href={link[2]} target="_blank" rel="noreferrer">{link[1]}</a>;
    }
    const bold = part.match(/^\*\*([^*]+)\*\*$/);
    if (bold) return <strong key={key}>{bold[1]}</strong>;
    return <Fragment key={key}>{part}</Fragment>;
  });
};

const GuideMarkdown = ({ source }) => {
  const lines = source.trim().split(/\r?\n/);
  const blocks = [];
  let paragraph = [];
  let listItems = [];

  const flushParagraph = () => {
    if (!paragraph.length) return;
    blocks.push({ type: "p", text: paragraph.join(" ") });
    paragraph = [];
  };
  const flushList = () => {
    if (!listItems.length) return;
    blocks.push({ type: "ul", items: listItems });
    listItems = [];
  };

  lines.forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed) {
      flushParagraph();
      flushList();
      return;
    }
    const heading = trimmed.match(/^(#{2,3})\s+(.+)$/);
    if (heading) {
      flushParagraph();
      flushList();
      blocks.push({ type: heading[1].length === 2 ? "h2" : "h3", text: heading[2] });
      return;
    }
    const listItem = trimmed.match(/^[-*]\s+(.+)$/);
    if (listItem) {
      flushParagraph();
      listItems.push(listItem[1]);
      return;
    }
    flushList();
    paragraph.push(trimmed);
  });
  flushParagraph();
  flushList();

  return (
    <div className="oem-content__body guide-copy">
      {blocks.map((block, index) => {
        const key = `guide-block-${index}`;
        if (block.type === "h2") return <h2 key={key} className="font-poppins font-semibold text-primaryNavy text-3xl mt-10 mb-4">{block.text}</h2>;
        if (block.type === "h3") return <h3 key={key} className="font-poppins font-semibold text-primaryNavy text-xl mt-7 mb-3">{block.text}</h3>;
        if (block.type === "ul") return <ul key={key} className="list-disc list-inside my-5 space-y-2">{block.items.map((item, itemIndex) => <li key={`${key}-${itemIndex}`}>{renderInline(item, key)}</li>)}</ul>;
        return <p key={key} className="font-poppins text-bodyText text-[17px] leading-[1.8] mb-5">{renderInline(block.text, key)}</p>;
      })}
    </div>
  );
};

export default GuideMarkdown;
