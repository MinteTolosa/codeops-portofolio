
import { SITE_URL } from "@/lib/site";

export default function sitemap() {
  return [{
      url: SITE_URL,
      lastModified: new Date(),
    },
    {
      url: `${SITE_URL}/menu`,
      lastModified: new Date(),
    },
  ];
}
