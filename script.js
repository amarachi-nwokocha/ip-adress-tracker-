let currentZone = document.getElementById("current_zone");
let currentTown = document.getElementById("current_town");
let currentIp = document.getElementById("current_ip");
let currentIsp = document.getElementById("current_isp");
//form inputs
let form = document.getElementById("form");
let formInput = document.getElementById("ip_address");
let formButton = document.getElementById("search_btn");
//api links
let secret_api = "ENTER YOUR API ";
let api_link = "https://geo.ipify.org/api/v1?";

let apiKey = "at_ETFRTTziJL7YVQ2Q5c6cc3upnW5Nt";
let ipUrl;
allResponse = [];

//map
const map = L.map("display-map", {
  center: [0, 0],
  zoom: 0,
  layers: [
    L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    }),
  ],
});

const updateMarker = (update_marker = [42, 42]) => {
  map.setView(update_marker, 13);
  L.marker(update_marker).addTo(map);
};

const getIp = (defaultIp) => {
  console.log(defaultIp);
  if (defaultIp === undefined) {
    ipUrl = `${api_link}apiKey=${apiKey}&ipAddress=8.8.8.8`;
  } else {
    ipUrl = `${api_link}apiKey=${apiKey}&ipAddress=${defaultIp}`;
  }
  fetch(ipUrl)
    .then((result) => result.json())
    .then((data) => {
      console.log(data);
      currentIp.innerHTML = data.ip;
      currentTown.innerHTML = `${data.location.city} ${data.location.country} ${data.location.postalCode}`;
      currentZone.innerHTML = `${data.location.timezone}`;
      currentIsp.innerHTML = data.isp;
      updateMarker([data.location.lat, data.location.lng]);
    })

    .catch((error) => alert("Oops soething went wrong "));
};
getIp();

//event listeners

document.addEventListener("load", updateMarker());
formButton.addEventListener("click", (e) => {
  e.preventDefault();
  if (formInput.value != "" && formInput.value != null) {
    getIp(formInput.value);
    // console.log(formInput.value);
    return;
  }
  alert("Please enter a valid Ip Address");
});
//DOMContentLoaded
// window.addEventListener("DOMContentLoaded", (defaultIp) => {

// });
