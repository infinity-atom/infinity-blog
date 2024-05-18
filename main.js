let logData = [];
const startDate = new Date();

const fs = require("fs");
logData.push("fs module loaded");
console.log("fs module loaded");

const path = require("path");
logData.push("path module loaded");
console.log("path module loaded");

const nunjucks = require("nunjucks");
logData.push("nunjucks module loaded");
console.log("nunjucks module loaded");

const showdown = require("showdown");
logData.push("showdown module loaded");
console.log("showdown module loaded");

const htmlToText = require("html-to-text");
logData.push("html-to-text module loaded");
console.log("html-to-text module loaded");

// Retrive all articles
const articles = fs.readdirSync(path.join(__dirname, "articles"));
logData.push("articles loaded");
console.log("articles loaded");

logData.push("Parsing articles...");
logData.push("");
console.log("Parsing articles...\n");

// Parse each article
let articles_data = [];
articles.forEach((article) => {
    let pushable_article = {};
    
    // Read article file
    const article_content = fs.readFileSync(path.join(__dirname, "articles", article), "utf8");

    var converter = new showdown.Converter({ metadata: true });
    var html = converter.makeHtml(article_content);
    var metadata = converter.getMetadata();

    pushable_article.title = metadata.title;
    pushable_article.date = metadata.date;
    pushable_article.id = metadata.id;
    pushable_article.content = html;
    pushable_article.plaintext = htmlToText.htmlToText(html);
    pushable_article.readableDate = new Date(metadata.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    articles_data.push(pushable_article);
    logData.push(`[+] ${metadata.id}`);
    console.log(`[+] ${metadata.id}`);
});

logData.push("");
logData.push("Articles parsed!");
console.log("\nArticles parsed!");

logData.push("Sorting articles by date...");
console.log("Sorting articles by date...");

// Sort articles by date
articles_data.sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
});

logData.push("Articles sorted!");
console.log("Articles sorted!");

logData.push("");
logData.push("Rendering articles...");
console.log("\nRendering articles...");
// Render articles
const env = nunjucks.configure(path.join(__dirname, "views"), {
    autoescape: true,
});

// Check if the build directory exists, create it if it doesn't
if (!fs.existsSync(path.join(__dirname, "build"))) {
    logData.push("Creating build directory...");
    console.log("Creating build directory...");
    fs.mkdirSync(path.join(__dirname, "build"));
}

if (!fs.existsSync(path.join(__dirname, "build", "article"))) {
    logData.push("Creating article directory...");
    console.log("Creating article directory...");
    fs.mkdirSync(path.join(__dirname, "build", "article"));
}

// Render index
const rendered_index = nunjucks.render("index.njk", { articles: articles_data });
fs.writeFileSync(path.join(__dirname, "build", "index.html"), rendered_index);
logData.push("[+] index.html");
console.log("[+] index.html");

articles_data.forEach((article) => {
    const buildPath = path.join(__dirname, "build", "article");

    const rendered = nunjucks.render("article.njk", { article: article });
    fs.writeFileSync(path.join(buildPath, `${article.id}.html`), rendered);

    logData.push(`[+] article/${article.id}.html`);
    console.log(`[+] article/${article.id}.html`);
});

// include all files in global folder
const globalFiles = fs.readdirSync(path.join(__dirname, "global"));
globalFiles.forEach((file) => {
    fs.copyFileSync(path.join(__dirname, "global", file), path.join(__dirname, "build", file));

    logData.push(`[+] ${file}`);
    console.log(`[+] ${file}`);
});

// write log
const log_rendered = nunjucks.render("article.njk", {
    article: {
        title: "Build Log",
        date: startDate.toISOString(),
        id: "build-log",
        content: `<pre>${logData.join("\n")}</pre>`,
        plaintext: logData.join("\n"),
        readableDate: startDate.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        })
    }
});

fs.writeFileSync(path.join(__dirname, "build", "build-log.html"), log_rendered);