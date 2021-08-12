# Boilerplate theme

This is the boilerplate theme for [JSON Resume](http://jsonresume.org/).

## Getting started

To get started with theme development, this is what you'll need:

- [deno](https://deno.land/#installation)
- [resumerise_theme_retro](https://deno.land/x/resumerise_theme_retro@0.0.5)

### Serve theme

While inside the theme folder, simply run:

```
resume serve
```

You should now see this message:

```
Preview: http://localhost:4000
Press ctrl-c to stop
```

Congratulations, you've made it!

**The theme development can now begin.**

## Development

### Overview

Now that you have your boilerplate theme installed, go through a quick overview
of each of the files needed for your JSONResume theme:

- `package.json`: Your package.json is required by all npm packages. Everytime
  you want to release a new update of your theme, you'll need to update it's
  version number.
- `index.ts`: This is the file that will return the needed HTML to the theme
  server. You can use it to process some things with your theme first, but we'll
  talk about that a bit later.
- `resume.hbs`: This is your actual template. This file is sent to the
  `index.ts` for it to sent to the theme server.
- `style.css`: This is where all the CSS of your project goes. Since the
  `index.ts` only returns HTML, the contents of this file are put between
  `<style>` tags in your `resume.hbs` file.

In order to get values from an actual JSONResume, you'll need to use a
templating system, such as [Mustache](http://mustache.github.io/) or
[Handlebars](http://handlebarsjs.com/). The default boilerplate theme uses
Handlebars.

### index.ts

The `index.ts` is where all the compiliing of your theme, and neccessary edits
will go.

At the top, you can already see the Node.js `require` function being used with
the dependencies. You can obviously add own dependencies, if you are planning on
using a different templating system, you can remove it.

The most important part of `index.ts` is the `render` function. This is where
all the compilation goes. This render function is expected to take a resume
object (from a `resume.json`), and should return HTML. In this case, it is
returning a compiled Handlebars document. If you removed the Handlebars
dependency, you'll want to remove it and replace it with your own templating
system compilation.

Above the `return` line are css and template variables. Using the Node.js `fs`
module, it reads first the `style.css` and the `resume.hbs`.

### resume.hbs

The `resume.hbs` file is where the actual template is. It contains all of the
markup needed for your resume. By default, this is a Handlebars document, but it
can obviously be changed into a different templating document.

### style.css

Last but not least, the `style.css` defines your styles. Technically, this is
completely optional, as you could just write all of your styles in the `<style>`
tags of your `resume.hbs`. As the `index.ts`, the contents of the `style.css`
are put into the `<style>` tags of your compiled theme later, yet again, this is
something can change.

## Deployment

If you are familar with NPM, you should be done with this in no time.

If you already have an NPM account, you can run `npm login` and enter your
username and password. If not, you can run `npm adduser` and fill in the proper
fields.

If you changed the dependencies or added new ones, you'll want to run
`npm install` again, and just to make sure, run `npm update` to get the latest
version of each dependency.

When you are done with that, you may go into your package.json, and edit the
version number. When all of the above is finished, you may run `npm publish` to
release your theme to the public. Now everyone can use your theme with their
resume.

When updating your theme, you'll need to change the version number and run
`npm publish` again.

## License

Available under [the MIT license](http://mths.be/mit).
