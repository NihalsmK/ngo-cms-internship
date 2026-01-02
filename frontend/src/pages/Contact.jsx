import React, { useState } from 'react';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div>
      <h1>Contact Us</h1>

      <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
        <input
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Your Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          name="subject"
          placeholder="Subject"
          value={form.subject}
          onChange={handleChange}
          required
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={form.message}
          onChange={handleChange}
          rows={4}
          required
        />
        <button type="submit">Send</button>
      </form>

      {submitted && <p>Thank you for contacting us. We will respond soon.</p>}

      <h2>Our Office</h2>
      <p>Address: NGO HQ, Sample City, India</p>
      <p>Phone: +91-00000-00000 | Email: info@example-ngo.org</p>
      <p>Map: (Placeholder – location map to be embedded here.)</p>
    </div>
  );
};

export default Contact;
