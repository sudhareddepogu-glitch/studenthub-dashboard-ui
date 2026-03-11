import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  User, 
  Lock, 
  Bell, 
  Palette, 
  Link, 
  Shield,
  Save,
  Eye,
  EyeOff,
  Upload
} from 'lucide-react';
import { Switch } from './ui/switch';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select } from './ui/select';
import { Slider } from './ui/slider';
import { Separator } from './ui/separator';

type SettingsCategory = 'profile' | 'account' | 'notifications' | 'theme' | 'integrations' | 'privacy';

const categories = [
  { id: 'profile', label: 'Profile Settings', icon: User, desc: 'Personal info & contact details' },
  { id: 'account', label: 'Account Settings', icon: Lock, desc: 'Password & login activity' },
  { id: 'notifications', label: 'Notifications', icon: Bell, desc: 'Email, SMS & app notifications' },
  { id: 'theme', label: 'Theme & Display', icon: Palette, desc: 'Appearance & color preferences' },
  { id: 'integrations', label: 'Integrations', icon: Link, desc: 'Connected apps & services' },
  { id: 'privacy', label: 'Privacy & Security', icon: Shield, desc: '2FA & data visibility' },
];

export function Settings() {
  const [activeCategory, setActiveCategory] = useState<SettingsCategory>('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [settings, setSettings] = useState({
    // Profile Settings
    firstName: 'Alex',
    lastName: 'Johnson',
    email: 'alex.johnson@university.edu',
    phone: '+1 (555) 123-4567',
    bio: 'Computer Science student passionate about AI and machine learning.',
    
    // Notification Settings
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    weeklyDigest: true,
    eventReminders: true,
    gradeUpdates: true,
    
    // Theme Settings
    darkMode: false,
    accentColor: 'blue',
    fontSize: 16,
    compactMode: false,
    
    // Privacy Settings
    twoFactor: false,
    profileVisibility: 'public',
    activityStatus: true,
    dataSharing: false,
  });

  const updateSetting = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const renderProfileSettings = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-4 p-6 bg-gradient-to-r from-blue-50 to-teal-50 rounded-2xl border border-blue-100">
        <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full flex items-center justify-center">
          <User className="w-8 h-8 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-slate-800">Profile Picture</h3>
          <p className="text-slate-600">Update your profile photo</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600">
          <Upload className="w-4 h-4 mr-2" />
          Upload
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>First Name</Label>
          <Input 
            value={settings.firstName}
            onChange={(e) => updateSetting('firstName', e.target.value)}
            className="bg-white/50 border-slate-200 rounded-xl"
          />
        </div>
        <div className="space-y-2">
          <Label>Last Name</Label>
          <Input 
            value={settings.lastName}
            onChange={(e) => updateSetting('lastName', e.target.value)}
            className="bg-white/50 border-slate-200 rounded-xl"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Email Address</Label>
        <Input 
          value={settings.email}
          onChange={(e) => updateSetting('email', e.target.value)}
          className="bg-white/50 border-slate-200 rounded-xl"
        />
      </div>

      <div className="space-y-2">
        <Label>Phone Number</Label>
        <Input 
          value={settings.phone}
          onChange={(e) => updateSetting('phone', e.target.value)}
          className="bg-white/50 border-slate-200 rounded-xl"
        />
      </div>

      <div className="space-y-2">
        <Label>Bio</Label>
        <textarea 
          value={settings.bio}
          onChange={(e) => updateSetting('bio', e.target.value)}
          className="w-full p-3 bg-white/50 border border-slate-200 rounded-xl resize-none h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Tell us about yourself..."
        />
      </div>

      <Button className="w-full bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600">
        <Save className="w-4 h-4 mr-2" />
        Save Changes
      </Button>
    </div>
  );

  const renderAccountSettings = () => (
    <div className="space-y-6">
      <div className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border border-purple-100">
        <h3 className="font-semibold text-slate-800 mb-2">Change Password</h3>
        <p className="text-slate-600 mb-4">Update your password to keep your account secure</p>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Current Password</Label>
            <div className="relative">
              <Input 
                type={showPassword ? "text" : "password"}
                className="bg-white/50 border-slate-200 rounded-xl pr-10"
                placeholder="Enter current password"
              />
              <button 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-slate-500 hover:text-slate-700"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <div className="space-y-2">
            <Label>New Password</Label>
            <Input 
              type="password"
              className="bg-white/50 border-slate-200 rounded-xl"
              placeholder="Enter new password"
            />
          </div>
          <div className="space-y-2">
            <Label>Confirm New Password</Label>
            <Input 
              type="password"
              className="bg-white/50 border-slate-200 rounded-xl"
              placeholder="Confirm new password"
            />
          </div>
        </div>
      </div>

      <div className="p-6 bg-white/50 rounded-2xl border border-slate-200">
        <h3 className="font-semibold text-slate-800 mb-2">Login Activity</h3>
        <p className="text-slate-600 mb-4">Recent login sessions</p>
        <div className="space-y-3">
          {[
            { device: 'MacBook Pro', location: 'New York, US', time: '2 hours ago', current: true },
            { device: 'iPhone 14', location: 'New York, US', time: '1 day ago', current: false },
            { device: 'Windows PC', location: 'Boston, US', time: '3 days ago', current: false },
          ].map((session, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
              <div>
                <p className="font-medium text-slate-800">{session.device}</p>
                <p className="text-sm text-slate-600">{session.location} • {session.time}</p>
              </div>
              {session.current ? (
                <span className="px-2 py-1 bg-green-100 text-green-700 rounded-lg text-sm">Current</span>
              ) : (
                <Button variant="outline" size="sm">Revoke</Button>
              )}
            </div>
          ))}
        </div>
      </div>

      <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
        <Save className="w-4 h-4 mr-2" />
        Update Password
      </Button>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      {[
        { key: 'emailNotifications', label: 'Email Notifications', desc: 'Receive notifications via email' },
        { key: 'smsNotifications', label: 'SMS Notifications', desc: 'Receive text message alerts' },
        { key: 'pushNotifications', label: 'Push Notifications', desc: 'Receive browser notifications' },
        { key: 'weeklyDigest', label: 'Weekly Digest', desc: 'Get a summary of your weekly activity' },
        { key: 'eventReminders', label: 'Event Reminders', desc: 'Reminders for upcoming events' },
        { key: 'gradeUpdates', label: 'Grade Updates', desc: 'Notifications when grades are posted' },
      ].map((item) => (
        <div key={item.key} className="p-4 bg-white/50 rounded-2xl border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-slate-800">{item.label}</h4>
              <p className="text-sm text-slate-600">{item.desc}</p>
            </div>
            <Switch 
              checked={settings[item.key as keyof typeof settings] as boolean}
              onCheckedChange={(checked) => updateSetting(item.key, checked)}
            />
          </div>
        </div>
      ))}
      
      <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
        <Save className="w-4 h-4 mr-2" />
        Save Preferences
      </Button>
    </div>
  );

  const renderThemeSettings = () => (
    <div className="space-y-6">
      <div className="p-6 bg-white/50 rounded-2xl border border-slate-200">
        <h3 className="font-semibold text-slate-800 mb-4">Appearance</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-slate-800">Dark Mode</h4>
              <p className="text-sm text-slate-600">Switch to dark theme</p>
            </div>
            <Switch 
              checked={settings.darkMode}
              onCheckedChange={(checked) => updateSetting('darkMode', checked)}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-slate-800">Compact Mode</h4>
              <p className="text-sm text-slate-600">Reduce spacing for more content</p>
            </div>
            <Switch 
              checked={settings.compactMode}
              onCheckedChange={(checked) => updateSetting('compactMode', checked)}
            />
          </div>
        </div>
      </div>

      <div className="p-6 bg-white/50 rounded-2xl border border-slate-200">
        <h3 className="font-semibold text-slate-800 mb-4">Accent Color</h3>
        <div className="grid grid-cols-4 gap-3">
          {[
            { color: 'blue', bg: 'bg-gradient-to-r from-blue-500 to-blue-600' },
            { color: 'teal', bg: 'bg-gradient-to-r from-teal-500 to-teal-600' },
            { color: 'purple', bg: 'bg-gradient-to-r from-purple-500 to-purple-600' },
            { color: 'orange', bg: 'bg-gradient-to-r from-orange-500 to-orange-600' },
          ].map((item) => (
            <button
              key={item.color}
              onClick={() => updateSetting('accentColor', item.color)}
              className={`w-16 h-16 rounded-2xl ${item.bg} ${
                settings.accentColor === item.color ? 'ring-2 ring-offset-2 ring-slate-400' : ''
              }`}
            />
          ))}
        </div>
      </div>

      <div className="p-6 bg-white/50 rounded-2xl border border-slate-200">
        <h3 className="font-semibold text-slate-800 mb-4">Font Size</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-600">Small</span>
            <span className="text-lg text-slate-600">Large</span>
          </div>
          <Slider
            value={[settings.fontSize]}
            onValueChange={(value) => updateSetting('fontSize', value[0])}
            max={20}
            min={12}
            step={1}
            className="w-full"
          />
          <p className="text-center text-slate-600">Current: {settings.fontSize}px</p>
        </div>
      </div>
    </div>
  );

  const renderPrivacySettings = () => (
    <div className="space-y-6">
      <div className="p-6 bg-gradient-to-r from-red-50 to-pink-50 rounded-2xl border border-red-100">
        <h3 className="font-semibold text-slate-800 mb-4">Two-Factor Authentication</h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-slate-600">Add an extra layer of security to your account</p>
          </div>
          <Switch 
            checked={settings.twoFactor}
            onCheckedChange={(checked) => updateSetting('twoFactor', checked)}
          />
        </div>
      </div>

      <div className="p-6 bg-white/50 rounded-2xl border border-slate-200">
        <h3 className="font-semibold text-slate-800 mb-4">Profile Visibility</h3>
        <div className="space-y-3">
          {[
            { value: 'public', label: 'Public', desc: 'Anyone can see your profile' },
            { value: 'university', label: 'University Only', desc: 'Only people from your university' },
            { value: 'private', label: 'Private', desc: 'Only you can see your profile' },
          ].map((option) => (
            <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="visibility"
                value={option.value}
                checked={settings.profileVisibility === option.value}
                onChange={(e) => updateSetting('profileVisibility', e.target.value)}
                className="w-4 h-4 text-blue-600"
              />
              <div>
                <p className="font-medium text-slate-800">{option.label}</p>
                <p className="text-sm text-slate-600">{option.desc}</p>
              </div>
            </label>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {[
          { key: 'activityStatus', label: 'Show Activity Status', desc: 'Let others see when you\'re active' },
          { key: 'dataSharing', label: 'Anonymous Data Sharing', desc: 'Help improve the platform with anonymous usage data' },
        ].map((item) => (
          <div key={item.key} className="p-4 bg-white/50 rounded-2xl border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-slate-800">{item.label}</h4>
                <p className="text-sm text-slate-600">{item.desc}</p>
              </div>
              <Switch 
                checked={settings[item.key as keyof typeof settings] as boolean}
                onCheckedChange={(checked) => updateSetting(item.key, checked)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeCategory) {
      case 'profile': return renderProfileSettings();
      case 'account': return renderAccountSettings();
      case 'notifications': return renderNotificationSettings();
      case 'theme': return renderThemeSettings();
      case 'privacy': return renderPrivacySettings();
      default: return renderProfileSettings();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gradient-to-r from-slate-500 to-slate-600 rounded-2xl flex items-center justify-center">
          <SettingsIcon className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold text-slate-800">Settings</h1>
          <p className="text-slate-600">Manage your account preferences and settings</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Sidebar - Categories */}
        <div className="lg:col-span-1">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-slate-200/50 p-4 space-y-2 sticky top-6">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id as SettingsCategory)}
                  className={`w-full text-left p-4 rounded-xl transition-all duration-200 ${
                    activeCategory === category.id
                      ? 'bg-gradient-to-r from-blue-500 to-teal-500 text-white shadow-lg'
                      : 'hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="w-5 h-5" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{category.label}</p>
                      <p className={`text-sm truncate ${
                        activeCategory === category.id ? 'text-blue-100' : 'text-slate-500'
                      }`}>
                        {category.desc}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Content */}
        <div className="lg:col-span-3">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-slate-200/50 p-6">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}