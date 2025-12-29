import React, { useState } from 'react';
import api from '../../api';

const DonorDonate = () => {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleDonate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/api/donations/', { amount: parseFloat(amount) });
      setMessage('Donation successful! Thank you! 🙏');
      setAmount('');
    } catch (err) {
      setMessage('Donation failed');
    }
    setLoading(false);
  };

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header">
          <h3>💳 Make a Donation</h3>
        </div>
        <div className="card-body">
          <form onSubmit={handleDonate}>
            <div className="mb-3">
              <label className="form-label">Amount (₹)</label>
              <input
                type="number"
                className="form-control"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="10"
                required
              />
            </div>
            <button className="btn btn-success w-100" disabled={loading}>
              {loading ? 'Processing...' : 'Donate Now'}
            </button>
          </form>
          {message && <div className="alert mt-3">{message}</div>}
        </div>
      </div>
    </div>
  );
};

export default DonorDonate;
