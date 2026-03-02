import { apiUrl } from "../../utils/apiUrl";
import { prodURL } from "../../utils/prodURL";
import { populate } from "../../utils/populate";

export default async function handler(req, res) {
    function padTo2Digits(num) {
        return num.toString().padStart(2, '0');
      }
      
      function formatDate(date) {
        return (
          [
            date.getFullYear(),
            padTo2Digits(date.getMonth() + 1),
            padTo2Digits(date.getDate()),
          ].join('-') +
          'T' +
          [
            padTo2Digits(date.getHours()),
            padTo2Digits(date.getMinutes()),
            padTo2Digits(date.getSeconds()),
          ].join(':') + '+00:00'
        );
      }
      
      const lastmod = formatDate(new Date());

    let sitemap = [
        {
            loc: `${prodURL}/`,
            lastmod,
            priority: '1.00'
        },
        {
            loc: `${prodURL}/about`,
            lastmod,
            priority: '0.90'
        },
        {
            loc: `${prodURL}/newsroom`,
            lastmod,
            priority: '0.90'
        },
    ];

    const propertiesUrl = `${apiUrl}/properties`;
    const propertiesRes = await fetch(propertiesUrl);
    const propertiesData = await propertiesRes.json();

    propertiesData.data.forEach(property => {
        const { pageId } = property.attributes;
        sitemap.push({
            loc: `${prodURL}/property/${pageId}`,
            lastmod,
            priority: '0.90'
        });
    })

    const newsroomPostsUrl = `${apiUrl}/blogs?${populate}`;
    const newsroomPostsRes = await fetch(newsroomPostsUrl);
    const newsroomPostsData = await newsroomPostsRes.json();

    newsroomPostsData.data.forEach(post => {
        const { slug } = post.attributes;
        sitemap.push({
            loc: `${prodURL}/newsroom/${slug}`,
            lastmod,
            priority: '0.70'
        });
    });

    const comingSoonUrl = `${apiUrl}/coming-soons`;
    const comingSoonRes = await fetch(comingSoonUrl);
    const comingSoonData = await comingSoonRes.json();  

    comingSoonData.data.forEach(comingSoon => {
        const { pageId } = comingSoon.attributes;
        sitemap.push({
            loc: `${prodURL}/comingsoon/${pageId}`,
            lastmod,
            priority: '0.70'
        });
    });
  
    return res.status(200).json(sitemap);
}