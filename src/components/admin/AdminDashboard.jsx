import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { StatCard } from '../utils/StatCard'
import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import api from '../../api/axiosInstance'

ChartJS.register(ArcElement, Tooltip, Legend);


export const AdminDashboard = () => {
  const [ data, setData ] = useState(null)
  useEffect(() => {
    getDashboardStatus()
  },[])
  
  const getDashboardStatus = async() => {
    try {
      const res = await api.get('/dashboard/dashboard')
      console.log(res?.data)
      setData(res?.data?.data)

    } catch(err){
      console.log(err)
      toast.error(err?.message)
    }
  }
  // Prepare Chart Data from propertyTypeBreakdown
  const chartConfig = {
    labels: data?.chartData.map((item) => item._id),
    datasets: [{
      data: data?.chartData.map((item) => item.count),
      backgroundColor: ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"],
      hoverOffset: 4,
    }],
  };
  return (
    <div className='p-6 bg-gray-50 min-h-screen'>
      <h2 className="text-gray-600 font-extrabold text-2xl mb-2">Dashboard</h2>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Properties" value={data?.totalProperties} color="border-blue-500" />
        <StatCard title="Pending Approvals" value={data?.pendingProperties} color="border-yellow-500" subText="Needs action" />
        <StatCard title="Total Owners" value={data?.users.owners} color="border-purple-500" />
        <StatCard title="Total Tenants" value={data?.users.seekers} color="border-green-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart Section */}
        <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold mb-4 text-gray-700">Property Types</h3>
          <div className="h-64 flex items-center justify-center">
            <Pie data={chartConfig} options={{ maintainAspectRatio: false }} />
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold mb-4 text-gray-700">Recent Activity</h3>
          <div className="space-y-4">
            {data?.recentActivity.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-full">🏠</div>
                  <div>
                    <p className="font-semibold text-gray-800">{item.propertyName}</p>
                    <p className="text-xs text-gray-500">New property added</p>
                  </div>
                </div>
                <span className="text-sm text-gray-400">
                  {new Date(item.createdAt).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  )
}
