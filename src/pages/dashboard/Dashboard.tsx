import React from 'react';

interface DashboardProps {
  role: 'admin' | 'organizer' | 'customer';
}

function Dashboard({ role }: DashboardProps) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        {role.charAt(0).toUpperCase() + role.slice(1)} Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Dashboard content will be role-specific */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Welcome to your Dashboard</h2>
          <p className="text-gray-600">
            This is your personalized {role} dashboard. More features coming soon!
          </p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;