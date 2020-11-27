# Webpack for WordPress theme

> WordPress can actually be enjoyable!

## Features

- Based on [wpack.io](https://wpack.io/)
- Completely bare-bones theme setup
- HMR: very fast and smooth development environment with browsersync
- Locally: injects scss, reloads for js/php changes
- Use scss
- Use modern javascript (import npm modules if needed)
- Use svgs with webpack (svgoLoader)
- Build production files:
  - autoprefixed, minified css file (one global file)
  - babel-compiled (crossbrowser) javascript

## Installation

1. Use mamp and point it to the root of your local wordpress installation
2. Clone this repo as a regular wp theme
3. `cd` into the root of the theme, run `npm install` and then `composer install`
4. Activate the theme in WP Dashboard
5. Edit the files below

**wpackio.project.js** - change the slug of the project `webpack-theme`, to whatever your theme slug is.

**wpackio.server.js** - if you are not using port 8888 with your regular Mamp settings, change the `proxy` url.

**style.css** - change the description of the main stylesheet of the theme to match your project.

## Running locally

Run `npm run dev` to start the development server. This will use your mamp server as a proxy, and you will be working at http://192.168.1.103:3000/ for example.

## Building for production

Run `npm run build`. This will output everything in the **dist/** directory. Simply replace that on the server, along with any php theme files that you have changed.

Try to keep the production server clean: upload the **vendor** folder once at the start of the project (or install vendors on the server with composer).

---

Files not necessary to upload to production:

- js/ + scss/
- wpackio.project.js + wpackio.server.js
- node_modules/
- config files: .browserslistrc, .gitignore, .prettierrc, babel.config.js, postcss.config.js, composer.json, package.json
