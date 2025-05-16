import axios from "axios";

export const imageUploaded = async (imageData, setUploading, setValue) => {
  setUploading(true);
  const formData = new FormData();
  formData.append("image", imageData);

  try {
    const res = await axios.post(
      `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_IMAGEBB_API_KEY
      }`,
      formData
    );

    if (res.data.success) {
      const imageUrl = res.data.data.url;
      setValue("photoURL", imageUrl);
      return imageUrl;
    } else {
      console.error("Image upload failed:", res.data);
    }
  } catch (error) {
    console.error("Error uploading image:", error);
  } finally {
    setUploading(false);
  }
};
