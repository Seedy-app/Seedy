import Config from "../config/Config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n from "i18next";
import * as Sentry from "@sentry/react-native";

export const checkUsernameAvailability = async (
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
      return { error: i18n.t("username_already_exists_error") };
    } else {
      return { error: "" };
    }
  } catch (error) {
    Sentry.captureException(error);
    console.error("Error:", error.message);
    return { error: i18n.t("network_error") };
  }
};

export const checkEmailAvailability = async (email, ignore_user_id = null) => {
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
      return { error: i18n.t("email_already_exists_error") };
    } else {
      return { error: "" };
    }
  } catch (error) {
    Sentry.captureException(error);
    console.error("Error:", error.message);
    return { error: i18n.t("network_error") };
  }
};

// Community

export const changeCommunityPicture = async (community_id, picture) => {
  try {
    const token = await AsyncStorage.getItem("userToken");

    const response = await fetch(
      `${Config.API_URL}/communities/${community_id}/change-image`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          picture,
        }),
      }
    );
    if (!response.ok) {
      console.info(response);
      return false;
    } else {
      return true;
    }
  } catch (error) {
    Sentry.captureException(error);
    console.error("Error:", error.message);
    return { error: i18n.t("network_error") };
  }
};

export const createCommunity = async (name, description, picture) => {
  try {
    const token = await AsyncStorage.getItem("userToken");

    const response = await fetch(`${Config.API_URL}/communities/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        description,
        picture,
      }),
    });
    if (!response.ok) {
      console.info(response);
      return null;
    } else {
      const responseData = await response.json();
      return responseData.id;
    }
  } catch (error) {
    Sentry.captureException(error);
    console.error("Error:", error.message);
    return { error: i18n.t("network_error") };
  }
};

export const editCommunity = async (
  name,
  description,
  community_id,
  imageUrl = null
) => {
  try {
    const token = await AsyncStorage.getItem("userToken");

    const response = await fetch(
      `${Config.API_URL}/communities/${community_id}/edit`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          description,
          imageUrl,
        }),
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok: " + response.statusText);
    } else {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    Sentry.captureException(error);
    console.error("Error:", error.message);
    return null;
  }
};

export const getUserCommunityRole = async (user_id, community_id) => {
  try {
    const token = await AsyncStorage.getItem("userToken");

    const response = await fetch(
      `${Config.API_URL}/communities/${community_id}/user/${user_id}/role`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 404) {
      return null;
    }
    if (!response.ok) {
      console.info(response);
      return null;
    } else {
      const responseData = await response.json();
      return responseData;
    }
  } catch (error) {
    Sentry.captureException(error);
    console.error("Error:", error.message);
    return null;
  }
};

export const giveUserCommunityRole = async (
  user_id,
  community_id,
  role_name
) => {
  try {
    const token = await AsyncStorage.getItem("userToken");

    const response = await fetch(
      `${Config.API_URL}/communities/${community_id}/give-role-to-user`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          user_id,
          role_name,
        }),
      }
    );
    if (!response.ok) {
      console.info(response);
      return false;
    } else {
      return true;
    }
  } catch (error) {
    Sentry.captureException(error);
    console.error("Error:", error.message);
    return false;
  }
};

export const checkCommunityNameAvailability = async (
  name,
  ignore_community_id = null
) => {
  try {
    const token = await AsyncStorage.getItem("userToken");

    const requestBody = { name };
    if (ignore_community_id) {
      requestBody.ignore_community_id = ignore_community_id;
    }
    const response = await fetch(Config.API_URL + "/communities/check-name", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify(requestBody),
    });
    if (response.status === 409) {
      return { error: i18n.t("community_name_already_exists_error") };
    } else {
      return { error: "" };
    }
  } catch (error) {
    Sentry.captureException(error);
    console.error("Error checking community name:", error.message);
    return { error: i18n.t("network_error") };
  }
};

// Image

export const uploadPictureToServer = async (filename, filepath, imageUri) => {
  const token = await AsyncStorage.getItem("userToken");
  const folderName = filepath;
  
  const formData = new FormData();
  formData.append("image", {
    uri: imageUri,
    name: `${filename}.jpg`,
    type: "image/jpeg",
  });
  try {

    const response = await fetch(
      `${Config.API_URL}/image/upload/${folderName}`,
      {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      return { error: "Failed to upload image." };
    } else {
      const responseData = await response.json();

      return responseData.imageUrl;
    }
  } catch (error) {
    Sentry.captureException(error);
    console.error("Error uploading image:", error.message);
    return { error: i18n.t("network_error") };
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
    Sentry.captureException(error);
    console.error("Error:", error.message);
    return { error: i18n.t("network_error") };
  }
  return null;
};

export const checkCategoryNameAvailability = async (
  name,
  community_id,
  ignore_category_id = null
) => {
  try {
    const token = await AsyncStorage.getItem("userToken");

    const requestBody = { name };
    if (ignore_category_id) {
      requestBody.ignore_category_id = ignore_category_id;
    }
    const response = await fetch(
      Config.API_URL + `/communities/${community_id}/categories/check-name`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify(requestBody),
      }
    );
    if (response.status === 409) {
      return { error: i18n.t("category_name_already_exists_error") };
    } else {
      return { error: "" };
    }
  } catch (error) {
    Sentry.captureException(error);
    console.error("Error checking category name:", error.message);
    return { error: i18n.t("network_error") };
  }
};

export const createCommunityCategory = async (
  community_id,
  name,
  description
) => {
  try {
    const token = await AsyncStorage.getItem("userToken");

    const response = await fetch(
      `${Config.API_URL}/communities/${community_id}/category/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          description,
        }),
      }
    );
    if (!response.ok) {
      console.info(response);
      return false;
    } else {
      return true;
    }
  } catch (error) {
    Sentry.captureException(error);
    console.error("Error:", error.message);
    return false;
  }
};

