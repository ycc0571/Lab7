// script.js

import { router } from './router.js'; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;

// Make sure you register your service worker here too

document.addEventListener('DOMContentLoaded', () => {
  fetch('https://cse110lab6.herokuapp.com/entries')
    .then(response => response.json())
    .then(entries => {
      entries.forEach(entry => {
        let newPost = document.createElement('journal-entry');
        newPost.entry = entry;
        document.querySelector('main').appendChild(newPost);
      });
    });
    router.setState("main", "http://127.0.0.1:5500/index.html");
});



window.addEventListener('popstate', (event) => {
  router.setState(event.state, document.location);
});

document.querySelector('main').addEventListener('click', (e) => {
  var entries = document.getElementsByTagName('journal-entry');
  let i;
  for (i = 0; i < entries.length; i++) {
    if(entries[i] == e.target){
      break;
    }
  }
  document.querySelector('h1').innerHTML = "Entry " + (i + 1);
  document.querySelector('entry-page').remove();
  var page = document.createElement('entry-page');
  page.entry = document.getElementsByTagName('journal-entry')[i].entry;
  console.log(document.getElementsByTagName('journal-entry')[i].entry);
  console.log(page.entry);
  console.log(page);
  document.querySelector('main').after(page);
  console.log(document.querySelector('entry-page'));
  router.setState("single-entry", "http://127.0.0.1:5500/index.html/#Entry"+(i+1));
});

document.querySelector('header > img').addEventListener('click', (e) => {
  document.querySelector('h1').innerHTML = "Settings";
  router.setState("settings", "http://127.0.0.1:5500/index.html/#Settings");
});

document.querySelector('header > h1').addEventListener('click', (e) => {
  router.setState("main", "http://127.0.0.1:5500/index.html");
});








