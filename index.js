require('dotenv').config()
const express=require('express')
const cors=require('cors')
const port=process.env.PORT || 3000;
const app=express();
const { MongoClient, ServerApiVersion } = require("mongodb");

const username=process.env.DB_USER;
const pass=process.env.DB_PASS;
const connectionURI=`mongodb+srv://${username}:${pass}@cluster0.xzvxg9s.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(connectionURI,  {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    }
);
app.use(cors())
app.use(express.json())

app.get('/',(req,res)=>{
    res.send('crowdcube server')
})

async function run() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);


app.listen(port,()=>{
    console.log('server is running');
})