import React, { useState } from 'react';

const GetInvolved = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    alert('Volunteer / partnership interest submitted');
  };

  return (
    <div>
      <h1>Get Involved</h1>

      <h2>Volunteer</h2>
      <p>Sign up to support events, campaigns, and community programs.</p>

      <h2>Partner with Us</h2>
      <p>We collaborate with corporates, institutions, and communities to scale impact.</p>

      <h2>Fundraise</h2>
      <p>Start your own small fundraiser to support one of our projects.</p>

      <h2>Join the Community</h2>
      <p>Subscribe to updates, attend events, and participate in outreach programs.</p>

      <h2>Volunteer / Partnership Form</h2>
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
        <textarea
          name="message"
          placeholder="How would you like to help?"
          value={form.message}
          onChange={handleChange}
          rows={4}
          required
        />
        <button type="submit">Submit</button>
      </form>
      {submitted && <p>Thank you for your interest. We will contact you soon.</p>}
    </div>
  );
};

export default GetInvolved;
