import React, { useState } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { ChevronDown, Search, Filter, Download, Mail, MessageSquare, Users, Home, Settings, LogOut, Menu, Eye, Check, X, Clock, Plus, Edit2, Trash2, FileText, AlertCircle, TrendingUp } from 'lucide-react';
 
export default function AdminDashboard() {
  const [currentUser, setCurrentUser] = useState({ id: 'ADMIN001', name: 'Sarah Johnson', role: 'Landlord' });
  const [activeTab, setActiveTab] = useState('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showAddPropertyModal, setShowAddPropertyModal] = useState(false);
  const [showAddPartnerModal, setShowAddPartnerModal] = useState(false);
 
  // Sample data
  const [applications, setApplications] = useState([
    { id: 'APP001', studentName: 'Thabo Ndlela', institution: 'Wits', status: 'submitted', fundingStatus: 'NSFAS', date: '2024-01-15', documents: 3 },
    { id: 'APP002', studentName: 'Amara Okafor', institution: 'UP', status: 'approved', fundingStatus: 'Bursary', date: '2024-01-14', documents: 4 },
    { id: 'APP003', studentName: 'James Smith', institution: 'Stellenbosch', status: 'pending', fundingStatus: 'Cash', date: '2024-01-13', documents: 2 },
    { id: 'APP004', studentName: 'Lisa Wong', institution: 'UCT', status: 'rejected', fundingStatus: 'Private', date: '2024-01-12', documents: 3 },
    { id: 'APP005', studentName: 'Sipho Mkhize', institution: 'Wits', status: 'approved', fundingStatus: 'NSFAS', date: '2024-01-11', documents: 4 },
  ]);
 
  const [properties, setProperties] = useState([
    { id: 'PROP001', name: 'Bryanston Heights', city: 'Johannesburg', totalRooms: 12, occupiedRooms: 8, monthlyRev: 'R24,000' },
    { id: 'PROP002', name: 'Sandton Residences', city: 'Johannesburg', totalRooms: 20, occupiedRooms: 15, monthlyRev: 'R45,000' },
    { id: 'PROP003', name: 'Woodstock Commons', city: 'Cape Town', totalRooms: 8, occupiedRooms: 5, monthlyRev: 'R12,500' },
  ]);
 
  const [leases, setLeases] = useState([
    { id: 'LS001', studentName: 'Amara Okafor', property: 'Bryanston Heights', status: 'signed', period: '2024-01-01 to 2024-12-31' },
    { id: 'LS002', studentName: 'Sipho Mkhize', property: 'Sandton Residences', status: 'draft', period: '2024-02-01 to 2025-01-31' },
  ]);
 
  // Dashboard stats
  const stats = [
    { label: 'Total Applications', value: applications.length, icon: FileText, color: 'blue' },
    { label: 'Approved', value: applications.filter(a => a.status === 'approved').length, icon: Check, color: 'green' },
    { label: 'Pending Review', value: applications.filter(a => a.status === 'pending').length, icon: Clock, color: 'amber' },
    { label: 'Properties', value: properties.length, icon: Home, color: 'purple' },
  ];
 
  // Chart data
  const fundingData = [
    { name: 'NSFAS', value: 6, color: '#3b82f6' },
    { name: 'Bursary', value: 4, color: '#10b981' },
    { name: 'Cash Paying', value: 3, color: '#f59e0b' },
    { name: 'Private', value: 2, color: '#8b5cf6' },
  ];
 
  const occupancyData = [
    { name: 'Bryanston Heights', occupied: 8, available: 4 },
    { name: 'Sandton Residences', occupied: 15, available: 5 },
    { name: 'Woodstock Commons', occupied: 5, available: 3 },
  ];
 
  const applicationTrendData = [
    { month: 'Nov', applications: 12, approved: 8 },
    { month: 'Dec', applications: 18, approved: 12 },
    { month: 'Jan', applications: 15, approved: 9 },
    { month: 'Feb', applications: 22, approved: 15 },
  ];
 
  const getStatusColor = (status) => {
    switch(status) {
      case 'submitted':
      case 'pending': return 'bg-amber-50 border-amber-200 text-amber-800';
      case 'approved': return 'bg-green-50 border-green-200 text-green-800';
      case 'rejected': return 'bg-red-50 border-red-200 text-red-800';
      case 'signed': return 'bg-blue-50 border-blue-200 text-blue-800';
      case 'draft': return 'bg-gray-50 border-gray-200 text-gray-800';
      default: return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };
 
  const handleApprove = (appId) => {
    setApplications(applications.map(app => 
      app.id === appId ? { ...app, status: 'approved' } : app
    ));
  };
 
  const handleReject = (appId) => {
    setApplications(applications.map(app => 
      app.id === appId ? { ...app, status: 'rejected' } : app
    ));
  };
 
  return (
    <div className="min-h-screen bg-slate-50">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=Inter:wght@400;500;600&display=swap');
        
        body { font-family: 'Inter', sans-serif; }
        .font-display { font-family: 'Syne', sans-serif; }
        
        .gradient-text {
          background: linear-gradient(135deg, #7c3aed 0%, #2563eb 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
 
        .stat-card {
          transition: all 0.3s ease;
        }
 
        .stat-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
        }
 
        .table-row:hover {
          background-color: rgb(248, 250, 252);
        }
      `}</style>
 
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
              <Home className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-display font-bold text-lg text-slate-900">Blueprint Admin</h1>
              <p className="text-xs text-slate-500">Accommodation Management System</p>
            </div>
          </div>
 
          <div className="hidden md:flex items-center gap-6">
            <button className="flex items-center gap-2 px-4 py-2 hover:bg-slate-100 rounded-lg transition">
              <Users className="w-5 h-5 text-slate-600" />
              <span className="text-sm font-medium text-slate-700">{currentUser.name}</span>
            </button>
            <button
              onClick={() => setCurrentUser(null)}
              className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition"
            >
              <LogOut className="w-5 h-5" />
              <span className="text-sm font-medium">Logout</span>
            </button>
          </div>
 
          <button className="md:hidden p-2 hover:bg-slate-100 rounded-lg">
            <Menu className="w-5 h-5 text-slate-600" />
          </button>
        </div>
      </header>
 
      {/* Navigation Tabs */}
      <div className="bg-white border-b border-slate-200 sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8 overflow-x-auto">
            {[
              { id: 'overview', label: 'Overview', icon: TrendingUp },
              { id: 'applications', label: 'Applications', icon: FileText },
              { id: 'leases', label: 'Leases', icon: FileText },
              { id: 'communications', label: 'Communications', icon: Mail },
              { id: 'properties', label: 'Properties', icon: Home },
              { id: 'partners', label: 'Partners', icon: Users },
              { id: 'reports', label: 'Reports', icon: BarChart },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`font-medium py-4 whitespace-nowrap border-b-2 transition ${
                  activeTab === tab.id
                    ? 'border-purple-600 text-purple-600'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>
 
      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {stats.map((stat, i) => {
                const Icon = stat.icon;
                const colorClasses = {
                  blue: 'bg-blue-100 text-blue-600',
                  green: 'bg-green-100 text-green-600',
                  amber: 'bg-amber-100 text-amber-600',
                  purple: 'bg-purple-100 text-purple-600',
                };
                return (
                  <div key={i} className="stat-card bg-white rounded-xl border border-slate-200 p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-slate-600 text-sm font-medium">{stat.label}</p>
                        <p className="font-display text-3xl font-bold text-slate-900 mt-2">{stat.value}</p>
                      </div>
                      <div className={`p-3 rounded-lg ${colorClasses[stat.color]}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
 
            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Application Trends */}
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <h3 className="font-display text-lg font-bold text-slate-900 mb-4">Application Trends</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={applicationTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="applications" stroke="#3b82f6" name="Total Applications" />
                    <Line type="monotone" dataKey="approved" stroke="#10b981" name="Approved" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
 
              {/* Funding Status Distribution */}
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <h3 className="font-display text-lg font-bold text-slate-900 mb-4">Funding Status Distribution</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={fundingData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {fundingData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
 
            {/* Occupancy & Room Status */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h3 className="font-display text-lg font-bold text-slate-900 mb-4">Occupancy by Property</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={occupancyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="occupied" fill="#10b981" name="Occupied Rooms" />
                  <Bar dataKey="available" fill="#94a3b8" name="Available Rooms" />
                </BarChart>
              </ResponsiveContainer>
            </div>
 
            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <h3 className="font-display text-lg font-bold text-slate-900 mb-4">Recent Applications</h3>
                <div className="space-y-3">
                  {applications.slice(0, 5).map(app => (
                    <div key={app.id} className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg transition">
                      <div>
                        <p className="font-medium text-slate-900">{app.studentName}</p>
                        <p className="text-xs text-slate-600">{app.institution} • {app.date}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(app.status)}`}>
                        {app.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
 
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <h3 className="font-display text-lg font-bold text-slate-900 mb-4">Property Status</h3>
                <div className="space-y-3">
                  {properties.map(prop => (
                    <div key={prop.id} className="p-3 hover:bg-slate-50 rounded-lg transition">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-medium text-slate-900">{prop.name}</p>
                        <p className="text-sm font-semibold text-green-600">{prop.monthlyRev}</p>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full"
                          style={{ width: `${(prop.occupiedRooms / prop.totalRooms) * 100}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-slate-600 mt-1">{prop.occupiedRooms} of {prop.totalRooms} rooms occupied</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
 
        {/* Applications Management */}
        {activeTab === 'applications' && (
          <div className="space-y-6">
            {/* Filters */}
            <div className="flex gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="w-5 h-5 absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search applications..."
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <button className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition">
                <Filter className="w-5 h-5" />
                <span>Filter</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
                <Download className="w-5 h-5" />
                <span>Export</span>
              </button>
            </div>
 
            {/* Status Tabs */}
            <div className="flex gap-4 border-b border-slate-200">
              {['all', 'submitted', 'pending', 'approved', 'rejected'].map(status => (
                <button
                  key={status}
                  className="px-4 py-2 border-b-2 font-medium text-sm transition"
                  style={{
                    borderColor: 'transparent',
                    color: 'rgb(100, 116, 139)'
                  }}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                  {status !== 'all' && ` (${applications.filter(a => a.status === status).length})`}
                </button>
              ))}
            </div>
 
            {/* Applications Table */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700">Applicant</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700">Institution</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700">Funding</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700">Documents</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {applications.map(app => (
                      <tr key={app.id} className="table-row hover:bg-slate-50 transition">
                        <td className="px-6 py-4 text-sm font-medium text-slate-900">{app.studentName}</td>
                        <td className="px-6 py-4 text-sm text-slate-600">{app.institution}</td>
                        <td className="px-6 py-4 text-sm text-slate-600">{app.fundingStatus}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(app.status)}`}>
                            {app.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600">
                          <button className="text-blue-600 hover:text-blue-700 font-medium">
                            {app.documents} files
                          </button>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600">{app.date}</td>
                        <td className="px-6 py-4 text-sm flex gap-2">
                          <button className="p-2 hover:bg-slate-200 rounded-lg transition">
                            <Eye className="w-4 h-4 text-slate-600" />
                          </button>
                          {app.status === 'submitted' && (
                            <>
                              <button
                                onClick={() => handleApprove(app.id)}
                                className="p-2 hover:bg-green-100 rounded-lg transition"
                              >
                                <Check className="w-4 h-4 text-green-600" />
                              </button>
                              <button
                                onClick={() => handleReject(app.id)}
                                className="p-2 hover:bg-red-100 rounded-lg transition"
                              >
                                <X className="w-4 h-4 text-red-600" />
                              </button>
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
 
        {/* Leases Management */}
        {activeTab === 'leases' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-display text-xl font-bold text-slate-900">Lease Agreements</h3>
                <p className="text-slate-600 text-sm">Manage and track lease agreements</p>
              </div>
              <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
                Generate Lease
              </button>
            </div>
 
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700">Lease #</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700">Student</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700">Property</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700">Period</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {leases.map(lease => (
                      <tr key={lease.id} className="table-row hover:bg-slate-50 transition">
                        <td className="px-6 py-4 text-sm font-medium text-slate-900">{lease.id}</td>
                        <td className="px-6 py-4 text-sm text-slate-600">{lease.studentName}</td>
                        <td className="px-6 py-4 text-sm text-slate-600">{lease.property}</td>
                        <td className="px-6 py-4 text-sm text-slate-600">{lease.period}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(lease.status)}`}>
                            {lease.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm flex gap-2">
                          <button className="px-3 py-1 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition text-xs">
                            View
                          </button>
                          <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition text-xs">
                            Download
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
 
        {/* Communications */}
        {activeTab === 'communications' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Send SMS */}
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <h3 className="font-display text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-blue-600" />
                  Send SMS
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Recipient Group</label>
                    <select className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500">
                      <option>All Applicants</option>
                      <option>Approved Students</option>
                      <option>Current Residents</option>
                      <option>Specific Student</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Message Template</label>
                    <textarea
                      placeholder="Dear {{studentName}}, your application status..."
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 h-32"
                    ></textarea>
                  </div>
                  <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium">
                    Send SMS
                  </button>
                </div>
              </div>
 
              {/* Send Email */}
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <h3 className="font-display text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Mail className="w-5 h-5 text-green-600" />
                  Send Email
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Recipient Group</label>
                    <select className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500">
                      <option>All Applicants</option>
                      <option>Approved Students</option>
                      <option>Current Residents</option>
                      <option>Specific Student</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Subject</label>
                    <input
                      type="text"
                      placeholder="Email subject..."
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Message</label>
                    <textarea
                      placeholder="Email body..."
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 h-32"
                    ></textarea>
                  </div>
                  <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium">
                    Send Email
                  </button>
                </div>
              </div>
            </div>
 
            {/* Communication History */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h3 className="font-display text-lg font-bold text-slate-900 mb-4">Communication History</h3>
              <div className="space-y-3">
                {[
                  { type: 'SMS', recipient: 'All Applicants', date: '2024-01-15', count: 45 },
                  { type: 'Email', recipient: 'Approved Students', date: '2024-01-14', count: 8 },
                  { type: 'Email', recipient: 'Current Residents', date: '2024-01-13', count: 28 },
                ].map((comm, i) => (
                  <div key={i} className="flex items-center justify-between p-4 hover:bg-slate-50 rounded-lg transition border border-slate-200">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-lg ${comm.type === 'SMS' ? 'bg-blue-100' : 'bg-green-100'}`}>
                        {comm.type === 'SMS' ? (
                          <MessageSquare className="w-5 h-5 text-blue-600" />
                        ) : (
                          <Mail className="w-5 h-5 text-green-600" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-slate-900">{comm.type} to {comm.recipient}</p>
                        <p className="text-xs text-slate-600">{comm.date} • {comm.count} recipients</p>
                      </div>
                    </div>
                    <button className="px-3 py-1 text-slate-600 hover:bg-slate-100 rounded-lg transition text-sm">
                      View
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
 
        {/* Properties Management */}
        {activeTab === 'properties' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-display text-xl font-bold text-slate-900">Properties</h3>
                <p className="text-slate-600 text-sm">Manage accommodation properties</p>
              </div>
              <button
                onClick={() => setShowAddPropertyModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
              >
                <Plus className="w-5 h-5" />
                <span>Add Property</span>
              </button>
            </div>
 
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map(prop => (
                <div key={prop.id} className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="font-display font-bold text-slate-900">{prop.name}</h4>
                      <p className="text-sm text-slate-600">{prop.city}</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-2 hover:bg-slate-100 rounded-lg transition">
                        <Edit2 className="w-4 h-4 text-slate-600" />
                      </button>
                      <button className="p-2 hover:bg-red-100 rounded-lg transition">
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </div>
 
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <p className="text-slate-600 text-sm">Occupancy</p>
                      <p className="font-semibold text-slate-900">{prop.occupiedRooms}/{prop.totalRooms} rooms</p>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full"
                        style={{ width: `${(prop.occupiedRooms / prop.totalRooms) * 100}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between items-center pt-2">
                      <p className="text-slate-600 text-sm">Monthly Revenue</p>
                      <p className="font-display font-bold text-green-600">{prop.monthlyRev}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
 
        {/* Partners Management */}
        {activeTab === 'partners' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-display text-xl font-bold text-slate-900">Partners & Agencies</h3>
                <p className="text-slate-600 text-sm">Manage partner agencies for recruitment</p>
              </div>
              <button
                onClick={() => setShowAddPartnerModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
              >
                <Plus className="w-5 h-5" />
                <span>Add Partner</span>
              </button>
            </div>
 
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700">Partner Name</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700">Contact Person</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700">Phone</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700">Referrals</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {[
                      { name: 'Blueprint Agency', person: 'John Doe', phone: '+27 123 456 7890', email: 'john@blueprint.co.za', referrals: 12, status: 'active' },
                      { name: 'Student Housing Direct', person: 'Sarah Smith', phone: '+27 987 654 3210', email: 'sarah@shd.co.za', referrals: 8, status: 'active' },
                    ].map((partner, i) => (
                      <tr key={i} className="table-row hover:bg-slate-50 transition">
                        <td className="px-6 py-4 text-sm font-medium text-slate-900">{partner.name}</td>
                        <td className="px-6 py-4 text-sm text-slate-600">{partner.person}</td>
                        <td className="px-6 py-4 text-sm text-slate-600">{partner.phone}</td>
                        <td className="px-6 py-4 text-sm text-slate-600">{partner.email}</td>
                        <td className="px-6 py-4 text-sm font-semibold text-slate-900">{partner.referrals}</td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-50 border border-green-200 text-green-800">
                            {partner.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm flex gap-2">
                          <button className="p-2 hover:bg-slate-200 rounded-lg transition">
                            <Edit2 className="w-4 h-4 text-slate-600" />
                          </button>
                          <button className="p-2 hover:bg-red-100 rounded-lg transition">
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
 
        {/* Reports */}
        {activeTab === 'reports' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { title: 'Applications Report', icon: FileText },
                { title: 'Leases Report', icon: FileText },
                { title: 'Occupancy Report', icon: BarChart },
                { title: 'Funding Report', icon: TrendingUp },
              ].map((report, i) => (
                <button
                  key={i}
                  className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition text-left"
                >
                  <report.icon className="w-8 h-8 text-purple-600 mb-3" />
                  <h4 className="font-semibold text-slate-900">{report.title}</h4>
                  <button className="text-purple-600 text-sm font-medium mt-3 hover:text-purple-700">
                    Generate →
                  </button>
                </button>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
