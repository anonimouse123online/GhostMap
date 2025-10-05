// src/components/SidebarDetails.jsx
export default function SidebarDetails({ pin, onClose }) {
  if (!pin) return null;

  return (
    <div className="sidebar-details">
      <button className="close-btn" onClick={onClose}>×</button>
      <h2>{pin.title}</h2>
      <p><strong>Contractor:</strong> {pin.contractor || '—'}</p>
      <p><strong>Location:</strong> {pin.government_unit || '—'}</p>
      <p>{pin.description}</p>
      <h3>Sources:</h3>
      <ul>
        {pin.sources?.map((src, i) => (
          <li key={i}>
            <a href={src.url} target="_blank" rel="noopener noreferrer">
              {src.title || src.url}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}