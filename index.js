const express=require('express');
const cors=require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port=process.env.PORT || 5000;
const app=express();
require('dotenv').config();

app.use(cors());
app.use(express.json());


const username = process.env.DB_USER;
const pass = process.env.DB_PASS;
const uri = `mongodb+srv://${username}:${pass}@learnmongo.4ifovjo.mongodb.net/?retryWrites=true&w=majority&appName=LearnMongo`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    const database = client.db("crowdcubeDb");
    const campaignCollection = database.collection("campaignCollection");
    const categoryCollection = database.collection("categoryCollection");
    const userCollection = database.collection("UserCollection");

    console.log("Connected to MongoDB!");

    
    app.get("/campaigns", async (req, res) => {
      const campaigns = await campaignCollection.find().toArray();
      res.send(campaigns);
    });
    app.get("/categories", async (req, res) => {
      const categories = await categoryCollection.find().toArray();
      res.send(categories);
    });
    app.get("/runningCampaigns", async (req, res) => {
      const campaigns = await campaignCollection.find({deadline: { $gt: new Date() }}).limit(6).toArray();
      res.send(campaigns);
    });
    app.get("/campaigns/:campId",async(req,res)=>{
      const {campId}=req.params;
      const id=new ObjectId(campId);
      const campaign=await campaignCollection.findOne({_id : id});
      res.send(campaign);
    })

  } 
  catch (error) {
    console.error("DB Connection Error:", error);
  }
}

run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('crowdcube server running');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
