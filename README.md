# Problem Statement

Design and implement a simple static-site generator. 
It should be able to take a folder containing Markdown (or another non-HTML markup-type format) pages and produce a website. There should be support for a homepage, articles and supporting pages (e.g. an about page and some error pages).

### Solution Flow

1. Import the files/zip
   - Unzip
   - Read the files
2. Read and Parse the content
   - Separate the content from headers.
   - Regex expressions are used to parse the content markdown to HTML for consistent content decoration (i.e `#Hello World` -> `<h1> Hello World <h1/>`)
   - Headers must be used to know which page is which.
   - Headers can contain data like:
     - Date
     - Author
     - Topic/Title
     - Page type (homepage, supporting page)
     - Links to other pages
3. Each page can be returned as an object with the metadata and content as properties
4. The object can then be injected into a HTML template.
5. The files are then saved and served.

For error page maybe one general error page an be used like in GitHub. (research on error handling using JS)
