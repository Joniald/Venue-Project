const express = require('express')
const router = express.Router()
const { Pool, Client } = require('pg')

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'reservationsdemo',
    password: '******',
    port: 5432,
})

client.connect()

//////////////////////////////////PUT///////////////////////////////////////////

router.post("/PUT", (req, resp) => {
  var RESPO = req.body.attendeeid;
  console.log("Has been update the "+RESPO+" ID");
  //console.log("In /attendee POST");
    const myQuery = {
        text: "UPDATE attendee SET fullname = $2, company=$3, experience=$4, email=$5, eventid = $6 WHERE attendeeid = $1",
        values: [req.body.attendeeid, req.body.fullname, req.body.company, req.body.experience, req.body.email, req.body.eventid]
    }
    client
    .query(myQuery)
    .then((resuits) => {
      console.log("Success!");
      resp.writeHead(200, {
                  "Content-Type": "api/json",
                  "Access-Control-Allow-Origin": "*",
      });
      resp.write(JSON.stringify(resuits.rows));
      resp.end();
    })
    .catch((error) => {
      console.log("Ooops!");
      console.log(error);
          resp.send("An error....")
    });
})

//////////////////////////////DELETE////////////////////////////////////////////

router.post("/:id", (req, resp) => {
  var RESPO = req.params.id;
  console.log("Has been delete the "+RESPO+" ID");
  //console.log("In /attendee POST");
  const myQuery = {
        text: "DELETE FROM attendee WHERE attendeeid = $1",
        values: [req.params.id]
    }
    client
    .query(myQuery)
    .then((resuits) => {
      console.log("Success!");
      resp.writeHead(200, {
                  "Content-Type": "api/json",
                  "Access-Control-Allow-Origin": "*",
      });
    })
    .catch((error) => {
      console.log("Ooops!");
      console.log(error);
          resp.send("An error....")
    });
})

//////////////////////////////POST/////////////////////////////////////////////

router.post("/", (req, resp) => {
    console.log("Success!");
    const myQuery = {
      /*  text: "CREATE TABLE IF NOT EXISTS attendee (attendeeid SERIAL PRIMARY KEY,
          fullname TEXT NOT NULL, company TEXT NOT NULL, experience INT NOT NULL,
          email TEXT NOT NULL, eventid INT NOT NULL,
          CONSTRAINT fk_event FOREIGN KEY(eventid) REFERENCES event (eventid));",  */
          text: "INSERT INTO attendee (fullname, company, experience, email, eventid) VALUES ($1, $2, $3, $4, $5)",
          values: [req.body.fullname, req.body.company, req.body.experience, req.body.email, req.body.eventid]

    }
    client
    .query(myQuery)
    .then((resuits) => {
      console.log("Success!");
      resp.writeHead(200, {
                  "Content-Type": "api/json",
                  "Access-Control-Allow-Origin": "*",
      });
      resp.write(JSON.stringify(resuits.rows));
      resp.end();
    })
    .catch((error) => {
      console.log("Ooops!");
      console.log(error);
          resp.send("An error....")
    });
})

/////////////////////////////////GET///////////////////////////////////////////

router.get("/", (req, resp) => {
    console.log("Success!");
    const myQuery = {
        text: "SELECT * FROM attendee"
    }
    client
    .query(myQuery)
    .then((resuits) => {
      console.log("Success!");
      resp.writeHead(200, {
                  "Content-Type": "api/json",
                  "Access-Control-Allow-Origin": "*",
      });
      resp.write(JSON.stringify(resuits.rows));
      resp.end();

    })
    .catch((error) => {
      console.log("Ooops!");
      console.log(error);
          resp.send("An error....")
    });
})

////////////////////SEARCH/////////////////////////////////////////////////////

router.get("/search", (req, resp) => {

    const myQuery = {
          text: "SELECT * FROM attendee WHERE UPPER(fullname) LIKE UPPER($1) OR UPPER(company) LIKE UPPER($1) OR UPPER(email) LIKE UPPER($1)",
          values: ["%"+req.query.name+"%"]

      }
    client
    .query(myQuery)
    .then((resuits) => {
      console.log("Success!");
      resp.writeHead(200, {
                  "Content-Type": "api/json",
                  "Access-Control-Allow-Origin": "*",
      });
      resp.write(JSON.stringify(resuits.rows));
      resp.end();


    })
    .catch((error) => {
      console.log("Ooops!");
      console.log(error);
          resp.send("An error....")
    });
})


module.exports = router;
