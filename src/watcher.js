// this is a watcher script that watches the markdown dir for changes and calls the builder to rebuild the site based on the new items within

import chokidar from "chokidar";
import path from "path";

function main() {
  const dirPath = path.join(path.resolve(), "markdown/");
  const watcher = chokidar.watch(dirPath, {
    ignored: /(^|[\/\\])\../,
    persistent: true,
  });

  const log = console.log.bind(console);

  watcher.on("add", (dirPath) => log("🆕! New File added"), builder());
  watcher.on(
    "unlink",
    (dirPath) => log("🚮 A file has been removed"),
    builder()
  );
}
main();
