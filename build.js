'use strict';

const metalsmith = require('metalsmith');
const handlebars = require('handlebars');
const moment = require('moment');

const assets = require('metalsmith-assets');
const layouts = require('metalsmith-layouts');
const fileMetadata = require('metalsmith-filemetadata');
const collections = require('metalsmith-collections');
const autoprefixer = require('metalsmith-autoprefixer');
const htmlMinifier = require('metalsmith-html-minifier');
const cleanCss = require('metalsmith-clean-css');
const serve = require('metalsmith-serve');
const watch = require('metalsmith-watch');
const pagination = require('metalsmith-pagination');


const version = require('./package.json').version;
const buildTarget = './build';
const env = process.env.NODE_ENV; // eslint-disable-line no-process-env
const args = process.argv.slice(2);
const isWatch = args.some(arg => arg.includes('watch'));
const isServe = args.some(arg => arg.includes('serve'));

const baseUrl = env === 'production'
    ? 'http://berthelot.io/'
    : '';

const metalsmithPipeline = metalsmith(__dirname)
  .source('./src');

metalsmithPipeline
  .metadata({version});


// Slides
metalsmithPipeline
  .use(collections({
    slides: {
      pattern: 'slides/*.md',
      sortBy: 'date',
      reverse: true
    }
  }))
  .use(pagination({
    'collections.slides': {
      perPage: 10,
      layout: 'index.hbs',
      first: 'index.html',
      path: 'page/:num/index.html'
    }
  }))
  .use(fileMetadata([{
    pattern: 'slides/*.md',
    metadata: {layout: 'presentation.hbs'}
  }]));


// Handlebars configuration
const configureHandlebars = () => {
  handlebars.registerHelper('baseUrl', () => baseUrl);
  handlebars.registerHelper('dateFormat', date => moment(date).format('DD-MM-YYYY'));
  handlebars.registerHelper('replaceMdToHtml', url => url && url.replace(/md$/, 'html'));
  handlebars.registerHelper('classIfEquals', (className, first, second) => {
    return first === second ? className : '';
  });
};

metalsmithPipeline
  .use(configureHandlebars)
  .use(layouts({engine: 'handlebars', rename: true}));

// CSS
metalsmithPipeline
  .use(autoprefixer());

// Minify in production
if (env === 'production') {
  metalsmithPipeline
    .use(cleanCss())
    .use(htmlMinifier());
}

// Watch mode
if (isWatch) {
  metalsmithPipeline
    .use(watch({
      paths: {'./src/**/*': true, './layouts/**/*': true},
      livereload: true
    }));
}

// Serve mode
if (isServe) {
  metalsmithPipeline
    .use(serve({
      port: 8042,
      verbose: true
    }));
}

// External librairies
metalsmithPipeline
  .use(assets({
    source: './node_modules/reveal.js/',
    destination: 'lib/reveal'
  }));

// Build
metalsmithPipeline
  .destination(buildTarget)
  .clean(true)
  .build(err => {
    if (err) { throw err; }
  });
