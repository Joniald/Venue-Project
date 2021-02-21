var attendees = [];

var bodyTest = document.getElementById("attendeeTableBody");
var x = bodyTest.value;

function displayOptionAttendee() {

  var bodySel = document.getElementById("selAttendee");
  bodySel.innerHTML = ""; // remove previous rows

  for (let i = 0; i < attendees.length; i++) {
    var sel = document.createElement("option");
    sel.innerHTML = events[i].eventid;
    bodySel.add(sel);
  }
}

function displayAttendee() {
  var body = document.getElementById("attendeeTableBody");
  body.innerHTML = ""; // remove previous rows

  for (let i = 0; i < attendees.length; i++) {
    var row = document.createElement("tr");

    var cell = document.createElement("td");
    cell.innerHTML = attendees[i].attendeeid;
    row.appendChild(cell);

    var cell = document.createElement("td");
    cell.innerHTML = attendees[i].fullname;
    row.appendChild(cell);

    cell = document.createElement("td");
    cell.innerHTML = attendees[i].company;
    row.appendChild(cell);

    cell = document.createElement("td");
    cell.innerHTML = attendees[i].experience;
    row.appendChild(cell);

    cell = document.createElement("td");
    cell.innerHTML = attendees[i].email;
    row.appendChild(cell);

    cell = document.createElement("td");
    cell.innerHTML = attendees[i].eventid;
    row.appendChild(cell);

    cell = document.createElement("td")
    cell.innerHTML ="<td>"
                   +"<button type='button' onclick='displayAttendeeUpdate("+ i +")' data-toggle='modal' data-target='#myModalUp_03' class='btn btn-light'>"
                   +"<i class='material-icons' data-toggle='tooltip' title='Edit' style='font-size:20px;color:green'>"
                   +"&#xE254;"+"</i>"
                   +"</button>"
                   +"<button type='button' onclick='displayAttendeeDelete("+ i +")' data-toggle='modal' data-target='#myModalDeleteAttendee' class='btn btn-dark'>"
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

function displayAttendeeDelete(i) {
  dVD =  document.getElementById("attendeeIdDelete");
  return dVD.value = attendees[i].attendeeid;
}

function displayAttendeeUpdate(i) {
  btn0 = document.getElementById("eveIdUpAtt");
  btn1 = document.getElementById("eveNameUpAtt");
  btn2 = document.getElementById("startDateUpAtt");
  btn3 = document.getElementById("endDateUpAtt");
  btn4 = document.getElementById("ticPriseUpAtt");
  btn5 = document.getElementById("selEventUpAtt");
  return [btn0.value = attendees[i].attendeeid, btn1.value = attendees[i].fullname,
          btn2.value = attendees[i].company, btn3.value = attendees[i].experience,
          btn4.value = attendees[i].email, btn5.value = attendees[i].eventid];
}

function loadFromServerAttendee() {
  var req = new XMLHttpRequest();
  req.open("GET", "http://127.0.0.1:3000/attendee");
  req.onload = function () {
    if (req.status == 200) {
      attendees = JSON.parse(req.response);
      displayAttendee();
    } else {
      attendees = [];
      displayAttendee();
      console.error("Problem loading attendees : " + req.status);
    }
  };
  req.send();
}

function searchFromServerAttendee() {
  var name = document.getElementById("inputSearchAttendee").value;
  var req = new XMLHttpRequest();
  req.open("GET", "http://127.0.0.1:3000/attendee/search" + "?" + "name=" + name, true);
  req.onload = function () {
    if (req.status == 200) {
      attendees = JSON.parse(req.response);
      displayAttendee();
    } else {
      attendees = [];
      displayAttendee();
      console.error("Problem loading attendees : " + req.status);
    }
  };
  req.send();
}

function postAttendee() {
  var req = new XMLHttpRequest();
  req.open("POST", "http://127.0.0.1:3000/attendee", true);
  req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  req.onload = () => {
    console.log("Data sent to the server");
    loadFromServerAttendee();
  }
  console.log("Sendinf data to the server");
  req.send("fullname=" + document.getElementById("attName").value
    + "&company=" + document.getElementById("comAttendee").value
    + "&experience=" + document.getElementById("expAttendee").value
    + "&email=" + document.getElementById("emailAttendee").value
    + "&eventid=" + document.getElementById("selAttendee").value);
}

function UpdateAttendee() {
  var req = new XMLHttpRequest();
  req.open("POST", "http://127.0.0.1:3000/attendee/PUT", true);
  req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  req.onload = () => {
    console.log("Data sent to the server");
    loadFromServerAttendee();
  }
  console.log("Sendinf data to the server");
  req.send("attendeeid="+ document.getElementById("eveIdUpAtt").value
    + "&fullname=" + document.getElementById("eveNameUpAtt").value
    + "&company=" + document.getElementById("startDateUpAtt").value
    + "&experience=" + document.getElementById("endDateUpAtt").value
    + "&email=" + document.getElementById("ticPriseUpAtt").value
    + "&eventid=" + document.getElementById("selEventUpAtt").value);
}

function deleteAttendee() {
  var delete_id = document.getElementById("attendeeIdDelete").value;
  var req = new XMLHttpRequest();
  req.open("POST", "http://127.0.0.1:3000/attendee/" + delete_id, true);
  req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  req.onload = () => {
    console.log("Data sent to the server");
    loadFromServerAttendee();
  }
  req.send();
}
