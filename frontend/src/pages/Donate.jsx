import React, { useState } from 'react';
import { createDonation } from '../api';

const Donate = () => {
  const [amount, setAmount] = useState('');
  const [msg, setMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg('');
    try {
      const res = await createDonation({ amount, currency: 'INR' });
      setMsg(`Donation successful. ID: ${res.data.donation_id || 'N/A'}`);
    } catch {
      setMsg('Donation failed');
    }
  };

  return (
    <div>
      <h2>Donate</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: 300 }}>
        <input
          type="number"
          min="1"
          step="0.01"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <button type="submit">Donate</button>
      </form>
      {msg && <p>{msg}</p>}
    </div>
  );
};

export default Donate;
