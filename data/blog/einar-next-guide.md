---
title: Einar Next-JS
date: '2021-03-08'
tags: ['markdown', 'code', 'next']
draft: false
summary: Best Next guide ever!
---

## Next JS

**Einar Löf och Next.js** ger dig den bästa utvecklarupplevelsen med all kunskap  alla funktioner du behöver för produktion: hybrid-static, pre-fetching, serverrendering och mer . Ingen konfiguration behövs.

[https://nextjs.org ](https://nextjs.org/docs/getting-started)- document!
[Nextjs.org](https://nextjs.org/docs/getting-started)



![Next](/static/images/project/next-black1.jpeg)

Skapa en sidkatalog i ditt projekt.
Berika  `./pages/index.js` med följande innehåll:

```javascript
function HomePage() {
  return <div>
  Welcome to Next.js! This is your HomePage!!!
  </div>
}

export default HomePage
```
Exempel: Om du skapar `pages/about.js` som exporterar en React-komponent som nedan, kommer den att finnas tillgänglig på `/about.`'


```javascript
function About() {
  return <div>About</div>
}

export default About
```

## Pages with Dynamic Routes

[Github](https://github.com/vercel/next.js/tree/canary/examples/dynamic-routing)- Dynamic Routes
[Nextjs.org](https://nextjs.org/docs/basic-features/pages#pages-with-dynamic-routes)

**Next.js** stöder sidor med dynamiska routes. Om du till exempel skapar en fil som heter `pages/posts/[id].js`, kommer den att vara tillgänglig på `posts/1`, `posts/2`, etc.

## Två former av för-rendering (Pre-rendering)

Next.js har två former av pre-rendering: Statisk generering och Serverrendering "Static Generation and Server-side Rendering". Skillnaden är **NÄR** den genererar HTML för en sida.

-   **Static Generation**(rekommenderas): HTML genereras vid byggtiden och kommer att återanvändas vid varje begäran.

-   **Server-side Rendering:** HTML genereras vid varje begäran.


## Statisk generation (Static Generation) utan data

**Next.js** förinställer som standard sidor med statisk generation **(Static Generation)** utan att hämta data **(fetching data)**. Här är ett exempel:

```Javascript
function About() {
  return <div>About</div>
}

export default About
```
Observera att den här sidan inte behöver hämta (fetch) externa data som ska återanvändas. I sådana fall genererar Next.js en enda HTML-fil per sida under byggtiden.

## Statisk generation (Static Generation) med data

Vissa sidor kräver hämtning (fetching) av extern data för för-rendering (pre-rendering). Det finns två scenarier, och en eller båda kan gälla. I båda fallen kan du använda en specialfunktion Next.js tillhandahåller:

1.  Ditt sidinnehåll **(page content)** beror på extern data  : Använd `getStaticProps`.
2.  Dina sidvägar **(page paths)** beror på extern data: Använd `getStaticPaths` (vanligtvis som tillägg utöver `getStaticProps`).

### Scenario 1: Ditt sidinnehåll beror på externa data
**Exempel:** Din bloggsida kan behöva hämta listan över blogginlägg från ett CMS (content management system).

```javascript
// Att Göra: Du behöver hämta (fetch)`posts`
//(genom att kontakta någon API-endpoint)
// innan denna sida kan bli för-renderad (pre-rendered).

// OBS! - API-endpoint- Definierar adressen eller anslutningspunkten till en webbtjänst.
// Det representeras vanligtvis av en enkel HTTP-URL-sträng.

function Blog({ posts }) {
  return (
    <ul>
      {posts.map((post) => (
        <li>{post.title}</li>
      ))}
    </ul>
  )
}

export default Blog
```
För att hämta dessa data vid förrendering tillåter Next.js dig att `export` en `async` funktion som heter `getStaticProps` från samma fil. Denna funktion kallas vid byggtid och låter dig skicka hämtad data till sidans rekvisita `props` vid för-rendering (pre-render).


```javascript
function Blog({ posts }) {
  // Render posts...
}

// This function gets called at build time
export async function getStaticProps() {
  // Call an external API endpoint to get posts
  const res = await fetch('https://.../posts')
  const posts = await res.json()

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      posts,
    },
  }
}

export default Blog
```
För att lära dig mer om hur `getStaticProps` fungerar, kolla in [dokumentationen för datahämtning ](https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation) ( **Data Fetching**).






### Scenario 2: Dina sidvägar beror på externa data

**Next.js** låter dig skapa sidor med **dynamiska routes**. Du kan till exempel skapa en fil som heter `pages/posts/[id].js `för att visa ett enskilt blogginlägg baserat på id. Detta gör att du kan visa ett bloggpost med `id: 1 `när du öppnar `posts/1`.

För att lära dig mer om dynamisk routing, se dokumentationen för dynamisk routing. [dokumentationen för dynamisk routing](https://nextjs.org/docs/routing/dynamic-routes)


Vilket `id` du vill **för-rendera (pre-render)** vid byggtiden kan dock bero på extern data.

**Exempel**: antag att du bara har lagt till ett blogginlägg (med `id: 1`) i databasen. I det här fallet vill du bara återge `posts/1` vid byggtiden.

Senare kan du lägga till det andra inlägget/posten med `id: 2.` Då vill du också **för-rendera(pre-render)** `posts/2` också.

Så dina sidors **vägar/paths** som är återgivna **(pre-rendered )**  beror på externa data. För att hantera detta låter **Next.js** dig att  `export` en `async` en funktion som heter `getStaticPaths` från en dynamisk sida ( `pages/posts/[id].js` i detta fall). Denna funktion anropas vid byggtiden och låter dig ange vilka sökvägar du vill återge **( pre-render.).** 


```javascript
//This function gets called at build time
// Denna funktion kallas vid byggtiden
export async function getStaticPaths() {
    //Call an external API endpoint to get posts
  // Kontakta en extern API-slutpunkt för att få/get posts
  const res = await fetch('https://.../posts')
  const posts = await res.json()

  // Get the paths we want to pre-render based on posts
  //Skaffa de banor som vi vill göra på förhand baserat på inlägg
  const paths = posts.map((post) => ({
    params: { id: post.id },
  }))

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
// Vi återförhandlar endast dessa banor vid byggtiden.
   // {fallback: false} betyder att andra rutter ska 404. 
  return { paths, fallback: false }
}
```
Även på `pages/posts/[id].js` måste du exportera `getStaticProps` så att du kan hämta data om inlägget med detta `id` och använda det för att för-rendera (**pre-render**) sidan:

```javascript
function Post({ post }) {
  // Render post...
}

export async function getStaticPaths() {
  // ...
}

// This also gets called at build time
export async function getStaticProps({ params }) {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  const res = await fetch(`https://.../posts/${params.id}`)
  const post = await res.json()

  // Pass post data to the page via props
  return { props: { post } }
}

export default Post
}
```
För att lära dig mer om hur `getStaticPaths` fungerar, kolla in [dokumentationen för datafetching](https://nextjs.org/docs/basic-features/data-fetching#getstaticpaths-static-generation).

## När ska jag använda Statisk generation? 
Vi rekommenderar att du använder Static Generation (med och utan data) när det är möjligt eftersom din sida kan byggas en gång och serveras av CDN, vilket gör den mycket snabbare än att ha en server som renderar sidan vid varje begäran.

Du kan använda en Statisk generation för många typer av sidor, inklusive:
- Marketing pages
- Blog posts
- E-commerce product listings
- Help and documentation


## Server-side Rendering

> Kallas också "SSR" eller "Dynamic Rendering".

För att använda Rendering på serversidan för en sida måste du `export `en `async` funktion som heter `getServerSideProps`. Denna funktion anropas av servern vid varje begäran.

Antag till exempel att din sida måste återge ofta uppdaterade data (hämtade från ett externt API). Du kan då skriva getServerSideProps som hämtar dessa data och skickar den till `page` som nedan:

```javascript
function Page({ data }) {
  // Render data...
}

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`https://.../data`)
  const data = await res.json()

  // Pass data to the page via props
  return { props: { data } }
}

export default Page
```
Som du kan se liknar `getServerSideProps` `getStaticProps`, men skillnaden är att `getServerSideProps` körs på varje begäran istället för på byggtiden.

För att lära dig mer om hur `getServerSideProps` fungerar, kolla in [dokumentationen för datafetching](https://nextjs.org/docs/basic-features/data-fetching#getstaticpaths-static-generation).

## Sammanfattning
Vi har diskuterat **två former** av förrendering för Next.js.

> **Statisk generering (rekommenderas)**: HTML genereras vid **byggtiden** och kommer att återanvändas vid varje begäran. För att en sida ska använda Static Generation, exportera antingen sidkomponenten eller exportera `getStaticProps` (och `getStaticPaths` om det behövs). Det är bra för sidor som kan återanvändas före användarens begäran. Du kan också använda den med Rendering på klientsidan för att få in ytterligare data.
> 
> **Rendering på serversidan (Server-side Rendering:**): HTML genereras vid varje begäran. Exportera `getServerSideProps` om du vill att en sida ska använda Rendering på serversidan. Eftersom Rendering på serversidan resulterar i långsammare prestanda än Static Generation, använd endast detta om det är absolut nödvändigt.



















![Följa John](/static/images/lek/folja-john.jpg)

![Diskmedel](/static/images/lek/diskmedel.jpg)

![Dragkamp](/static/images/lek/dragkamp.jpg)










![GitHub Logo](https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png)

# Introduction




https://www.markdownguide.org/basic-syntax/


**Bryta rader md file**
```
The action of every agent <br />
  into the world <br />
starts <br />
  from their physical selves. <br />
```

Markdown and Mdx parsing is supported via `unified`, and other remark and rehype packages. `next-mdx-remote` allows us to parse `.mdx` and `.md` files in a more flexible manner without touching webpack.

Github flavored markdown is used. `mdx-prism` provides syntax highlighting capabilities for code blocks. Here's a demo of how `Einar` everything looks.

The following markdown cheatsheet is adapted from: https://guides.github.com/features/mastering-markdown/

# What is Markdown?

Markdown is a way to style text on the web. You control the display of the document; formatting words as bold or italic, adding images, and creating lists are just a few of the things we can do with Markdown. Mostly, Markdown is just regular text with a few non-alphabetic characters thrown in, like `#` or `*`.

# Syntax guide

Here’s an overview of Markdown syntax that you can use anywhere on GitHub.com or in your own text files.

## Headers

```
# This is a h1 tag

## This is a h2 tag

#### This is a h4 tag
```

# This is a h1 tag

## This is a h2 tag

#### This is a h4 tag

## Emphasis

```
_This text will be italic_

**This text will be bold**

_You **can** combine them_
```

_This text will be italic_

**This text will be bold**

_You **can** combine them_

## Lists

### Unordered

```
- Item 1
- Item 2
  - Item 2a
  - Item 2b
```

- Item 1
- Item 2
  - Item 2a
  - Item 2b

### Ordered

```
1. Item 1
1. Item 2
1. Item 3
   1. Item 3a
   1. Item 3b
```

1. Item 1
1. Item 2
1. Item 3
   1. Item 3a
   1. Item 3b

## Images

```
![GitHub Logo](https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png)
Format: ![Alt Text](url)
```

![GitHub Logo](https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png)

## Links

```
http://github.com - automatic!
[GitHub](http://github.com)
```

http://github.com - automatic!
[GitHub](http://github.com)

## Blockquotes

```
As Kanye West said:

> We're living the future so
> the present is our past.
```

As Kanye West said:

> We're living the future so
> the present is our past.

## Inline code

```
I think you should use an
`<addr>` element here instead.
```

I think you should use an
`<addr>` element here instead.

## Syntax highlighting

Here’s an example of how you can use syntax highlighting with [GitHub Flavored Markdown](https://help.github.com/articles/basic-writing-and-formatting-syntax/):

````
```js:fancyAlert.js
function fancyAlert(arg) {
  if (arg) {
    $.facebox({ div: '#foo' })
  }
}
````

And here's how it looks - nicely colored with styled code titles!

```js:fancyAlert.js
function fancyAlert(arg) {
  if (arg) {
    $.facebox({ div: '#foo' })
  }
}
```

## Task Lists

```
- [x] list syntax required (any unordered or ordered list supported)
- [x] this is a complete item
- [ ] this is an incomplete item
```

- [x] list syntax required (any unordered or ordered list supported)
- [x] this is a complete item
- [ ] this is an incomplete item

## Tables

You can create tables by assembling a list of words and dividing them with hyphens `-` (for the first row), and then separating each column with a pipe `|`:

```
| First Header                | Second Header                |
| --------------------------- | ---------------------------- |
| Content from cell 1         | Content from cell 2          |
| Content in the first column | Content in the second column |
```

| First Header                | Second Header                |
| --------------------------- | ---------------------------- |
| Content from cell 1         | Content from cell 2          |
| Content in the first column | Content in the second column |

## Strikethrough

Any word wrapped with two tildes (like `~~this~~`) will appear ~~crossed out~~.