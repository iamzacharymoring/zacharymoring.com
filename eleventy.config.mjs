import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import markdownIt from "markdown-it";

export default async function (eleventyConfig) {
  // Globally set a default template
  eleventyConfig.addGlobalData("layout", "page.njk");

  // Plugins
  eleventyConfig.addPlugin(syntaxHighlight);

  // Customize markdown rendering
  let md = new markdownIt();
  const defaultRender = md.renderer.rules.fence;
  md.renderer.rules.fence = (tokens, idx, options, env, slf) => {
    let html = defaultRender(tokens, idx, options, env, slf);
    html = `<div class="box">${html}</div>`;
    return html;
  };
  eleventyConfig.setLibrary("md", md);
}

export const config = {
  dir: {
    input: "src",
    output: "public",
  },
};
