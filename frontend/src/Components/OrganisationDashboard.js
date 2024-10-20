// eslint-disable-next-line react-hooks/exhaustive-deps
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Users, DollarSign, TrendingUp } from 'lucide-react';
import "../styles/OrganisationDashboard.css"
const OrganisationDashboard = () => {
  const [stats, setStats] = useState({
    totalServiceProviders: 0,
    totalRevenue: 0,
    growthRate: 0
  });

  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:4000/serviceProvider');
      const serviceProviders = response.data;

      setStats({
        totalServiceProviders: serviceProviders.length,
        // totalRevenue: calculateTotalRevenue(serviceProviders),
        // growthRate: calculateGrowthRate(serviceProviders)
      });

      setChartData(generateChartData(serviceProviders));
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  const calculateTotalRevenue = (serviceProviders) => {
    // Implement your revenue calculation logic here
    return serviceProviders.reduce((total, sp) => total + (sp.revenue || 0), 0);
  };

  const calculateGrowthRate = (serviceProviders) => {
    // Implement your growth rate calculation logic here
    return 5; // Placeholder value
  };

  const generateChartData = (serviceProviders) => {
    return [
      { name: 'Jan', serviceProviders: 10, revenue: 5000 },
      { name: 'Feb', serviceProviders: 15, revenue: 7500 },
      { name: 'Mar', serviceProviders: 20, revenue: 10000 },
      { name: 'Apr', serviceProviders: 25, revenue: 12500 },
      { name: 'May', serviceProviders: 30, revenue: 15000 },
    ];
  };

  return (
    <div className="unique-org-dashboard">
      <h1 className="unique-org-dashboard-title">Organisation Dashboard</h1>
      
      <div className="unique-org-stats-grid">
        <div className="unique-org-stat-card">
          <Users className="unique-org-stat-icon" />
          <div className="unique-org-stat-content">
            <h2>{stats.totalServiceProviders}</h2>
            <p>Total Service Providers</p>
          </div>
        </div>
        <div className="unique-org-stat-card">
          <DollarSign className="unique-org-stat-icon" />
          <div className="unique-org-stat-content">
          <h2>${stats.totalRevenue !== undefined ? stats.totalRevenue.toLocaleString() : '0'}</h2>
            <p>Total Revenue</p>
          </div>
        </div>
        <div className="unique-org-stat-card">
          <TrendingUp className="unique-org-stat-icon" />
          <div className="unique-org-stat-content">
            <h2>{stats.growthRate}%</h2>
            <p>Growth Rate</p>
          </div>
        </div>
      </div>

      <div className="unique-org-chart-container">
        <h2 className="unique-org-chart-title">Performance Overview</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
            <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
            <Tooltip />
            <Legend />
            <Bar yAxisId="left" dataKey="serviceProviders" fill="#8884d8" name="Service Providers" />
            <Bar yAxisId="right" dataKey="revenue" fill="#82ca9d" name="Revenue" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default OrganisationDashboard;
