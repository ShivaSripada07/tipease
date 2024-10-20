import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Users, Building2, DollarSign, TrendingUp } from 'lucide-react';
import axios from 'axios';
import "../styles/Dashboard.css";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalOrganizations: 0,
    totalServiceProviders: 0,
    totalRevenue: 0,
    growthRate: 0
  });

  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // Fetch real data from backend (uncomment when ready to use)
    fetchData();
    // For now, we'll use static data
    setStats({
      totalOrganizations: 25,
      totalServiceProviders: 150,
      totalRevenue: 50000,
      growthRate: 15
    });
    setChartData([
      { name: 'Jan', organizations: 20, serviceProviders: 100 },
      { name: 'Feb', organizations: 22, serviceProviders: 120 },
      { name: 'Mar', organizations: 25, serviceProviders: 150 },
      { name: 'Apr', organizations: 28, serviceProviders: 180 },
      { name: 'May', organizations: 30, serviceProviders: 200 },
    ]);
  }, []);
  const fetchData = async () => {
    try {
      const [orgResponse, spResponse] = await Promise.all([
        axios.get('http://localhost:4000/organisation'),
        axios.get('http://localhost:4000/serviceProvider')
      ]);
      
      setStats({
        totalOrganizations: orgResponse.data.length,
        totalServiceProviders: spResponse.data.length,
        // totalRevenue: calculateTotalRevenue(spResponse.data),
        // growthRate: calculateGrowthRate(orgResponse.data, spResponse.data)
      });
      
    //   setChartData(generateChartData(orgResponse.data, spResponse.data));
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Admin Dashboard</h1>
      
      <div className="stats-grid">
        <div className="stat-card">
          <Building2 className="stat-icon" />
          <div className="stat-content">
            <h2>{stats.totalOrganizations}</h2>
            <p>Total Organizations</p>
          </div>
        </div>
        <div className="stat-card">
          <Users className="stat-icon" />
          <div className="stat-content">
            <h2>{stats.totalServiceProviders}</h2>
            <p>Total Service Providers</p>
          </div>
        </div>
        <div className="stat-card">
          <DollarSign className="stat-icon" />
          <div className="stat-content">
          <h2>${(stats.totalRevenue || 0).toLocaleString()}</h2>
            <p>Total Revenue</p>
          </div>
        </div>
        <div className="stat-card">
          <TrendingUp className="stat-icon" />
          <div className="stat-content">
            <h2>{stats.growthRate}%</h2>
            <p>Growth Rate</p>
          </div>
        </div>
      </div>

      <div className="chart-container">
        <h2 className="chart-title">Growth Overview</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="organizations" fill="#8884d8" name="Organizations" />
            <Bar dataKey="serviceProviders" fill="#82ca9d" name="Service Providers" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;