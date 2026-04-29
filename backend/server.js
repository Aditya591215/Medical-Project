const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dns=require("dns")
dns.setServers(["1.1.1.1","8.8.8.8"])

const app = express();

app.use(cors());
app.use(express.json());

// Connect MongoDB
mongoose.connect("mongodb+srv://aditya:Aditya-Medical@cluster0.empxqrk.mongodb.net/medicinesDB")
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

// Schema
const personSchema = new mongoose.Schema({
  name: String,
  medicines: [String]
});

const Person = mongoose.model("Person", personSchema);

// Add person
app.post("/add", async (req, res) => {
  try{
  const { name, medicines } = req.body;
  const newPerson = new Person({ name, medicines });
  await newPerson.save();
  res.send("Saved successfully");
  }catch(err){
    console.log(err);
    res.status(500).send("Error")
  }
});

// Get all
app.get("/all", async (req, res) => {
  const data = await Person.find();
  res.json(data);
});

// Start server


app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});  