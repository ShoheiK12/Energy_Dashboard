// cd energy-dashboard -> npm run dev

import { useState } from "react";
import EnergyChart from "./components/EnergyChart";

export default function App() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("all");

  const [form, setForm] = useState({
    date: "",
    usage: ""
  });

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
    
    if (filter === "week") {
      filtered = data.slice(-7);
    }

    if (filter === "month") {
      filtered = data.slice(-30);
    }

    // Sort by date
    return [...filtered].sort((a, b) => {
      return new Date(a.date) - new Date(b.date);
    });
  };

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>Energy Dashboard</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
        />

        <input
          type="number"
          name="usage"
          value={form.usage}
          onChange={handleChange}
        />

        <button type="submit">Add</button>
      </form>

      <hr />

      <div style={{ margin: "10px 0" }}>
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("week")}>Week</button>
        <button onClick={() => setFilter("month")}>Month</button>
      </div>

      <EnergyChart data={getFilteredData()} />

      <h2>Records</h2>

      {data.length === 0 ? (
        <p>No data yet</p>
      ) : (
        <ul>
          {data.map((item) => (
            <li key={item.id}>
              {item.date} → {item.usage} kWh

              <button
                onClick={() => handleDelete(item.id)}
                style={{ marginLeft: "10px", color: "red" }}
              >
              Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

