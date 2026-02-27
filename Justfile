serve:
	@npx @11ty/eleventy --serve

build:
	@npx @11ty/eleventy

make $kind $title:
	#!/usr/bin/env bash

	case $kind in
		"article")
			fname=${title//[\"\'\`]/}		# Delete all quotes
			fname=${fname//[^A-Za-z0-9]/-}	# Replace nonalphanumeric with -
			fname=${fname,,}				# Force lowercase

			cat > ./src/articles/${fname}.md <<- EOF
			---
			title: $title
			---

			# $title
			EOF
			;;

		*)
			exit 1;
			;;
	esac
