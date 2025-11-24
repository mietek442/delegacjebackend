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
