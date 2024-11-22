export const handleProfilePictureUpload = async (file) => {
  const CLOUDINARY_CLOUD_NAME = "dvp4wikev";
  const UPLOAD_PRESET = "bnb_character_image_preset";

  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);
    // formData.append("folder", "bnbCharacterImages"); // Try commenting this out initially

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (!data.secure_url) {
      throw new Error("No image URL received from Cloudinary");
    }

    return data.secure_url;
  } catch (error) {
    throw error;
  }
};
