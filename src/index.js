import fs from "fs";
import matter from "gray-matter";
import path from "path";

// This was converted into a function to enable easier calls to read multiple files

const readMd = (templateFilepath, markdownFilepath) => {
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

var filepath = path.join(path.resolve(), "src/markdown/test.md");
var templatepath = path.join(path.resolve(), "src/templates/template.html");

const merge = (files) => {
  files.template
    .replace(/<!-- HEADER -->/, files.parsed.data.title)
    .replace(/<!-- AUTHOR -->/, files.parsed.data.author)
    .replace(/<!-- DATE -->/, files.parsed.data.date)
    .replace(/<!-- CONTENT -->/, files.parsed.content);
};

merge(readMd(templatepath, filepath));
