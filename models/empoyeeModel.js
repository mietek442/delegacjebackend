import mongoose from "mongoose";

// Opcje parametrów pól schematu
// minlenght / maxlenght - dla String - długość
//lowercase / uppercase - dla String - czy ma być zamieniona na małe/duże litery
//inmutable - brak możliwości zmiany wartości po zapisaniu (imputable:true)
// select - gdy pobierasz wszystkie pola selectem to to nie bedzie wtedy brane( jest wyjątkowe - po id pobiera ) 'Select' * - to on sie nie daje - wybradny dziad
// enum typ na stringu enumowey enum:['finanse','HR','logistyka',]

// min / max - dla Number - wartość

//Definicja schematu:

const PracownikSchemat = new mongoose.Schema(
  {
    id: { type: Number, required: true },
    name: { type: String, required: true, trim: true },
    surname: { type: String, required: true, trim: true },
    salary: { type: Number, required: true, min: 1000, max: 15000 },
    department: { type: String, required: true, trim: true },
  },
  {
    timestamps: {
      createdAt: "utworzony",
      updatedAt: "zmodyfikowany",
    },

    // jak nie ma collection to on utworzy kolekcje taką że automatycznie po angielsku sobie utworzy nazwe -    baza danych Product- to koleckja Products
    colletion: "Employess",

    // można też ustawić to dla poszczególnych danych
    //  mongoose.set("bufferCommands", false); // to jest bez buforu
    //  mongoose.set("strictQuery", true); /
  }
);
const Praconwik = mongoose.model("Empolyess", PracownikSchemat);

export default Praconwik;
