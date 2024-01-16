import React, { useState } from "react";
import "./style.css";

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phoneNumber: "",
  });

  const [successMessage, setSuccessMessage] = useState("");

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    address: "",
    phoneNumber: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    // Clear previous validation errors when the user starts typing
    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    // Basic validation - check if required fields are not empty
    for (const field in formData) {
      if (formData[field].trim() === "" && field !== "phoneNumber") {
        newErrors[field] =
          `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
        isValid = false;
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
      isValid = false;
    }

    setErrors(newErrors);

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      // If form is not valid, do not submit
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/submitForm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log("Server response:", data);

      // Display success message
      setSuccessMessage("Form submitted successfully");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
          <span className="error">{errors.name}</span>
        </label>
        <br />
        <label>
          E-mail:
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <span className="error">{errors.email}</span>
        </label>
        <br />
        <label>
          Address:
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
          />
          <span className="error">{errors.address}</span>
        </label>
        <br />
        <label>
          Phone Number:
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
          />
          <span className="error">{errors.phoneNumber}</span>
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
      {successMessage && <p className="success">{successMessage}</p>}
    </div>
  );
};

export default Form;
