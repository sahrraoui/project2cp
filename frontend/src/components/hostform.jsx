import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./NavbarProf";

const tabList = ["Basic Info", "Vehicle Details", "Features"];
const vehicleTypes = [
  "Sedan",
  "SUV",
  "Truck",
  "Convertible",
  "Luxury",
  "Electric",
];

const featureList = [
  "Automatic Transmission",
  "GPS Navigation",
  "Backup Camera",
  "Heated Seats",
  "Third Row Seating",
  "Ski Rack",
  "Manual Transmission",
  "Bluetooth",
  "Sunroof",
  "Leather Seats",
  "Bike Rack",
  "Child Seat",
];
const fuelTypes = ["Gasoline", "Electric", "Diesel", "Hybrid"];

const customCheckboxStyle = `
.custom-checkbox {
  position: relative;
  padding-left: 24px;
  cursor: pointer;
  font-size: 15px;
  user-select: none;
  display: inline-flex;
  align-items: center;
}
.custom-checkbox input[type="checkbox"] {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0; width: 0;
}
.custom-checkbox .checkmark {
  position: absolute;
  left: 0; top: 0;
  height: 16px; width: 16px;
  background-color: #fff;
  border: 2px solid #111;
  border-radius: 3px;
  transition: background 0.2s, border 0.2s;
}
.custom-checkbox input:checked ~ .checkmark {
  background-color: #111;
  border-color: #111;
}
.custom-checkbox .checkmark:after {
  content: "";
  position: absolute;
  display: none;
}
.custom-checkbox input:checked ~ .checkmark:after {
  display: block;
}
.custom-checkbox .checkmark:after {
  left: 4px; top: 0px;
  width: 5px; height: 10px;
  border: solid #fff;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
  content: '';
  position: absolute;
}
`;

const customRadioStyle = `
.custom-radio {
  position: relative;
  padding-left: 24px;
  cursor: pointer;
  font-size: 15px;
  user-select: none;
  display: inline-flex;
  align-items: center;
}
.custom-radio input[type="radio"] {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0; width: 0;
}
.custom-radio .radiomark {
  position: absolute;
  left: 0; top: 0;
  height: 16px; width: 16px;
  background-color: #fff;
  border: 2px solid #111;
  border-radius: 50%;
  transition: background 0.2s, border 0.2s;
}
.custom-radio input:checked ~ .radiomark {
  background-color: #fff;
  border-color: #111;
}
.custom-radio .radiomark:after {
  content: "";
  position: absolute;
  display: none;
}
.custom-radio input:checked ~ .radiomark:after {
  display: block;
}
.custom-radio .radiomark:after {
  left: 2px;
  top: 2px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #111;
  content: '';
  position: absolute;
}
`;

const customButtonStyle = `
.submit-btn {
  background: #e63956;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 12px 28px;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  margin-top: 10px;
  align-self: flex-end;
  transition: background 0.2s;
  opacity: 1;
}
.submit-btn:hover:not(:disabled) {
  background: #111;
  color: #fff;
}
`;