export const getCommunityCategories = async (
  community_id,
  page = 0,
  limit = 0
) => {
  try {
    const token = await AsyncStorage.getItem("userToken");

    const response = await fetch(
      `${Config.API_URL}/communities/${community_id}/categories`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          limit,
          page,
        }),
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok: " + response.statusText);
    } else {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    Sentry.captureException(error);
    console.error("Error:", error.message);
    return null;
  }
};

export const createPost = async (title, body, category_id) => {
  try {
    const token = await AsyncStorage.getItem("userToken");

    const response = await fetch(
      `${Config.API_URL}/communities/categories/${category_id}/posts/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          body,
        }),
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok: " + response.statusText);
    } else {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    Sentry.captureException(error);
    console.error("Error:", error.message);
    return null;
  }
};

export const editPost = async (title, content, category_id, post_id) => {
  try {
    const token = await AsyncStorage.getItem("userToken");

    const response = await fetch(
      `${Config.API_URL}/communities/posts/${post_id}/edit`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          content,
          category_id,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok: " + response.statusText);
    } else {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    Sentry.captureException(error);
    console.error("Error:", error.message);
    return null;
  }
};

export const deletePost = async (post_id) => {
  try {
    const token = await AsyncStorage.getItem("userToken");

    const response = await fetch(
      `${Config.API_URL}/communities/posts/${post_id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      console.error("Network response was not ok: " + response.statusText);
      return false;
    } else {
      return true;
    }
  } catch (error) {
    Sentry.captureException(error);
    console.error("Error:", error.message);
    return false;
  }
};

export const deleteUserFromCommunity = async (community_id, user_id = null) => {
  try {
    const token = await AsyncStorage.getItem("userToken");

    const fetchConfig = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    if (user_id !== null) {
      fetchConfig.body = JSON.stringify({ user_id });
    }
    const response = await fetch(
      `${Config.API_URL}/communities/${community_id}/user`,
      fetchConfig
    );
    if (!response.ok) {
      console.error("Network response was not ok: " + response.statusText);
      return false;
    } else {
      return true;
    }
  } catch (error) {
    Sentry.captureException(error);
    console.error("Error:", error.message);
    return false;
  }
};

export const getCommunityPosts = async (
  community_id,
  category_id = null,
  page = 1,
  limit = 5
) => {
  try {
    const token = await AsyncStorage.getItem("userToken");

    let requestBody = {
      limit,
      page,
    };

    if (category_id) {
      requestBody.category_id = category_id;
    }

    const response = await fetch(
      `${Config.API_URL}/communities/${community_id}/posts`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      }
    );

    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      throw new Error("Network response was not ok: " + response.statusText);
    } else {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    Sentry.captureException(error);
    console.error("Error:", error.message);
    return null;
  }
};

