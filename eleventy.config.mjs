import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import markdownIt from "markdown-it";
import toml from "@iarna/toml";

// =============================================================================
// Defs
// =============================================================================

function configureGlobalSettings(eleventyConfig) {
  eleventyConfig.addGlobalData("layout", "page.njk");

  // Add TOML data support
  eleventyConfig.addDataExtension("toml", (contents) => toml.parse(contents));
}

function configureMarkdownExtensions(eleventyConfig) {
  eleventyConfig.addPlugin(syntaxHighlight);

  let md = new markdownIt();
  const defaultRender = md.renderer.rules.fence;
  md.renderer.rules.fence = (tokens, idx, options, env, slf) => {
    let html = defaultRender(tokens, idx, options, env, slf);
    html = `<div class="box">${html}</div>`;
    return html;
  };

  eleventyConfig.setLibrary("md", md);
}

function createCustomFilters(eleventyConfig) {
  eleventyConfig.addNunjucksFilter("startswith", (s, p) => s.startsWith(p));
  eleventyConfig.addNunjucksFilter("take", (arr, n) => arr.slice(0, n));
  eleventyConfig.addNunjucksFilter("concat", (arr1, arr2) => arr1.concat(arr2));
  eleventyConfig.addNunjucksFilter("annotate", (arr, key, value) =>
    (arr ?? []).map((x) => ({ ...x, [key]: value })),
  );
  eleventyConfig.addNunjucksFilter(
    "yyyymmdd",
    (d) => d.toISOString().split("T")[0],
  );
  eleventyConfig.addNunjucksFilter("latest", (arr) =>
    (arr ?? []).sort((a, b) => (b.date < a.date ? -1 : 1)),
  );
  eleventyConfig.addNunjucksFilter("astimer", (t, mode = "") => {
    const time = Math.abs(t);
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    const m = String(minutes);
    const ss = String(seconds).padStart(2, "0");

    const prefix = mode === "diff" ? (t < 0 ? "-" : "+") : "";
    return `${prefix}${m}:${ss}`;
  });
}

function createCustomCollections(eleventyConfig) {
  eleventyConfig.addCollection("articles", (collectionsApi) =>
    collectionsApi
      .getFilteredByGlob("./src/articles/*.md")
      .sort((a, b) => b.date - a.date),
  );
  eleventyConfig.addCollection("things", (collectionsApi) => {
    const md = collectionsApi.getFilteredByGlob("./src/things/*.md");
    const njk = collectionsApi.getFilteredByGlob("./src/things/*.njk");
    const things = md.concat(njk);

    return things.sort((a, b) => {
      return a.data.title < b.data.title ? -1 : 1;
    });
  });
}

// =============================================================================
// Exports
// =============================================================================

export default async function (eleventyConfig) {
  configureGlobalSettings(eleventyConfig);
  configureMarkdownExtensions(eleventyConfig);
  createCustomFilters(eleventyConfig);
  createCustomCollections(eleventyConfig);
}

export const config = {
  dir: {
    input: "src",
    output: "public",
  },
};
