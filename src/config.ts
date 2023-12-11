import type { Site, SocialObjects } from "./types";

export const SITE: Site = {
  website: "https://astro-paper.pages.dev/", // replace this with your deployed domain
  author: "Miloshinjo",
  desc: "A minimal, responsive and SEO-friendly Astro blog theme.",
  title: "Code Shorts",
  ogImage: "astropaper-og.jpg",
  lightAndDarkMode: true,
  postPerPage: 3,
};

export const LOCALE = ["en-EN"]; // set to [] to use the environment default

export const LOGO_IMAGE = {
  enable: true,
  svg: false,
  width: 70,
  height: 35,
};

export const SOCIALS: SocialObjects = [
  {
    name: "Github",
    href: "https://github.com/Miloshinjo/code-shorts-blog",
    linkTitle: ` ${SITE.title} on Github`,
    active: true,
  },
];
