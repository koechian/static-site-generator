import fs from "fs";
import matter from "gray-matter";
import path from "path";

// a function to read and return the markdown file and the template file
const readFiles = (templateFilepath, markdownFilepath) => {
  // try catch block as we are dealing with paths that may break
  try {
    // Read the markdown from a given path
    const raw = fs.readFileSync(markdownFilepath, "utf-8");
    const parsed = matter(raw);

    // also reads the template from a path
    const template = fs.readFileSync(templateFilepath, "utf-8");

    // returns the template as a string and the parsed md file as an object
    return { template, parsed };
  } catch (err) {
    console.error(err);
  }
};

// this function takes in both files from readMd (template.html and the parsed markdown file and replaces the contents in the template based on the parsed md file)

const mergeFiles = (files) => {
  // replacing the markdown tags in the markdown contents with HTML ones

  var content = processContent(files.parsed.content);
  // replacing the data in the template with the parsed md file
  var replaced = files.template
    .replace(/<!-- HEADER -->/, files.parsed.data.title)
    .replace(/<!-- AUTHOR -->/, files.parsed.data.author)
    .replace(/<!-- DATE -->/, files.parsed.data.date)
    .replace(/<!-- CONTENT -->/, content.processed);

  // the result of the above grep functions is returned to be used as the HTML content
  saveFile(replaced, files.parsed.data.type);
};

// processing the content to change common markdown format to html tags
const processContent = (content) => {
  const processed = content
    .replace(/^### (.*$)/gim, "<h3>$1</h3>")
    .replace(/^## (.*$)/gim, "<h2>$1</h2>")
    .replace(/^# (.*$)/gim, "<h1>$1</h1>")
    .replace(/\*\*(.*)\*\*/gim, "<b>$1</b>")
    .replace(/\*(.*)\*/gim, "<i>$1</i>");

  return { processed };
};

// saving the generated HTML files into the dist directory
const saveFile = (content, type) => {
  // to consider a case where the dist directory already exists, I used the recursive mode of fs.mkdir()
  var dirpath = path.join(path.resolve(), "dist/");
  fs.mkdirSync(dirpath, { recursive: true }, (err) => {
    if (err) throw err;
  });
  fs.writeFile(path.join(dirpath, type.concat(".html")), content, (err) => {
    if (err) throw err;
  });
};

// the various file paths
var filepath = path.join(path.resolve(), "src/markdown/test.md");
var templatepath = path.join(path.resolve(), "src/templates/template.html");

const output = mergeFiles(readFiles(templatepath, filepath));
