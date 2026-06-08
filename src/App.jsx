// cd energy-dashboard -> npm run dev

import { useState, useEffect } from "react";
import EnergyChart from "./components/EnergyChart";
import KPIcards from "./components/KPIcards";
import "./App.css";

export default function App() {
  const [data, setData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [filter, setFilter] = useState("all");

  const [form, setForm] = useState({
    date: "",
    usage: ""
  });
  
  
  // Load saved data from localStorage and convert it from a JSON string to an array
  useEffect(() => {
    const saved = localStorage.getItem("energyData");
    if (saved) setData(JSON.parse(saved));
    setIsLoaded(true);
  }, []);

  // Convert the data array to a JSON string and save it to localStorage
  // Save data if isLoaded is true.
  useEffect(() => {
    // Do not save before loading data. -> If save before loading, always data = [].
    if (!isLoaded) return;
    console.log("Saving data:", data);

    localStorage.setItem(
      "energyData",
      JSON.stringify(data)
    );
  }, [data, isLoaded]);

  // Change Input
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle data
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.date || !form.usage) return;

    setData((prev) => {
      // Find if the same data already exists
      const exists = prev.find(item => item.date === form.date);

      if (exists) {
        // If exists, update the data
        return prev.map(item =>
          item.date === form.date
            ? { ...item, usage: Number(form.usage) }
            : item
        );
      }

      // If not exists, add the data
      return [
        ...prev,
        {
          id: Date.now(),
          date: form.date,
          usage: Number(form.usage)
        }
      ];
    });

    setForm({ date: "", usage: "" });
  };
  
  // Delete data
  // Get the id that you want to delete, and then
  // Keep the data that does not match the data that you want to delete.
  const handleDelete = (id) => {
    setData((prev) => prev.filter((item) => item.id !== id));
  };
  
  // Filtering
  const getFilteredData = () => {
    let filtered = data;

    const today = new Date();

    if (filter === "week") {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(today.getDate() - 7);

      filtered = data.filter((item) => {
        const itemDate = new Date(item.date);
        return itemDate >= sevenDaysAgo && itemDate <= today;
      });
    }

    if (filter === "month") {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(today.getDate() - 30);

      filtered = data.filter((item) => {
        const itemDate = new Date(item.date);
        return itemDate >= thirtyDaysAgo && itemDate <= today;
      });
    }
    
    // Sort by date
    return [...filtered].sort((a, b) => {
      return new Date(a.date) - new Date(b.date);
    });
  };

  return (
    <div className="container">
      <h1 className="title">Energy Dashboard</h1>

      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Date</label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Usage (kWh)</label>
          <input
            type="number"
            name="usage"
            value={form.usage}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Add</button>
      </form>

      <hr />

      <div className="filter">
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("week")}>Week</button>
        <button onClick={() => setFilter("month")}>Month</button>
      </div>
      
      <KPIcards data={data} />

      <div className="chart card">
        <EnergyChart data={getFilteredData()} />
      </div>

      <h2 className="subtitle">Records</h2>

      <div className="records">
        {data.length === 0 ? (
          <p>No data yet</p>
        ) : (
          <ul>
            {data.map((item) => (
              <li className="record-item" key={item.id}>
                {item.date} → {item.usage} kWh

                <button
                  className="delete-btn"
                  onClick={() => handleDelete(item.id)}
                >
                Delete
                </button>
              </li>
            ))}
          </ul>
        )}  
      </div>
    </div>
  );
}

