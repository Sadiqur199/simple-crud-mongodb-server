const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000
//middleWare
app.use(cors())
app.use(express.json())

//sadiqurrhaman199
//Ph3t4LbJ2ic9TxyY


//mongodb code

const uri = "mongodb+srv://sadiqurrhaman199:Ph3t4LbJ2ic9TxyY@cluster0.ab4114m.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const database = client.db("usersDB");
    const UserCollection = database.collection("users");


  app.get('/users',async(req,res)=>{

    const cursor = UserCollection.find()
    const result = await cursor.toArray()
    res.send(result)

  })


  app.get('/users/:id',async(req,res)=>{
   
    const id = req.params.id
    const query = {_id:new ObjectId(id)}
    const user =  await UserCollection.findOne(query)
    res.send(user)

  })

  //post
   app.post('/users',async(req,res)=>{
    const user = req.body
    console.log('new user',user)
    const result = await UserCollection.insertOne(user);
    res.send(result)
   });
   
   //Update

   app.put('/users/:id',async(req,res)=>{
    const id = req.params.id
    const updatedUser = req.body

    // console.log(id,updatedUser)

    const updated = {_id:new ObjectId(id)}
    const options = {upsert:true}
    const updatedData = {
      $set:{
        name:updatedUser.name,
        email:updatedUser.email
      }
    }
   const result = await UserCollection.updateOne(updated,updatedData,options)
   res.send(result)

    res.send()
   })


   //delete 
   app.delete('/users/:id',async(req,res)=>{
    const id = req.params.id
    console.log('please id delete from database',id)
    const query = {_id:new ObjectId(id)}
    const result = await UserCollection.deleteOne(query)
    res.send(result)

   })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);




//server run
app.get('/',(req,res)=>{
  res.send('simple crud is running')
})

app.listen(port,()=>{
  console.log(`simple crud run ${port}`)
})