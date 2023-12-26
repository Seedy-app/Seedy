const Config = {
    // API_URL: "http://192.168.0.242:3000", //THIS PC
    API_URL: "https://seedy.com.ar/api", //AWS
    PASSWORD_REGEX: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
    EMAIL_REGEX: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
};

export default Config;
