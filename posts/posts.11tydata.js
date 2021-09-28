module.exports = {
    eleventyComputed: {
        month: data => new Intl.DateTimeFormat('en-US', {
            month: 'long',
        }).format(new Date(data.published_at)),
        year: data => new Intl.DateTimeFormat('en-US', {
            year: 'numeric'
        }).format(new Date(data.published_at)),
        monthYear: data => `${data.month}, ${data.year}`
    }
}