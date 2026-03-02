import { apiUrl } from "../../utils/apiUrl";
import { baseUrl } from "../../utils/baseUrl";
import qs from "qs";

export default async function handler(req, res) {
  const query = qs.stringify({
      publicationState: 'live',
      fields: ['title', 'date', 'preview', 'slug', 'updatedAt'],
      populate: [
        'properties.pageId',
        'categories.name',
        'images.thumbnail',
        'meta.description',
        'meta.keywords',
        'author.name',
        'author.title',
        'author.image',
      ],
      encodeValuesOnly: true
  });

  const blogUrl = `${apiUrl}/blogs?${query}`;
  const blogRes = await fetch(blogUrl);
  const blogData = await blogRes.json();

  const posts = blogData.data.map(post => {
    const { title, date, preview, slug, images, meta, updatedAt } = post.attributes;
    const categories = post.attributes.categories.data.map(c => c.attributes.name);
    const properties = post.attributes.properties.data.map(c => c.attributes.name);

    const { thumbnail } = images;

    const author = post.attributes.author?.data?.attributes ? ({
      name: post.attributes.author.data.attributes.name,
      title: post.attributes.author.data.attributes.title,
      image: baseUrl(post.attributes.author.data.attributes.image.data.attributes.url),
    }) : null;

    const thbn = baseUrl(thumbnail.data.attributes.url);

    return {
      author,
      title,
      date,
      updatedAt,
      preview,
      slug,
      properties,
      categories,
      meta,
      images: {
        thumbnail: thbn
      }
    }
  });

  const sortedPosts = posts.sort((a, b) => {
    const c = new Date(a.date);
    const d = new Date(b.date);
    return d - c;
  });
  
  return res.status(200).json(sortedPosts);
}