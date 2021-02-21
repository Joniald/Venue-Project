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

/////////////////////////////////////PUT////////////////////////////////////////

router.post("/PUT", (req, resp) => {
  var RESPO = req.body.venueid;
  console.log(req.body);
  console.log("Has been update the "+RESPO+" ID");
    const myQuery = {
        text: "UPDATE venue SET venuename = $2, fulladdress=$3, contactmail=$4 WHERE venueid = $1",
        values: [req.body.venueid, req.body.venuename, req.body.fulladdress, req.body.contactmail]
    }
    client
    .query(myQuery)
    .then((resuits) => {
      console.log("Success!");
      resp.writeHead(200, {
          "Content-Type": "text/json",
          "Access-Control-Allow-Origin": "*",
      });
      resp.write(JSON.stringify("ok"));
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
  const myQuery = {
        text: "DELETE FROM venue WHERE venueid = $1",
        values: [req.params.id]
    }
    client
    .query(myQuery)
    .then((resuits) => {
      console.log("Success!");
      resp.writeHead(200, {
                "Content-Type": "text/json",
                "Access-Control-Allow-Origin": "*",
            });
            resp.write(JSON.stringify("ok"));
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
    console.log(req.body.venuename)
    const myQuery = {
      /*  text: "CREATE TABLE IF NOT EXISTS venue (venueid SERIAL PRIMARY KEY,
          venuename TEXT NOT NULL, fulladdress TEXT NOT NULL, contactmail TEXT NOT NULL);",  */
      text: "INSERT INTO venue (venuename, fulladdress, contactmail) VALUES ($1, $2, $3)",
      values: [req.body.venuename, req.body.fulladdress, req.body.contactmail]
    }
    client
    .query(myQuery)
    .then((resuits) => {
      console.log("Success!");
      resp.writeHead(200, {
                "Content-Type": "text/json",
                "Access-Control-Allow-Origin": "*",
            });
            resp.write(JSON.stringify("ok"));
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
        text: "SELECT * FROM venue"
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
          text: "SELECT * FROM venue WHERE UPPER(venuename) LIKE UPPER($1) OR UPPER(fulladdress) LIKE UPPER($1) OR UPPER(contactmail) LIKE UPPER($1)",
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
