import { apiUrl } from "./apiUrl";
import qs from "qs";

const fetchSlugs = async () => {
  const query = qs.stringify(
    {
      publicationState: "live",
      fields: ["slug"],
    },
    {
      encodeValuesOnly: true,
    },
  );

  const url = `${apiUrl}/blogs?${query}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch slugs from CMS: ${response.statusText}`);
  }

  const data = await response.json();

  if (!data || !data.data) {
    return [];
  }

  // Return the format expected by getStaticPaths
  return data.data.map((post) => {
    const { slug } = post.attributes;
    return {
      params: { slug, id: post.id },
    };
  });
};

export default fetchSlugs;
