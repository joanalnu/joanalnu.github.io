import React, { useState, useEffect } from 'react';
import {
  MessageCircle,
  Video,
  Mail,
  Phone,
  Share2,
  Play,
  Users,
  FileText,
  Camera,
  Heart,
  Send,
  Search,
  Home,
  Bell,
  User,
  Settings,
  Plus,
  ChevronDown,
  Menu,
  X,
  Moon,
  Sun
} from 'lucide-react';
import './animations.css'; // Optional but adds animated button glow

const App = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [activeChat, setActiveChat] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(savedTheme === 'dark' || (!savedTheme && systemPrefersDark));
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
  };

  const tabs = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'messages', icon: MessageCircle, label: 'Messages' },
    { id: 'videos', icon: Video, label: 'Videos' },
    { id: 'calls', icon: Phone, label: 'Calls' },
    { id: 'files', icon: FileText, label: 'Files' },
    { id: 'profile', icon: User, label: 'Profile' }
  ];

  const baseClasses = darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-50 text-gray-900';
  const cardClasses = darkMode
    ? 'bg-gray-800 bg-opacity-60 backdrop-blur-md border border-gray-700'
    : 'bg-white bg-opacity-80 backdrop-blur-md border border-gray-200';
  const hoverClasses = darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100';
  const borderClasses = darkMode ? 'border-gray-700' : 'border-gray-200';
  const textSecondary = darkMode ? 'text-gray-400' : 'text-gray-600';
  const textTertiary = darkMode ? 'text-gray-500' : 'text-gray-500';

  return (
    <div className={`min-h-screen ${baseClasses}`}>
      <header className={`shadow-sm p-4 flex items-center justify-between ${cardClasses}`}>
        <div className="flex items-center space-x-3">
          <button className="md:hidden p-1" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <h1 className="text-lg md:text-2xl font-bold">Universal Social Hub</h1>
        </div>
        <div className="flex items-center space-x-2 md:space-x-4">
          <button onClick={toggleDarkMode} className={`p-2 rounded-full ${hoverClasses}`}>
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <button className={`relative p-2 rounded-full ${hoverClasses}`}>
            <Bell className="w-5 h-5 md:w-6 md:h-6" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>
          <button className={`p-2 rounded-full ${hoverClasses} hidden md:block`}>
            <Settings className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <div
          className={`
            fixed inset-y-0 left-0 z-40 w-64 transform transition-transform duration-300 ease-in-out
            md:relative md:translate-x-0 md:z-0
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            ${cardClasses} shadow-lg md:shadow-none
          `}
        >
          <nav className="p-4 pt-20 md:pt-4">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg mb-2 transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-blue-500 text-white'
                      : `${textSecondary} ${hoverClasses}`
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <div className="rounded-lg p-6 text-center border-2 border-dashed border-blue-400">
            <h2 className="text-xl font-semibold mb-4">🚧 Content goes here!</h2>
            <p className="text-gray-500">
              Replace this placeholder with your actual tab rendering logic (`renderContent()`)
            </p>
            <button className="glow-button mt-6 bg-blue-500 text-white px-5 py-3 rounded-full shadow-lg transition-transform hover:scale-105">
              Sample Animated Button
            </button>
          </div>
        </main>
      </div>

      {/* Mobile Bottom Nav */}
      <div
        className={`md:hidden fixed bottom-0 left-0 right-0 ${cardClasses} border-t ${borderClasses} px-2 py-1`}
      >
        <div className="flex justify-around">
          {tabs.slice(0, 5).map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center p-2 ${
                  activeTab === tab.id ? 'text-blue-500' : textSecondary
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs mt-1">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default App;