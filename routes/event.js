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

///////////////////////////////////PUT//////////////////////////////////////////

router.post("/PUT", (req, resp) => {
  var RESPO = req.body.eventid;
  console.log("Has been update the "+RESPO+" ID");
  //console.log("In /attendee POST");
    const myQuery = {
        text: "UPDATE event SET name = $2, startingdate=$3, endingdate=$4, ticketprice = $5, venueid = $6 WHERE eventid = $1",
        values: [req.body.eventid, req.body.name, req.body.startingdate, req.body.endingdate, req.body.ticketprice, req.body.venueid]
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
        text: "DELETE FROM event WHERE eventid = $1",
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
      resp.write(JSON.stringify(resuits.rows));
      resp.end();
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
      /*  text: "CREATE TABLE IF NOT EXISTS event (eventid SERIAL PRIMARY KEY,
          name TEXT NOT NULL, startingdate TEXT NOT NULL, endingdate TEXT NOT NULL,
          ticketprice REAL NOT NULL, venueid INT NOT NULL,
          CONSTRAINT fk_venue FOREIGN KEY(venueid) REFERENCES venue (venueid));",  */
          text: "INSERT INTO event (name, startingdate, endingdate, ticketprice, venueid) VALUES ($1, $2, $3, $4, $5)",
          values: [req.body.name, req.body.startingdate, req.body.endingdate, req.body.ticketprice, req.body.venueid]
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
        text: "SELECT * FROM event"
                    }
    client
    .query(myQuery)
    .then((resuits) => {
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
          text: "SELECT * FROM event WHERE UPPER(name) LIKE UPPER($1) OR UPPER(startingdate) LIKE UPPER($1) OR UPPER(endingdate) LIKE UPPER($1)",
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
