import React, { useState } from 'react';
const Form = () => {
    const [formData, setFormData] = useState({
    name: '',
    email: '',
});
const handleInputChange = (e) => {
    setFormData({
    ...formData,
    [e.target.name]: e.target.value,
    });
};
const handleSubmit = async (e) => {
e.preventDefault();
try {
    const response = await fetch('http://localhost:3001/submitForm', {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
    });
    const data = await response.json();
    console.log('Server response:', data);
} catch (error) {
console.error('Error submitting form:', error);
}
};
return (
<div>
  <form onSubmit={handleSubmit}>
    <label> Name: <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
    </label>
    <br />
    <label> E-mail: <input type="text" name="email" value={formData.email} onChange={handleInputChange} />
    </label>
    <br />
    <button type="submit">Submit</button>
  </form>
</div>
);
};

export default Form;