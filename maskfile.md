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

## add

Commands to add new entries on the site.

### add article (title)

> Add a new article with the given (quoted) title.

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

### add stats

Add stats for a specific game. In this case, each game is a subcommand, so that
only valid game names (queens, tango, or mini-sudoku) are allowed.

#### add stats queens (my_time) (avg_time)

> Add a Queens score.

```bash
# Convert time stamps to seconds
if [[ "$my_time" =~ ":" ]]; then
    mtime=$(echo $my_time | awk -F: '{ print ($1 * 60) + $2 }')
else
    mtime=$my_time
fi

if [[ "$avg_time" =~ ":" ]]; then
    atime=$(echo $avg_time | awk -F: '{ print ($1 * 60) + $2 }')
else
    atime=$avg_time
fi

dtime=$(( $mtime - $atime ))

# Write out
cat >> ./src/things/stats.toml << HEREDOC

[[queens]]
date = "$(date -Idate)"
me = $mtime
avg = $atime
diff = $dtime
HEREDOC
```

#### add stats tango (my_time) (avg_time)

> Add a Tango score.

```bash
# Convert time stamps to seconds
if [[ "$my_time" =~ ":" ]]; then
    mtime=$(echo $my_time | awk -F: '{ print ($1 * 60) + $2 }')
else
    mtime=$my_time
fi

if [[ "$avg_time" =~ ":" ]]; then
    atime=$(echo $avg_time | awk -F: '{ print ($1 * 60) + $2 }')
else
    atime=$avg_time
fi

dtime=$(( $mtime - $atime ))

# Write out
cat >> ./src/things/stats.toml << HEREDOC

[[tango]]
date = "$(date -Idate)"
me = $mtime
avg = $atime
diff = $dtime
HEREDOC
```

#### add stats mini-sudoku (my_time) (avg_time)

> Add a Mini Sudoku score.

```bash
# Convert time stamps to seconds
if [[ "$my_time" =~ ":" ]]; then
    mtime=$(echo $my_time | awk -F: '{ print ($1 * 60) + $2 }')
else
    mtime=$my_time
fi

if [[ "$avg_time" =~ ":" ]]; then
    atime=$(echo $avg_time | awk -F: '{ print ($1 * 60) + $2 }')
else
    atime=$avg_time
fi

dtime=$(( $mtime - $atime ))

# Write out
cat >> ./src/things/stats.toml << HEREDOC

[[minisudoku]]
date = "$(date -Idate)"
me = $mtime
avg = $atime
diff = $dtime
HEREDOC
```
