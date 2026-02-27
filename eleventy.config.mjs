import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import markdownIt from "markdown-it";

// =============================================================================
// Defs
// =============================================================================

function configureGlobalSettings(eleventyConfig) {
  eleventyConfig.addGlobalData("layout", "page.njk");
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
  eleventyConfig.addNunjucksFilter(
    "yyyymmdd",
    (d) => d.toISOString().split("T")[0],
  );
}

function createCustomCollections(eleventyConfig) {
  eleventyConfig.addCollection("articles", (collectionsApi) =>
    collectionsApi
      .getFilteredByGlob("./src/articles/*.md")
      .sort((a, b) => b.date - a.date),
  );
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
