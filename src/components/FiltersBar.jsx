// src/components/FiltersBar.jsx
export default function FiltersBar() {
  return (
    <div className="filters-bar">
      <input type="text" placeholder="Search projects..." />
      <select>
        <option value="all">All Status</option>
        <option value="pending">Pending</option>
        <option value="verified">Verified</option>
      </select>
      <button>Reset</button>
    </div>
  );
}