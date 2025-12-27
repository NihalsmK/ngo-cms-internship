const API_BASE = 'https://ngo-cms-internship-production.up.railway.app';

// inside handleSubmit
await axios.post(`${API_BASE}/api/auth/register/`, {
  full_name: fullName,
  email,
  password,
  role,
});
