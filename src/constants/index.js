import { people01, people02, people03, facebook, instagram, linkedin, twitter, airbnb, binance, coinbase, dropbox, send, shield, star } from "../assets";

export const navLinks = [
  { path: "/", title: "Home" },
  { path: "/dental-instruments", title: "Dental" },
  { path: "/surgical-instruments", title: "Surgical" },
  { path: "/oem-private-label", title: "OEM" },
  { path: "/certifications", title: "Certifications" },
  { path: "/contact", title: "Contact" },
];

export const features = [
  {
    id: "feature-1",
    icon: star,
    title: "Fast Delivery",
    content:
      "We have a vast range of different instruments available in our stock, ready to be shipped for fast delivery to our valued customers.",
  },
  {
    id: "feature-2",
    icon: shield,
    title: "Competitive Prices",
    content:
      "Seamoon Industries prices are very competitive. Customer satisfaction is our first priority.",
  },
  {
    id: "feature-3",
    icon: send,
    title: "Customer Support",
    content:
      "Our company's motto is to provide our customers with outstanding and friendly support and an easy-to-use ordering system.",
  },
];

export const feedback = [
  {
    id: "feedback-1",
    content:
      "Money is only a tool. It will take you wherever you wish, but it will not replace you as the driver.",
    name: "Herman Jensen",
    title: "Founder & Leader",
    img: people01,
  },
  {
    id: "feedback-2",
    content: "Money makes your life easier. If you're lucky to have it, you're lucky.",
    name: "Steve Mark",
    title: "Founder & Leader",
    img: people02,
  },
  {
    id: "feedback-3",
    content:
      "It is usually people in the money business, finance, and international trade that are really rich.",
    name: "Kenn Gallagher",
    title: "Founder & Leader",
    img: people03,
  },
];

export const stats = [
  { id: "stats-1", title: "Years in Export", value: "25+" },
  { id: "stats-2", title: "Instrument References", value: "800+" },
  { id: "stats-3", title: "Export Markets", value: "40+" },
];

export const footerLinks = [
  {
    title: "Useful Links",
    links: [
      { name: "Home", link: "/" },
      { name: "Dental Instruments", link: "/dental-instruments" },
      { name: "Surgical Instruments", link: "/surgical-instruments" },
      { name: "OEM & Private Label", link: "/oem-private-label" },
      { name: "Certifications", link: "/certifications" },
      { name: "Contact", link: "/contact" },
    ],
  },
];

export const socialMedia = [];

export const clients = [
  { id: "client-1", logo: airbnb },
  { id: "client-2", logo: binance },
  { id: "client-3", logo: coinbase },
  { id: "client-4", logo: dropbox },
];
