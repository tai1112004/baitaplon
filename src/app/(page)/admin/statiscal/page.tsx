"use client"
import React, { useState } from 'react';
import { 
  TrendingUp, 
  DollarSign, 
  ShoppingCart, 
  Users, 
  Package,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  Filter
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';

const SalesDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('7days');

  // Dữ liệu mẫu cho các biểu đồ
  const salesData = [
    { name: 'T2', doanhthu: 45000000, donhang: 125 },
    { name: 'T3', doanhthu: 52000000, donhang: 145 },
    { name: 'T4', doanhthu: 48000000, donhang: 132 },
    { name: 'T5', doanhthu: 61000000, donhang: 168 },
    { name: 'T6', doanhthu: 72000000, donhang: 195 },
    { name: 'T7', doanhthu: 68000000, donhang: 180 },
    { name: 'CN', doanhthu: 55000000, donhang: 155 }
  ];

  const categoryData = [
    { name: 'Điện tử', value: 35, color: '#3B82F6' },
    { name: 'Thời trang', value: 25, color: '#10B981' },
    { name: 'Gia dụng', value: 20, color: '#F59E0B' },
    { name: 'Sách', value: 12, color: '#EF4444' },
    { name: 'Khác', value: 8, color: '#8B5CF6' }
  ];

  const topProducts = [
    { name: 'iPhone 15 Pro Max', sold: 145, revenue: 520000000 },
    { name: 'Samsung Galaxy S24', sold: 98, revenue: 340000000 },
    { name: 'MacBook Air M3', sold: 67, revenue: 280000000 },
    { name: 'AirPods Pro', sold: 234, revenue: 156000000 },
    { name: 'iPad Air', sold: 89, revenue: 145000000 }
  ];

  const monthlyTrend = [
    { month: 'T1', revenue: 1200000000, orders: 3400 },
    { month: 'T2', revenue: 1350000000, orders: 3800 },
    { month: 'T3', revenue: 1580000000, orders: 4200 },
    { month: 'T4', revenue: 1420000000, orders: 3900 },
    { month: 'T5', revenue: 1680000000, orders: 4600 },
    { month: 'T6', revenue: 1750000000, orders: 4800 }
  ];

  // Format số tiền
  const formatCurrency = (amount :number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  // Format số
  const formatNumber = (num : number) => {
    return new Intl.NumberFormat('vi-VN').format(num);
  };

  const StatCard = ({ title, value, change, icon: Icon, trend, color } :{title:string , value : string , change: string  , color : string ,trend: string , icon:React.ComponentType }) => (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-800">{value}</p>
          <div className={`flex items-center mt-2 text-sm ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
            {trend === 'up' ? <ArrowUpRight className="w-4 h-4 mr-1" /> : <ArrowDownRight className="w-4 h-4 mr-1" />}
            <span>{change}</span>
          </div>
        </div>
        <div className={`p-3 rounded-xl ${color}`}>
          <Icon className="w-8 h-8 text-white" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-xl">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Thống Kê Bán Hàng</h1>
                <p className="text-gray-600">Tổng quan doanh thu và hiệu suất kinh doanh</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <select 
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="bg-white border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="7days">7 ngày qua</option>
                <option value="30days">30 ngày qua</option>
                <option value="3months">3 tháng qua</option>
                <option value="1year">1 năm qua</option>
              </select>
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
                <Filter className="w-4 h-4" />
                <span>Lọc</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Tổng Doanh Thu"
            value={formatCurrency(1750000000)}
            change="+12.5% so với tháng trước"
            icon={DollarSign}
            trend="up"
            color="bg-gradient-to-r from-green-500 to-green-600"
          />
          <StatCard
            title="Đơn Hàng"
            value={formatNumber(4800)}
            change="+8.2% so với tháng trước"
            icon={ShoppingCart}
            trend="up"
            color="bg-gradient-to-r from-blue-500 to-blue-600"
          />
          <StatCard
            title="Khách Hàng Mới"
            value={formatNumber(1250)}
            change="+15.3% so với tháng trước"
            icon={Users}
            trend="up"
            color="bg-gradient-to-r from-purple-500 to-purple-600"
          />
          <StatCard
            title="Sản Phẩm Bán"
            value={formatNumber(12450)}
            change="-2.1% so với tháng trước"
            icon={Package}
            trend="down"
            color="bg-gradient-to-r from-orange-500 to-orange-600"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Sales Trend */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-800">Xu Hướng Doanh Thu</h3>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>7 ngày qua</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={salesData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#6b7280" />
                <YAxis stroke="#6b7280" tickFormatter={(value) => `${value/1000000}M`} />
                <Tooltip 
                  formatter={(value) => [formatCurrency( Number(value)), 'Doanh thu']}
                  labelStyle={{ color: '#374151' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="doanhthu" 
                  stroke="#3B82F6" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorRevenue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Orders Chart */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-800">Số Lượng Đơn Hàng</h3>
              <div className="text-2xl font-bold text-blue-600">{formatNumber(1300)}</div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  formatter={(value) => [formatNumber(Number(value)), 'Đơn hàng']}
                  labelStyle={{ color: '#374151' }}
                />
                <Bar dataKey="donhang" fill="#10B981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Category Distribution */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Phân Bố Danh Mục</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, 'Tỷ lệ']} />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {categoryData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full`} style={{ backgroundColor: item.color }}></div>
                    <span className="text-sm text-gray-600">{item.name}</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-800">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Top Products */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-800">Sản Phẩm Bán Chạy</h3>
              <button className="text-blue-500 hover:text-blue-600 flex items-center space-x-1">
                <Eye className="w-4 h-4" />
                <span>Xem tất cả</span>
              </button>
            </div>
            <div className="overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 text-sm font-semibold text-gray-600">Sản Phẩm</th>
                    <th className="text-right py-3 text-sm font-semibold text-gray-600">Đã Bán</th>
                    <th className="text-right py-3 text-sm font-semibold text-gray-600">Doanh Thu</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {topProducts.map((product, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                      <td className="py-4">
                        <div className="flex items-center space-x-3">
                          <div className="bg-gradient-to-r from-blue-500 to-purple-600 w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold">
                            {index + 1}
                          </div>
                          <span className="font-medium text-gray-800">{product.name}</span>
                        </div>
                      </td>
                      <td className="py-4 text-right text-gray-600">{formatNumber(product.sold)}</td>
                      <td className="py-4 text-right font-semibold text-gray-800">
                        {formatCurrency(product.revenue)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Monthly Trend */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-800">Xu Hướng Theo Tháng</h3>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-gray-600">Doanh thu</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-gray-600">Đơn hàng</span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis yAxisId="revenue" orientation="left" stroke="#6b7280" tickFormatter={(value) => `${value/1000000000}B`} />
              <YAxis yAxisId="orders" orientation="right" stroke="#6b7280" tickFormatter={(value) => `${value/1000}K`} />
              <Tooltip 
                formatter={(value, name) => [
                  name === 'revenue' ? formatCurrency(Number(value)) : formatNumber(Number(value)),
                  name === 'revenue' ? 'Doanh thu' : 'Đơn hàng'
                ]}
                labelStyle={{ color: '#374151' }}
              />
              <Line 
                yAxisId="revenue"
                type="monotone" 
                dataKey="revenue" 
                stroke="#3B82F6" 
                strokeWidth={3}
                dot={{ fill: '#3B82F6', strokeWidth: 2, r: 6 }}
              />
              <Line 
                yAxisId="orders"
                type="monotone" 
                dataKey="orders" 
                stroke="#10B981" 
                strokeWidth={3}
                dot={{ fill: '#10B981', strokeWidth: 2, r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default SalesDashboard;