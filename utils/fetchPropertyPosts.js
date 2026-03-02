import { apiUrl } from "./apiUrl";
import { baseUrl } from "./baseUrl";
import qs from "qs";

module.exports = async (property) => {
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
        sort: ['date:desc'],
        filters: {
            properties: {
                pageId: {
                    $eq: property
                }
            }
        },
      encodeValuesOnly: true
    });

    const blogUrl = `${apiUrl}/blogs?${query}`;
    const blogRes = await fetch(blogUrl);
    const blogData = await blogRes.json();
    
    const posts = blogData.data.map(post => {
        const { title, date, preview, slug, images } = post.attributes;
        const { thumbnail } = images;
            const categories = post.attributes.categories.data.map(c => c.attributes.name);

  
        const thbn = baseUrl(thumbnail.data.attributes.url);

        const author = post.attributes.author?.data?.attributes ? ({
          name: post.attributes.author.data.attributes.name,
          title: post.attributes.author.data.attributes.title,
          image: baseUrl(post.attributes.author.data.attributes.image.data.attributes.url),
        }) : null;
  
        return {
          title,
          date,
          preview,
          slug,
          author,
          categories,
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

    return sortedPosts;
}