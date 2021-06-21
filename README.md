# Schmemory starter kit

This starter kit includes Webpack, Babel and SASS to hopefully help with
reducing the time spent on boilerplate stuff. Please start by running

```bash
npm install
```

This will get these packages installed. When that's done, you can — at any time — do `npm start` to
run a development server. If you need to serve static files, place them in the `static` folder.

If you are interested in using a simple server to produce images for your cards, you can start the project with
`npm run start:all` instead. Have a look below for the API documentation.

## Example image server

This HTTP server will generate square images (either in PNG or SVG format) for a given string and
size in pixels. It will start on localhost port 3002 by default, and has CORS enabled.

### API

#### GET /png/:identifier/:size

Example: `GET /png/alice/200` will return a PNG image of size 200x200 for the string 'alice'.

#### GET /svg/:identifier/:size

Example: `GET /svg/alice/200` will return a SVG image of size 200x200 for the string 'alice'.
