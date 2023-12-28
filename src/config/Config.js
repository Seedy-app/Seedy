const Config = {
  BASE_URL: "https://seedy.com.ar", // AWS
  PASSWORD_REGEX:
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
  EMAIL_REGEX: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
};

// Config.API_URL = `${Config.BASE_URL}/api`;
Config.API_URL = `http://192.168.0.242:3000`;

export default Config;
