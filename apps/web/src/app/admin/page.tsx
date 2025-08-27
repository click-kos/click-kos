"use client";

import { useState } from "react";
import { AlertTriangle, CheckCircle, Users, Settings, FileText, Plus, Edit, Trash2 } from "lucide-react";

export default function AdminPage() {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const handleSectionClick = (section: string) => {
    setActiveSection(activeSection === section ? null : section);
  };

  return (
    <div className="container mx-auto max-w-6xl px-4 py-6">
      <h1 className="text-3xl font-bold text-[#0E2148] dark:text-white mb-6">Admin Panel</h1>
      
      {/* Admin Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Users</p>
              <p className="text-2xl font-bold text-[#0E2148] dark:text-white">1,234</p>
            </div>
            <Users className="w-8 h-8 text-[#483AA0]" />
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">System Status</p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">Healthy</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Active Sessions</p>
              <p className="text-2xl font-bold text-[#0E2148] dark:text-white">89</p>
            </div>
            <Settings className="w-8 h-8 text-[#7965C1]" />
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Reports Generated</p>
              <p className="text-2xl font-bold text-[#0E2148] dark:text-white">24</p>
            </div>
            <FileText className="w-8 h-8 text-[#483AA0]" />
          </div>
        </div>
      </div>

      {/* Main Admin Action Buttons */}
      <section className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <button 
          onClick={() => handleSectionClick('users')}
          className="p-4 bg-gradient-to-r from-[#0E2148] to-[#483AA0] text-white rounded-lg hover:opacity-90 transition-opacity"
        >
          <Users className="w-6 h-6 mx-auto mb-2" />
          <span className="text-sm font-medium">User Management</span>
        </button>
        
        <button 
          onClick={() => handleSectionClick('settings')}
          className="p-4 bg-gradient-to-r from-[#483AA0] to-[#7965C1] text-white rounded-lg hover:opacity-90 transition-opacity"
        >
          <AlertTriangle className="w-6 h-6 mx-auto mb-2" />
          <span className="text-sm font-medium">System Settings</span>
        </button>
        
        <button 
          onClick={() => handleSectionClick('reports')}
          className="p-4 bg-gradient-to-r from-[#7965C1] to-[#483AA0] text-white rounded-lg hover:opacity-90 transition-opacity"
        >
          <CheckCircle className="w-6 h-6 mx-auto mb-2" />
          <span className="text-sm font-medium">Reports</span>
        </button>
      </section>

      {/* Dynamic Content Sections */}
      {activeSection === 'users' && (
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-[#0E2148] dark:text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-[#483AA0]" />
              User Management
            </h2>
            <button className="flex items-center gap-2 px-4 py-2 bg-[#483AA0] text-white rounded-lg hover:bg-[#0E2148] transition-colors">
              <Plus className="w-4 h-4" />
              Add User
            </button>
          </div>
          
          {/* User Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-3 text-[#0E2148] dark:text-white">Name</th>
                  <th className="px-4 py-3 text-[#0E2148] dark:text-white">Email</th>
                  <th className="px-4 py-3 text-[#0E2148] dark:text-white">Role</th>
                  <th className="px-4 py-3 text-[#0E2148] dark:text-white">Status</th>
                  <th className="px-4 py-3 text-[#0E2148] dark:text-white">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                <tr>
                  <td className="px-4 py-3 text-gray-900 dark:text-white">Faith Lebepe</td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-400">faith@mynwu.ac.za</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 rounded-full text-xs">
                      Student
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 rounded-full text-xs">
                      Active
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button className="p-1 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900 rounded">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-red-600 hover:bg-red-100 dark:hover:bg-red-900 rounded">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-gray-900 dark:text-white">Baxolele Gudla</td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-400">baxolele@mynwu.ac.za</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300 rounded-full text-xs">
                      Staff
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 rounded-full text-xs">
                      Active
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button className="p-1 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900 rounded">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-red-600 hover:bg-red-100 dark:hover:bg-red-900 rounded">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeSection === 'settings' && (
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 mb-6">
          <h2 className="text-xl font-semibold text-[#0E2148] dark:text-white mb-4 flex items-center gap-2">
            <Settings className="w-5 h-5 text-[#483AA0]" />
            System Settings
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-[#0E2148] dark:text-white mb-3">General Settings</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-sm text-gray-700 dark:text-gray-300">Maintenance Mode</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#483AA0]"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-sm text-gray-700 dark:text-gray-300">Email Notifications</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#483AA0]"></div>
                  </label>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium text-[#0E2148] dark:text-white mb-3">Payment Settings</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Payment Gateway</label>
                  <select className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                    <option>PayFast</option>
                    <option>Stripe</option>
                    <option>PayPal</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Transaction Fee (%)</label>
                  <input 
                    type="number" 
                    step="0.01" 
                    defaultValue="2.5"
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeSection === 'reports' && (
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 mb-6">
          <h2 className="text-xl font-semibold text-[#0E2148] dark:text-white mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#483AA0]" />
            System Reports
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:border-[#483AA0] transition-colors cursor-pointer">
              <h3 className="font-medium text-[#0E2148] dark:text-white mb-2">Sales Report</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Monthly revenue and transaction analysis</p>
              <button className="w-full px-3 py-2 bg-[#483AA0] text-white rounded hover:bg-[#0E2148] transition-colors text-sm">
                Generate Report
              </button>
            </div>
            
            <div className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:border-[#483AA0] transition-colors cursor-pointer">
              <h3 className="font-medium text-[#0E2148] dark:text-white mb-2">User Activity</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">User engagement and usage patterns</p>
              <button className="w-full px-3 py-2 bg-[#483AA0] text-white rounded hover:bg-[#0E2148] transition-colors text-sm">
                Generate Report
              </button>
            </div>
            
            <div className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:border-[#483AA0] transition-colors cursor-pointer">
              <h3 className="font-medium text-[#0E2148] dark:text-white mb-2">System Performance</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Server metrics and response times</p>
              <button className="w-full px-3 py-2 bg-[#483AA0] text-white rounded hover:bg-[#0E2148] transition-colors text-sm">
                Generate Report
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Recent Activity */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-xl font-semibold text-[#0E2148] dark:text-white mb-4">Recent Activity</h2>
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <div className="flex-1">
              <p className="text-sm text-gray-900 dark:text-white">New user registered: Lethabo@mynwu.ac.za</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">2 minutes ago</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <div className="flex-1">
              <p className="text-sm text-gray-900 dark:text-white">System backup completed successfully</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">1 hour ago</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            <div className="flex-1">
              <p className="text-sm text-gray-900 dark:text-white">Payment gateway maintenance scheduled</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">3 hours ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}