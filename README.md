This repo contains the frontend for [Korp](https://spraakbanken.gu.se/korp), a frontend for the IMS Open Corpus Workbench (CWB). The korp frontend is a great tool for searching and
and visualising natural language corpus data. 

Korp is developed by [Språkbanken](https://spraakbanken.gu.se) at the University of Gothenburg, Sweden. 

Documentation:
- [Frontend documentation](https://spraakbanken.gu.se/eng/research/infrastructure/korp/distribution/frontend)
- [Backend documentation](https://spraakbanken.gu.se/eng/research/infrastructure/korp/distribution/backend)
- Sparv - The pipeline used to tag and otherwise process raw Swedish-language corpus data is documented [here](https://spraakbanken.gu.se/eng/research/infrastructure/korp/distribution/corpuspipeline)

# Getting started

Install `yarn`: `https://yarnpkg.com`

# yarn

- install all dependencies: `yarn`
- run development server: `yarn start`
- build a dist-version: `yarn build`
- run dist-version: `yarn start:dist`
- run tests: `yarn test` or `yarn test:karma` or `yarn test:e2e` (tests are currently depending on Språkbankens setup).

Declare dependencies using `yarn add pkg`or `yarn add --dev pkg` for dev dependencies.

# webpack

We use *webpack* to build Korp and *webpack-dev-server* to run a local server. To include new code or resources, require
them where needed:

```
nd = require("new-dependency")
nd.aFunction()
```

or

```
imgPath = require("img/image.png")
myTemplate = "<img src='#{imgPath}'>"
```

Most dependencies are only specified in `app/webpack.coffee` and where needed
added to the `window`-object.

About the current loaders in in `webpack.config.js`:
- `pug` and `html` files: all `src`-attributes in `<img>` tags and all `href`s in `<link>` tags will be
  loaded by webpack and replaced in the markup. Uses file loader so that requiring a `pug`
  or `html` file will give the path to the file back.
- `coffee` files are added to the bundle. Source maps are available.
- `js` files are added to the bundle
- all images and fonts are added to the bundle using file loader and gives back a file path.
- `css` and `scss` are added to the bundle. `url`s will be loaded and replaced by webpack.

In addition to this, some specific files will simply be copied as is, for example Korp mode-files.

# run_config.json

To use your own versions of the configuration-files without creating them in this project, 
use a `run_config.json` file in the root of the project with the following content:

```
{
    "configDir": "../path/to/my/configuration/folder"
}
```

In this folder, use the same layout as in Korp and add the following files:

- `app/config.js`
- `app/modes/*mode.js`
- `app/modes/common.js`
- `app/translations/*.json`

## webpack and configuration

We use `window.settings` to share needed configuration to `config.js` and `modes/common.js`.

`config.js` and `modes/common.js` are included in webpacks dependecy graph. Therefore it works
to use `require` for anything needed, but only things that are in the configured 
location for settings (see `run_config.json`).

`mode`-files are only loaded at runtime an any dependenies must be required in `modes/common.js` and
then exported as a module as shown in the sample file `app/modes/common.js`.

# Earlier versions

## npm

It is unfortunately not possible to develop Korp using *npm* anymore (*npm* can not resolve all dependencies
correctly). Use *yarn*.

## bower

Earlier versions of Korp used Bower for dependency management. This has been replaced width *yarn*, which is
recommended by the Bower-team.

## grunt

Earlier versions of Korp used *grunt* to build Korp and local development. This has been replaced with
*webpack*.
