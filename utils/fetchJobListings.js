const { appUrl } = require("./appUrl");

module.exports = async () => {
  const url = `${appUrl}/api/careers`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};
