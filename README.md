# `jharlow.dev`

This is a simple fork of [Hylia](https://hylia.website) by [Andy Bell](https://twitter.com/hankchizljaw) and [friends](https://github.com/aarongustafson/hylia/graphs/contributors).

While I'm open-sourcing this project because some people might be interested in the styles and custom components I've introduced, if you are making your own blog, I recommend starting with the [Hylia base blog](https://github.com/Andy-set-studio/hylia) rather than forking this repo. I found it easy to configure, and it only took a few evenings of tinkering to style it to my preferences.

## Using this repo yourself

If you do want to use this repo as is, please observe the following requests:

- ✅ **Do**: Feel free to copy the styling, JS, etc.
- ✅ **Do**: Leave attribution to Hylia and this repo if you have not made any changes to the styling
- ❌ **Do not**: Include any of the copy (text content) contained in this repo in your own website

For your convenience, I've included Hylia's README as an appendix. It does a good job of taking you on a tour of the features and general structure of this project.

## Features built on top of Hylia

- 📷 Image thumbnails for posts
- 📔 Footnote support in Markdown
- 🎥 `asciinema` support allowing easy embedding of terminal-based recordings
- 📂 Support for filenames attached to code blocks
- 🎉 100 Lighthouse accessibility scores
- 📄 Additional components for Markdown files like tables
- 💅 Custom theme

<details>
<summary><b>Appendix:</b> Hylia's <code>README</code></summary>

# A simple starter kit for Eleventy

Hylia is a lightweight [Eleventy](https://11ty.io) starter kit with [Netlify CMS](https://www.netlifycms.org/) pre-configured, so that you can one-click install a progressive, accessible blog in minutes. It also gives you a well organized starting point to extend it for yourself.

Get started now by **[deploying Hylia to Netlify.][deploy-to-netlify]**

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)][deploy-to-netlify]

<img src="https://hankchizljaw.imgix.net/hylia-github.jpg?auto=format&q=60" width="550" />

## Features

Hylia version 0.7.0 features:

✍️ A pre-configured [Netlify CMS](https://www.netlifycms.org/) setup  
🎨 Customisable design tokens to make it your own  
🌍 Customisable global data and navigation  
📂 Tags and tag archives  
✅ Progressively enhanced, semantic and accessible  
🎈 _Super_ lightweight front-end  
🚰 Sass powered CSS system with utility class generator  
⚙️ Service worker that caches pages so people can read your articles offline  
🚀 An RSS feed for your posts  
💌 A basic contact form, ready for [Netlify Forms](https://docs.netlify.com/forms/setup/#html-forms)

## Roadmap

💬 [Netlify Forms](https://www.netlify.com/docs/form-handling/) powered comments  
💡 ~~Dark/Light mode toggle~~ [Added in 0.4.0](https://github.com/hankchizljaw/hylia/releases/tag/0.4.0)  
🗣 Webmentions  
📖 Pagination  
🐦 Web sharing API integration  
🗒 Offline mode with links to cached pages  
📄 Documentation site  
💅 Proper Sass documentation  
✍️ Proper CMS documentation  
🖼 A facility for you to be able to add your logo / branding

---

## Getting started

### Method one: One-Click Deploy to Netlify

You can [deploy Hylia to Netlify with one click][deploy-to-netlify] and you’ll be up and running in minutes!

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)][deploy-to-netlify]

I recorded a quick start video of me deploying Hylia to Netlify and getting the CMS set up. [Check it out here](https://youtu.be/0hM_0BH-Y_A).

### Method two: Clone / Fork

1. Clone or fork this repo: `git clone https://github.com/hankchizljaw/hylia`
2. `cd` into the project directory and run `npm install`
3. Once all the dependencies are installed run `npm start`
4. Open your browser at `http://localhost:8080` and away you go!

## Terminal commands

### Serve the site locally

```bash
npm start
```

### Build a production version of the site

```bash
npm run production
```

### Compile Sass

```bash
npm run sass:process
```

### Re-generate design tokens for Sass

```bash
npm run sass:tokens
```

## Getting started with the CMS

Before you can use the CMS, you need to do some config in Netlify. Luckily they provide a [very handy guide to get started](https://www.netlify.com/docs/identity/).

In short, though:

- Once you’ve set up the site on Netlify, go to “Settings” > “Identity” and enable Identity
- Scroll down to the “Git Gateway” area, click “Enable Git Gateway” and follow the steps
- Click the “Identity” tab at the top
- Once you’ve enabled identity, click “Invite Users”
- Check the invite link in your inbox and click the link in the email that’s sent to you
- Set a password in the popup box
- Go to `/admin` on your site and login
- You’re in and ready to edit your content!

## Design Tokens and Styleguide

### Design Tokens

Although Hylia has a pretty simple design, you can configure the core design tokens that control the colours, size ratio and fonts.

---

**Note**: _Credit must be given to the hard work [Jina Anne](https://twitter.com/jina) did in order for the concept of design tokens to even exist. You should watch [this video](https://www.youtube.com/watch?v=wDBEc3dJJV8), then [read this article](https://the-pastry-box-project.net/jina-bolton/2015-march-28) and then sign up for [this course](https://aycl.uie.com/virtual_seminars/design_tokens_scaling_design_with_a_single_source_of_truth) to expand your knowledge._

---

To change the design tokens in the CMS, find the “Globals” in the sidebar then in the presented options, select “Theme Settings”.

To change the design tokens directly, edit [`_src/data/tokens.json`](https://github.com/hankchizljaw/hylia/blob/master/src/_data/tokens.json).

The tokens are converted into maps that the Sass uses to compile the front-end CSS, so make sure that you maintain the correct structure of `tokens.json`.

### Styleguide

Your version of Hylia ships with a Styleguide by default. You can see a demo of the Styleguide at <https://hylia.website/styleguide/>.

You can edit the Styleguide by opening [`src/styleguide.njk`](https://github.com/hankchizljaw/hylia/blob/master/src/styleguide.njk). If you don’t want the Styleguide, delete that file and the page will vanish.

## Sass

Hylia is based on the [WIP v2 version of Stalfos](https://github.com/hankchizljaw/stalfos/tree/feature/v2), which currently has no documentation (I know, I’m bad). Here is some very basic documentation for elements of the new framework that you will encounter on this project.

### Configuration

The whole Sass system is powered by central config file, which lives here: [`_src/scss/_config.scss`](https://github.com/hankchizljaw/hylia/blob/master/src/scss/_config.scss).

Before Sass is compiled, a `_tokens.scss` file is generated from the [design tokens config](https://github.com/hankchizljaw/hylia/blob/master/src/_data/tokens.json) which is required.

Key elements:

- `$stalfos-size-scale`: A token driven size scale which by default, is a “Major Third” scale
- `$stalfos-colors`: A token driven map of colours
- `$stalfos-util-prefix`: All pre-built, framework utilities will have this prefix. Example: the wrapper utility is '.sf-wrapper' because the default prefix is 'sf-'
- `$metrics`: Various misc metrics to use around the site
- `$stalfos-config`: This powers everything from utility class generation to breakpoints to enabling/disabling pre-built components/utilities

### How to create a new utility class with the generator

The utility class generator lets you generate whatever you want, with no opinions on class name or properties affected.

To add a new class, add another item to the exists `$stalfos-config` map. This example adds a utility for floating elements.

```scss
'float':('items':('left':'left','right': 'right'
  ),
  'output': 'responsive',
  'property': 'float'
);
```

The `output` is set to `responsive` which means every breakpoint will generate a prefixed class for itself. If you only wanted elements to float left in the `md` breakpoint, you’d now be able to add a class of `md:float-left` to your HTML elements.

If you only want standard utility classes generating, set the `output` to `standard`.

### Functions

#### `get-color($key)`

Function tries to match the passed `$key` with the `$stalfos-colors` map. Returns null if it can’t find a match.

#### `get-config-value($key, $group)`

Returns back a 1 dimensional (key value pair) config value if available.

#### `get-size($ratio-key)`

Function tries to match the passed `$ratio-key` with the `$stalfos-size-scale`. Returns null if it can’t find a match.

### Mixins

#### `apply-utility($key, $value-key)`

Grabs the property and value of one of the `$stalfos-config utilities` that the generator will generate a class for.

#### `media-query($key)`

Pass in the key of one of your breakpoints set in `$stalfos-config['breakpoints']` and this mixin will generate the `@media` query with your configured value.

## CMS

Hylia has [Netlify CMS](https://www.netlifycms.org/) pre-configured as standard. You can customise the configuration by editing [`src/admin/config.yml`](https://github.com/hankchizljaw/hylia/blob/master/src/admin/config.yml).

### Content that you can edit

The basic CMS setup allows you to edit the following:

- **Home page**: Edit the content on your homepage
- **Posts**: Create and edit blog posts
- **Generic pages**: Create generic pages that use a similar layout to posts
- **Global site data**: Various bits of
