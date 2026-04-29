import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [medicine, setMedicine] = useState("");
  const [list, setList] = useState([]);
  const [people, setPeople] = useState([]);
  const [search, setSearch] = useState("");

  // Add medicine to list
  const addMedicine = () => {
    setList([...list, medicine]);
    setMedicine("");
  };

  // Submit data
  const handleSubmit = async () => {
    await axios.post("https://medical-project-6.onrender.com/add", {
      name,
      medicines: list
    });
    setName("");
    setList([]);
    fetchData();
  };

  // Fetch data
  const fetchData = async () => {
    const res = await axios.get("https://medical-project-6.onrender.com/all");
    setPeople(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container"style={{ padding: "20px" }}>
      <h1>Medicine Tracker</h1>

      <input
        placeholder="Person Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="Medicine"
        value={medicine}
        onChange={(e) => setMedicine(e.target.value)}
      />

      <button onClick={addMedicine}>Add Medicine</button>

      <ul>
        {list.map((med, index) => (
          <li key={index}>{med}</li>
        ))}
      </ul>

      <button onClick={handleSubmit}>Save Person</button>

      <hr />

      <h2>All People</h2>
      <input
  placeholder="Search person..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
/>
      {people
  .filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  )
  .map((p, index) => (
        <div className="card" key={index}>
          <h3>{p.name}</h3>
          <ul>
            {p.medicines.map((m, i) => (
              <li key={i}>{m}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default App;
