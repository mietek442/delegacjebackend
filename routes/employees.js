import { Router } from "express";
import { addEmployee } from "../controllers/employees";

const router = Router();

router.post("/add_employ", addEmployee);
