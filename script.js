"use strict"
var script = document.createElement("script"),
    linkArr = [],
    index = Math.floor(Math.random() * 100);
let left, right, ss, page, total

script.src = "https://api.flickr.com/services/rest/?method=flickr.people.getPhotos&api_key=95bc9ba34511c5c6b3f35fb973f3cd92&user_id=144387717%40N03&extras=url_c%2Curl_o&format=json";

window.onload = () => {
  document.getElementsByTagName("head")[0].appendChild(script);

  console.log('hi')
  ss = document.querySelector("#slideshow");

  ss.onclick = toggleFullScreen;
  window.setInterval(getRightImage, 5000)
}

function toggleFullScreen() {
  if (document.webkitFullscreenElement) {
    document.webkitExitFullscreen()
  } else {
    ss.webkitRequestFullscreen();
  }
}

function jsonFlickrApi(data) {
  page = data.photos.page
  total = data.photos.pages
  var photos = data.photos.photo;
  for (var i = 0; i < photos.length; i++) {
      linkArr.push([photos[i].url_c, photos[i].url_o]);
  }
  if (page <= total) {
    console.log(page)
    script.remove()
    script = document.createElement("script"),
    script.src = "https://api.flickr.com/services/rest/?method=flickr.people.getPhotos&api_key=95bc9ba34511c5c6b3f35fb973f3cd92&user_id=144387717%40N03&extras=url_c%2Curl_o&format=json&page=" + (page + 1);
    document.getElementsByTagName("head")[0].appendChild(script);
  } else {
    ss.lastElementChild.src = linkArr[index][0];
  }
}

function getLeftImage() {
  if(index > 0) {
      index--;
  }
  // console.log(index);
  // console.log(ss.lastElementChild.src);
  ss.lastElementChild.src = linkArr[index][0];
}

function getRightImage() {
  // if(index < linkArr.length - 1) {
  //     index++;
  // }
  index++;
  console.log(index);
  // console.log(ss.lastElementChild.src);
  ss.lastElementChild.src = linkArr[index % (linkArr.length)][0];
}

