var venues = [];

function displayVenue() {
  var body = document.getElementById("venueTableBody");
  body.innerHTML = ""; // remove previous rows

  for (let i = 0; i < venues.length; i++) {
    var row = document.createElement("tr");

    var cell = document.createElement("td");
    cell.innerHTML = venues[i].venueid;
    row.appendChild(cell);

    var cell = document.createElement("td");
    cell.innerHTML = venues[i].venuename;
    row.appendChild(cell);

    cell = document.createElement("td");
    cell.innerHTML = venues[i].fulladdress;
    row.appendChild(cell);

    cell = document.createElement("td");
    cell.innerHTML = venues[i].contactmail;
    row.appendChild(cell);

    cell = document.createElement("td")
    cell.innerHTML ="<td>"
                   +"<button type='button' onclick='displayVenueUpdate("+ i +")' data-toggle='modal' data-target='#myModalUp_01' class='btn btn-light'>"
                   +"<i class='material-icons' data-toggle='tooltip' title='Edit' style='font-size:20px;color:green'>"
                   +"&#xE254;"+"</i>"
                   +"</button>"
                   +"<button type='button' onclick='displayVenueDelete("+ i +")' data-toggle='modal' data-target='#myModalDelete' class='btn btn-dark'>"
                   +"<span class='glyphicon glyphicon-refresh'>"
                   +"</span>"
                   +"<i class='material-icons' data-toggle='tooltip' title='Delete' style='font-size:20px;color:red'>"
                   +"&#xE872;"+"</i>"
                   +"</button>"
                   +"</td>";
    row.appendChild(cell);
    body.appendChild(row);
  }
}

function displayVenueDelete(i) {
  dVD =  document.getElementById("venueIdDelete");
  return dVD.value = venues[i].venueid;
}

function displayVenueUpdate(i) {
  btn0 = document.getElementById("venIdUp");
  btn1 = document.getElementById("venNameUp");
  btn2 = document.getElementById("locationUp");
  btn3 = document.getElementById("conMailUp");
  return [btn0.value = venues[i].venueid, btn1.value = venues[i].venuename, btn2.value = venues[i].fulladdress, btn3.value = venues[i].contactmail];
}

function loadFromServerVenue() {
  var req = new XMLHttpRequest();
  req.open("GET", "http://127.0.0.1:3000/venue");
  req.onload = function () {
    if (req.status == 200) {
      venues = JSON.parse(req.response);
      displayVenue();
    } else {
      venues = [];
      displayVenue();
      console.error("Problem loading attendees : " + req.status);
    }
  };
  req.send();
}

function searchFromServerVenue() {
  var name = document.getElementById("inputSearch").value;
  var req = new XMLHttpRequest();
  req.open("GET", "http://127.0.0.1:3000/venue/search" + "?" + "name=" + name, true);
  req.onload = function () {
    if (req.status == 200) {
      venues = JSON.parse(req.response);
      displayVenue();
    } else {
      venues = [];
      displayVenue();
      console.error("Problem loading attendees : " + req.status);
    }
  };
  req.send();
}

function postVenue() {
  var req = new XMLHttpRequest();
  req.open("POST", "http://127.0.0.1:3000/venue", true);
  req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  req.onload = () => {
    console.log("Data sent to the server");
    loadFromServerVenue();
  }
  console.log("Sendinf data to the server");
  req.send("venuename=" + document.getElementById("venName").value
    + "&fulladdress=" + document.getElementById("location").value
    + "&contactmail=" + document.getElementById("conMail").value);
}

function UpdateVenue() {
  var req = new XMLHttpRequest();
  req.open("POST", "http://127.0.0.1:3000/venue/PUT", true);
  req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  req.onload = () => {
    console.log("Data sent to the server");
    loadFromServerVenue();
  }
  console.log("Sendinf data to the server");
  req.send("venueid="+ document.getElementById("venIdUp").value
    + "&venuename=" + document.getElementById("venNameUp").value
    + "&fulladdress=" + document.getElementById("locationUp").value
    + "&contactmail=" + document.getElementById("conMailUp").value);
}

function deleteVenue() {
  var delete_id = document.getElementById("venueIdDelete").value;
  console.log(delete_id);
  var req = new XMLHttpRequest();
  req.open("POST", "http://127.0.0.1:3000/venue/" + delete_id, true);
  req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  req.onload = () => {
    console.log("Data sent to the server");
    loadFromServerVenue();
  }
  req.send();
}
