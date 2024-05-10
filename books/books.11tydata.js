module.exports = {
  eleventyComputed: {
    month: (data) =>
      new Intl.DateTimeFormat("es-MX", {
        month: "long",
      }).format(new Date(data.read_at)),
    year: (data) =>
      new Intl.DateTimeFormat("es-MX", {
        year: "numeric",
      }).format(new Date(data.read_at)),
    monthYear: (data) => `${data.month}, ${data.year}`,
    description: (data) => `Quotes and notes of ${data.title}`,
  },
};
