// src/components/PinFormModal.jsx
import { useState } from 'react';
import './PinFormModal.css'; // ✅ Import CSS

export default function PinFormModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    title: '',
    contractor: '',
    description: '',
    government_unit: '',
    sources: [{ url: '', title: '' }]
  });

  if (!isOpen) return null;

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

    const validSources = formData.sources.filter(s => s.url?.trim());
    onSubmit({
      ...formData,
      sources: validSources.length > 0 ? validSources : null
    });
  };

  return (
    <div className="pin-form-overlay" onClick={(e) => {
      if (e.target === e.currentTarget) onClose();
    }}>
      <div className="pin-form-modal">
        <button className="close-btn" onClick={onClose}>×</button>
        <div className="modal-header">
          <h3>📍 Mark This Location</h3>
          <p>Tap anywhere on the map to mark a ghost project.</p>
        </div>

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
            placeholder="Short description (max 300 chars). Include details like the name of the congressman or contractor involved.*"
            required
            maxLength="300"
            rows="3"
          />

          <h4>Sources (optional)</h4>
          {formData.sources.map((src, i) => (
            <div key={i} className="source-row">
              <input
                type="url"
                value={src.url}
                onChange={(e) => handleSourceChange(i, 'url', e.target.value)}
                placeholder="https://example.com/news-article"
              />
              <input
                value={src.title}
                onChange={(e) => handleSourceChange(i, 'title', e.target.value)}
                placeholder="Source title (optional)"
              />
            </div>
          ))}
          <button type="button" className="add-source-btn" onClick={addSource}>
            + Add Another Source
          </button>

          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>
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
