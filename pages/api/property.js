import { apiUrl } from "../../utils/apiUrl";
import { baseUrl } from "../../utils/baseUrl";
import { populate } from "../../utils/populate";
import { pageIdEquals } from "../../utils/strapiFilters";

export default async function handler(req, res) {
  const id = req.query.id || null;

  if (!id) return res.status(404).json({ message: "Forbidden" });

  const propertyUrl = `${apiUrl}/properties?${pageIdEquals}${id}&${populate}`;

  const propertyRes = await fetch(propertyUrl);
  let propertyData = await propertyRes.json();

  let response = propertyData.data[0].attributes;

  if (response.suiteDesignFeatures) {
    const { header, list, image } = response.suiteDesignFeatures;
    const items = list.data.map((item) => item.attributes.copy);

    response.suiteDesignFeatures = {
      header,
      items,
      image: baseUrl(image.data.attributes.url),
    };
  }

  if (response.interiorGallery.data) {
    const g = response.interiorGallery.data.map((item) =>
      baseUrl(item.attributes.url),
    );
    response.interiorGallery = g;
  } else {
    response.interiorGallery = null;
  }

  if (response.exteriorGallery.data) {
    const g = response.exteriorGallery.data.map((item) =>
      baseUrl(item.attributes.url),
    );
    response.exteriorGallery = g;
  } else {
    response.exteriorGallery = null;
  }

  if (response.amenityGallery.data) {
    const g = response.amenityGallery.data.map((item) =>
      baseUrl(item.attributes.url),
    );
    response.amenityGallery = g;
  } else {
    response.amenityGallery = null;
  }

  if (response.suiteFinishFeatures) {
    const { header, list, btnCopy } = response.suiteFinishFeatures;
    const items = list.data.map((item) => item.attributes.copy);
    const gallery = response.suiteFinishFeatures.gallery.data.map((item) =>
      baseUrl(item.attributes.url),
    );
    const pdf = response.suiteFinishFeatures?.pdf?.data?.attributes?.url
      ? baseUrl(response.suiteFinishFeatures.pdf.data.attributes.url)
      : null;

    response.suiteFinishFeatures = {
      header,
      items,
      pdf,
      btnCopy,
      gallery,
    };
  }

  const address = {
    id: response.address.id,
    postalCode: response.address.postalCode,
    streetAddress: response.address.streetAddress,
    coords: response.address.coords,
    city: {
      name: response.address.city.data.attributes.name,
      description: response.address.city.data.attributes.description,
    },
    tourLocation: response.address.tourLocation,
  };

  response.address = address;

  if (response?.features?.amenities) {
    const featuresAmenities = response.features.amenities.map((entry) => {
      const { id, name, card, image } = entry;

      return {
        id,
        name,
        copy: card.data?.attributes.copy,
        header: card.data?.attributes.header,
        image: image.data?.attributes.url,
        cardImage: card.data?.attributes.image.data?.attributes.url || null,
      };
    });

    response.features.amenities = featuresAmenities;
  }

  if (response?.features?.gallery?.data) {
    const galleryAmenities = response.features.gallery.data.map((entry) => {
      if (entry.attributes.url) {
        return entry.attributes.url;
      }
    });

    response.features.gallery = galleryAmenities;
  }

  if (response?.orbit?.images?.data) {
    const orbitGalleryImages = response.orbit.images.data.map((img) => {
      if (img.attributes.url) return img.attributes.url;
    });

    const orbitContent = {
      id: response.orbit.id,
      video: response.orbit.video,
      displayOrbit: response.orbit.displayOrbit,
      images: orbitGalleryImages,
    };

    response.orbit = orbitContent;
  }

  if (response?.gallery?.data) {
    const galleryImages = response.gallery.data.map((img) => {
      if (img.attributes.url) return img.attributes.url;
    });

    response.gallery = galleryImages;
  }

  if (response.modelSuites.data.length > 0) {
    const m = response.modelSuites.data.map((item) => {
      const { title, link, copy, image } = item.attributes;

      return {
        title,
        link,
        copy,
        image: baseUrl(image.data.attributes.url),
      };
    });

    response.modelSuites = m;
  } else {
    response.modelSuites = null;
  }

  if (response.faqs) {
    const filterFAQs = (filter) => {
      const f = response.faqs.data
        .filter((item) => item.attributes.category === filter)
        .map((f) => {
          const { item } = f.attributes;

          return {
            question: item.question,
            answer: item.answer,
          };
        });

      return {
        category: filter,
        items: f,
      };
    };

    const building = filterFAQs("building");
    const suites = filterFAQs("suites");
    const application = filterFAQs("application");
    const location = filterFAQs("location");

    const faqsSorted = [building, suites, application, location];

    response.faqs = faqsSorted;
  } else {
    response.faqs = null;
  }

  res.status(200).json(propertyData);
}
