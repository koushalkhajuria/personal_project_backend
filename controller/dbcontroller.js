
let {MongoClient, ObjectId} = require('mongodb');
let mongoUrl = "mongodb+srv://koushalkhajuira:8jh6egJDMOXaU1CS@cluster0.tt6ytwc.mongodb.net/";

let client = new MongoClient(mongoUrl)

async function dbConnect(){
    await client.connect()
}

let db = client.db('airbnb');

async function getData(colName,query){
    let output = [];
    try{
        const cursor = db.collection(colName).find(query);
        for await(const data of cursor){
            output.push(data)
        }
        cursor.closed
    } catch(err){
        output.push({"Error":"Error in getData"})
    }
    return output
}



async function insertData(colName, payload){
  let output = [];
  try{
    console.log(payload)
      const cursor = await db.collection(colName).insertOne(payload);
      output.push({"Success":cursor});
      cursor.closed;

  } catch(err){
      output.push({"Error":"Error in getData"});
  }
  return output
}

async function updateData(colName, payload, id){
    let output = [];
    console.log(id, payload)
    let new_values = {$set: payload}
    // try{
      console.log((id))
        const cursor = await db.collection(colName).updateOne({_id:new ObjectId(id)}, new_values);
        output.push({"Success":cursor});
        cursor.closed;
  
    // } catch(err){
    //     output.push({"Error":"Error in getData"});
    // }
    return output
  }

async function deleteData(colName, id){
  let output = [];
  try{
      const cursor = await db.collection(colName).deleteOne(id);
      output.push({"Success":cursor});
      cursor.closed;

  } catch(err){
    console.log(err)
      output.push({"Error":"Error in getData"});
  }
  return output
}
module.exports = {
    dbConnect,
    getData,
    insertData,
    updateData,
    deleteData
}