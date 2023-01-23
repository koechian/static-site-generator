# Static Site Generator

## Problem Statement

Design and implement a simple static-site generator. 
It should be able to take a folder containing Markdown (or another non-HTML markup-type format) pages and produce a website. There should be support for a homepage, articles and supporting pages (e.g. an about page and some error pages).

### Solution Flow

1. Import the files
   - Read the files ✅
2. Read and Parse the content
   - Separate the content from headers. ✅
   - Regex expressions are used to parse the content markdown to HTML for consistent content decoration (i.e `#Hello World` -> `<h1> Hello World <h1/>`) ✅
   - Headers must be used to know which page is which.
   - Headers can contain data like:
     - Date ✅
     - Author ✅
     - Topic/Title ✅
     - Page type (homepage, supporting page) ✅
     - Links to other pages
3. Each page can be returned as an object with the metadata and content as properties
4. The object can then be injected into a HTML template. ✅
5. The files are then saved in a generated dist directory and served from that directory. ✅

- For error page maybe one general error page an be used like in GitHub. (research on error handling using JS)
- A watcher script is used to call the builder script to rebuild the files incase of any changes
- However, it does not monitor for change in file contents

## Attributions

1. [Node JS Official Documentation](https://nodejs.dev/en/api/v19)
2. [Markdown Parser](https://randyperkins2k.medium.com/writing-a-simple-markdown-parser-using-javascript-1f2e9449a558) helped me deal with the MD tags to HTML tags conversion
3. [Regex101](https://regex101.com/) for regex testing
4. [Markdownguide](https://www.markdownguide.org/) for markdown research