export const createCategory = async (name, description, community_id) => {
  try {
    const token = await AsyncStorage.getItem("userToken");

    const response = await fetch(
      `${Config.API_URL}/communities/${community_id}/category/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          description,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok: " + response.statusText);
    } else {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    Sentry.captureException(error);
    console.error("Error:", error.message);
    return null;
  }
};

export const migratePostsToCategory = async (
  from_category_id,
  to_category_id
) => {
  try {
    const token = await AsyncStorage.getItem("userToken");

    const response = await fetch(
      `${Config.API_URL}/communities/category/posts/migrate`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          from_category_id,
          to_category_id,
        }),
      }
    );

    if (!response.ok) {
      console.error("Network response was not ok: " + response.statusText);
      return false;
    } else {
      return true;
    }
  } catch (error) {
    Sentry.captureException(error);
    console.error("Error:", error.message);
    return false;
  }
};
export const deleteCategory = async (category_id) => {
  try {
    const token = await AsyncStorage.getItem("userToken");

    const response = await fetch(
      `${Config.API_URL}/communities/category/${category_id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      console.error("Network response was not ok: " + response.statusText);
      return false;
    } else {
      return true;
    }
  } catch (error) {
    Sentry.captureException(error);
    console.error("Error:", error.message);
    return false;
  }
};

export const editCategory = async (name, description, category_id) => {
  try {
    const token = await AsyncStorage.getItem("userToken");

    const response = await fetch(
      `${Config.API_URL}/communities/category/${category_id}/edit`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          description,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok: " + response.statusText);
    } else {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    Sentry.captureException(error);
    console.error("Error:", error.message);
    return null;
  }
};

export const identifyPlant = async (photo_url) => {
  try {
    const token = await AsyncStorage.getItem("userToken");

    const response = await fetch(`${Config.API_URL}/plant/identify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        photo_url: Config.API_URL + photo_url,
        lang: i18n.language,
      }),
    });
    if (!response.ok) {
      return null;
    } else {
      const results = await response.json();
      return results;
    }
  } catch (error) {
    Sentry.captureException(error);
    console.error("Error:", error.message);
    return { error: i18n.t("network_error") };
  }
};

export const firstOrCreatePlant = async (plant) => {
  try {
    const token = await AsyncStorage.getItem("userToken");

    const response = await fetch(`${Config.API_URL}/plant/firstOrCreate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        scientific_name: plant.species.scientificNameWithoutAuthor,
        family: plant.species.family.scientificNameWithoutAuthor,
        images: JSON.stringify(plant.images.map((image) => image.url.o)),
        ...(plant.species.commonNames && {
          common_names: plant.species.commonNames,
        }),
      }),
    });
    if (!response.ok) {
      console.info(response);
      return null;
    } else {
      const data = await response.json();
      return data.id;
    }
  } catch (error) {
    Sentry.captureException(error);
    console.error("Error:", error.message);
    return { error: i18n.t("network_error") };
  }
};

export const associatePlantToUser = async (plant_id) => {
  try {
    const token = await AsyncStorage.getItem("userToken");

    const response = await fetch(`${Config.API_URL}/plant/associate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ plant_id }),
    });

    if (response.status === 201) {
      return 1; // Creado exitosamente
    } else if (response.status === 200) {
      return 0; // Ya existe
    } else {
      return -1;
    }
  } catch (error) {
    Sentry.captureException(error);
    console.error("Error:", error.message);
    return { error: i18n.t("network_error") };
  }
};

export const isPlantAssociatedWithMe = async (plant_id) => {
  try {
    const token = await AsyncStorage.getItem("userToken");

    const response = await fetch(
      `${Config.API_URL}/plant/${plant_id}/isAssociated`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      console.info(response);
      return false;
    } else {
      const data = await response.json();
      if (data.associated) {
        return true;
      } else {
        return false;
      }
    }
  } catch (error) {
    Sentry.captureException(error);
    console.error("Error:", error.message);
    return { error: i18n.t("network_error"), associated: false };
  }
};
export const getPlants = async () => {
  try {
    const token = await AsyncStorage.getItem("userToken");

    const response = await fetch(`${Config.API_URL}/plant`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      console.info(response);
      return null;
    } else {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    Sentry.captureException(error);
    console.error("Error:", error.message);
    return { error: i18n.t("network_error"), associated: false };
  }
};

export const createComment = async (content, post_id) => {
  try {
    const token = await AsyncStorage.getItem("userToken");

    const response = await fetch(
      `${Config.API_URL}/communities/posts/${post_id}/comments/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          content,
        }),
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok: " + response.statusText);
    } else {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    Sentry.captureException(error);
    console.error("Error:", error.message);
    return null;
  }
};

export const reactComment = async (comment_id, button_pressed) => {
  try {
    const token = await AsyncStorage.getItem("userToken");

    const response = await fetch(
      `${Config.API_URL}/communities/posts/comments/${comment_id}/react`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          type: button_pressed,
        }),
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok: " + response.statusText);
    } else {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    Sentry.captureException(error);
    console.error("Error:", error.message);
    return null;
  }
};

export const deleteComment = async (comment_id) => {
  try {
    const token = await AsyncStorage.getItem("userToken");

    const response = await fetch(
      `${Config.API_URL}/communities/posts/comments/${comment_id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      console.error("Network response was not ok: " + response.statusText);
      return false;
    } else {
      return true;
    }
  } catch (error) {
    Sentry.captureException(error);
    console.error("Error:", error.message);
    return false;
  }
};

export const getPostContentById = async (post_id) => {
  try {
    const token = await AsyncStorage.getItem("userToken");

    const response = await fetch(
      `${Config.API_URL}/communities/posts/${post_id}/content`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      console.info(response);
      return null;
    } else {
      const responseData = await response.json();
      return responseData;
    }
  } catch (error) {
    Sentry.captureException(error);
    console.error("Error:", error.message);
    return null;
  }
};

export const reactPost = async (post_id, button_pressed) => {
  try {
    const token = await AsyncStorage.getItem("userToken");

    const response = await fetch(
      `${Config.API_URL}/communities/posts/${post_id}/react`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          type: button_pressed,
        }),
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok: " + response.statusText);
    } else {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    Sentry.captureException(error);
    console.error("Error:", error.message);
    return null;
  }
};
