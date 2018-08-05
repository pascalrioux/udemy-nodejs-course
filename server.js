const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((request, response, next) => {
  var now = new Date().toString();
  var log = `${now}: ${request.method} ${request.url}`;

  console.log(log);

  fs.appendFile('server.log', log + '\n', (e) => {
    if (e) {console.warn('Unable to append to server.log')}
  });

  next();
});

app.use((request, response, next) => {
  response.render('maintenance.hbs');
});

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

// Homepage.
app.get('/', (request, response) => {
  response.render('home.hbs', {
    header: {
      title: 'Homepage',
    },
    footer: {
    },
    welcomeMessage: `What's up you cool baby ;)`,
  });
})

// About page.
app.get('/about', (request, response) => {
  response.render('about.hbs', {
    header: {
      title: 'About',
    },
    footer: {
    },
  });
})

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});
