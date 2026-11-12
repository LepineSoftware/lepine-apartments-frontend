import thankYouProperties from "../static/property/thankYouProperties.json";

const propertySlugs = new Set(thankYouProperties.map((p) => p.slug));

export const getThankYouPath = (property) =>
  property && propertySlugs.has(property)
    ? `/property/${property}/thank-you`
    : "/thank-you";

export const redirectToThankYou = (params = {}) => {
  if (typeof window === "undefined") return;

  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      search.set(key, String(value));
    }
  });

  const path = getThankYouPath(params.property);
  const qs = search.toString();
  window.location.assign(qs ? `${path}?${qs}` : path);
};
