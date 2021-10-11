# Boilerplate theme

This is the boilerplate theme for [resumerise](http://resumerise.io).

## Getting started

To get started with theme development, this is what you'll need:

- [deno](https://deno.land/#installation)
- [resumerise_cli](https://deno.land/x/resumerise_cli)

### Serve theme

Install the resumerise-cli https://github.com/resumerise/resumerise_cli first.

Start the preview server with

```
resumerise-cli serve file:///[absolute-path-to-your-resumerise-theme]/mod.ts
```
Note that unix/linux users should exclude the `/` at the beginning of the absolute path.

After the preview server started you should see the console output.

```
server has started on http://localhost:3000 🚀
```

Congratulations, you've made it!

**The theme development can now begin.**

## Development

### Overview

Now that you have your boilerplate theme installed, go through a quick overview
of each of the files needed for your resumerise theme:

- `meta.json`: Put your theme specific information here. Everytime you want to
  release a new update of your theme, you'll need to update it's version number.
- `mod.ts`: [tbd]

### style.css

Last but not least, the `style.css` defines your styles. Technically, this is
completely optional, as you could just write all of your styles in the `<style>`
tags of your `layout.eta`. The contents of the `style.css` are put into the
`<style>` tags of your compiled theme later, yet again, this is something can
change.

## Deployment

[tbd]

## License

Available under [the MIT license](http://mths.be/mit).
