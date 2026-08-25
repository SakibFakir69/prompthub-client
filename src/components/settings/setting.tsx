
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
import Image from 'next/image';
import { useUser } from '@/src/hooks/me/user-data';
import { SettingGroup } from './setting-group';
import { RowItem } from './setting-row-items';
import { Divider } from './setting-divider';
import { SectionLabel } from './setting-section-label';


import { toast } from "react-toastify"

import { baseApi } from "@/src/store/baseApi"
import { useDispatch } from 'react-redux';
import { useLogoutUserMutation } from '@/src/store/features/auth/auth.features';
import { useUnregisterDeviceTokenMutation } from '@/src/store/features/notification/notification.features';
import { useDeletePromptMutation } from '@/src/store/features/prompt/prompt.features';
import { useDeleteUserMutation } from '@/src/store/features/users/user.features';


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


export default function SettingScreen() {


  const router = useRouter();

  const { user } = useUser();
  const [logoutUser] = useLogoutUserMutation();
  const [unregisterDeviceToken] = useUnregisterDeviceTokenMutation();
  const [deleteUser] = useDeleteUserMutation();

  const dispatch = useDispatch();


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

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("fcmToken");

      const res = await logoutUser().unwrap();


      if (token) {
        try {
          await unregisterDeviceToken({ token }).unwrap();
          localStorage.removeItem("fcmToken");
        } catch (err) {
          console.error(err);
        }
      }

      dispatch(baseApi.util.resetApiState());
      toast.success("User logged out successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to log out. Please try again.");
    }
  };




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
    toast(
      ({ closeToast }) => (
        <div>
          <p style={{ marginBottom: 8, fontWeight: 600 }}>Delete account?</p>
          <p style={{ marginBottom: 12, fontSize: 13, color: "#6b7280" }}>
            This action is permanent and cannot be undone. All your prompts and data will be removed.
          </p>
          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={async () => {
                closeToast();
                try {
                  await deleteUser().unwrap()
                  toast.success("Account deleted successfully");
                } catch (error) {
                  console.error("Failed to delete account:", error);
                  toast.error("Failed to delete account. Please try again.");
                }
              }}
              style={{
                background: "#dc2626",
                color: "#fff",
                border: "none",
                borderRadius: 6,
                padding: "6px 14px",
                fontSize: 13,
                cursor: "pointer",
              }}
            >
              Delete
            </button>
            <button
              onClick={closeToast}
              style={{
                background: "transparent",
                border: "1px solid rgba(0,0,0,0.15)",
                borderRadius: 6,
                padding: "6px 14px",
                fontSize: 13,
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      { autoClose: false, closeOnClick: false, closeButton: true }
    );
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
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none duration-200 ${disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'
        } ${value ? 'bg-gray-900' : 'bg-gray-200'}`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${value ? 'translate-x-6' : 'translate-x-1'
          }`}
      />
    </button>
  );


  const goVerifiedPath = () => {
    router.push('/verified')

  }

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
            <Image
              height={100}
              width={100}
              src={user?.data.avatar || 'https://via.placeholder.com/150'}
              alt={`${user?.data.name || 'User'}'s avatar`}
              className="bg-gray-200 rounded-full w-14 h-14 object-cover"
            />
            <div className="flex-1 min-w-0">
              <p className="text-base font-bold text-gray-900 truncate">{user?.data.name}</p>
              <p className="mt-0.5 text-sm text-gray-400 truncate">{user?.data.email}</p>
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
            {!user?.data.isVerify && (
              <RowItem


                onPress={goVerifiedPath}

                icon={<BadgeCheck size={17} color="#534AB7" />}
                iconBg="#EEEDFE"
                label="Request verified badge"
                sublabel="Get a blue checkmark on your profile"
              />
            )}
          </SettingGroup>

          {/* ── Notifications ── */}
          {/* <SectionLabel label="Notifications" />
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
          </SettingGroup> */}

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