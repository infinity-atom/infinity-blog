---
title: Creating the blog
id: creating-the-blog
date: 2024-05-18
---

Hi all! Welcome to my new blog! I had this idea when I saw [my friend](https://novafox.tech) creating their blog.

They were using [11ty](https://www.11ty.dev) to create their blog, but I felt like doing everything myself.
To create this blog, I have used the following

- `nunjucks` to create the templates
- `showdown` to parse the markdown, and
- `html-to-text` for getting plaintext from the HTML

I have two nunjucks templates, one for the homepage and one for the articles, and to retrive the articles and parse them,
I have some NodeJS running in the background, using GitHub Actions.

This blog website is static and each article is a markdown file. For example, the top of this markdown file contains this:
```yaml
---
title: Creating the blog
id: creating-the-blog
date: 2024-05-18
---
```
It includes the title, id and date. The title is the name of the article shown to the user, and the ID is what is used in URLs.
The date is just an ISO8601 formatted date that is parsed into a human readable date later on. The actual article contents is
regular markdown.

## Compiling the article
Each article is compiled to HTML using `showdown`, and all the metadata and plaintext is put into an object like this:
```javascript
{
    title: "Article",
    id: "article",
    date: "2024-05-18",
    content: "<p>Hello!</p>",
    plaintext: "Hello!",
    readableDate: "May 18, 2024"
}
```
The information is then formatted into a nunjucks template.

## Website styling
I used Bootstrap 5 to create the website layout, and it might be pretty obvious if you've worked with Bootstrap before.
Bootstrap dosen't contain any builtin code styling, so I have used [PrismJS](https://prismjs.com) which automatically
recognises the `.language-?????` classes, which showdown automatically creates.

## The homepage
To create the homepage, I have just created an array of article objects (shown before) which is sorted by date.
They get shown in a Bootstrap card along with its date and title.

<details>
<summary>Nunjucks code</summary>
```html
<ul class="list-unstyled" id="blog-articles">
    {%for article in articles%}
        <li class="mb-2">
            <div class="card">
                <div class="card-body">
                    <h4 class="lead"><b>{{ article.title }}</b> &bull; <span> {{ article.readableDate }} </span></h4>
                    {{ article.plaintext | truncate(200) }}
                </div>
                <div class="card-footer">
                    <a href="/article/{{ article.id }}">Read more</a>
                </div>
            </div>
        </li>
    {%endfor%}
</ul>
```
</details>

## Fancy build log
I created [this page](/build-log) that has the log from the latest build. You can also view it by going to the GitHub actions tab.

Thanks for reading my first article! This was a cool project, and the source code can also be viewed on [GitHub](https://github.com/infinity-atom/infinity-blog).