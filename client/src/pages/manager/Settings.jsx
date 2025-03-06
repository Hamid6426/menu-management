
export default function TenantSettings() {
  return (
    <div>TenantSettings</div>
  )
}


// // /src/pages/admin/TenantSettings.js

// import { useState, useEffect } from 'react';

// const TenantSettings = () => {
//   const [tenantInfo, setTenantInfo] = useState({
//     name: '',
//     logo: '',
//     plan: '',
//   });

//   useEffect(() => {
//     // Fetch current tenant settings from backend
//     fetchTenantSettings();
//   }, []);

//   const fetchTenantSettings = async () => {
//     // Example: Fetch data using tenant context (e.g., tenant ID)
//     const data = await fetch(`/api/tenant/settings`);
//     const settings = await data.json();
//     setTenantInfo(settings);
//   };

//   const handleSave = async () => {
//     // Save the settings to the backend
//     await fetch(`/api/tenant/settings`, {
//       method: 'POST',
//       body: JSON.stringify(tenantInfo),
//     });
//   };

//   return (
//     <div>
//       <h1>Tenant Settings</h1>
//       <form>
//         <label>
//           Restaurant Name:
//           <input 
//             type="text" 
//             value={tenantInfo.name} 
//             onChange={(e) => setTenantInfo({ ...tenantInfo, name: e.target.value })} 
//           />
//         </label>
//         <label>
//           Logo URL:
//           <input 
//             type="text" 
//             value={tenantInfo.logo} 
//             onChange={(e) => setTenantInfo({ ...tenantInfo, logo: e.target.value })} 
//           />
//         </label>
//         <label>
//           Subscription Plan:
//           <select 
//             value={tenantInfo.plan} 
//             onChange={(e) => setTenantInfo({ ...tenantInfo, plan: e.target.value })}
//           >
//             <option value="basic">Basic</option>
//             <option value="premium">Premium</option>
//           </select>
//         </label>
//         <button type="button" onClick={handleSave}>Save</button>
//       </form>
//     </div>
//   );
// };

// export default TenantSettings;
