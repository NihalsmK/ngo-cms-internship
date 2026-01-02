// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import api from '../../api';

// const Register = () => {
//   const [formData, setFormData] = useState({
//     fullname: '',
//     email: '',
//     password: '',
//     role: 'donor'
//   });
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//     setError('');
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');

//     try {
//       console.log('Registering:', formData); // DEBUG
//       const response = await api.post('/api/auth/register/', formData);
//       console.log('Success:', response.data); // DEBUG
//       localStorage.setItem('token', response.data.token);
//       navigate('/dashboard');
//     } catch (err) {
//       console.error('Register error:', err.response?.data || err.message); // DEBUG
//       setError(err.response?.data?.message || 'Registration failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <div className="row justify-content-center">
//         <div className="col-md-6">
//           <div className="card shadow">
//             <div className="card-body p-5">
//               <h2 className="text-center mb-4">Register</h2>
              
//               {error && (
//                 <div className="alert alert-danger">{error}</div>
//               )}

//               <form onSubmit={handleSubmit}>
//                 <div className="mb-3">
//                   <label className="form-label">Full Name</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     name="fullname"
//                     value={formData.fullname}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>

//                 <div className="mb-3">
//                   <label className="form-label">Email</label>
//                   <input
//                     type="email"
//                     className="form-control"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>

//                 <div className="mb-3">
//                   <label className="form-label">Password</label>
//                   <input
//                     type="password"
//                     className="form-control"
//                     name="password"
//                     value={formData.password}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>

//                 <div className="mb-4">
//                   <label className="form-label">Role</label>
//                   <select
//                     className="form-control"
//                     name="role"
//                     value={formData.role}
//                     onChange={handleChange}
//                   >
//                     <option value="donor">Donor</option>
//                     <option value="volunteer">Volunteer</option>
//                     <option value="admin">Admin</option>
//                   </select>
//                 </div>

//                 <button 
//                   type="submit" 
//                   className="btn btn-primary w-100"
//                   disabled={loading}
//                 >
//                   {loading ? 'Registering...' : 'Register'}
//                 </button>
//               </form>

//               <p className="text-center mt-3">
//                 Already have account? <a href="/login">Login</a>
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;
