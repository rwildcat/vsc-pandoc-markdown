---
toc-title: Contents
lang: en
title: Pandoc Markdown
subtitle: A `VSCode` extension for wrinting Pandoc Markdown documents using Pandoc
author: Dr Taz
keywords: Markdown, Pandoc, VSCode
bibliography: mybib.bib
csl: ieee
fontsize: 11.5pt
mainfont: Palatino, Georgia, Times, Arial
---

### Abstract

`Pandoc Markdown` allows writing Markdown documents using Pandoc for both typesetting and real-time preview, with no third party renderers nor CSS files, just Pandoc. As a bonus, a curated *Article* CSS is provided, which allows producing documents inspired by those produced by the `article` LaTeX class. This extension requires Pandoc to be available from the command line.


## 1. Introducción

Please see [Pandoc’s Markdown] for detailed documentation about basic and extended Pandoc Markdown.

## 2 Pandoc Markdown


### 2.1 Code

Pre formatted:

~~~
Normal text
Pre formatted
~~~

Source code:

~~~python
# Python
import numpy as np
x = np.linspace(0,np.pi)
print("Hi from Python")
~~~

And:

~~~js
// javascript
const changeColor = (newColor) => {
    const element = document.getElementById('message');
    element.style.color = newColor;
}
~~~

### 2.2 Columns

