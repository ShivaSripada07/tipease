import React from 'react';
import AdminNavbar from './AdminNavbar';
import AdminBody from './AdminBody';
const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <AdminNavbar />
      <AdminBody/>
    </div>
  );
};

export default AdminDashboard;
