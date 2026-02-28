# Tasks

You can run this file as a task file using Mask:
https://github.com/jacobdeichert/mask

## run

> Serve the site locally.

```bash
npx @11ty/eleventy --serve
```

### run build

> Build the site into static files.

```bash
npx @11ty/eleventy
```

## make

Commands to make new entries for the site.

### make article (title)

> Make a new article with the given (quoted) title.

```bash
# Slugify the title
slug=$(echo $title | sed -r "s/[\"\'\`]+//g" | sed -r "s/[^A-Za-z0-9]+/-/g" | tr A-Z a-z)
cat > ./src/articles/${slug}.md << HEREDOC
---
title: $title
---

# $title
HEREDOC
```
