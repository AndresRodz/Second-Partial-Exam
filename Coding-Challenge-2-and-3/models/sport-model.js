const mongoose = require( 'mongoose' );
const uuid = require( 'uuid' );

/* Your code goes here */
const sportsSchema = mongoose.Schema({
    id: {
        type: uuid.v4(),
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    num_players: {
        type: Number,
        required: true
    }
});

const sportsCollection = mongoose.model('sports', sportsSchema);

const Sports = {
    createSport: function(newSport) {
        return sportsCollection
            .create(newSport)
            .then(createdSport => {
                return createdSport;
            })
            .catch(err => {
                return err;
            });
    },
    deleteSport: function(ID) {
        return sportsCollection
            .findOneAndDelete({id: ID})
            .then(deletedSport => {
                return deletedSport;
            })
            .catch(err => {
                return err;
            });
    }
};

module.exports = {Sports};