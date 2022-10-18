exports.getDate = function () {
  const day = new Date();
  const options = {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  return day.toLocaleDateString(undefined, options);
};
