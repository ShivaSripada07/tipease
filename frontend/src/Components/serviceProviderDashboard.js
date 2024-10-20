import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DollarSign, Users, Star, TrendingUp } from 'lucide-react';
import "../styles/serviceProviderDashboard.css";

const ServiceProviderDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalEarnings: 0,
    totalCustomers: 0,
    averageRating: 0,
    recentTips: []
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const serviceProviderId = localStorage.getItem('id');
      const response = await axios.get(`http://localhost:4000/serviceProvider/dashboard/${serviceProviderId}`);
      setDashboardData(response.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);

      // Static data 
      setDashboardData({
        totalEarnings: 2500.75,
        totalCustomers: 120,
        averageRating: 4.5,
        recentTips: [
          { date: '2024-10-01', customerName: 'Alice', amount: 15.00 },
          { date: '2024-10-02', customerName: 'Bob', amount: 20.50 },
          { date: '2024-10-03', customerName: 'Charlie', amount: 10.00 },
        ]
      });
    }
  };

  return (
    <div className="sp-dashboard-container">
      <h1 className="sp-dashboard-title">Service Provider Dashboard</h1>
      
      <div className="sp-dashboard-stats">
        <div className="sp-dashboard-stat-card">
          <DollarSign className="sp-dashboard-stat-icon" />
          <div className="sp-dashboard-stat-content">
            <h2>${dashboardData.totalEarnings.toFixed(2)}</h2>
            <p>Total Earnings</p>
          </div>
        </div>
        <div className="sp-dashboard-stat-card">
          <Users className="sp-dashboard-stat-icon" />
          <div className="sp-dashboard-stat-content">
            <h2>{dashboardData.totalCustomers}</h2>
            <p>Total Customers</p>
          </div>
        </div>
        <div className="sp-dashboard-stat-card">
          <Star className="sp-dashboard-stat-icon" />
          <div className="sp-dashboard-stat-content">
            <h2>{dashboardData.averageRating.toFixed(1)}</h2>
            <p>Average Rating</p>
          </div>
        </div>
      </div>

      <div className="sp-dashboard-recent-tips">
        <h2 className="sp-dashboard-section-title">Recent Tips</h2>
        <table className="sp-dashboard-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Customer</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {dashboardData.recentTips.map((tip, index) => (
              <tr key={index}>
                <td>{new Date(tip.date).toLocaleDateString()}</td>
                <td>{tip.customerName}</td>
                <td>${tip.amount.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="sp-dashboard-performance">
        <h2 className="sp-dashboard-section-title">Performance Overview</h2>
        <div className="sp-dashboard-chart">
          <TrendingUp className="sp-dashboard-chart-placeholder" />
          <p>Performance chart placeholder</p>
        </div>
      </div>
    </div>
  );
};
export default ServiceProviderDashboard;
