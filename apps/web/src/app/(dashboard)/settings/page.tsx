"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "@/shared/lib/axios";

interface User {
  id: string;
  businessName: string;
  email: string;
  phone: string;
  plan: string;
  createdAt: string;
}

// ─── Section Wrapper ──────────────────────────────────────────────────────────

function SettingsSection({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-100">
        <h3
          className="font-bold text-gray-900 text-[15px]"
          style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
        >
          {title}
        </h3>
        <p
          className="text-gray-400 text-xs mt-0.5"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {subtitle}
        </p>
      </div>
      <div className="px-6 py-6">{children}</div>
    </div>
  );
}

// ─── Input Field ──────────────────────────────────────────────────────────────

function Field({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  disabled,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  disabled?: boolean;
}) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  return (
    <div>
      <label
        className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2"
        style={{ fontFamily: "var(--font-inter)" }}
      >
        {label}
      </label>
      <div className="relative">
        <input
          type={isPassword ? (showPassword ? "text" : "password") : type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`w-full px-4 py-3.5 rounded-xl border text-gray-800 text-[15px] outline-none transition-all duration-200 placeholder:text-gray-300 disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed ${
            error
              ? "border-red-300 bg-red-50"
              : "border-gray-200 focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/10"
          }`}
          style={{ fontFamily: "var(--font-inter)" }}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 bg-transparent border-none cursor-pointer p-0"
          >
            {showPassword ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24M1 1l22 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
              </svg>
            )}
          </button>
        )}
      </div>
      {error && (
        <p className="text-red-500 text-xs mt-1.5" style={{ fontFamily: "var(--font-inter)" }}>
          {error}
        </p>
      )}
    </div>
  );
}

// ─── Alert ────────────────────────────────────────────────────────────────────

function Alert({ type, message }: { type: "success" | "error"; message: string }) {
  return (
    <div
      className={`flex items-center gap-3 rounded-xl px-4 py-3 mb-5 ${
        type === "success"
          ? "bg-[#84CC16]/10 border border-[#84CC16]/25"
          : "bg-red-50 border border-red-100"
      }`}
    >
      {type === "success" ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="shrink-0">
          <path d="M22 11.08V12a10 10 0 11-5.93-9.14" stroke="#65A30D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <polyline points="22 4 12 14.01 9 11.01" stroke="#65A30D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="shrink-0">
          <circle cx="12" cy="12" r="10" stroke="#EF4444" strokeWidth="2" />
          <path d="M12 8v4M12 16h.01" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )}
      <p
        className={`text-sm ${type === "success" ? "text-[#65A30D]" : "text-red-600"}`}
        style={{ fontFamily: "var(--font-inter)" }}
      >
        {message}
      </p>
    </div>
  );
}

// ─── SettingsPage ─────────────────────────────────────────────────────────────

