import { useState } from "react";
import { GoChevronDown } from "react-icons/go";
import { IoClose } from "react-icons/io5"; // 👈 ایمپورت آیکون ضربدر
import {
  faker,
  fakerEN_US,
  fakerEN_GB,
  fakerFR,
  fakerFA,
} from "@faker-js/faker";

const countries = [
  { id: 1, name: "United States", code: "US" },
  { id: 2, name: "United Kingdom", code: "UK" },
  { id: 3, name: "India", code: "IN" },
  { id: 4, name: "Iran", code: "IR" },
  { id: 5, name: "France", code: "FR" },
];

export default function Form({ onClose }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("Choose country");
  const [counter, setCounter] = useState(1);
  const [gender, setGender] = useState("male");
  const [generatedNames, setGeneratedNames] = useState([]);

  function handleGenerate() {
    if (selectedCountry === "Choose country") {
      alert("Please select a country first!");
      return;
    }

    const newNames = [];
    let fakerLocale = faker;
    if (selectedCountry === "United States") fakerLocale = fakerEN_US;
    else if (selectedCountry === "United Kingdom") fakerLocale = fakerEN_GB;
    else if (selectedCountry === "France") fakerLocale = fakerFR;
    else if (selectedCountry === "Iran") fakerLocale = fakerFA;

    for (let i = 0; i < counter; i++) {
      let randomGender = gender;
      if (gender === "both") {
        randomGender = Math.random() > 0.5 ? "male" : "female";
      }
      const randomName = fakerLocale.person.firstName(randomGender);
      newNames.push(randomName);
    }
    setGeneratedNames(newNames);
  }

  return (
    <div className="w-[400px] h-auto rounded-2xl p-6 bg-amber-400 relative shadow-2xl z-50">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-2xl text-amber-900 hover:text-red-700 transition-colors cursor-pointer"
      >
        <IoClose />
      </button>

      <h2 className="text-xl font-bold text-amber-900 mb-4">Name Generator</h2>

      <div className="flex flex-col mt-2">
        <p className="mb-2 font-bold text-amber-900">Country</p>
        <div className="relative">
          <div
            className="flex justify-between items-center p-3 bg-amber-50 rounded-xl cursor-pointer hover:bg-amber-100 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="text-lg text-amber-900">{selectedCountry}</div>
            <GoChevronDown
              className={`text-2xl text-amber-900 transition-transform ${isOpen ? "rotate-180" : ""}`}
            />
          </div>

          <ul
            className={`p-2 w-full rounded-xl bg-amber-50 absolute top-14 left-0 shadow-xl z-50 border border-amber-200 transition-all duration-300 ease-out ${
              isOpen
                ? "opacity-100 translate-x-0 pointer-events-auto"
                : "opacity-0 -translate-x-10 pointer-events-none"
            }`}
          >
            {countries.map((country) => (
              <li
                key={country.id}
                className="p-2 bg-amber-100 hover:bg-amber-300 mb-1 rounded-lg cursor-pointer text-amber-900 font-medium"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedCountry(country.name);
                  setIsOpen(false);
                }}
              >
                {country.name}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-5">
        <p className="mb-2 font-bold text-amber-900">How many names?</p>
        <input
          type="number"
          min="1"
          max="50"
          className="p-3 w-full bg-amber-50 outline-0 rounded-xl text-amber-900 font-bold"
          value={counter}
          onChange={(e) => setCounter(Number(e.target.value))}
        />
      </div>

      <div className="mt-5">
        <p className="mb-2 font-bold text-amber-900">Gender</p>
        <div className="flex justify-center gap-3">
          <button
            className={`p-3 rounded-xl cursor-pointer w-full transition-colors font-bold ${
              gender === "female"
                ? "bg-amber-900 text-white"
                : "bg-amber-50 text-amber-900 hover:bg-amber-100"
            }`}
            onClick={() => setGender("female")}
          >
            Female
          </button>
          <button
            className={`p-3 rounded-xl cursor-pointer w-full transition-colors font-bold ${
              gender === "male"
                ? "bg-amber-900 text-white"
                : "bg-amber-50 text-amber-900 hover:bg-amber-100"
            }`}
            onClick={() => setGender("male")}
          >
            Male
          </button>
          <button
            className={`p-3 rounded-xl cursor-pointer w-full transition-colors font-bold ${
              gender === "both"
                ? "bg-amber-900 text-white"
                : "bg-amber-50 text-amber-900 hover:bg-amber-100"
            }`}
            onClick={() => setGender("both")}
          >
            Both
          </button>
        </div>
      </div>

      <div className="w-full flex justify-center mt-8">
        <button
          className="p-3 w-full bg-amber-900 text-white font-bold text-lg rounded-xl hover:bg-amber-950 transition-colors shadow-lg"
          onClick={handleGenerate}
        >
          Generate Names 🚀
        </button>
      </div>

      {generatedNames.length > 0 && (
        <div className="mt-6 bg-amber-50 p-4 rounded-xl max-h-40 overflow-y-auto border border-amber-200">
          <ul className="list-disc pl-5">
            {generatedNames.map((name, index) => (
              <li
                key={index}
                className="text-lg text-amber-900 py-1 font-medium"
              >
                {name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
