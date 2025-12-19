"use client";

import { updateUser } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";
import { Camera, X, User, Mail, Save, ImageIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function EditForm({
  name,
  email,
  image,
}: {
  name: string;
  email: string;
  image: string;
}) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [newName, setNewName] = useState(name);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(image);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setError("File must be an image");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setError("File size must be less than 5MB");
        return;
      }

      setSelectedImage(file);
      setError("");

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!newName.trim()) {
      setError("Name is required.");
      setLoading(false);
      return;
    }

    try {
      let imageUrl: string | null = image;

      if (previewUrl === null && image !== null) {
        imageUrl = null;
      } else if (selectedImage) {
        const formData = new FormData();
        formData.append("image", selectedImage);

        const uploadResponse = await fetch("/api/upload-profile-image", {
          method: "POST",
          body: formData,
        });

        if (!uploadResponse.ok) {
          const errorData = await uploadResponse.json();
          throw new Error(errorData.error || "Error uploading image");
        }

        const { imageUrl: uploadedUrl } = await uploadResponse.json();
        imageUrl = uploadedUrl;
      }

      await updateUser(
        {
          name: newName.trim(),
          image: imageUrl || null,
        },
        {
          onSuccess() {
            router.push("/profil");
            router.refresh();
          },
          onError(error) {
            setError(error.error?.message || "Error updating profile");
          },
        },
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error updating profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleUpdateProfile}
      className="relative flex flex-col max-h-[85vh] overflow-hidden bg-card/95 backdrop-blur-xl rounded-xl w-full max-w-3xl shadow-[0_0_50px_rgba(139,92,246,0.3)] border border-primary/30 dark"
    >
      {/* Neon glow overlay */}
      <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-secondary/5 pointer-events-none rounded-xl" />

      {/* Header */}
      <div className="relative border-b border-border bg-muted/30">
        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary to-transparent" />
        <div className="py-5 px-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-linear-to-br from-primary to-secondary border border-primary/50 shadow-[0_0_15px_rgba(139,92,246,0.3)]">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
                Edit Profile
              </h2>
              <div className="h-px w-20 bg-linear-to-r from-primary to-transparent mt-1" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground flex items-center gap-2 mt-2">
            <Mail className="w-3.5 h-3.5 text-secondary" />
            {email}
          </p>
        </div>
      </div>

      {/* Form Body */}
      <div className="relative scrollbar flex-1 p-8 overflow-y-auto">
        {error && (
          <div
            className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm"
            style={{
              animation: "shake 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97)",
            }}
          >
            {error}
          </div>
        )}

        {/* Profile Image Upload */}
        <div
          className="mb-8"
          style={{
            animation:
              "fade-in-up 0.4s cubic-bezier(0.2, 0, 0, 1) 0.1s forwards",
            opacity: 0,
          }}
        >
          <label className=" text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-primary" />
            Profile Picture
          </label>
          <div className="flex items-center gap-6">
            <div className="relative">
              <div
                className="absolute inset-0 bg-primary/20 blur-2xl rounded-full"
                style={{
                  animation: "pulse-glow 3s ease-in-out infinite",
                }}
              />
              {previewUrl ? (
                <div className="relative w-24 h-24 rounded-full border-4 border-primary/50 shadow-[0_0_25px_rgba(139,92,246,0.4)]">
                  <Image
                    src={previewUrl}
                    alt="Profile"
                    fill
                    className="w-full h-full rounded-full"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute top-0 right-0 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg"
                    title="Remove image"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ) : (
                <div className="relative w-24 h-24 rounded-full bg-linear-to-br from-primary to-secondary flex items-center justify-center text-white text-2xl font-bold border-4 border-primary/50 shadow-[0_0_25px_rgba(139,92,246,0.4)]">
                  {name[0]?.toUpperCase()}
                </div>
              )}
            </div>
            <div className="flex-1">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                className="hidden"
                id="profile-image-input"
                disabled={loading}
              />
              <label
                htmlFor="profile-image-input"
                className="relative group inline-block cursor-pointer"
              >
                <div className="absolute -inset-1 bg-linear-to-r from-secondary to-accent rounded-lg opacity-70 group-hover:opacity-100 blur transition-all duration-300" />
                <div className="relative inline-flex items-center gap-2 px-4 py-2 bg-linear-to-r from-secondary to-accent text-white rounded-lg font-medium shadow-lg">
                  <Camera className="w-4 h-4" />
                  <span className="text-sm">
                    {previewUrl ? "Change Image" : "Choose Image"}
                  </span>
                </div>
              </label>
              <p className="text-xs text-muted-foreground mt-2">
                Accepted formats: JPG, PNG, GIF (max 5MB)
              </p>
            </div>
          </div>
        </div>

        {/* Name Field */}
        <div
          className="mb-6"
          style={{
            animation:
              "fade-in-up 0.4s cubic-bezier(0.2, 0, 0, 1) 0.2s forwards",
            opacity: 0,
          }}
        >
          <label className=" text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
            <User className="w-4 h-4 text-secondary" />
            Name <span className="text-red-400">*</span>
          </label>
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-linear-to-r from-secondary to-primary rounded-lg opacity-0 group-focus-within:opacity-20 blur transition-all duration-300" />
            <Input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="relative bg-muted/50 border-border focus:border-secondary/50 transition-all duration-300"
              placeholder="Your name"
              required
              disabled={loading}
            />
          </div>
        </div>

        {/* Email Field (read-only) */}
        <div
          style={{
            animation:
              "fade-in-up 0.4s cubic-bezier(0.2, 0, 0, 1) 0.3s forwards",
            opacity: 0,
          }}
        >
          <label className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
            <Mail className="w-4 h-4 text-accent" />
            Email
          </label>
          <Input
            type="email"
            value={email}
            className="bg-muted/30 border-border text-muted-foreground cursor-not-allowed"
            disabled
            readOnly
          />
          <p className="text-xs text-muted-foreground mt-1 ml-1">
            Email cannot be changed
          </p>
        </div>
      </div>

      {/* Footer */}
      <div
        className="relative flex justify-end py-4 px-8 gap-4 border-t border-border bg-muted/30"
        style={{
          animation: "fade-in-up 0.4s cubic-bezier(0.2, 0, 0, 1) 0.4s forwards",
          opacity: 0,
        }}
      >
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/profil")}
          disabled={loading}
          className="border-border hover:bg-muted hover:border-primary/30 transition-all duration-300"
        >
          Cancel
        </Button>

        <div className="relative group">
          <div
            className="absolute -inset-1 bg-linear-to-r from-primary via-secondary to-accent rounded-lg opacity-70 group-hover:opacity-100 blur transition-all duration-300"
            style={{
              animation: loading ? "none" : "tilt 3s ease-in-out infinite",
            }}
          />
          <Button
            type="submit"
            disabled={
              loading ||
              !newName.trim() ||
              (newName === name && !selectedImage && previewUrl === image)
            }
            className="relative bg-linear-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 border border-primary/50 shadow-lg disabled:opacity-50"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Updating...</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Save className="w-4 h-4" />
                <span>Save Changes</span>
              </div>
            )}
          </Button>
        </div>
      </div>
    </form>
  );
}
