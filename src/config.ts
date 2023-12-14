import type { Site, SocialObjects } from "./types";

export const SITE: Site = {
  website: "https://astro-paper.pages.dev/", // replace this with your deployed domain
  author: "Miloshinjo",
  desc: "This is my blog about web development and development in general.",
  title: "Miloš Dželetović",
  ogImage: "og-image.png",
  lightAndDarkMode: true,
  postPerPage: 3,
};

export const LOCALE = ["en-EN"]; // set to [] to use the environment default

export const LOGO_IMAGE = {
  enable: true,
  svg: false,
  width: 60,
  height: 60,
};

export const SOCIALS: SocialObjects = [
  {
    name: "Github",
    href: "https://github.com/Miloshinjo/code-shorts-blog",
    linkTitle: ` ${SITE.title} on Github`,
    active: true,
  },
  {
    name: "Twitter",
    href: "https://twitter.com/miloshinjo",
    linkTitle: ` ${SITE.title} on Twitter`,
    active: true,
  },
];
