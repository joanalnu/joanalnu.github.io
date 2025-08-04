import React, { useState, useEffect } from ‘react’;
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
} from ‘lucide-react’;

const UniversalSocialHub = () => {
const [activeTab, setActiveTab] = useState(‘home’);
const [activeChat, setActiveChat] = useState(null);
const [sidebarOpen, setSidebarOpen] = useState(false);
const [darkMode, setDarkMode] = useState(false);

// Initialize dark mode from localStorage or system preference
useEffect(() => {
const savedTheme = localStorage.getItem(‘theme’);
const systemPrefersDark = window.matchMedia(’(prefers-color-scheme: dark)’).matches;
setDarkMode(savedTheme === ‘dark’ || (!savedTheme && systemPrefersDark));
}, []);

// Toggle dark mode and save to localStorage
const toggleDarkMode = () => {
const newMode = !darkMode;
setDarkMode(newMode);
localStorage.setItem(‘theme’, newMode ? ‘dark’ : ‘light’);
};

const tabs = [
{ id: ‘home’, icon: Home, label: ‘Home’ },
{ id: ‘messages’, icon: MessageCircle, label: ‘Messages’ },
{ id: ‘videos’, icon: Video, label: ‘Videos’ },
{ id: ‘calls’, icon: Phone, label: ‘Calls’ },
{ id: ‘files’, icon: FileText, label: ‘Files’ },
{ id: ‘profile’, icon: User, label: ‘Profile’ }
];

const feedItems = [
{
type: ‘youtube’,
user: ‘TechReview’,
content: ‘Latest iPhone Review - Is it worth upgrading?’,
engagement: ‘2.3M views • 12 hours ago’,
thumbnail: ‘/api/placeholder/300/200’
},
{
type: ‘instagram’,
user: ‘travel_diary’,
content: ‘Sunset in Santorini 🌅’,
engagement: ‘847 likes • 3 hours ago’,
thumbnail: ‘/api/placeholder/300/300’
},
{
type: ‘tiktok’,
user: ‘foodie_life’,
content: ‘Quick pasta recipe that changed my life!’,
engagement: ‘156K views • 5 hours ago’,
thumbnail: ‘/api/placeholder/300/400’
}
];

const conversations = [
{ id: 1, name: ‘Family Group’, platform: ‘WhatsApp’, lastMessage: ‘Mom: Dinner at 7?’, time: ‘2m ago’, unread: 3 },
{ id: 2, name: ‘Work Team’, platform: ‘Slack’, lastMessage: ‘New project updates’, time: ‘15m ago’, unread: 0 },
{ id: 3, name: ‘Sarah Johnson’, platform: ‘iMessage’, lastMessage: ‘See you tomorrow!’, time: ‘1h ago’, unread: 1 },
{ id: 4, name: ‘Design Squad’, platform: ‘Discord’, lastMessage: ‘Check out this mockup’, time: ‘2h ago’, unread: 5 }
];

const baseClasses = darkMode ? ‘dark bg-gray-900 text-white’ : ‘bg-gray-50 text-gray-900’;
const cardClasses = darkMode ? ‘bg-gray-800 border-gray-700’ : ‘bg-white border-gray-200’;
const hoverClasses = darkMode ? ‘hover:bg-gray-700’ : ‘hover:bg-gray-100’;
const borderClasses = darkMode ? ‘border-gray-700’ : ‘border-gray-200’;
const textSecondary = darkMode ? ‘text-gray-400’ : ‘text-gray-600’;
const textTertiary = darkMode ? ‘text-gray-500’ : ‘text-gray-500’;

const renderContent = () => {
switch(activeTab) {
case ‘home’:
return (
<div className="space-y-4 pb-20 md:pb-4">
{/* Story Bar */}
<div className={`flex space-x-3 p-4 rounded-lg shadow-sm overflow-x-auto ${cardClasses}`}>
<div className="flex-shrink-0 text-center">
<div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-pink-500 to-orange-400 rounded-full flex items-center justify-center">
<Plus className="w-5 h-5 md:w-6 md:h-6 text-white" />
</div>
<p className="text-xs mt-1">Your Story</p>
</div>
{[‘Alice’, ‘Bob’, ‘Carol’, ‘David’].map((name, idx) => (
<div key={idx} className="flex-shrink-0 text-center">
<div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full p-1">
<div className={`w-full h-full rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
</div>
<p className="text-xs mt-1">{name}</p>
</div>
))}
</div>

```
        {/* Unified Feed */}
        <div className="space-y-4">
          {feedItems.map((item, idx) => (
            <div key={idx} className={`rounded-lg shadow-sm overflow-hidden ${cardClasses}`}>
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
                  <div>
                    <p className="font-semibold text-sm md:text-base">{item.user}</p>
                    <p className="text-xs flex items-center">
                      <span className={`w-2 h-2 rounded-full mr-2 ${
                        item.type === 'youtube' ? 'bg-red-500' :
                        item.type === 'instagram' ? 'bg-pink-500' : 'bg-black'
                      }`}></span>
                      <span className={textTertiary}>{item.type.charAt(0).toUpperCase() + item.type.slice(1)}</span>
                    </p>
                  </div>
                </div>
                <button className={hoverClasses + ' p-2 rounded-full'}>
                  <ChevronDown className={`w-5 h-5 ${textSecondary}`} />
                </button>
              </div>
              
              <div className="relative">
                <div className={`w-full h-48 md:h-64 flex items-center justify-center ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                  <Play className={`w-12 h-12 ${textSecondary}`} />
                </div>
                {item.type === 'tiktok' && (
                  <div className="absolute right-2 bottom-2 space-y-3">
                    <button className="flex flex-col items-center text-white">
                      <Heart className="w-6 h-6" />
                      <span className="text-xs">23K</span>
                    </button>
                    <button className="flex flex-col items-center text-white">
                      <MessageCircle className="w-6 h-6" />
                      <span className="text-xs">1.2K</span>
                    </button>
                    <button className="flex flex-col items-center text-white">
                      <Share2 className="w-6 h-6" />
                      <span className="text-xs">892</span>
                    </button>
                  </div>
                )}
              </div>
              
              <div className="p-4">
                <p className="font-medium mb-2 text-sm md:text-base">{item.content}</p>
                <p className={`text-sm ${textTertiary}`}>{item.engagement}</p>
                
                <div className={`flex items-center justify-between mt-3 pt-3 border-t ${borderClasses}`}>
                  <button className={`flex items-center space-x-2 ${textSecondary} hover:text-red-500 text-sm`}>
                    <Heart className="w-4 h-4 md:w-5 md:h-5" />
                    <span className="hidden sm:inline">Like</span>
                  </button>
                  <button className={`flex items-center space-x-2 ${textSecondary} hover:text-blue-500 text-sm`}>
                    <MessageCircle className="w-4 h-4 md:w-5 md:h-5" />
                    <span className="hidden sm:inline">Comment</span>
                  </button>
                  <button className={`flex items-center space-x-2 ${textSecondary} hover:text-green-500 text-sm`}>
                    <Share2 className="w-4 h-4 md:w-5 md:h-5" />
                    <span className="hidden sm:inline">Share</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );

  case 'messages':
    return (
      <div className="h-full flex flex-col md:flex-row pb-20 md:pb-0">
        {/* Conversation List */}
        <div className={`w-full md:w-1/3 md:border-r ${borderClasses} ${cardClasses} ${activeChat ? 'hidden md:block' : ''}`}>
          <div className={`p-4 border-b ${borderClasses}`}>
            <div className="relative">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${textSecondary}`} />
              <input 
                className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                }`}
                placeholder="Search conversations..."
              />
            </div>
          </div>
          <div className="overflow-y-auto">
            {conversations.map((conv) => (
              <div 
                key={conv.id}
                className={`p-4 border-b cursor-pointer ${borderClasses} ${hoverClasses} ${
                  activeChat === conv.id ? 'bg-blue-50 dark:bg-blue-900' : ''
                }`}
                onClick={() => setActiveChat(conv.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <p className="font-semibold text-sm md:text-base truncate">{conv.name}</p>
                        <span className={`text-xs px-2 py-1 rounded-full flex-shrink-0 ${
                          conv.platform === 'WhatsApp' ? 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300' :
                          conv.platform === 'Slack' ? 'bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300' :
                          conv.platform === 'iMessage' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300' :
                          'bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-300'
                        }`}>
                          {conv.platform}
                        </span>
                      </div>
                      <p className={`text-sm truncate ${textSecondary}`}>{conv.lastMessage}</p>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className={`text-xs ${textTertiary}`}>{conv.time}</p>
                    {conv.unread > 0 && (
                      <span className="inline-block w-5 h-5 bg-red-500 text-white text-xs rounded-full text-center leading-5 mt-1">
                        {conv.unread}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className={`flex-1 flex flex-col ${activeChat ? '' : 'hidden md:flex'}`}>
          {activeChat ? (
            <>
              <div className={`p-4 border-b ${borderClasses} ${cardClasses} flex items-center justify-between`}>
                <div className="flex items-center space-x-3">
                  <button 
                    className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                    onClick={() => setActiveChat(null)}
                  >
                    <ChevronDown className="w-5 h-5 rotate-90" />
                  </button>
                  <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
                  <div>
                    <p className="font-semibold text-sm md:text-base">{conversations.find(c => c.id === activeChat)?.name}</p>
                    <p className={`text-sm ${textTertiary}`}>Online</p>
                  </div>
                </div>
                <div className="flex space-x-1 md:space-x-2">
                  <button className={`p-2 rounded-full ${hoverClasses}`}>
                    <Phone className="w-4 h-4 md:w-5 md:h-5" />
                  </button>
                  <button className={`p-2 rounded-full ${hoverClasses}`}>
                    <Video className="w-4 h-4 md:w-5 md:h-5" />
                  </button>
                </div>
              </div>
              
              <div className={`flex-1 p-4 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'} overflow-y-auto`}>
                <div className="space-y-4">
                  <div className="flex justify-start">
                    <div className={`p-3 rounded-lg max-w-xs md:max-w-sm ${cardClasses}`}>
                      <p className="text-sm md:text-base">Hey! How's the project going?</p>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="bg-blue-500 text-white p-3 rounded-lg max-w-xs md:max-w-sm">
                      <p className="text-sm md:text-base">Going great! Should have it done by tomorrow.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className={`p-4 border-t ${borderClasses} ${cardClasses}`}>
                <div className="flex items-center space-x-2">
                  <button className={`p-2 rounded-full ${hoverClasses}`}>
                    <Plus className="w-4 h-4 md:w-5 md:h-5" />
                  </button>
                  <input 
                    className={`flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base ${
                      darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                    }`}
                    placeholder="Type a message..."
                  />
                  <button className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600">
                    <Send className="w-4 h-4 md:w-5 md:h-5" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className={`flex-1 flex items-center justify-center ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
              <div className="text-center">
                <MessageCircle className={`w-12 h-12 md:w-16 md:h-16 mx-auto mb-4 ${textSecondary}`} />
                <p className={textTertiary}>Select a conversation to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>
    );

  case 'videos':
    return (
      <div className="space-y-4 pb-20 md:pb-4">
        <div className={`flex space-x-2 md:space-x-4 p-4 rounded-lg overflow-x-auto ${cardClasses}`}>
          <button className="px-3 py-2 md:px-4 bg-red-500 text-white rounded-lg text-sm whitespace-nowrap">YouTube</button>
          <button className={`px-3 py-2 md:px-4 rounded-lg text-sm whitespace-nowrap ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-200'}`}>TikTok</button>
          <button className={`px-3 py-2 md:px-4 rounded-lg text-sm whitespace-nowrap ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-200'}`}>Instagram</button>
          <button className={`px-3 py-2 md:px-4 rounded-lg text-sm whitespace-nowrap ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-200'}`}>All</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1,2,3,4,5,6].map((i) => (
            <div key={i} className={`rounded-lg overflow-hidden shadow-sm ${cardClasses}`}>
              <div className={`w-full h-40 md:h-48 flex items-center justify-center ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                <Play className={`w-10 h-10 md:w-12 md:h-12 ${textSecondary}`} />
              </div>
              <div className="p-4">
                <h3 className="font-semibold mb-2 text-sm md:text-base">Sample Video Title {i}</h3>
                <p className={`text-sm ${textSecondary}`}>Creator Name • 100K views • 2 days ago</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );

  case 'calls':
    return (
      <div className="space-y-4 pb-20 md:pb-4">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <button className="p-4 md:p-6 bg-green-500 text-white rounded-lg flex flex-col items-center">
            <Phone className="w-6 h-6 md:w-8 md:h-8 mb-2" />
            <span className="text-sm md:text-base">Voice Call</span>
          </button>
          <button className="p-4 md:p-6 bg-blue-500 text-white rounded-lg flex flex-col items-center">
            <Video className="w-6 h-6 md:w-8 md:h-8 mb-2" />
            <span className="text-sm md:text-base">Video Call</span>
          </button>
        </div>
        
        <div className={`rounded-lg p-4 ${cardClasses}`}>
          <h3 className="font-semibold mb-4 text-base md:text-lg">Recent Calls</h3>
          <div className="space-y-3">
            {['Sarah Johnson', 'Work Team', 'Mom', 'Alex Smith'].map((name, i) => (
              <div key={i} className={`flex items-center justify-between p-3 rounded ${hoverClasses}`}>
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
                  <div>
                    <p className="font-medium text-sm md:text-base">{name}</p>
                    <p className={`text-sm ${textTertiary}`}>Yesterday, 2:30 PM</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className={`p-2 text-green-500 rounded-full ${darkMode ? 'hover:bg-green-900' : 'hover:bg-green-50'}`}>
                    <Phone className="w-4 h-4" />
                  </button>
                  <button className={`p-2 text-blue-500 rounded-full ${darkMode ? 'hover:bg-blue-900' : 'hover:bg-blue-50'}`}>
                    <Video className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );

  case 'files':
    return (
      <div className="space-y-4 pb-20 md:pb-4">
        <div className={`rounded-lg p-4 ${cardClasses}`}>
          <h3 className="font-semibold mb-4 text-base md:text-lg">Recent Files</h3>
          <div className="space-y-3">
            {[
              { name: 'Project_Proposal.pdf', size: '2.4 MB', type: 'PDF' },
              { name: 'Team_Photo.jpg', size: '1.8 MB', type: 'Image' },
              { name: 'Budget_2024.xlsx', size: '890 KB', type: 'Spreadsheet' },
              { name: 'Meeting_Recording.mp4', size: '45.2 MB', type: 'Video' }
            ].map((file, i) => (
              <div key={i} className={`flex items-center justify-between p-3 rounded ${hoverClasses}`}>
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 md:w-10 md:h-10 rounded flex items-center justify-center ${
                    darkMode ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-600'
                  }`}>
                    <FileText className="w-4 h-4 md:w-5 md:h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium text-sm md:text-base truncate">{file.name}</p>
                    <p className={`text-sm ${textTertiary}`}>{file.size} • {file.type}</p>
                  </div>
                </div>
                <button className={`p-2 rounded ${textSecondary} ${hoverClasses}`}>
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );

  default:
    return <div>Select a tab</div>;
}
```

};

return (
<div className={`min-h-screen ${baseClasses}`}>
{/* Header */}
<div className={`shadow-sm p-4 flex items-center justify-between ${cardClasses} relative z-50`}>
<div className="flex items-center space-x-3">
<button
className=“md:hidden p-1”
onClick={() => setSidebarOpen(!sidebarOpen)}
>
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
</div>

```
  {/* Main Content */}
  <div className="flex">
    {/* Sidebar - Desktop and Mobile Overlay */}
    <div className={`
      fixed inset-y-0 left-0 z-40 w-64 transform transition-transform duration-300 ease-in-out
      md:relative md:translate-x-0 md:z-0
      ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      ${cardClasses} shadow-lg md:shadow-none
    `}>
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
              className={`w-full flex items-center space-x-3 p-3 rounded-lg mb-2 transition-colors text-sm md:text-base ${
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

    {/* Overlay for mobile sidebar */}
    {sidebarOpen && (
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
        onClick={() => setSidebarOpen(false)}
      />
    )}

    {/* Content Area */}
    <div className="flex-1 p-4 md:p-6 overflow-auto">
      {renderContent()}
    </div>
  </div>

  {/* Bottom Navigation for Mobile */}
  <div className={`md:hidden fixed bottom-0 left-0 right-0 ${cardClasses} border-t ${borderClasses} px-2 py-1`}>
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
```

);
};

export default UniversalSocialHub;