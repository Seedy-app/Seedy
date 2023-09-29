import Config from "../config/Config";

// User

export const checkUsernameAvailability = async (
  t,
  username,
  ignore_user_id = null
) => {
  try {
    const requestBody = { username };
    if (ignore_user_id) {
      requestBody.ignore_user_id = ignore_user_id;
    }
    const response = await fetch(Config.API_URL + "/check-username", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(requestBody),
    });
    if (response.status === 409) {
      return { error: t("username_already_exists_error") };
    } else {
      return { error: "" };
    }
  } catch (error) {
    console.error("Error:", error.message);
    return { error: t("network_error") };
  }
};

export const checkEmailAvailability = async (
  t,
  email,
  ignore_user_id = null
) => {
  try {
    const requestBody = { email };
    if (ignore_user_id) {
      requestBody.ignore_user_id = ignore_user_id;
    }
    const response = await fetch(Config.API_URL + "/check-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });
    if (response.status === 409) {
      return { error: t("email_already_exists_error") };
    } else {
      return { error: "" };
    }
  } catch (error) {
    console.error("Error:", error.message);
    return { error: t("network_error") };
  }
};

// Community

export const changeCommunityPicture = async (communityId, picture) => {
  try {
    const response = await fetch(`${Config.API_URL}/communities/${communityId}/change-image`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        picture,
      }),
    });
    if (!response.ok) {
      console.info(response);
      return false;
    }else{
      return true;
    }
  } catch (error) {
    console.error("Error:", error.message);
    return { error: t("network_error") };
  }
};

export const createCommunity = async (name, description, picture) => {
  try {
    const response = await fetch(`${Config.API_URL}/communities/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        description,
        picture
      }),
    });
    if (!response.ok) {
      console.info(response);
      return null;
    }else{
      const responseData = await response.json();
      return responseData.id;
    }
  } catch (error) {
    console.error("Error:", error.message);
    return { error: t("network_error") };
  }
};

export const checkCommunityNameAvailability = async (
  t,
  name,
  ignore_community_id = null
) => {
  try {
    const requestBody = { name };
    if (ignore_community_id) {
      requestBody.ignore_community_id = ignore_community_id;
    }
    const response = await fetch(Config.API_URL + "/communities/check-name", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(requestBody),
    });
    if (response.status === 409) {
      return { error: t("community_name_already_exists_error") };
    } else {
      console.log(response.status);
      return { error: "" };
    }
  } catch (error) {
    console.error("Error checking community name:", error.message);
    return { error: t("network_error") };
  }
};

// Image

export const uploadPictureToServer = async (filename, filepath, imageUri) => {
  const folderName = filepath;

  const formData = new FormData();
  formData.append("image", {
    uri: imageUri,
    name: `${filename}.jpg`,
    type: "image/jpeg",
  });

  try {
    const response = await fetch(
      `${Config.API_URL}/image/upload/${encodeURIComponent(folderName)}`,
      {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message || "Failed to upload image.");
    }
    return responseData.imageUrl;
  } catch (error) {
    console.error("Error uploading image:", error.message);
    return { error: t("network_error") };
  }
};

export const getRandomPicture = async (type) => {
  try {
    const image_response = await fetch(
      Config.API_URL + "/image/random-filepath",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type,
        }),
      }
    );
    if (image_response.ok) {
      const imageData = await image_response.json();
      const randomFilePath = imageData.randomFilePath;
      return randomFilePath;
    }
  } catch (error) {
    console.error("Error:", error.message);
    return { error: t("network_error") };
  }
  return null;
};
