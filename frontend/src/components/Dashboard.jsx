// import React, { useEffect, useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";

// const Dashboard = () => {
//   const navigate = useNavigate();
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const stored = localStorage.getItem("user");
//     if (!stored) {
//       navigate("/login");
//       return;
//     }

//     try {
//       const parsed = JSON.parse(stored);
//       setUser(parsed);
//     } catch {
//       localStorage.removeItem("user");
//       navigate("/login");
//     }
//   }, [navigate]);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     navigate("/login");
//   };

//   const getRoleFeatures = (role) => {
//     switch (role) {
//       case "admin":
//         return [
//           { name: "Manage Users", path: "/admin/users", icon: "👥" },
//           { name: "Donations", path: "/admin/donations", icon: "💰" },
//         ];
//       case "donor":
//         return [
//           { name: "Make Donation", path: "/donor/donate", icon: "💳" },
//           { name: "My Donations", path: "/donor/history", icon: "📊" },
//         ];
//       case "volunteer":
//         return [
//           { name: "Available Tasks", path: "/volunteer/tasks", icon: "📋" },
//           { name: "My Tasks", path: "/volunteer/my-tasks", icon: "✅" },
//         ];
//       default:
//         return [];
//     }
//   };

//   const displayRole =
//     user?.role === "donor"
//       ? "Donor"
//       : user?.role === "volunteer"
//       ? "Volunteer"
//       : user?.role === "admin"
//       ? "Admin"
//       : "—";

//   const features = getRoleFeatures(user?.role);

//   return (
//     <div className="container mt-5">
//       <div className="card">
//         <div className="card-header d-flex justify-content-between align-items-center">
//           <div>
//             <h3>Welcome, {user?.full_name || "User"}!</h3>
//             <span className="badge bg-primary">{displayRole}</span>
//           </div>
//           <button className="btn btn-danger" onClick={handleLogout}>
//             Logout
//           </button>
//         </div>
//         <div className="card-body">
//           <p>
//             <strong>Email:</strong> {user?.email || "—"}
//           </p>
          
//           <h5>Your Features:</h5>
//           <div className="row">
//             {features.map((feature, index) => (
//               <div key={index} className="col-md-6 mb-3">
//                 <Link to={feature.path} className="btn btn-outline-primary w-100">
//                   <span className="me-2">{feature.icon}</span>
//                   {feature.name}
//                 </Link>
//               </div>
//             ))}
//           </div>
          
//           <hr />
//           <h5>NGO Portal</h5>
//           <p>Access to all features based on your role.</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
