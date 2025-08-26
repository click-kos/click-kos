"use client";

import { useState } from "react";
import { User, Mail, Phone, MapPin, Calendar, Edit2, Save, X, Camera } from "lucide-react";

// Mock user data
const initialUserData = {
  id: "1",
  name: "Thuso Ndou",
  email: "37853058@mynwu.ac.za",
  phone: "+27 123 456 789",
  studentId: "37853058",
  role: "Student",
  department: "Information Technology",
  year: "4th Year",
  address: "Vaal Triangle, South Africa",
  joinDate: "2022-02-15",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop&crop=face&facepad=2&rounded-circle",
  bio: "Information Technology student passionate about web development and technology innovation."
};

export default function ProfilePage() {
  const [userData, setUserData] = useState(initialUserData);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(initialUserData);
  const [activeTab, setActiveTab] = useState<'info' | 'security' | 'preferences'>('info');

  const handleEditToggle = () => {
    if (isEditing) {
      // Cancel editing - reset to original data
      setEditedData(userData);
    }
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    // Save the changes
    setUserData(editedData);
    setIsEditing(false);
    // Here you would typically make an API call to save the data
  };

  const handleInputChange = (field: string, value: string) => {
    setEditedData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAvatarChange = () => {
    // Implement avatar upload functionality
    console.log("Avatar change clicked");
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        {/* Profile Header */}
        <div className="relative bg-gradient-to-r from-[#0E2148] to-[#483AA0] p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-6">
              {/* Avatar */}
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-white p-1 shadow-lg overflow-hidden">
                  {userData.avatar ? (
                    <img 
                      src={userData.avatar} 
                      alt={userData.name}
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center">
                      <User className="w-8 h-8 text-gray-400" />
                    </div>
                  )}
                </div>
                {isEditing && (
                  <button
                    onClick={handleAvatarChange}
                    className="absolute bottom-0 right-0 bg-[#483AA0] text-white p-2 rounded-full hover:bg-[#7965C1] transition-colors shadow-lg"
                  >
                    <Camera className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* User Info */}
              <div className="text-white">
                <h1 className="text-2xl font-bold mb-2">{userData.name}</h1>
                <p className="text-blue-100 mb-1">{userData.role} • {userData.department}</p>
                <p className="text-blue-200 text-sm">Student ID: {userData.studentId}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    Save Changes
                  </button>
                  <button
                    onClick={handleEditToggle}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={handleEditToggle}
                  className="flex items-center gap-2 px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors backdrop-blur-sm"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('info')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'info'
                  ? 'border-[#483AA0] text-[#483AA0] dark:text-[#7965C1]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              Personal Info
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'security'
                  ? 'border-[#483AA0] text-[#483AA0] dark:text-[#7965C1]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              Security
            </button>
            <button
              onClick={() => setActiveTab('preferences')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'preferences'
                  ? 'border-[#483AA0] text-[#483AA0] dark:text-[#7965C1]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              Preferences
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'info' && (
            <div className="space-y-6">
              {/* Personal Information */}
              <div>
                <h2 className="text-lg font-semibold text-[#0E2148] dark:text-white mb-4">Personal Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Full Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#483AA0] focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      />
                    ) : (
                      <div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <User className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-900 dark:text-white">{userData.name}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email Address
                    </label>
                    {isEditing ? (
                      <input
                        type="email"
                        value={editedData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#483AA0] focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      />
                    ) : (
                      <div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-900 dark:text-white">{userData.email}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Phone Number
                    </label>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={editedData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#483AA0] focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      />
                    ) : (
                      <div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-900 dark:text-white">{userData.phone}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Student ID
                    </label>
                    <div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <span className="text-gray-900 dark:text-white">{userData.studentId}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Academic Information */}
              <div>
                <h2 className="text-lg font-semibold text-[#0E2148] dark:text-white mb-4">Academic Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Department
                    </label>
                    {isEditing ? (
                      <select
                        value={editedData.department}
                        onChange={(e) => handleInputChange('department', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#483AA0] focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      >
                        <option>Computer Science</option>
                        <option>Engineering</option>
                        <option>Business Studies</option>
                        <option>Arts & Humanities</option>
                      </select>
                    ) : (
                      <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <span className="text-gray-900 dark:text-white">{userData.department}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Year of Study
                    </label>
                    {isEditing ? (
                      <select
                        value={editedData.year}
                        onChange={(e) => handleInputChange('year', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#483AA0] focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      >
                        <option>1st Year</option>
                        <option>2nd Year</option>
                        <option>3rd Year</option>
                        <option>4th Year</option>
                        <option>Postgraduate</option>
                      </select>
                    ) : (
                      <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <span className="text-gray-900 dark:text-white">{userData.year}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div>
                <h2 className="text-lg font-semibold text-[#0E2148] dark:text-white mb-4">Additional Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Address
                    </label>
                    {isEditing ? (
                      <textarea
                        value={editedData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        rows={2}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#483AA0] focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      />
                    ) : (
                      <div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-900 dark:text-white">{userData.address}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Bio
                    </label>
                    {isEditing ? (
                      <textarea
                        value={editedData.bio}
                        onChange={(e) => handleInputChange('bio', e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#483AA0] focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      />
                    ) : (
                      <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <span className="text-gray-900 dark:text-white">{userData.bio}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Member Since
                    </label>
                    <div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-900 dark:text-white">
                        {new Date(userData.joinDate).toLocaleDateString('en-ZA', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-[#0E2148] dark:text-white mb-4">Security Settings</h2>
                <div className="space-y-4">
                  <div className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                    <h3 className="font-medium text-gray-900 dark:text-white mb-2">Change Password</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      Update your password to keep your account secure
                    </p>
                    <button className="px-4 py-2 bg-[#483AA0] text-white rounded-lg hover:bg-[#0E2148] transition-colors">
                      Change Password
                    </button>
                  </div>

                  <div className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                    <h3 className="font-medium text-gray-900 dark:text-white mb-2">Two-Factor Authentication</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      Add an extra layer of security to your account
                    </p>
                    <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                      Enable 2FA
                    </button>
                  </div>

                  <div className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                    <h3 className="font-medium text-gray-900 dark:text-white mb-2">Active Sessions</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      Manage your active login sessions
                    </p>
                    <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                      View Sessions
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'preferences' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-[#0E2148] dark:text-white mb-4">Preferences</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">Email Notifications</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Receive order updates via email</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#483AA0]"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">Push Notifications</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Get notified about order status changes</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#483AA0]"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">Marketing Communications</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Receive promotional offers and updates</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#483AA0]"></div>
                    </label>
                  </div>

                  <div className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                    <h3 className="font-medium text-gray-900 dark:text-white mb-2">Language</h3>
                    <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#483AA0] focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                      <option>English</option>
                      <option>Afrikaans</option>
                      <option>Zulu</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}