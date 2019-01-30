window.onload = xmlRequest();

/*Adaptive Navigation Code below*/
/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

//Games Page Functions
//Function for changing iFrame Image depending on user choice.
//2.B The .innerHTML is an example of manipulating the HTML DOM
function setURL(url) {
  document.getElementById('iframe').src = url;
}

function setSwitch() {
  document.getElementById('result').innerHTML = "Nintendo Switch: This is not a retro gaming system!";
}

function setSnes() {
  document.getElementById('result').innerHTML = "Super Nintendo System: great! You know retro Games!";
}


/* Form Validation below*/

function formValidate() {
  var name = document.forms["RegForm"]["Name"];
  var email = document.forms["RegForm"]["EMail"];
  var phone = document.forms["RegForm"]["Telephone"];
  var what = document.forms["RegForm"]["Subject"];
  var password = document.forms["RegForm"]["Password"];
  var address = document.forms["RegForm"]["Address"];

  if (name.value == "") {
    window.alert("Please enter your name.");
    name.focus();
    return false;
  }

  if (address.value == "") {
    window.alert("Please enter your address.");
    name.focus();
    return false;
  }

  if (email.value == "") {
    window.alert("Please enter a valid e-mail address.");
    email.focus();
    return false;
  }

  if (email.value.indexOf("@", 0) < 0) {
    window.alert("Please enter a valid e-mail address.");
    email.focus();
    return false;
  }

  if (email.value.indexOf(".", 0) < 0) {
    window.alert("Please enter a valid e-mail address.");
    email.focus();
    return false;
  }

  if (phone.value == "") {
    window.alert("Please enter your telephone number.");
    phone.focus();
    return false;
  }

  if (password.value == "") {
    window.alert("Please enter your password");
    password.focus();
    return flase;
  }

  if (what.selectedIndex < 1) {
    alert("Please enter your console choice.");
    what.focus();
    return false;
  }

  return true;
}

/*Google Map and Geolocation Funcations*/
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}
var x = document.getElementById("geolocationDemo");

function showPosition(position) {
  x.innerHTML = "Your Latitude: " + position.coords.latitude +
    " and Longitude: " + position.coords.longitude + " Your Location was sucessfully tracked to that below:";

  var pos = position.coords.latitude + "," + position.coords.longitude;

  var mapsrc = "https://www.google.com/maps/embed/v1/place?q=" + pos + "&key=AIzaSyA-5px9IvD9XjxTBh5EpJwYRp4XC7zaMTg";


  document.getElementById("map").src = mapsrc;
}



//XMLHTTP REQUEST below
function xmlRequest() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var data = XMLHttpRequest.responseXML;
      document.getElementById("xml").innerHTML = data;

      xhttp.open("GET", "https://data.smartdublin.ie/cgi-bin/rtpi/realtimebusinformation?stopid=7602&format=xml", true);
      xhttp.send(null);
    }
  };
}