export default function SettingsPage() {
  const router = useRouter();

  // Profile state
  const [profile, setProfile] = useState({ businessName: "", email: "", phone: "" });
  const [profileErrors, setProfileErrors] = useState<Record<string, string>>({});
  const [profileAlert, setProfileAlert] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [savingProfile, setSavingProfile] = useState(false);

  // Password state
  const [passwords, setPasswords] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [passwordErrors, setPasswordErrors] = useState<Record<string, string>>({});
  const [passwordAlert, setPasswordAlert] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [savingPassword, setSavingPassword] = useState(false);

  // Delete account state
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");
  const [deleteError, setDeleteError] = useState("");
  const [deletingAccount, setDeletingAccount] = useState(false);

  // User info
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("kollectpay_user");
    if (stored) {
      const u = JSON.parse(stored);
      setUser(u);
      setProfile({
        businessName: u.businessName || "",
        email: u.email || "",
        phone: u.phone || "",
      });
    }
  }, []);

  // ── Profile handlers ──

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
    if (profileErrors[name]) setProfileErrors((prev) => ({ ...prev, [name]: "" }));
    setProfileAlert(null);
  };

  const validateProfile = () => {
    const errors: Record<string, string> = {};
    if (!profile.businessName.trim() || profile.businessName.length < 2)
      errors.businessName = "Business name must be at least 2 characters";
    if (!profile.email || !/\S+@\S+\.\S+/.test(profile.email))
      errors.email = "Enter a valid email address";
    if (!profile.phone || profile.phone.length < 10)
      errors.phone = "Enter a valid phone number";
    setProfileErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSaveProfile = async () => {
    if (!validateProfile()) return;
    setSavingProfile(true);
    setProfileAlert(null);

    try {
      const { data } = await api.patch("/api/settings/profile", profile);

      // Update localStorage
      const stored = localStorage.getItem("kollectpay_user");
      if (stored) {
        const u = JSON.parse(stored);
        localStorage.setItem(
          "kollectpay_user",
          JSON.stringify({ ...u, ...data.data.user })
        );
      }

      setProfileAlert({ type: "success", message: "Profile updated successfully!" });
    } catch (error: any) {
      setProfileAlert({
        type: "error",
        message: error.response?.data?.message || "Failed to update profile.",
      });
    } finally {
      setSavingProfile(false);
    }
  };

  // ── Password handlers ──

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
    if (passwordErrors[name]) setPasswordErrors((prev) => ({ ...prev, [name]: "" }));
    setPasswordAlert(null);
  };

  const validatePasswords = () => {
    const errors: Record<string, string> = {};
    if (!passwords.currentPassword)
      errors.currentPassword = "Enter your current password";
    if (!passwords.newPassword || passwords.newPassword.length < 8)
      errors.newPassword = "New password must be at least 8 characters";
    if (passwords.newPassword !== passwords.confirmPassword)
      errors.confirmPassword = "Passwords do not match";
    setPasswordErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSavePassword = async () => {
    if (!validatePasswords()) return;
    setSavingPassword(true);
    setPasswordAlert(null);

    try {
      await api.patch("/api/settings/password", {
        currentPassword: passwords.currentPassword,
        newPassword: passwords.newPassword,
      });

      setPasswordAlert({ type: "success", message: "Password updated successfully!" });
      setPasswords({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (error: any) {
      setPasswordAlert({
        type: "error",
        message: error.response?.data?.message || "Failed to update password.",
      });
    } finally {
      setSavingPassword(false);
    }
  };

  // ── Delete account ──

  const handleDeleteAccount = async () => {
    if (!deletePassword) {
      setDeleteError("Enter your password to confirm deletion");
      return;
    }
    setDeletingAccount(true);
    setDeleteError("");

    try {
      await api.delete("/api/settings/account", {
        data: { password: deletePassword },
      });

      localStorage.removeItem("kollectpay_token");
      localStorage.removeItem("kollectpay_user");
      router.push("/");
    } catch (error: any) {
      setDeleteError(error.response?.data?.message || "Failed to delete account.");
      setDeletingAccount(false);
    }
  };

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-NG", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-6">

      {/* Account overview */}
      <div className="bg-[#0F0A1E] rounded-2xl px-6 py-5 flex items-center gap-4">
        <div
          className="w-14 h-14 rounded-2xl bg-[#7C3AED]/30 flex items-center justify-center text-lg font-extrabold text-[#7C3AED] shrink-0"
          style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
        >
          {user?.businessName?.slice(0, 2).toUpperCase() || "KP"}
        </div>
        <div className="flex-1 min-w-0">
          <p
            className="text-white font-extrabold text-base truncate"
            style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
          >
            {user?.businessName || "Your Business"}
          </p>
          <p
            className="text-white/40 text-xs"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {user?.email}
          </p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span
            className="text-[#84CC16] text-xs font-bold bg-[#84CC16]/10 px-2.5 py-1 rounded-full"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {user?.plan || "STARTER"} Plan
          </span>
          {user?.createdAt && (
            <p
              className="text-white/25 text-[11px]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Since {formatDate(user.createdAt)}
            </p>
          )}
        </div>
      </div>

      {/* Profile section */}
      <SettingsSection
        title="Profile & Business Info"
        subtitle="This information appears on every reminder message sent to your debtors"
      >
        {profileAlert && <Alert type={profileAlert.type} message={profileAlert.message} />}

        <div className="flex flex-col gap-4">
          <Field
            label="Business Name"
            name="businessName"
            placeholder="e.g. Chidi Electronics"
            value={profile.businessName}
            onChange={handleProfileChange}
            error={profileErrors.businessName}
          />
          <Field
            label="Email Address"
            name="email"
            type="email"
            placeholder="you@yourbusiness.com"
            value={profile.email}
            onChange={handleProfileChange}
            error={profileErrors.email}
          />
          <div>
            <label
              className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Phone Number
            </label>
            <div className="flex gap-2">
              <div
                className="flex items-center gap-1.5 px-3 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-500 whitespace-nowrap"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                🇳🇬 +234
              </div>
              <input
                type="tel"
                name="phone"
                placeholder="0801 234 5678"
                value={profile.phone}
                onChange={handleProfileChange}
                className={`flex-1 px-4 py-3.5 rounded-xl border text-gray-800 text-[15px] outline-none transition-all duration-200 placeholder:text-gray-300 ${
                  profileErrors.phone
                    ? "border-red-300 bg-red-50"
                    : "border-gray-200 focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/10"
                }`}
                style={{ fontFamily: "var(--font-inter)" }}
              />
            </div>
            {profileErrors.phone && (
              <p className="text-red-500 text-xs mt-1.5" style={{ fontFamily: "var(--font-inter)" }}>
                {profileErrors.phone}
              </p>
            )}
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={handleSaveProfile}
              disabled={savingProfile}
              className={`flex items-center gap-2 text-white font-bold text-sm px-6 py-3 rounded-xl transition-all duration-200 border-none cursor-pointer ${
                savingProfile
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-linear-to-r from-[#7C3AED] to-[#9D5CF6] shadow-lg shadow-purple-300/30 hover:-translate-y-0.5"
              }`}
              style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
            >
              {savingProfile ? (
                <>
                  <svg className="animate-spin" width="15" height="15" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="32" strokeDashoffset="12" />
                  </svg>
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </div>
      </SettingsSection>

      {/* Password section */}
      <SettingsSection
        title="Password & Security"
        subtitle="Keep your account safe with a strong password"
      >
        {passwordAlert && <Alert type={passwordAlert.type} message={passwordAlert.message} />}

        <div className="flex flex-col gap-4">
          <Field
            label="Current Password"
            name="currentPassword"
            type="password"
            placeholder="Enter current password"
            value={passwords.currentPassword}
            onChange={handlePasswordChange}
            error={passwordErrors.currentPassword}
          />
          <Field
            label="New Password"
            name="newPassword"
            type="password"
            placeholder="Minimum 8 characters"
            value={passwords.newPassword}
            onChange={handlePasswordChange}
            error={passwordErrors.newPassword}
          />
          <Field
            label="Confirm New Password"
            name="confirmPassword"
            type="password"
            placeholder="Repeat new password"
            value={passwords.confirmPassword}
            onChange={handlePasswordChange}
            error={passwordErrors.confirmPassword}
          />

          <div className="flex justify-end pt-2">
            <button
              onClick={handleSavePassword}
              disabled={savingPassword}
              className={`flex items-center gap-2 text-white font-bold text-sm px-6 py-3 rounded-xl transition-all duration-200 border-none cursor-pointer ${
                savingPassword
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-linear-to-r from-[#7C3AED] to-[#9D5CF6] shadow-lg shadow-purple-300/30 hover:-translate-y-0.5"
              }`}
              style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
            >
              {savingPassword ? (
                <>
                  <svg className="animate-spin" width="15" height="15" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="32" strokeDashoffset="12" />
                  </svg>
                  Updating...
                </>
              ) : (
                "Update Password"
              )}
            </button>
          </div>
        </div>
      </SettingsSection>

      {/* Danger zone */}
      <div className="bg-white border-2 border-red-100 rounded-2xl overflow-hidden">
        <div className="px-6 py-5 border-b border-red-100 bg-red-50/50">
          <h3
            className="font-bold text-red-600 text-[15px]"
            style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
          >
            Danger Zone
          </h3>
          <p
            className="text-red-400 text-xs mt-0.5"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            These actions are permanent and cannot be undone
          </p>
        </div>
        <div className="px-6 py-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p
                className="text-gray-800 font-semibold text-sm mb-1"
                style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
              >
                Delete Account
              </p>
              <p
                className="text-gray-400 text-xs leading-relaxed"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Permanently delete your account, all debtors, reminders, and
                message history. This cannot be reversed.
              </p>
            </div>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="shrink-0 text-red-500 border-2 border-red-200 hover:bg-red-500 hover:text-white hover:border-red-500 font-bold text-sm px-5 py-2.5 rounded-xl transition-all duration-200 cursor-pointer bg-transparent"
              style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
            onClick={() => { setShowDeleteModal(false); setDeletePassword(""); setDeleteError(""); }}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
              <div className="text-center mb-6">
                <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4 text-2xl">
                  ⚠️
                </div>
                <h3
                  className="text-xl font-extrabold text-gray-900 mb-2"
                  style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
                >
                  Delete Your Account?
                </h3>
                <p
                  className="text-gray-400 text-sm leading-relaxed"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  This will permanently delete your account, all{" "}
                  <strong className="text-gray-700">debtors</strong>,{" "}
                  <strong className="text-gray-700">reminders</strong>, and{" "}
                  <strong className="text-gray-700">message logs</strong>. There
                  is no going back.
                </p>
              </div>

              {deleteError && <Alert type="error" message={deleteError} />}

              <div className="mb-5">
                <label
                  className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  Enter your password to confirm
                </label>
                <input
                  type="password"
                  placeholder="Your password"
                  value={deletePassword}
                  onChange={(e) => {
                    setDeletePassword(e.target.value);
                    setDeleteError("");
                  }}
                  className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-red-400 focus:ring-2 focus:ring-red-100 outline-none text-gray-800 text-[15px] transition-all"
                  style={{ fontFamily: "var(--font-inter)" }}
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => { setShowDeleteModal(false); setDeletePassword(""); setDeleteError(""); }}
                  className="flex-1 py-3.5 rounded-xl border-2 border-gray-200 text-gray-600 font-semibold text-[15px] hover:bg-gray-50 transition-all duration-200 cursor-pointer bg-transparent"
                  style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteAccount}
                  disabled={deletingAccount}
                  className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl text-white font-bold text-[15px] transition-all duration-200 border-none cursor-pointer ${
                    deletingAccount
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-red-500 hover:bg-red-600"
                  }`}
                  style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
                >
                  {deletingAccount ? (
                    <>
                      <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="32" strokeDashoffset="12" />
                      </svg>
                      Deleting...
                    </>
                  ) : (
                    "Yes, Delete My Account"
                  )}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}