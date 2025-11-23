import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import Praconwik from "./models/empoyeeModel.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

mongoose.set();

async function connectTomongoDB() {
  try {
    mongoose.set("bufferCommands", false); // to jest bez buforu
    mongoose.set("strictQuery", true); // jakieś pola nie są zgodne z modelem to baza nie dostaje ifnormacji nie ma sensu wykorzystywać to za każdym razem jak nie potrzebnie to jak sie nam nic nie zmienia
    const mongoDBcon = "mongodb://127.0.0.1:27017";
    await mongoose.connect(mongoDBcon, { dbName: "Employees" });
    console.log("Połaczenie z serwerem bazy danych nawiązane");
  } catch (error) {
    console.error("Błąd połączenia do bazy danych", error.message);
    prosess.exit(1); // zamyka aplikacje, opcjonalnie(jak sie nie połaczylismy to zwalniamy zasoby i zamykamy aplikacje)
  }
}

connectTomongoDB();
var employess = [];
var departments = [];
app.get("/de", (req, res) => {
  res.send("Delg.");
});
app.post("/add_employ", async (req, res) => {
  const data = req.body;

  var maxindex = employess.length + 1;

  console.log(data.department);
  //dodawnaie do tabeli
  employess.push({
    id: maxindex,
    name: data.name,
    surname: data.surname,
    salary: data.salary,
    department: data.department,
  });

  //dodawanie do bazy
  try {
    const newEmpRecord = {
      id: maxindex,
      name: data.name,
      surname: data.surname,
      salary: data.salary,
      department: data.department,
    };

    const newEmployedRecord = await Praconwik.create(newEmpRecord);
    res.json({ status: "success" });
  } catch (error) {
    console.error("Bład dodawania do bazy", error.message);
    res.status(500).json({ message: "Bład dodawania" });
  }
});
app.get("/get_employess", async (req, res) => {
  const pracownicy = await Praconwik.find(
    { $and: [{ department: "IT" }, { salary: { $gte: 1400, $lte: 2500 } }] },
    "id name surname salary department"
  )
    .skip(0)
    .limit(20)
    .sort({ salary: -1 });
  res.json({ data: pracownicy });
});

// parametry do szukania
// FindById: wyszukaj dane po wewnetrzym identyfikatorze Mongo
// FindOne: wyszukaj dane ze wzgledu na własny parametr findone(id:dupa) - zwraca tylko perwsze wystapienie
// find() = szula wszystkich (select *)
// zwrot ograniczony - projekcja
//find({},"imie nazwisko pensja") - bez przecinków
// zwrot danych - sortowanie
// a) find().sort({pensja:-1}) - sortowanie malejace
// b) find().sort({pensja:1}) - sortowanie rosnące

//find( { department: "IT" }) - znajudje tylko te 2 które są department

//find() - operatory algebraiczne oraz logiczne

//wieksze niz:  Praconwik.find( { salary: { $gt: 1500 } } grather than
//mniejsze niz: $lt -> lower than
// większe lub rónwe $gte -> grather than equal
//mnniejsze lub równe $lte -> lower than equal
//różne -> $ne   -> not equal
//eq -> równa się - ale uzywanie tego troche be sensu

//operatory $or, $and $not

//const pracownicy = await Praconwik.find({ $and: [{ department: "IT" }, { salary: { $gte: 1400 } }] })
app.get("/get_employess/:name", async (req, res) => {
  console.log(employess);
  console.log(req.params.name);

  const pracowik = await Praconwik.findOne({ id: req.params.name });

  // wyszukiwanie w bazie
  if (pracowik) {
    res.json({ data: [pracowik] });
  } else {
    res.status(404).json({ message: "Brak Pracownika" });
  }
});
app.get("/test/get_employess/", async (req, res) => {
  /// zwykłe na find:
  // np. await Praconwik.find({ id: req.params.name });
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

  // suma pensji:
  // const wynik = await Praconwik.aggregate([
  //   {
  //     $group: {
  //       _id: null,
  //       sumapensji: { $sum: "$salary" },
  //     },
  //   },
  // ]);

  // ŚREDNIA DLA KAŻDEGO ODZIAŁU:
  // const wynik = await Praconwik.aggregate([
  //   {
  //     $group: {
  //       _id: "$department",
  //       sumapensji: { $avg: "$salary" },
  //     },
  //   },
  // ]);

  // minimalna DLA KAŻDEGO ODZIAŁU:
  // const wynik = await Praconwik.aggregate([
  //   {
  //     $group: {
  //       _id: "$department",
  //       minimalnapensja: { $min: "$salary" },
  //     },
  //   },
  // ]);

  // suma pensji w każdym wydziale posortowana malejącjo
  // const wynik = await Praconwik.aggregate([
  //   {
  //     $group: {
  //       _id: "$department",
  //       sumapensji: { $sum: "$salary" },
  //     },
  //   },
  //   {
  //     $sort: { sumapensji: -1 },
  //   },
  // ]);

  /// pokazanie sumy wynagrodzeń gdy są wieksze od 10 tysiecy
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
  if (wynik) {
    res.json({ data: [wynik] });
  } else {
    res.status(404).json({ message: "Brak Pracownika" });
  }
});

app.post("/add_department/:id", (req, res) => {
  const data = req.body;
  console.log(data);
  var maxindex = departments.length + 1;
  departments.push({
    id: maxindex,
    miasto: data.miasto,
    kilometry: data.kilometry,
    datawyjazdu: data.datawyjazdu,
    employ_id: req.params.id,
  });
  console.log(departments);
  res.json({ status: "success" });
});

app.get("/department/:id", (req, res) => {
  var mapedDepartments = departments.filter(
    (department) => department.employ_id.toString() === req.params.id.toString()
  );
  console.log(mapedDepartments);
  res.json({ data: mapedDepartments });
});

app.listen(PORT, () => {
  console.log(`server is running on: ${PORT}`);
});
