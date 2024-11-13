"use client";

import { createClient } from "@/utils/supabase/client";

export type ImageData = {
  url: string;
  path: string;
};

const supabase = createClient();

export const uploadImage = async (
  file: File,
  path: string
): Promise<ImageData | null> => {
  const fileExt = file.name.split(".").pop();
  const fileName = `${Math.random()}.${fileExt}`;
  const filePath = `${path}/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from("images")
    .upload(filePath, file);

  if (uploadError) {
    console.error("Error uploading image:", uploadError);
    return null;
  }

  const { data } = supabase.storage.from("images").getPublicUrl(filePath);
  return { url: data.publicUrl, path: filePath };
};

export async function deleteParkingImage(parkingImageId: string) {
  try {
    const response = await fetch("/api/parking-image", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ parkingImageId }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error:", errorData.message);
      return;
    }

    const data = await response.json();
    console.log("Success:", data.message, data.deletedImage);
  } catch (error) {
    console.error("Request failed:", error);
  }
}

export const deleteImage = async (path: string) => {
  //   console.log(path);
  const { error, data } = await supabase.storage.from("images").remove([path]);
  if (error) {
    console.error("Error deleting image:", error);
    return false;
  }

  //   console.log(data);

  return true;
};

export const getPublicUrl = (path: string) => {
  const publicUrl = supabase.storage.from("images").getPublicUrl(path);

  return publicUrl;
};