const HostForm = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    city: "",
    state: "",
    photos: Array(6).fill(null),
    // Vehicle Details
    make: "",
    model: "",
    year: "",
    licensePlate: "",
    vehicleType: "Sedan",
    price: "",
    features: [],
    fuelType: "Gasoline",
    additionalInfo: "",
  });
  const [photoPreviews, setPhotoPreviews] = useState(Array(6).fill(null));

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePhotoChange = (idx, file) => {
    const newPhotos = [...form.photos];
    newPhotos[idx] = file;
    setForm({ ...form, photos: newPhotos });
    // Preview
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newPreviews = [...photoPreviews];
        newPreviews[idx] = reader.result;
        setPhotoPreviews(newPreviews);
      };
      reader.readAsDataURL(file);
    } else {
      const newPreviews = [...photoPreviews];
      newPreviews[idx] = null;
      setPhotoPreviews(newPreviews);
    }
  };

  const handleFeatureChange = (feature) => {
    setForm((prev) => {
      const features = prev.features.includes(feature)
        ? prev.features.filter((f) => f !== feature)
        : [...prev.features, feature];
      return { ...prev, features };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Add form submission logic
    alert("Listing submitted! (Demo)");
  };

  return (
    <>
      <style>{customCheckboxStyle + customRadioStyle + customButtonStyle}</style>
      <Navbar />
      <div style={styles.container}>
        <h1 style={styles.header}>List Your Vehicle</h1>
        <p style={styles.subheader}>Share your car with travelers</p>
        <button 
          onClick={() => navigate('/property-types')}
          style={styles.backLink}
        >
          ← Back to Experience Types
        </button>
        <div style={styles.formBox}>
          <h3 style={styles.formTitle}>List Your Car</h3>
          <p style={styles.formSubtitle}>Rent out your vehicle to travelers</p>
          {/* Tabs */}
          <div style={styles.tabsWrapper}>
            {tabList.map((tab, idx) => (
              <button
                key={tab}
                style={{
                  ...styles.tab,
                  ...(activeTab === idx ? styles.activeTab : {}),
                }}
                onClick={() => setActiveTab(idx)}
                type="button"
              >
                {tab}
              </button>
            ))}
          </div>
          {/* Basic Info Tab */}
          {activeTab === 0 && (
            <form style={styles.form} onSubmit={handleSubmit}>
              <label style={styles.label}>
                Listing Title
                <input
                  style={styles.input}
                  type="text"
                  name="title"
                  placeholder="E.g., Luxury SUV for your adventure"
                  value={form.title}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label style={styles.label}>
                Description
                <textarea
                  style={{ ...styles.input, minHeight: 80, resize: "vertical" }}
                  name="description"
                  placeholder="Describe your vehicle, its condition, and what makes it special"
                  value={form.description}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label style={styles.label}>
                Pickup/Dropoff Location
                <input
                  style={styles.input}
                  type="text"
                  name="location"
                  placeholder="Address where renters can pick up the vehicle"
                  value={form.location}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <div style={styles.row}>
                <input
                  style={{ ...styles.input, flex: 1, marginRight: 8 }}
                  type="text"
                  name="city"
                  placeholder="City"
                  value={form.city}
                  onChange={handleInputChange}
                  required
                />
                <input
                  style={{ ...styles.input, flex: 1, marginLeft: 8 }}
                  type="text"
                  name="state"
                  placeholder="State/Province"
                  value={form.state}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div style={styles.photosLabel}>Photos</div>
              <div style={styles.photosGrid}>
                {form.photos.map((photo, idx) => (
                  <div key={idx} style={styles.photoBox}>
                    <label style={styles.photoLabel}>
                      {photoPreviews[idx] ? (
                        <img
                          src={photoPreviews[idx]}
                          alt="Preview"
                          style={styles.photoPreview}
                        />
                      ) : (
                        <div style={styles.uploadIcon}>
                          <span style={{ fontSize: 32, color: "#bbb" }}>⬆️</span>
                          <div style={styles.uploadText}>Upload photo</div>
                        </div>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={(e) =>
                          handlePhotoChange(idx, e.target.files[0] || null)
                        }
                      />
                    </label>
                  </div>
                ))}
              </div>
              <div style={styles.photoHint}>
                Upload at least 5 high-quality photos to showcase your listing
              </div>
              <button
                type="submit"
                className="submit-btn"
                disabled={form.photos.filter(Boolean).length < 5}
              >
                Submit Listing
              </button>
            </form>
          )}
          {/* Vehicle Details Tab */}
          {activeTab === 1 && (
            <form style={styles.form} onSubmit={handleSubmit}>
              <div style={styles.row}>
                <div style={{ flex: 1, marginRight: 8 }}>
                  <label style={styles.label}>Make
                    <input
                      style={styles.input}
                      type="text"
                      name="make"
                      placeholder="E.g., Toyota, Honda, BMW"
                      value={form.make}
                      onChange={handleInputChange}
                      required
                    />
                  </label>
                </div>
                <div style={{ flex: 1, marginLeft: 8 }}>
                  <label style={styles.label}>Model
                    <input
                      style={styles.input}
                      type="text"
                      name="model"
                      placeholder="E.g., Camry, Civic, X5"
                      value={form.model}
                      onChange={handleInputChange}
                      required
                    />
                  </label>
                </div>
              </div>
              <div style={styles.row}>
                <div style={{ flex: 1, marginRight: 8 }}>
                  <label style={styles.label}>Year
                    <input
                      style={styles.input}
                      type="text"
                      name="year"
                      placeholder="Year of manufacture"
                      value={form.year}
                      onChange={handleInputChange}
                      required
                    />
                  </label>
                </div>
                <div style={{ flex: 1, marginLeft: 8 }}>
                  <label style={styles.label}>License Plate
                    <input
                      style={styles.input}
                      type="text"
                      name="licensePlate"
                      placeholder="Vehicle license plate"
                      value={form.licensePlate}
                      onChange={handleInputChange}
                      required
                    />
                  </label>
                </div>
              </div>
              <div style={{ ...styles.row, flexWrap: "wrap", alignItems: "flex-start" }}>
                <div style={{ flex: 1, minWidth: 180 }}>
                  <div style={styles.label}>Vehicle Type</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
                    {vehicleTypes.map((type) => (
                      <label key={type} className="custom-radio" style={{ marginRight: 18, marginBottom: 6, fontWeight: 400 }}>
                        <input
                          type="radio"
                          name="vehicleType"
                          value={type}
                          checked={form.vehicleType === type}
                          onChange={handleInputChange}
                        />
                        <span className="radiomark"></span>
                        {type}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              <label style={styles.label}>Price (per day)
                <input
                  style={styles.input}
                  type="number"
                  name="price"
                  placeholder="Price in USD"
                  value={form.price}
                  onChange={handleInputChange}
                  min="0"
                  required
                />
              </label>
              <button
                type="submit"
                className="submit-btn"
              >
                Submit Listing
              </button>
            </form>
          )}
          {/* Features Tab */}
          {activeTab === 2 && (
            <form style={styles.form} onSubmit={handleSubmit}>
              <div style={{ fontWeight: 500, marginBottom: 8 }}>Vehicle Features</div>
              <div style={styles.featuresGrid}>
                <div>
                  {featureList.slice(0, 6).map((feature) => (
                    <div key={feature} style={styles.featureItem}>
                      <label className="custom-checkbox">
                        <input
                          type="checkbox"
                          checked={form.features.includes(feature)}
                          onChange={() => handleFeatureChange(feature)}
                        />
                        <span className="checkmark"></span>
                        {feature}
                      </label>
                    </div>
                  ))}
                </div>
                <div>
                  {featureList.slice(6).map((feature) => (
                    <div key={feature} style={styles.featureItem}>
                      <label className="custom-checkbox">
                        <input
                          type="checkbox"
                          checked={form.features.includes(feature)}
                          onChange={() => handleFeatureChange(feature)}
                        />
                        <span className="checkmark"></span>
                        {feature}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ fontWeight: 500, margin: "18px 0 8px 0" }}>Fuel Type</div>
              <div style={styles.fuelGrid}>
                <div>
                  {fuelTypes.slice(0, 2).map((type) => (
                    <div key={type} style={styles.featureItem}>
                      <label className="custom-radio">
                        <input
                          type="radio"
                          name="fuelType"
                          value={type}
                          checked={form.fuelType === type}
                          onChange={handleInputChange}
                        />
                        <span className="radiomark"></span>
                        {type}
                      </label>
                    </div>
                  ))}
                </div>
                <div>
                  {fuelTypes.slice(2).map((type) => (
                    <div key={type} style={styles.featureItem}>
                      <label className="custom-radio">
                        <input
                          type="radio"
                          name="fuelType"
                          value={type}
                          checked={form.fuelType === type}
                          onChange={handleInputChange}
                        />
                        <span className="radiomark"></span>
                        {type}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <label style={styles.label}>
                Additional Information
                <textarea
                  style={{ ...styles.input, minHeight: 60, resize: "vertical" }}
                  name="additionalInfo"
                  placeholder="Any other details about your vehicle that renters should know"
                  value={form.additionalInfo}
                  onChange={handleInputChange}
                />
              </label>
              <button
                type="submit"
                className="submit-btn"
              >
                Submit Listing
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

const styles = {
  container: {
    maxWidth: 800,
    margin: "0 auto",
    padding: "32px 16px 64px 16px",
    fontFamily: "'Inter', Arial, sans-serif",
  },
  header: {
    color: "#e63956",
    fontWeight: 700,
    fontSize: 28,
    marginBottom: 4,
  },
  subheader: {
    color: "#888",
    marginBottom: 16,
  },
  backLink: {
    color: "#e63956",
    textDecoration: "none",
    fontWeight: 500,
    display: "inline-block",
    marginBottom: 24,
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "8px 0",
    fontSize: "16px",
  },
  formBox: {
    background: "#fff",
    borderRadius: 8,
    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
    padding: 24,
    marginTop: 8,
  },
  formTitle: {
    fontWeight: 600,
    fontSize: 22,
    marginBottom: 2,
  },
  formSubtitle: {
    color: "#888",
    marginBottom: 18,
  },
  tabsWrapper: {
    display: "flex",
    borderBottom: "1px solid #eee",
    marginBottom: 24,
  },
  tab: {
    flex: 1,
    background: "none",
    border: "none",
    borderBottom: "2px solid transparent",
    padding: "12px 0",
    fontWeight: 500,
    color: "#888",
    cursor: "pointer",
    fontSize: 16,
    outline: "none",
    transition: "border 0.2s, color 0.2s",
  },
  activeTab: {
    color: "#e63956",
    borderBottom: "2px solid #e63956",
    background: "#faf7f8",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 18,
  },
  label: {
    fontWeight: 500,
    marginBottom: 8,
    display: "block",
  },
  input: {
    width: "100%",
    padding: "10px 12px",
    border: "1px solid #ddd",
    borderRadius: 5,
    fontSize: 15,
    marginTop: 6,
    marginBottom: 12,
    boxSizing: "border-box",
  },
  row: {
    display: "flex",
    gap: 8,
    marginBottom: 12,
  },
  photosLabel: {
    fontWeight: 500,
    margin: "12px 0 8px 0",
  },
  photosGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 16,
    marginBottom: 8,
  },
  photoBox: {
    background: "#faf7f8",
    border: "1.5px dashed #ccc",
    borderRadius: 8,
    minHeight: 120,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
  },
  photoLabel: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    padding: 12,
  },
  uploadIcon: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    color: "#bbb",
  },
  uploadText: {
    fontSize: 13,
    color: "#bbb",
    marginTop: 6,
  },
  photoPreview: {
    width: "100%",
    height: 100,
    objectFit: "cover",
    borderRadius: 6,
  },
  photoHint: {
    fontSize: 13,
    color: "#888",
    margin: "8px 0 18px 0",
  },
  submitBtn: {
    background: "#e63956",
    color: "#fff",
    border: "none",
    borderRadius: 5,
    padding: "12px 28px",
    fontWeight: 600,
    fontSize: 16,
    cursor: "pointer",
    marginTop: 10,
    alignSelf: "flex-end",
    transition: "background 0.2s",
    opacity: 1,
  },
  '@media (maxWidth: 700px)': {
    container: { padding: "16px 4px" },
    formBox: { padding: 12 },
    photosGrid: { gridTemplateColumns: "repeat(2, 1fr)" },
    submitBtn: { width: "100%", alignSelf: "center" },
  },
  featuresGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 16,
    marginBottom: 8,
  },
  featureItem: {
    marginBottom: 8,
  },
  fuelGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 16,
    marginBottom: 18,
  },
};

export default HostForm;  