import Config from '../config/Config';

export const checkUsernameAvailability = async (t, username, ignore_username_id = null) => {
  try {
    const requestBody = { username };
    if (ignore_username_id) {
        requestBody.ignore_username_id = ignore_username_id;
    }
    const response = await fetch(Config.API_URL + "/check-username", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      
      body: JSON.stringify(requestBody),
    });
    const data = await response.json();
    if (response.status === 409) {
      return { error: t("username_already_exists_error") };
    } else {
      return { error: "" };
    }
  } catch (error) {
    return { error: t("network_error") };
  }
};
