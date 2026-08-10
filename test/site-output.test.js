const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { spawnSync } = require("node:child_process");
const test = require("node:test");

const projectRoot = path.resolve(__dirname, "..");

test("the clean script does not rely on an undeclared transitive binary", () => {
  const packageJson = JSON.parse(
    fs.readFileSync(path.join(projectRoot, "package.json"), "utf8")
  );

  assert.doesNotMatch(packageJson.scripts.clean, /\brimraf\b/);
  assert.match(packageJson.scripts.clean, /rmSync/);
});

test("the production build includes the complete posts feed", () => {
  const build = spawnSync("npm", ["run", "build"], {
    cwd: projectRoot,
    encoding: "utf8",
  });

  const buildOutput = `${build.stdout}\n${build.stderr}`;
  assert.equal(build.status, 0, buildOutput);
  assert.doesNotMatch(buildOutput, /matching all of `node_modules`/);

  const stylesheet = fs.readFileSync(
    path.join(projectRoot, "_site", "base.css"),
    "utf8"
  );
  assert.match(stylesheet, /\.text-6xl/);
  assert.match(stylesheet, /\.prose/);
  assert.match(stylesheet, /\.decoration-emerald-700/);
  assert.match(stylesheet, /\.md\\:prose-xl/);
  assert.match(stylesheet, /\.prose-a\\:hover\\:underline/);
  assert.doesNotMatch(stylesheet, /\.hover\\:prose-a\\:underline:hover/);

  for (const output of [
    "index.html",
    "about/index.html",
    "books/index.html",
    "archive/index.html",
    "cant-stop-playing/index.html",
    "the-beginning-of-infinity/index.html",
  ]) {
    assert.ok(
      fs.existsSync(path.join(projectRoot, "_site", output)),
      `expected _site/${output} to exist`
    );
  }
  for (const privatePath of [
    ".agents",
    ".codex",
    ".github",
    ".hermes",
    ".impeccable",
    "DESIGN.md",
  ]) {
    assert.ok(
      !fs.existsSync(path.join(projectRoot, "_site", privatePath)),
      `${privatePath} must not be published`
    );
  }

  const about = fs.readFileSync(
    path.join(projectRoot, "_site", "about", "index.html"),
    "utf8"
  );
  assert.match(about, /Moved to Rio de Janeiro, Brazil\./);

  const book = fs.readFileSync(
    path.join(projectRoot, "_site", "the-beginning-of-infinity", "index.html"),
    "utf8"
  );
  assert.match(book, /No man ever steps in the same river twice/);

  const feedPath = path.join(projectRoot, "_site", "feed.xml");
  assert.ok(fs.existsSync(feedPath), "expected _site/feed.xml to exist");

  const feed = fs.readFileSync(feedPath, "utf8");
  assert.match(feed, /<feed xmlns="http:\/\/www\.w3\.org\/2005\/Atom">/);
  assert.match(feed, /<title>David Ojeda López<\/title>/);
  assert.match(feed, /<link href="https:\/\/davidojeda\.dev\/cant-stop-playing\/"/);
  assert.match(feed, /<content type="html">&lt;p&gt;/);
  assert.doesNotMatch(feed, /<!\[CDATA\[/);
  assert.equal((feed.match(/<entry>/g) || []).length, 6);
});
