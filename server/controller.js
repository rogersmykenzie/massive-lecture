function addPerson(req, res) {
    const {first_name, last_name, age, has_curly_hair} = req.body;
    //error handling here
    //check to make sure they provided a first_name, last_name, age, and has_curly_hair property on body
    //if they havent send back a status of 400
    if(first_name === undefined || last_name === undefined || age === undefined || has_curly_hair === undefined) {
        res.sendStatus(400);
    } else {
        const db = req.app.get('db'); //get the database instance and save it in the db variable
        db.addPerson(first_name, last_name, age, has_curly_hair).then(() => {
            res.sendStatus(200);
        }).catch(e => {
            console.log(e);
            res.status(500).json("Something bad happened");
        })
    }




}

function getPersonByName(req, res) {
    const {name} = req.params;
    const db = req.app.get('db');
    db.getPersonByName(name).then(people => {
        console.log(people[0]);
        res.status(200).json(people);
    }).catch(e => console.log(e));
}

module.exports = {
    addPerson,
    getPersonByName
}