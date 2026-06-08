export default function KPIcards({ data }) {
  // Total
  const total = data.reduce((sum, item) => sum + item.usage, 0);

  // Average
  const average = data.length ? (total / data.length).toFixed(1) : 0;

  // Maximum
  const max = data.length ? Math.max(...data.map(d => d.usage)) : 0;

  // Count
  const count = data.length;

  return (
    <div className="kpi-container">
      <div className="kpi-card card">
        <h3>Total</h3>
        <p>{total} kWh</p>
      </div>

      <div className="kpi-card card">
        <h3>Average</h3>
        <p>{average} kWh</p>
      </div>

      <div className="kpi-card card">
        <h3>Max</h3>
        <p>{max} kWh</p>
      </div>

      <div className="kpi-card card">
        <h3>Records</h3>
        <p>{count}</p>
      </div>
    </div>
  );
}