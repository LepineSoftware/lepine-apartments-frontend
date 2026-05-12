export const redirectToThankYou = (params = {}) => {
  if (typeof window === "undefined") return;

  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      search.set(key, String(value));
    }
  });

  const qs = search.toString();
  window.location.assign(qs ? `/thank-you?${qs}` : "/thank-you");
};
