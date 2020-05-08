const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const mongoose = require( 'mongoose' );
const jsonParser = bodyParser.json();
const { DATABASE_URL, PORT } = require( './config' );
const {Sports} = require('./models/sport-model');

const app = express();


/* Your code goes here */
app.post('/sports/post/', jsonParser, (req, res) => {
    let id = req.body.id;
    let name = req.body.name;
    let num_players = req.body.num_players;

    if(!id || !name || !num_players) {
        res.statusMessage = "At least one of the parameters is missing in the body!";
        res.status(406).end();
    }

    if(typeof(num_players) != 'number') {
        res.statusMessage = "The num_players paramter must be of type number!";
        res.status(409).end();
    }

    //Database implementation
    let newSport = {id, name, num_players}

    Sports
        .createSport(newSport)
        .then(result => {
            if(result.errmsg) {
                res.statusMessage = "There was a problem with the database, try again later";
                res.status(500).end();
            }

            res.statusMessage = "The sport was added successfully";
            res.status(201).json(newSport);
        })
        .catch(err => {
            res.statusMessage = "There was a problem with the database, try again later";
            res.status(500).end();
        })
});

app.delete('/sports/delete/:sportId', (req, res) => {
    let id = req.body.id;
    let sportsId = req.params.sportId;

    if(!id) {
        res.statusMessage = "The id is required in the body!";
        return res.status(406).end();
    }

    if(req.params != "sportsId") {
        res.statusMessage = "The query string parameter must be named 'sportId'!";
        return res.status(406).end();
    }

    if(id != sportsId) {
        res.statusMessage = "The 'id' must be the same as the 'sportId' parameter!";
        res.status(409).end();
    }

    //Database implementation
    Sports
        .deleteSport(id)
        .then(result => {
            if(result.errmsg) {
                res.statusMessage = "The id was not found in the database!";
                res.status(404).end();
            }
            res.statusMessage = "The sport was deleted successfully";
            res.status(204).end();
        })
        .catch(err => {
            res.statusMessage = "There was a problem with the database, try again later";
            res.status(500).end();
        })
});


app.listen( PORT, () => {
    console.log( "This server is running on port 8080" );
    new Promise( ( resolve, reject ) => {
        const settings = {
            useNewUrlParser: true, 
            useUnifiedTopology: true, 
            useCreateIndex: true
        };
        mongoose.connect( 'mongodb+srv://A01193126:A01193126!@cluster0-uula5.mongodb.net/sportsDB?retryWrites=true&w=majority', settings, ( err ) => {
            if( err ){
                return reject( err );
            }
            else{
                console.log( "Database connected successfully." );
                return resolve();
            }
        })
    })
    .catch( err => {
        console.log( err );
    });
});