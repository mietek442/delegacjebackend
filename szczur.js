//server.js
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
mongoose.set();

async function ConnectoMongoDB() {
  mongoose.set("bufferCommands", false);
  mongoose.set("strictQuery", false);
  var dbCon = "mongodb://localhost:27017";
  mongoose.connect(dbCon, { dbName: "nazwabazy" });
}
ConnectoMongoDB();
var port = 8080;
app.listen(port, () => {
  console.log(`aplikacja ciebie słucha na pocie ${port} `);
});
app.use("/rowery", rowerRouter);
//schemat.js
import mongoose from "mongoose";
import { type } from "os";
const schemat = new mongoose.Schema(
  {
    id: { type: Number, required: true },
    name: { type: String, required: true },
    wydzial: {
      type: String,
      required: true,
      enum: ["Piwosmakosz", "PiwoTester", "MenelniaGorzały"],
    },
  },
  {
    timestamps: {
      createdAt: "Utorzony",
      updatedAt: "Zmodyfikowany",
    },
    collation: "Menele",
  }
);
const Menel = mongoose.model("Menel", schemat);
export default Menel;
//routes.js

import {Router} from express
import { GetRower } from "./balawender-zabawa/controlers/rowery";
const router = Router()

router.get("/pobierzemenela",GetRower)
export default router;
//controler.js
import Rower from "./balawender-zabawa/models/rowerModel";
export const GetRower = async(req,res)=>{
    const rower = await Rower.find({price:{$gte:2000}})  
} 
export const CreateRower = async(req,res)=>{
    const newRowerRecord = await Rower.create({id:2,name:"menel",price:200})
    res.json("sucess");
}

useEffect(() => {
    axios
      .get("http://localhost:8080/rowery/rower")
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  const AddBike = () => {
    fetch("http://localhost:8080/rowery/dodajrower", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datatosend),
    });
    console.log("Wysłano rower: ", datatosend.name, " ", datatosend.price);
  };
  function addEmployee() {
    const data = { name, surname, salary, department };
    axios.post("http://localhost:3000/add_employ", data).then((res) => {
      getEmployess();
    });
  }

"scripts": {
    "dev": "nodemon server.js"
  },
  "type": "module",
// {nazwisko: {regex:/^B/i}}  //odpowiednik sql like B%
 // {nazwisko: {regex:/B$/i}} //odpowiednik sql like %B
//$expr:{ $gte: [ { $strLenCP: "$nazwisko" }, 5 ] } }  // to chodzi o to że możemy pole z bazy potraktować jako zmienna
  const wynik = await Praconwik.aggregate([
    {
      $group: {
        _id: "$department",
        sumapensji: { $sum: "$salary" },
      },
    },
    {
      $match: {
        sumapensji: { $gt: 10000 },
      },
    },
    {
      $sort: { sumapensji: -1 },
    },
    {
      $project: {
        _id: 0,
        sumapensji: 1, // to jest po to aby tylko zwracać sume pesnji i id czyli nie wszystkie dane bo tak jest kurde łatwiej i nara xd
      },
    },
  ]);


    // dodatkowe 

const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const Wydarzenie = require("./models/wydarzeniamodel.js");
const addWydarzenie = async (req, res) => {
  console.log("Dane otrzymane z frontendu:", req.body);

  const projekt = {
    nazwa: req.body.nazwa,
    status: req.body.status,
    priorytet: req.body.priorytet,
    terminrealizacji: req.body.terminrealizacji,
    postep: req.body.postep,
  };
  try {
    const newProjektrecord = await Wydarzenie.create(projekt);
    console.log("Wydarzenie dodane:", newProjektrecord);
    res.status(201).json({ message: "sucess" });
  } catch (err) {
    res.status(500).json({ message: "error" });
  }
};

const getWydarzenia = async (req, res) => {
  try {
    const wydarzenia = await Wydarzenie.find();

    res.json({ data: wydarzenia });
  } catch (err) {
    console.log("Error fetching wydarzenia:", err);
    res.status(500).json({ message: "error" });
  }
};
testFunctionGetByParametr = async (req, res) => {
  try {
    console.log(req.params.parametr);
    const wydarzenia = await Wydarzenie.find({
      priorytet: req.params.parametr,
    });

    // pensja >=8000
    // {pensja:{$gte:8000}}
    // pensja >8000
    // {pensja:{$gt:8000}}

    // wysietlamy tylko imie i nazwisko pracownika gdy pesnja wieksza od 1000
    // {pensja:{$gte:8000}},{ imie: 1, nazwisko: 1 }

    // nazwisko na daną literę b:
    // {nazwisko: {regex:/^B/i}}  //odpowiednik sql like B%

    // nazwisko kończy się na daną literę b:
    // {nazwisko: {regex:/B$/i}} //odpowiednik sql like %B

    //5 nazwikso >= 5 znaków
    // $expr:{ $gte: [ { $strLenCP: "$nazwisko" }, 5 ] } }  // to chodzi o to że możemy pole z bazy potraktować jako zmienna
    //res.json({ data: wydarzenia });

    // $or:[{wydział:"Logistyka"},{wydział:"HR"}}]

    //7 pensja od 9000 do 12000zł włacznie
    //przedział:
    // {pensja:{$gte:9000,$lte:12000}}}

    //8 wszyscy pracownicy proza działem hr:
    //wydział:{$ne:"HR"}

    //9
    //pensja >9500, wydział inny niz logistyaka nazwisko konczy się na c

    // pensja:$and:[{gte:9500},{wydział:{$ne:"Logistyka"},{nazwisko: {regex:/^c/i}} }]

    //10
    //pensja >9000 lub wydiał "hr" i wydział różny od finanse

    //$and:[{$or:[pensja:{$gt:9000}},{wydzial:"HR"},{$ne:{imie:"Olaf"}}]}];

    //================================================
    // Agregowanie i Grupowanie danych:
    //================================================
    // avg(), sum(), count(), groupby ->SQL
  } catch (err) {
    console.log("Error fetching wydarzenia:", err);
    res.status(500).json({ message: "error" });
  }
};

const getwydarzeniebyId = async (req, res) => {
  try {
    console.log(req.params.parametr);
    const wydarzenia = await Wydarzenie.find({
      priorytet: req.params.parametr,
    });

    res.json({ data: wydarzenia });
  } catch (err) {
    console.log("Error fetching wydarzenia:", err);
    res.status(500).json({ message: "error" });
  }
};

router.post("/dodajwydarzenia", addWydarzenie);

router.get("/wydarzenia", getWydarzenia);
router.get("/wydarzenia/:parametr", getwydarzeniebyId);
router.get("/wydarzenia/test/:parametr", testFunctionGetByParametr);
module.exports = router;
