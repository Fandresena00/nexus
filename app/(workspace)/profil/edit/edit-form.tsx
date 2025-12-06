"use client";

import NavButton from "@/src/components/personnal/nav-button";
import { updateUser } from "@/src/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";
import Link from "next/link";
import { Camera, X } from "lucide-react";
import Image from "next/image";

export default function EditForm({
  name,
  email,
  image,
}: {
  name: string;
  email: string;
  image: string | null;
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
      // Validate file type
      if (!file.type.startsWith("image/")) {
        setError("Le fichier doit être une image");
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError("La taille du fichier doit être inférieure à 5MB");
        return;
      }

      setSelectedImage(file);
      setError("");

      // Create preview URL
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
      setError("Le nom est requis.");
      setLoading(false);
      return;
    }

    try {
      let imageUrl: string | null = image;

      // If image was removed (previewUrl is null but there was an image before)
      if (previewUrl === null && image !== null) {
        imageUrl = null;
      }
      // Upload image if a new one is selected
      else if (selectedImage) {
        const formData = new FormData();
        formData.append("image", selectedImage);

        const uploadResponse = await fetch("/api/upload-profile-image", {
          method: "POST",
          body: formData,
        });

        if (!uploadResponse.ok) {
          const errorData = await uploadResponse.json();
          throw new Error(
            errorData.error || "Erreur lors de l'upload de l'image",
          );
        }

        const { imageUrl: uploadedUrl } = await uploadResponse.json();
        imageUrl = uploadedUrl;
      }

      // Update user profile
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
            setError(
              error.error?.message || "Erreur lors de la mise à jour du profil",
            );
          },
        },
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Erreur lors de la mise à jour du profil",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleUpdateProfile}
      className="flex flex-col max-h-[85vh] overflow-hidden bg-white rounded-xl w-full max-w-3xl shadow-2xl shadow-gray-600/50"
    >
      {/** Header */}
      <div className="py-5 px-8 border-b border-b-gray-500">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-bold text-blue-950">
            Modifier votre profil
          </h2>
        </div>
        <p className="text-sm text-gray-500">{email}</p>
      </div>

      {/** Form Body */}
      <div className="scrollbar flex-1 p-8 overflow-y-auto">
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-600 text-sm">
            {error}
          </div>
        )}

        {/** Profile Image Upload */}
        <div className="mb-8 px-5">
          <label className="block text-sm font-semibold text-gray-800 mb-3">
            Photo de profil
          </label>
          <div className="flex items-center gap-6">
            <div className="relative">
              {previewUrl ? (
                <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-gray-300">
                  <Image
                    src={previewUrl}
                    alt="Profile"
                    fill
                    className="object-cover"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute top-0 right-0 p-1 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
                    title="Supprimer l'image"
                  >
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <div className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl font-bold border-2 border-gray-300">
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
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Camera size={18} />
                <span className="text-sm font-medium">
                  {previewUrl ? "Changer l'image" : "Choisir une image"}
                </span>
              </label>
              <p className="text-xs text-gray-500 mt-2">
                Formats acceptés: JPG, PNG, GIF (max 5MB)
              </p>
            </div>
          </div>
        </div>

        {/** Informations de base */}
        <div className="mb-5 px-5">
          <label className="block text-sm font-semibold text-gray-800 mb-2">
            Nom <span className="text-red-600 font-black">*</span>
          </label>
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="w-full text-sm py-1.5 px-3.5 text-gray-800 rounded-sm border border-gray-400 transition-all placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Votre nom"
            required
            disabled={loading}
          />
        </div>

        {/** Email (read-only) */}
        <div className="mb-5 px-5">
          <label className="block text-sm font-semibold text-gray-800 mb-2">
            Email
          </label>
          <input
            type="email"
            value={email}
            className="w-full text-sm py-1.5 px-3.5 text-gray-500 rounded-sm border border-gray-300 bg-gray-50 cursor-not-allowed"
            disabled
            readOnly
          />
          <p className="text-xs text-gray-500 mt-1">
            L&apos;email ne peut pas être modifié
          </p>
        </div>
      </div>

      {/** Footer */}
      <div className="flex justify-end py-4 px-16 gap-6 border-t border-t-gray-600">
        <Link href="/profil">
          <NavButton text="Annuler" principal />
        </Link>
        <button
          type="submit"
          disabled={
            loading || !newName.trim() || (newName === name && !selectedImage)
          }
          className={`relative flex items-center justify-center gap-1 whitespace-nowrap text-xs font-bold cursor-pointer transition-all rounded-lg active:translate-y-0.5
                text-white tracking-wide py-0.5 px-2 bg-blue-600 hover:bg-blue-700 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0`}
        >
          {loading ? "Mise à jour..." : "Mettre à jour le profil"}
        </button>
      </div>
    </form>
  );
}
