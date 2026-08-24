import { useEffect, useState } from "react";
import {
  Globe2,
  LogIn,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Plane,
  UserRound,
  Pencil,
  Save,
  X,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { Link } from "react-router-dom";

import planTripBg from "@/assets/images/plan-trip/plan-trip-bg.jpeg";
import {
  getCurrentUser,
  updateProfile,
  updateProfilePhoto,
  type AuthUser,
  type UpdateProfileRequest,
} from "@/services/api/auth.service";

export function ProfilePage() {
  const [user, setUser] = useState<AuthUser | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const [photoError, setPhotoError] = useState<string | null>(null);
  const [photoInputKey, setPhotoInputKey] = useState(0);

  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [formData, setFormData] = useState<UpdateProfileRequest>({
    fullName: "",
    age: null,
    phone: "",
    location: "",
  });

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        setIsLoading(true);

        const currentUser = await getCurrentUser();

        setUser(currentUser);
        setIsAuthenticated(true);

        setFormData({
          fullName: currentUser.fullName,
          age: currentUser.age,
          phone: currentUser.phone ?? "",
          location: currentUser.location ?? "",
        });
      } catch (error) {
        console.error("Failed to load profile:", error);

        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCurrentUser();
  }, []);

  const handleEdit = () => {
    if (!user) {
      return;
    }

    setFormData({
      fullName: user.fullName,
      age: user.age,
      phone: user.phone ?? "",
      location: user.location ?? "",
    });

    setSuccessMessage(null);
    setErrorMessage(null);
    setPhotoError(null);
    setIsEditing(true);
  };

  const handleCancel = () => {
    if (!user) {
      return;
    }

    setFormData({
      fullName: user.fullName,
      age: user.age,
      phone: user.phone ?? "",
      location: user.location ?? "",
    });

    setSuccessMessage(null);
    setErrorMessage(null);
    setPhotoError(null);
    setIsEditing(false);
  };

  const handleChange = (
    field: keyof UpdateProfileRequest,
    value: string,
  ) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const handleAgeChange = (value: string) => {
    setFormData((previous) => ({
      ...previous,
      age: value === "" ? null : Number(value),
    }));
  };

  const handleSave = async () => {
    if (!user) {
      return;
    }

    if (!formData.fullName?.trim()) {
      setErrorMessage("Full name is required.");
      return;
    }

    if (
      formData.age !== null &&
      formData.age !== undefined &&
      (!Number.isInteger(formData.age) ||
        formData.age < 1 ||
        formData.age > 120)
    ) {
      setErrorMessage("Age must be between 1 and 120.");
      return;
    }

    try {
      setIsSaving(true);
      setSuccessMessage(null);
      setErrorMessage(null);

      const updatedUser = await updateProfile({
        fullName: formData.fullName.trim(),
        age: formData.age,
        phone: formData.phone?.trim() || null,
        location: formData.location?.trim() || null,
      });

      setUser(updatedUser);

      setFormData({
        fullName: updatedUser.fullName,
        age: updatedUser.age,
        phone: updatedUser.phone ?? "",
        location: updatedUser.location ?? "",
      });

      setIsEditing(false);
      setSuccessMessage("Profile updated successfully.");
    } catch (error) {
      console.error("Failed to update profile:", error);

      setErrorMessage(
        "Unable to update your profile. Please try again.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleProfilePhotoChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setPhotoError(null);
    setSuccessMessage(null);

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      setPhotoError(
        "Only JPG, PNG, and WEBP images are allowed.",
      );

      setPhotoInputKey((previous) => previous + 1);
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setPhotoError(
        "Profile photo must be smaller than 5 MB.",
      );

      setPhotoInputKey((previous) => previous + 1);
      return;
    }

    try {
      setIsUploadingPhoto(true);

      const updatedUser = await updateProfilePhoto(file);

      setUser(updatedUser);

      setSuccessMessage(
        "Profile photo updated successfully.",
      );
    } catch (error) {
      console.error(
        "Failed to upload profile photo:",
        error,
      );

      setPhotoError(
        "Unable to upload profile photo. Please try again.",
      );
    } finally {
      setIsUploadingPhoto(false);
      setPhotoInputKey((previous) => previous + 1);
    }
  };

  if (isLoading) {
    return (
      <main className="relative min-h-screen overflow-hidden bg-[#f4eee4] text-[#17233d]">
        <div className="pointer-events-none fixed inset-0">
          <img
            src={planTripBg}
            alt=""
            className="h-full w-full object-cover object-center"
          />

          <div className="absolute inset-0 bg-[#f5eee4]/20" />

          <div className="absolute inset-0 bg-gradient-to-b from-white/25 via-transparent to-[#f4eee4]/35" />
        </div>

        <div className="relative z-10 flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-8">
          <section className="flex w-full max-w-[560px] flex-col items-center justify-center gap-3 rounded-[1.5rem] border border-orange-200/80 bg-[#fffdf9]/95 px-8 py-16 text-center shadow-[0_20px_60px_rgba(52,45,34,0.24)] backdrop-blur-sm">
            <Loader2 className="h-8 w-8 animate-spin text-[#f56b16]" />

            <h1 className="font-display text-2xl font-bold text-[#17233d]">
              Loading your profile...
            </h1>

            <p className="text-sm text-[#68748a]">
              Fetching your account information.
            </p>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f4eee4] text-[#17233d]">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0">
        <img
          src={planTripBg}
          alt=""
          className="h-full w-full object-cover object-center"
        />

        <div className="absolute inset-0 bg-[#f5eee4]/20" />

        <div className="absolute inset-0 bg-gradient-to-b from-white/25 via-transparent to-[#f4eee4]/35" />
      </div>

      {/* Page content */}
      <div className="relative z-10 flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-8 sm:px-6 sm:py-10">
        <section className="w-full max-w-[560px] overflow-hidden rounded-[1.5rem] border border-orange-200/80 bg-[#fffdf9]/95 shadow-[0_20px_60px_rgba(52,45,34,0.24)] backdrop-blur-sm">
          {/* Profile header */}
          <div className="relative border-b border-orange-100 px-5 pb-7 pt-8 text-center sm:px-8 sm:pt-9">
            <div className="pointer-events-none absolute right-0 top-0 h-28 w-40 overflow-hidden opacity-40">
              <svg
                viewBox="0 0 160 110"
                className="h-full w-full"
                fill="none"
              >
                <path
                  d="M-5 85C30 45 55 60 78 42C102 23 123 27 165 -8"
                  stroke="#F26B21"
                  strokeWidth="1.5"
                  strokeDasharray="5 5"
                />

                <circle
                  cx="5"
                  cy="82"
                  r="4"
                  fill="#F26B21"
                />

                <circle
                  cx="151"
                  cy="3"
                  r="4"
                  fill="#F26B21"
                />
              </svg>
            </div>

            {/* Profile photo */}
            <div className="relative mx-auto h-28 w-28 sm:h-32 sm:w-32">
              <label
                htmlFor="profile-photo"
                className={`relative flex h-full w-full items-center justify-center overflow-hidden rounded-full border-4 border-white bg-orange-50 text-[#f56b16] shadow-[0_8px_25px_rgba(52,45,34,0.16)] ${
                  isUploadingPhoto
                    ? "cursor-wait opacity-70"
                    : "cursor-pointer"
                }`}
              >
                {user?.profilePhoto ? (
                  <img
                    src={user.profilePhoto}
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <UserRound className="h-14 w-14 sm:h-16 sm:w-16" />
                )}

                {isUploadingPhoto && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-white">
                    <Loader2 className="h-6 w-6 animate-spin" />
                  </div>
                )}
              </label>

              <input
                key={photoInputKey}
                id="profile-photo"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={handleProfilePhotoChange}
                disabled={isUploadingPhoto}
              />

              <label
                htmlFor="profile-photo"
                className={`absolute bottom-0 right-0 flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-[#f56b16] text-white shadow-md transition ${
                  isUploadingPhoto
                    ? "cursor-wait opacity-60"
                    : "cursor-pointer hover:bg-[#e95f0d]"
                }`}
              >
                <Pencil className="h-4 w-4" />
              </label>
            </div>

            {photoError && (
              <div className="mx-auto mt-3 max-w-sm rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-center text-xs text-red-700">
                {photoError}
              </div>
            )}

            <div className="mt-5">
              <h1 className="font-display text-2xl font-bold tracking-tight text-[#17233d] sm:text-[26px]">
                Your Profile
              </h1>

              <div className="mt-1.5 inline-flex items-center gap-1.5 rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-[#f26b21]">
                <Plane className="h-3 w-3" />
                SmartTrip Explorer
              </div>

              <p className="mx-auto mt-3 max-w-[400px] text-xs leading-5 text-[#68748a] sm:text-sm">
                {isAuthenticated
                  ? "Manage your SmartTrip account and travel profile."
                  : "Sign in to personalize your SmartTrip experience and manage your traveler profile."}
              </p>
            </div>
          </div>

          {/* Account state */}
          <div className="px-5 py-5 sm:px-8 sm:py-6">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <h2 className="text-base font-bold text-[#17233d]">
                  Profile Information
                </h2>

                <p className="mt-0.5 text-xs text-[#718096]">
                  Your account details.
                </p>
              </div>

              {isAuthenticated && user && !isEditing && (
                <button
                  type="button"
                  onClick={handleEdit}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-orange-200 bg-orange-50 px-3 py-2 text-xs font-bold text-[#f26b21] transition hover:bg-orange-100"
                >
                  <Pencil className="h-3.5 w-3.5" />
                  Edit
                </button>
              )}
            </div>

            {/* Success message */}
            {successMessage && (
              <div className="mb-4 flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 px-3.5 py-3 text-sm text-green-700">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                {successMessage}
              </div>
            )}

            {/* Error message */}
            {errorMessage && (
              <div className="mb-4 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-3.5 py-3 text-sm text-red-700">
                <AlertCircle className="h-4 w-4 shrink-0" />
                {errorMessage}
              </div>
            )}

            {/* Logged in */}
            {isAuthenticated && user ? (
              <>
                <div className="rounded-2xl border border-green-200 bg-green-50/80 p-4 sm:p-5">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-green-600 shadow-sm">
                      <UserRound className="h-5 w-5" />
                    </div>

                    <div>
                      <h3 className="text-sm font-bold text-[#17233d]">
                        Welcome,{" "}
                        {isEditing
                          ? formData.fullName || user.fullName
                          : user.fullName}
                      </h3>

                      <p className="mt-1 text-xs leading-5 text-[#68748a]">
                        Your account information is loaded from your SmartTrip
                        account.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
                  {/* Full Name */}
                  <div className="rounded-xl border border-slate-200 bg-white px-3.5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-50 text-violet-500">
                        <UserRound className="h-4 w-4" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="text-[10px] font-semibold uppercase tracking-wide text-[#8a94a6]">
                          Full Name
                        </p>

                        {isEditing ? (
                          <input
                            type="text"
                            value={formData.fullName ?? ""}
                            onChange={(event) =>
                              handleChange(
                                "fullName",
                                event.target.value,
                              )
                            }
                            className="mt-1 w-full rounded-lg border border-orange-200 bg-orange-50/50 px-2.5 py-1.5 text-sm font-semibold text-[#17233d] outline-none focus:border-[#f56b16] focus:ring-2 focus:ring-orange-100"
                          />
                        ) : (
                          <p className="truncate text-sm font-semibold text-[#17233d]">
                            {user.fullName}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Age */}
                  <div className="rounded-xl border border-slate-200 bg-white px-3.5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-500">
                        <UserRound className="h-4 w-4" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="text-[10px] font-semibold uppercase tracking-wide text-[#8a94a6]">
                          Age
                        </p>

                        {isEditing ? (
                          <input
                            type="number"
                            min="1"
                            max="120"
                            value={formData.age ?? ""}
                            onChange={(event) =>
                              handleAgeChange(event.target.value)
                            }
                            placeholder="Enter age"
                            className="mt-1 w-full rounded-lg border border-orange-200 bg-orange-50/50 px-2.5 py-1.5 text-sm font-semibold text-[#17233d] outline-none focus:border-[#f56b16] focus:ring-2 focus:ring-orange-100"
                          />
                        ) : (
                          <p className="text-sm font-semibold text-[#17233d]">
                            {user.age ?? "Not available"}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="rounded-xl border border-slate-200 bg-white px-3.5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-[#f56b16]">
                        <Mail className="h-4 w-4" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="text-[10px] font-semibold uppercase tracking-wide text-[#8a94a6]">
                          Login Email
                        </p>

                        <p className="truncate text-sm font-semibold text-[#17233d]">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="rounded-xl border border-slate-200 bg-white px-3.5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-green-50 text-green-600">
                        <Phone className="h-4 w-4" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="text-[10px] font-semibold uppercase tracking-wide text-[#8a94a6]">
                          Phone
                        </p>

                        {isEditing ? (
                          <input
                            type="tel"
                            value={formData.phone ?? ""}
                            onChange={(event) =>
                              handleChange(
                                "phone",
                                event.target.value,
                              )
                            }
                            placeholder="Enter phone number"
                            className="mt-1 w-full rounded-lg border border-orange-200 bg-orange-50/50 px-2.5 py-1.5 text-sm font-semibold text-[#17233d] outline-none focus:border-[#f56b16] focus:ring-2 focus:ring-orange-100"
                          />
                        ) : (
                          <p className="truncate text-sm font-semibold text-[#17233d]">
                            {user.phone ?? "Not available"}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="rounded-xl border border-slate-200 bg-white px-3.5 py-3 sm:col-span-2">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-50 text-violet-500">
                        <MapPin className="h-4 w-4" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="text-[10px] font-semibold uppercase tracking-wide text-[#8a94a6]">
                          Location
                        </p>

                        {isEditing ? (
                          <input
                            type="text"
                            value={formData.location ?? ""}
                            onChange={(event) =>
                              handleChange(
                                "location",
                                event.target.value,
                              )
                            }
                            placeholder="Enter location"
                            className="mt-1 w-full rounded-lg border border-orange-200 bg-orange-50/50 px-2.5 py-1.5 text-sm font-semibold text-[#17233d] outline-none focus:border-[#f56b16] focus:ring-2 focus:ring-orange-100"
                          />
                        ) : (
                          <p className="truncate text-sm font-semibold text-[#17233d]">
                            {user.location ?? "Not available"}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Role */}
                  <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-3.5 py-3 sm:col-span-2">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-[#f26b21]">
                      <UserRound className="h-4 w-4" />
                    </div>

                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-wide text-[#8a94a6]">
                        Account Role
                      </p>

                      <p className="text-sm font-semibold text-[#17233d]">
                        {user.role}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Member since */}
                <div className="mt-3 rounded-xl border border-orange-100 bg-orange-50/60 px-4 py-3">
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-[#8a94a6]">
                    Member Since
                  </p>

                  <p className="mt-1 text-sm font-semibold text-[#17233d]">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </p>
                </div>

                {/* Edit actions */}
                {isEditing && (
                  <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                    <button
                      type="button"
                      onClick={handleSave}
                      disabled={isSaving}
                      className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-[#f56b16] px-5 text-sm font-bold text-white shadow-[0_7px_18px_rgba(245,107,22,0.22)] transition hover:bg-[#e95f0d] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {isSaving ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="h-4 w-4" />
                          Save Changes
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={handleCancel}
                      disabled={isSaving}
                      className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 text-sm font-bold text-[#17233d] transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <X className="h-4 w-4" />
                      Cancel
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="rounded-2xl border border-orange-200 bg-orange-50/80 p-4 sm:p-5">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#f56b16] shadow-sm">
                    <UserRound className="h-5 w-5" />
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-[#17233d]">
                      You're not signed in
                    </h3>

                    <p className="mt-1 text-xs leading-5 text-[#68748a]">
                      Log in to view and edit your account information.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Travel activity */}
          <div className="border-t border-orange-100 bg-[#fffaf4] px-5 py-5 sm:px-8">
            <div className="mb-4">
              <h2 className="text-base font-bold text-[#17233d]">
                Travel Activity
              </h2>

              <p className="mt-0.5 text-xs text-[#718096]">
                Your SmartTrip activity will appear here once you start
                planning trips.
              </p>
            </div>

            <div className="grid grid-cols-3 divide-x divide-orange-100 overflow-hidden rounded-xl border border-orange-200 bg-white">
              <div className="flex flex-col items-center px-2 py-3.5 text-center">
                <Plane className="mb-1.5 h-4 w-4 text-[#f26b21]" />

                <span className="text-lg font-bold text-[#17233d]">
                  —
                </span>

                <span className="mt-0.5 text-[9px] font-semibold leading-3 text-[#7b8798] sm:text-[10px]">
                  Trips Planned
                </span>
              </div>

              <div className="flex flex-col items-center px-2 py-3.5 text-center">
                <MapPin className="mb-1.5 h-4 w-4 text-[#f26b21]" />

                <span className="text-lg font-bold text-[#17233d]">
                  —
                </span>

                <span className="mt-0.5 text-[9px] font-semibold leading-3 text-[#7b8798] sm:text-[10px]">
                  Saved Places
                </span>
              </div>

              <div className="flex flex-col items-center px-2 py-3.5 text-center">
                <Globe2 className="mb-1.5 h-4 w-4 text-[#f26b21]" />

                <span className="text-lg font-bold text-[#17233d]">
                  —
                </span>

                <span className="mt-0.5 text-[9px] font-semibold leading-3 text-[#7b8798] sm:text-[10px]">
                  Countries Visited
                </span>
              </div>
            </div>
          </div>

          {/* Sign in */}
          {!isAuthenticated && (
            <div className="border-t border-orange-100 px-5 py-5 sm:px-8">
              <Link
                to="/login"
                className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#f56b16] px-5 text-sm font-bold text-white shadow-[0_7px_18px_rgba(245,107,22,0.22)] transition hover:-translate-y-0.5 hover:bg-[#e95f0d] hover:shadow-[0_9px_22px_rgba(245,107,22,0.3)]"
              >
                <LogIn className="h-4 w-4" />
                Log In
              </Link>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}