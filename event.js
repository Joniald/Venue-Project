var events = [];

var bodyTest = document.getElementById("venueTableBody");
var x = bodyTest.value;

function displayOptionEvent() {

  var bodySel = document.getElementById("selEvent");
  bodySel.innerHTML = ""; // remove previous rows

  for (let i = 0; i < venues.length; i++) {
    var sel = document.createElement("option");
    sel.innerHTML = venues[i].venueid;
    bodySel.add(sel);
  }
}

function displayEvent() {
  var body = document.getElementById("eventTableBody");
  body.innerHTML = ""; // remove previous rows

  for (let i = 0; i < events.length; i++) {
    var row = document.createElement("tr");

    var cell = document.createElement("td");
    cell.innerHTML = events[i].eventid;
    row.appendChild(cell);

    var cell = document.createElement("td");
    cell.innerHTML = events[i].name;
    row.appendChild(cell);

    cell = document.createElement("td");
    cell.innerHTML = events[i].startingdate;
    row.appendChild(cell);

    cell = document.createElement("td");
    cell.innerHTML = events[i].endingdate;
    row.appendChild(cell);

    cell = document.createElement("td");
    cell.innerHTML = events[i].ticketprice;
    row.appendChild(cell);

    cell = document.createElement("td");
    cell.innerHTML = events[i].venueid;
    row.appendChild(cell);

    cell = document.createElement("td")
    cell.innerHTML ="<td>"
                   +"<button type='button' onclick='displayEventUpdate("+ i +")' data-toggle='modal' data-target='#myModalUp_02' class='btn btn-light'>"
                   +"<i class='material-icons' data-toggle='tooltip' title='Edit' style='font-size:20px;color:green'>"
                   +"&#xE254;"+"</i>"
                   +"</button>"
                   +"<button type='button' onclick='displayEventDelete("+ i +")' data-toggle='modal' data-target='#myModalDeleteEvent' class='btn btn-dark'>"
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

function displayEventDelete(i) {
  dVD =  document.getElementById("eventIdDelete");
  return dVD.value = events[i].eventid;
}

function displayEventUpdate(i) {
  btn0 = document.getElementById("eveIdUp");
  btn1 = document.getElementById("eveNameUp");
  btn2 = document.getElementById("startDateUp");
  btn3 = document.getElementById("endDateUp");
  btn4 = document.getElementById("ticPriseUp");
  btn5 = document.getElementById("selEventUp");
  return [btn0.value = events[i].eventid, btn1.value = events[i].name,
          btn2.value = events[i].startingdate, btn3.value = events[i].endingdate,
          btn4.value = events[i].ticketprice, btn5.value = events[i].venueid];
}

function loadFromServerEvent() {
  var req = new XMLHttpRequest();
  req.open("GET", "http://127.0.0.1:3000/event");
  req.onload = function () {
    if (req.status == 200) {
      events = JSON.parse(req.response);
      displayEvent();
    } else {
      events = [];
      displayEvent();
      console.error("Problem loading attendees : " + req.status);
    }
  };
  req.send();
}

function searchFromServerEvent() {
  var name = document.getElementById("inputSearchEvent").value;
  var req = new XMLHttpRequest();
  req.open("GET", "http://127.0.0.1:3000/event/search" + "?" + "name=" + name, true);
  req.onload = function () {
    if (req.status == 200) {
      events = JSON.parse(req.response);
      displayEvent();
    } else {
      events = [];
      displayEvent();
      console.error("Problem loading attendees : " + req.status);
    }
  };
  req.send();
}

function postEvent() {
  var req = new XMLHttpRequest();
  req.open("POST", "http://127.0.0.1:3000/event", true);
  req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  req.onload = () => {
    console.log("Data sent to the server");
    loadFromServerEvent();
  }
  console.log("Sendinf data to the server");
  req.send("name=" + document.getElementById("eveName").value
    + "&startingdate=" + document.getElementById("startDate").value
    + "&endingdate=" + document.getElementById("endDate").value
    + "&ticketprice=" + document.getElementById("ticPrise").value
    + "&venueid=" + document.getElementById("selEvent").value);
}

function UpdateEvent() {
  var req = new XMLHttpRequest();
  req.open("POST", "http://127.0.0.1:3000/event/PUT", true);
  req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  req.onload = () => {
    console.log("Data sent to the server");
    loadFromServerEvent();
  }
  console.log("Sendinf data to the server");
  req.send("eventid="+ document.getElementById("eveIdUp").value
    + "&name=" + document.getElementById("eveNameUp").value
    + "&startingdate=" + document.getElementById("startDateUp").value
    + "&endingdate=" + document.getElementById("endDateUp").value
    + "&ticketprice=" + document.getElementById("ticPriseUp").value
    + "&venueid=" + document.getElementById("selEventUp").value);
}

function deleteEvent() {
  var delete_id = document.getElementById("eventIdDelete").value;
  var req = new XMLHttpRequest();
  req.open("POST", "http://127.0.0.1:3000/event/" + delete_id, true);
  req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  req.onload = () => {
    console.log("Data sent to the server");
    loadFromServerEvent();
  }
  req.send();
}
