
'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  ChevronRight,
  User,
  Lock,
  BadgeCheck,
  Bell,
  Mail,
  UserPlus,
  Heart,
  ShieldCheck,
  Clock,
  Ban,
  Sun,
  Languages,
  HelpCircle,
  MessageSquare,
  Info,
  Trash2,
  LogOut,
} from 'lucide-react';
import { useTestPushMutation } from '@/src/store/features/notification/notification.features';
import FcmInitializer from '../fcm/FcmInitializer';

// ─── Types ────────────────────────────────────────────────────────────────────

interface IUser {
  name: string;
  email: string;
  avatar?: string;
  isVerify?: boolean;
}

interface SettingScreenProps {
  user: IUser;
  onLogout: () => void;
}

interface NotificationState {
  push: boolean;
  email: boolean;
  newFollowers: boolean;
  promptLikes: boolean;
}

interface PrivacyState {
  privateAccount: boolean;
  activityStatus: boolean;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

const SectionLabel = ({ label }: { label: string }) => (
  <h2 className="px-4 pt-6 pb-2 text-xs font-semibold tracking-widest text-gray-400 uppercase">
    {label}
  </h2>
);

const RowItem = ({
  icon,
  iconBg,
  label,
  sublabel,
  onPress,
  danger = false,
  right,
}: {
  icon: React.ReactNode;
  iconBg: string;
  label: string;
  sublabel?: string;
  onPress?: () => void;
  danger?: boolean;
  right?: React.ReactNode;
}) => (
  <button
    onClick={onPress}
    type="button"
    className="flex w-full items-center text-left px-4 py-3 bg-white transition-colors duration-150 hover:bg-gray-50/80 active:bg-gray-100"
  >
    <div
      className="flex items-center justify-center mr-3 w-9 h-9 rounded-xl flex-shrink-0"
      style={{ backgroundColor: iconBg }}
    >
      {icon}
    </div>

    <div className="flex-1 min-w-0">
      <p className={`text-sm font-medium ${danger ? 'text-red-600' : 'text-gray-900'}`}>
        {label}
      </p>
      {sublabel && (
        <p className="mt-0.5 text-xs text-gray-400 truncate">{sublabel}</p>
      )}
    </div>

    <div className="flex items-center justify-end ml-2 flex-shrink-0">
      {right ?? <ChevronRight size={16} className="text-gray-300" />}
    </div>
  </button>
);

const Divider = () => (
  <div className="ml-16 border-b border-gray-100" />
);

const SettingGroup = ({ children }: { children: React.ReactNode }) => (
  <div className="mx-4 overflow-hidden bg-white border border-gray-100 rounded-2xl shadow-sm">
    {children}
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────

export default function SettingScreen({ user, onLogout }: SettingScreenProps) {

 
  const router = useRouter();
  const [testPush] = useTestPushMutation();

  const [notifications, setNotifications] = useState<NotificationState>({
    push: true,
    email: false,
    newFollowers: true,
    promptLikes: false,
  });

  const [privacy, setPrivacy] = useState<PrivacyState>({
    privateAccount: false,
    activityStatus: true,
  });

 
  useEffect(()=>{

    testPush();

  },[])

  const toggleNotification = (key: keyof NotificationState) => {
    setNotifications(prev => {
      if (key === 'push' && prev.push) {
        return { push: false, email: false, newFollowers: false, promptLikes: false };
      }
      return { ...prev, [key]: !prev[key] };
    });
  };

  const togglePrivacy = (key: keyof PrivacyState) => {
    setPrivacy(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleDeleteAccount = () => {
    const confirmDelete = window.confirm(
      'Delete account\n\nThis action is permanent and cannot be undone. All your prompts and data will be removed.'
    );
    if (confirmDelete) {
      // call your delete account API here
      console.log("Account deletion confirmed");
    }
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm('Log out\n\nAre you sure you want to log out?');
    if (confirmLogout) {
      onLogout();
      console.log("handle logout clicked");
    }
  };

  const ToggleSwitch = ({
    value,
    onToggle,
    disabled = false,
  }: {
    value: boolean;
    onToggle: () => void;
    disabled?: boolean;
  }) => (
    <button
      type="button"
      disabled={disabled}
      onClick={(e) => {
        e.stopPropagation(); // Prevents row item triggers
        onToggle();
      }}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none duration-200 ${
        disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'
      } ${value ? 'bg-gray-900' : 'bg-gray-200'}`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
          value ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );

  return (
    <div className="min-h-screen flex justify-center">
      {/* Container to restrict max width on desktop view (retains mobile app layout style) */}
      <div className="w-full  bg-gray-50 flex flex-col min-h-screen border-x border-gray-100 ">
        
        {/* Header */}
        <header className="flex items-center justify-between px-5 py-3 bg-white border-b border-gray-100 sticky top-0 z-10">
          <button
            onClick={() => router.back()}
            type="button"
            className="p-2 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 rounded-full transition-colors"
          >
            <ArrowLeft size={20} className="text-gray-700" />
          </button>
          <h1 className="text-base font-bold text-gray-900">Settings</h1>
          <div className="w-9" /> {/* Spacer to center the title */}
        </header>

        {/* Content Body */}
        <main className="flex-1 pb-10 overflow-y-auto">

          {/* User card */}
          <button
            onClick={() => router.push('/profile/edit')}
            type="button"
            className="flex w-[calc(100%-2rem)] text-left items-center gap-4 p-4 mx-4 mt-6 bg-white border border-gray-100 rounded-2xl shadow-sm transition-all hover:border-gray-200 active:bg-gray-50"
          >
            <img
              src={user?.avatar || 'https://via.placeholder.com/150'}
              alt={`${user?.name || 'User'}'s avatar`}
              className="bg-gray-200 rounded-full w-14 h-14 object-cover"
            />
            <div className="flex-1 min-w-0">
              <p className="text-base font-bold text-gray-900 truncate">{user?.name}</p>
              <p className="mt-0.5 text-sm text-gray-400 truncate">{user?.email}</p>
            </div>
            <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full flex-shrink-0">
              <ChevronRight size={16} className="text-gray-500" />
            </div>
          </button>

          {/* ── Account ── */}
          <SectionLabel label="Account" />
          <SettingGroup>
            <RowItem
              icon={<User size={17} color="#185FA5" />}
              iconBg="#E6F1FB"
              label="Edit profile"
              onPress={() => router.push('/profile/edit')}
            />
            <Divider />
            <RowItem
              icon={<Lock size={17} color="#3B6D11" />}
              iconBg="#EAF3DE"
              label="Change password"
              onPress={() => router.push('/profile/edit')}
            
              
            />
            <Divider />
            {!user?.isVerify && (
              <RowItem
                icon={<BadgeCheck size={17} color="#534AB7" />}
                iconBg="#EEEDFE"
                label="Request verified badge"
                sublabel="Get a blue checkmark on your profile"
              />
            )}
          </SettingGroup>

          {/* ── Notifications ── */}
          <SectionLabel label="Notifications" />
          <SettingGroup>
            <RowItem
              icon={<Bell size={17} color="#854F0B" />}
              iconBg="#FAEEDA"
              label="Push notifications"
              right={
                <ToggleSwitch
                  value={notifications.push}
                  onToggle={() => toggleNotification('push')}
                />
              }
            />
            <Divider />
            <RowItem
              icon={<Mail size={17} color="#854F0B" />}
              iconBg="#FAEEDA"
              label="Email notifications"
              right={
                <ToggleSwitch
                  value={notifications.email}
                  onToggle={() => toggleNotification('email')}
                  disabled={!notifications.push}
                />
              }
            />
            <Divider />
            <RowItem
              icon={<UserPlus size={17} color="#854F0B" />}
              iconBg="#FAEEDA"
              label="New followers"
              sublabel="Notify when someone follows you"
              right={
                <ToggleSwitch
                  value={notifications.newFollowers}
                  onToggle={() => toggleNotification('newFollowers')}
                  disabled={!notifications.push}
                />
              }
            />
            <Divider />
            <RowItem
              icon={<Heart size={17} color="#854F0B" />}
              iconBg="#FAEEDA"
              label="Prompt likes"
              sublabel="When someone likes your prompt"
              right={
                <ToggleSwitch
                  value={notifications.promptLikes}
                  onToggle={() => toggleNotification('promptLikes')}
                  disabled={!notifications.push}
                />
              }
            />
          </SettingGroup>

          {/* ── Privacy ── */}
          <SectionLabel label="Privacy" />
          <SettingGroup>
            <RowItem
              icon={<ShieldCheck size={17} color="#0F6E56" />}
              iconBg="#E1F5EE"
              label="Private account"
              sublabel="Only followers can see your prompts"
              right={
                <ToggleSwitch
                  value={privacy.privateAccount}
                  onToggle={() => togglePrivacy('privateAccount')}
                />
              }
            />
            <Divider />
            <RowItem
              icon={<Clock size={17} color="#0F6E56" />}
              iconBg="#E1F5EE"
              label="Activity status"
              sublabel="Show when you're active"
              right={
                <ToggleSwitch
                  value={privacy.activityStatus}
                  onToggle={() => togglePrivacy('activityStatus')}
                />
              }
            />
            <Divider />
            <RowItem
              icon={<Ban size={17} color="#0F6E56" />}
              iconBg="#E1F5EE"
              label="Blocked users"
            />
          </SettingGroup>
          <FcmInitializer/>

          {/* ── Appearance ── */}
          <SectionLabel label="Appearance" />
          <SettingGroup>
            <RowItem
              icon={<Sun size={17} color="#444441" />}
              iconBg="#F1EFE8"
              label="Theme"
              sublabel="System default"
            />
            <Divider />
            <RowItem
              icon={<Languages size={17} color="#444441" />}
              iconBg="#F1EFE8"
              label="Language"
              sublabel="English"
            />
          </SettingGroup>

          {/* ── Support ── */}
          <SectionLabel label="Support" />
          <SettingGroup>
            <RowItem
              icon={<HelpCircle size={17} color="#185FA5" />}
              iconBg="#E6F1FB"
              label="Help & FAQ"
            />
            <Divider />
            <RowItem
              icon={<MessageSquare size={17} color="#185FA5" />}
              iconBg="#E6F1FB"
              label="Send feedback"
            />
            <Divider />
            <RowItem
              icon={<Info size={17} color="#185FA5" />}
              iconBg="#E6F1FB"
              label="About"
              sublabel="v1.0.0"
            />
          </SettingGroup>

          {/* ── Danger zone ── */}
          <SectionLabel label="Danger zone" />
          <SettingGroup>
            <RowItem
              icon={<Trash2 size={17} color="#A32D2D" />}
              iconBg="#FCEBEB"
              label="Delete account"
              danger
              onPress={handleDeleteAccount}
            />
            <Divider />
            <RowItem
              icon={<LogOut size={17} color="#A32D2D" />}
              iconBg="#FCEBEB"
              label="Log out"
              danger
              onPress={handleLogout}
            />
          </SettingGroup>

        </main>
      </div>
    </div>
  );
}