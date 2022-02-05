import Hikes from './hikes.js';
//on load grab the array and insert it into the page

const myHikes = new Hikes('hikes');
window.addEventListener('load', () => {
  console.log('this is firing');
  myHikes.showHikeList();
});