Columns are specified as a `<div>` of class `.columns`, which contains another `<divs>` of `<.column>` class. `<divs>` are specified in Pandoc Markdown using at least three colons as  `:::` . For example:

	:::{[#label] .columns [attrs]}
	
	:::{.column width="45%"}
	First column contents
	:::
	
	:::{.column width="10%"}
	:::
	
	:::{.column width="45%"}
	Second Column contents
	:::
	
	:::

Which produces something as:

:::{.columns}

:::{.column width="48%;font-style: italic"}
1st Column Lorem ipsum dolor sit amet, consectetur adipiscing elit
:::

:::{.column width="4%"}
:::

:::{.column width="48%;background-color:#eee"}
2nd Column, Lorem ipsum dolor sit amet, consectetur adipiscing elit
:::

:::

### 2.3 Tables

#### i. Simple

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua (see [Table 1](#Table1)).

    incididunt ut labore et dolore magna aliqua (see [Table 1](#Table1)).

    : Tabla 1: Tabla simple []{#Table1}

    | Syntax    | Description |
    | --------- | ----------- |
    | Header    | Title       |
    | Paragraph | Text        |

Which renders as:

: Tabla 1: Tabla simple []{#Table1}

| Syntax    | Description |
| --------- | ----------- |
| Header    | Title       |
| Paragraph | Text        |


#### ii. Aligned

Column alignments are determined by the position of the header text relative to the dashed line below it

    : Table 1.1:  Simple table syntax.

    Right     Left     Center     Default
    -------     ------ ----------   -------
    12          12      12          12
    123         123     123         123
    1           1       1           1

: Table 1.1:  Simple table syntax.

  Right     Left     Center     Default
-------     ------ ----------   -------
12          12      12          12
123         123     123         123
1           1       1           1

Tables using pipes: 

    : Table 2: Using pipes and colons

    | Left      | Centered | Right       |
    |:--------- |:--------:| -----------:|
    | Header    | Title    | Here's this |
    | Paragraph | Text     | And more    |

Which renders as:

: Table 2: Using pipes and colons

| Left      | Centered | Right       |
|:--------- |:--------:| -----------:|
| Header    | Title    | Here's this |
| Paragraph | Text     | And more    |

Or simply:

    : Tabla 2.1: Pipe, simple

    Fruit  | Price ($)  | Existence
    -------|-----------:| :-------:
    apple  | 2.05       | 3 box
    pear   | 1.37       | 2 kg


: Tabla 2.1: Pipe, simple

Fruit  | Price ($)  | Existence
-------|-----------:| :-------:
apple  | 2.05       | 3 box
pear   | 1.37       | 2 kg



### 2.4 Small caps

To write small caps, use the smallcaps class: 

    This is a  [Small caps text]{.smallcaps} , got it?

This is a  [Small caps text]{.smallcaps} , got it?


### 2.5 Figuras

#### i. Simple

    See [Fig. 1](#fig1)

See [Fig. 1](#fig1)


    ![Figure 1: A math plot](figs/plot-3d-small.png){#fig1}

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 

![Figure 1: A math plot](figs/plot-3d-small.png){#fig1}

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 

#### ii. With attributes

See [Fig. 2](#figattrs).

    ![Fig. 2: Image (scaled to width=40% column)](figs/plot-3d-small.png){#figattrs width=40%}

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua (see [Fig Attrs](#figattrs)).

![Fig. 2: Image (scaled to width=40% column)](figs/plot-3d-small.png){#figattrs width=40%}



### 2.6 Aside figures and text

    <aside>

    ![Fig. 3: Aside figure](figs/plot-small.png)

    </aside>

<aside>

![Fig. 3: Aside figure](figs/plot-small.png)

</aside>

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Turpis cursus in hac habitasse platea dictumst quisque sagittis. In ornare quam viverra orci. Mauris rhoncus aenean vel elit. Fames ac turpis egestas maecenas pharetra convallis. Mauris nunc congue nisi vitae suscipit tellus mauris a diam. 

    <aside>
    This text should be located as an `<aside>` insert (right side).
    </aside>

<aside>
This text should be located as an `<aside>` insert (right side).
</aside>

Fames ac turpis egestas integer eget aliquet nibh praesent tristique. Laoreet suspendisse interdum consectetur libero id faucibus nisl tincidunt. Ornare aenean euismod elementum nisi quis. Ipsum dolor sit amet consectetur adipiscing elit ut. Vitae congue mauris rhoncus aenean vel elit scelerisque.


### 2.7 Math

Use one og the math rendering options, such as `--katex` , `--mathjax`, etc.

[]{#xfoo}
Dictumst ac turpis egestas integer dictumst quisque sit amet. A paraghrah. See [ec. 2](#ec-2)


The formula, $y=mx+c$, is displayed inline. Some symbols and equations (such as 
$\sum{x}$ or $\frac{1}{2}$) are rescaled to prevent disruptions to the regular 
line spacing.

For example: []{#ec-2}

$$  f(x)  = \sum_{n=0}^{\infty} \frac {f^{(n)}(a)} {n!} (x-a)^n $$

where:
  : $f^{(n)}(a)$ = the $k$-th derivative of $f$ evaluated at point $a$.

### 2.8 Definitions

    **Term 1:**
    : Definition 1 

    **Term 2:**  
    : Definition 2
    
**Term 1:**
  : Definition 1 

**Term 2:**  
  : Definition 2

### 2.9 Footnotes


Pandoc’s Markdown allows footnotes, using the following syntax:

    Here is a footnote reference[^1], and another one [^longnote].

    [^1]: Here is the footnote.

    [^longnote]: Here's one with multiple blocks.


Here is a footnote reference[^1], and another one [^longnote] .

[^1]: Here is the footnote.

[^longnote]: Here's one with multiple blocks.


### 2.10 Citations

To cite a bibliographic item with an identifier foo [@janarthanan_prediction_2020], use the syntax `[@foo]`. Normal citations should be included in square brackets, with semicolons separating distinct items:

    Blah blah [doe99; smith2000; smith2004].

How this is rendered depends on the citation style [@liepmann_tufte_nodate]. In an author-date style. @liepmann_tufte_nodate says good things.

Citation items may optionally include a prefix, a locator, and a suffix. In

    Blah blah [see @doe99, pp. 33-35 and *passim*; @smith04, chap. 1].

The first item (`@doe99`) has prefix see, `locator pp. 33-35`, and suffix and *passim*. The second item (`@smith04`) has locator `chap. 1` and no prefix or suffix.

You can also write an author-in-text citation, by omitting the square brackets:

    @smith04 says blah.
    @smith04 [p. 33] says blah.

This [@janarthanan_prediction_2020] will cause the author’s name to be rendered, followed by the bibliographical details. Use this form when you want to make the citation the subject of a sentence [@janarthanan_prediction_2020;@liepmann_tufte_nodate].

## References


[Pandoc]: https://pandoc.org/
[VSCode]: https://code.visualstudio.com
[markdown-it]: https://github.com/markdown-it/markdown-it
[Pandoc’s Markdown]: https://pandoc.org/MANUAL.html#pandocs-markdown