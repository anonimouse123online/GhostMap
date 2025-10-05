// src/components/AddReportModal.jsx
import { useState } from 'react';

export default function AddReportModal({ isOpen, location, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    title: '',
    contractor: '',
    description: '',
    government_unit: '',
    sources: [{ url: '', title: '' }]
  });

  if (!isOpen || !location) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSourceChange = (index, field, value) => {
    const newSources = [...formData.sources];
    newSources[index][field] = value;
    setFormData({ ...formData, sources: newSources });
  };

  const addSource = () => {
    setFormData({
      ...formData,
      sources: [...formData.sources, { url: '', title: '' }]
    });
  };

  const handleSubmit = (e) => {
  e.preventDefault();
  if (!formData.title.trim() || !formData.description.trim()) {
    alert('Please fill in project title and description.');
    return;
  }

  // ✅ Filter out sources with empty URLs
  const validSources = formData.sources.filter(s => s.url?.trim());

  // Optional: if you want sources to be truly optional, remove this alert
  // (commented out because you said "sources should be optional")
  // if (validSources.length === 0) {
  //   alert('Please provide at least one source URL.');
  //   return;
  // }

  onSubmit({
    title: formData.title,
    contractor: formData.contractor,
    description: formData.description,
    government_unit: formData.government_unit,
    // ✅ Send null if no valid sources
    sources: validSources.length > 0 ? validSources : null,
    lat: location.lat,
    lng: location.lng
  });
};

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-btn" onClick={onClose}>×</button>
        <h2>Add Ghost Project Report</h2>
        <p><strong>📍 Location:</strong> {location.lat.toFixed(4)}, {location.lng.toFixed(4)}</p>

        <form onSubmit={handleSubmit}>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Project Title *"
            required
          />
          <input
            name="contractor"
            value={formData.contractor}
            onChange={handleChange}
            placeholder="Contractor (optional)"
          />
          <input
            name="government_unit"
            value={formData.government_unit}
            onChange={handleChange}
            placeholder="Municipality / Province (optional)"
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Short description (max 300 chars) *"
            required
            maxLength="300"
            rows="3"
          />

          <h3>Sources *</h3>
          {formData.sources.map((src, i) => (
            <div key={i} className="source-row">
              <input
                type="url"
                value={src.url}
                onChange={(e) => handleSourceChange(i, 'url', e.target.value)}
                placeholder="https://example.com/news-article"
                required
              />
              <input
                value={src.title}
                onChange={(e) => handleSourceChange(i, 'title', e.target.value)}
                placeholder="Source title (optional)"
              />
            </div>
          ))}
          <button type="button" onClick={addSource} className="add-source-btn">
            + Add Another Source
          </button>

          <div className="modal-actions">
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Submit Report
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}