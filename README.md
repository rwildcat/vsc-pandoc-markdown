# Pandoc Markdown README

A VS Code extension for writing (with live preview) Markdown documents using [Pandoc].

## Features

* Fully supports all Pandoc extensions (metadata, bibliography, etc.)
* Provides full Pandoc live previewing
* Provides an enhanced *Article* (CSS) style
* Allows user-defined extra Pandoc command line options
* Provides a function to exports to HTML
* Access to local media from rendered preview panel (images, etc.)
* Fully configurable via header YAML metadata

## Requirements

Requieres [Pandoc] available from command line.

## Provides

* `Pandoc Markdown: Open Preview`: ([Ctrl-Shft-R] Win / [Cmd-Shft-R] Mac) Renders the current file in editor and opens a live display for showing the results. Result and render are processed by Pandoc.
* `Pandoc Markdown: Export to HTML`: Exports current file in editor to HTML format. Result will be located in the same directory as source `.md` file.

## Extension Settings

This extension contributes the following settings:

* `ArticleStyle`: (boolean) - Set to use the provided `Article` style 
* `minimumWaitInterval`: (number; default: 750) - The minimum amount of time (in milliseconds) to wait after a pandoc subprocess exits before starting a new one
* `extraPandocArguments`:(string) - Extra command-line arguments to use when invoking pandoc. Arguments should be separated with spaces

## Typical metadata header (YAML)

A common set of metadata variables are as follows:

      ---
      title: Lorem ipsum
      subtitle: Lorem ipsum dolor sit amet consectetur adipiscing
      author: Dr Taz
      keywords: Markdown, Pandoc, VSCode
      bibliography: mybib.bib
      csl: https://raw.githubusercontent.com/citation-style-language/styles/master/ieee.csl
      fontsize: 11.5pt
      mainfont: Arial, Palatino, Georgia, Times
      ---

At least setting `fontsize` and `mainfont` variables is strongly recommended when using Pandoc.

For a review of all metadata variables available, please see Pandoc's reference [yaml_metadata_block], [Metadata variables], [Language variables] and [Variables for HTML].

Please note that the YAML metadata block must occur at the beginning of the document (and there can be only one). If multiple files are given as arguments to pandoc, only the first can be a YAML metadata block.

## Preview

![vide](intro.gif)

## Known Issues


* TBD

## Acknowledgements

This extension is based on the [Pandoc Markdown Preview] extension by kzvi. Unfortunately, it appears to be outdated and with some issues, such as error accessing local media from the rendered preview.

The *Article* style was inspired by [Tufte CSS] by Dave Liepmann.

[Markdown](https://icons8.com/icon/50145/markdown) icon by [Icons8](https://icons8.com).

Thanks!

## Releases

* **0.1.0**, Jul/13/21

   Initial release

---

## For more information

To fully take advantege of the extended Pandoc Markdown version, please see the [Pandoc User’s Guide], especially the [extensions] section and of course the specific [Pandoc’s Markdown] section.


## References

* Pandoc: <https://pandoc.org>
* Pandoc Markdown Preview: <https://marketplace.visualstudio.com/items?itemName=kzvi.pandoc-markdown-preview>
* Pandoc User’s Guide: <https://pandoc.org/MANUAL.html>
* extensions: <https://pandoc.org/MANUAL.html#extensions>
* Pandoc’s Markdown: <https://pandoc.org/MANUAL.html#pandocs-markdown>
* Tufte CSS: <https://edwardtufte.github.io/tufte-css/>
* YAML metadata block: <https://pandoc.org/MANUAL.html#extension-yaml_metadata_block>
* Metadata variables: <https://pandoc.org/MANUAL.html#metadata-variables>
* Language variables: <https://pandoc.org/MANUAL.html#language-variables>
* Variables for HTML: <https://pandoc.org/MANUAL.html#variables-for-html>


**Enjoy!**


[Pandoc]: https://pandoc.org
[Pandoc Markdown Preview]: https://marketplace.visualstudio.com/items?itemName=kzvi.pandoc-markdown-preview
[Pandoc User’s Guide]: https://pandoc.org/MANUAL.html
[extensions]: https://pandoc.org/MANUAL.html#extensions
[Pandoc’s Markdown]: https://pandoc.org/MANUAL.html#pandocs-markdown
[Tufte CSS]: https://edwardtufte.github.io/tufte-css/
[yaml_metadata_block]: https://pandoc.org/MANUAL.html#extension-yaml_metadata_block
[Metadata variables]: https://pandoc.org/MANUAL.html#metadata-variables
[Language variables]: https://pandoc.org/MANUAL.html#language-variables
[Variables for HTML]: https://pandoc.org/MANUAL.html#variables-for-html
