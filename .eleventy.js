const { DateTime, Settings } = require("luxon");
const fs = require("fs");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const readingTime = require('eleventy-plugin-reading-time');
const path = require("path");

Settings.defaultLocale = 'en-US';


module.exports = function (eleventyConfig) {
    eleventyConfig.addPlugin(pluginRss);
    eleventyConfig.addPlugin(readingTime);

    eleventyConfig.setDataDeepMerge(true);

    eleventyConfig.addFilter("readableDate", dateObj => {
        if (dateObj instanceof String) {
            dateObj = new Date(dateObj);
        }
        return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat("dd LLLL yyyy");
    });

    eleventyConfig.addFilter("toISOString", dateObj => {
        if (dateObj instanceof String) {
            dateObj = new Date(dateObj)
        }
        return dateObj.toISOString();
    });

    eleventyConfig.addFilter("getTime", dateObj => {
        if (dateObj instanceof String) {
            dateObj = new Date(dateObj)
        }
        return dateObj.getTime();
    });

    // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
    eleventyConfig.addFilter('htmlDateString', dateObj => {
        return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat('yyyy-LL-dd');
    });

    eleventyConfig.addFilter('slugDate', dateObj => {
        return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat('yyyy/LL/dd');
    })

    // Get the first `n` elements of a collection.
    eleventyConfig.addFilter("head", (array, n) => {
        if (n < 0) {
            return array.slice(n);
        }

        return array.slice(0, n);
    });

    // Filter source file names using a glob

    eleventyConfig.addPassthroughCopy("img");
    eleventyConfig.addPassthroughCopy("css");
    eleventyConfig.addPassthroughCopy('robots.txt')
    eleventyConfig.addPassthroughCopy('humans.txt')
    eleventyConfig.addPassthroughCopy('manifest.json')
    eleventyConfig.addPassthroughCopy('.well-known')

    // Browsersync Overrides
    eleventyConfig.setBrowserSyncConfig({
        callbacks: {
            ready: function (err, browserSync) {
                // browserSync.addMiddleware("*", (req, res) => {
                //   const content_404 = fs.readFileSync('_site/404.html'));
                //   res.writeHead(404, { "ContentType": "text/html; charset=UTF-8" })
                //   res.write(content_404);
                //   res.end();
                // });
            },
        },
        ui: false,
        ghostMode: false
    });

    return {
        templateFormats: [
            "md",
            "njk",
            "html",
            "liquid"
        ],

        // If your site lives in a different subdirectory, change this.
        // Leading or trailing slashes are all normalized away, so don’t worry about those.

        // If you don’t have a subdirectory, use "" or "/" (they do the same thing)
        // This is only used for link URLs (it does not affect your file structure)
        // Best paired with the `url` filter: https://www.11ty.io/docs/filters/url/

        // You can also pass this in on the command line using `--pathprefix`
        // pathPrefix: "/",

        markdownTemplateEngine: "njk",
        htmlTemplateEngine: "njk",
        dataTemplateEngine: "njk",

        // These are all optional, defaults are shown:
        dir: {
            input: ".",
            includes: "_includes",
            data: "_data",
            output: "_site"
        }
    };
};
