let express = require('express');
let port = process.env.PORT||3000
let app = express();
const cors = require('cors')
const bodyParser = require('body-parser');
let {dbConnect,getData, insertData, updateData, deleteData} = require('./controller/dbcontroller');
const { ObjectId } = require('mongodb');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cors())


app.get('/',async (req,res)=>{
    res.send("Listing")
} )


// ******************************************************* HOST DATA *********************************************
app.get('/becomehost', async(req,res) => {
    let query = {}
    let collection = "host_data";
    let output = await getData(collection,query);
    res.send(output)
})

app.post('/becomehost', async(req,res) => {
    let payload = req.body;
    console.log(req.body)
    let collection = "host_data";
    let output = await insertData(collection,payload);
    res.send(output)
})

app.put('/becomehost/onboarding/:id', async(req,res) => {
    let id = req.params.id;
    let payload = req.body;
    console.log(req.body)
    let collection = "host_data";
    let output = await updateData(collection,payload,id);
    res.send(output)
})

// *************************************** AIRBNB Rooms ******************************************
app.get('/room/:id', async(req,res) => {
    let collection = "host_data";
    let query = {_id: new ObjectId(req.params.id)}
    let output = await getData(collection,query);
    res.send(output)
})

app.post('/room/book/stays/:id', async(req,res) => {
    let payload = req.body;
    payload.hostId = req.params.id
    let collection = "bookings";
    let output = await insertData(collection,payload);
    res.send(output)
})

// ***************************************  Search ******************************************
app.get('/quicksearch', async(req,res) => {
    let collection = "host_data";
    let query = req.query
    let output = await getData(collection,query);
    res.send(output)
})

// app.post('/search', async(req,res) => {
//     let payload = req.body;
//     payload.hostId = req.params.id
//     let collection = "bookings";
//     let output = await insertData(collection,payload);
//     res.send(output)
// })



// *************************************** SIGNING IN USERS ******************************************
app.get('/user', async(req,res) => {
    let query = {}
    let collection = "user";
    let output = await getData(collection,query);
    res.send(output)
})

app.post('/signup', async(req,res) => {
    let payload = req.body;
    console.log(req.body)
    let collection = "user";
    let output = await insertData(collection,payload);
    res.send(output)
})

// app.delete('/airbnb/:id', async(req,res) => {
//     let id = req.params;
//     let collection = "airbnb";
//     let output = await deleteData(collection,id);
//     res.send(output)
// })



app.listen(3000,"127.0.0.1",(err) => {
    dbConnect()
    if(err) throw err;
    console.log(`Server is running on port ${3000}`)
})
