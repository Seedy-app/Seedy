import Config from "../config/Config";

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
    return { error: t("network_error") };
  }
};

export const checkEmailAvailability = async (t, email, ignore_user_id = null) => {
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
    return { error: t("network_error") };
  }
};