const Config = {
    PLANTNET_API_KEY: "2b10A7b7wWgbxv7KpGc8z7TP",
    API_URL: "http://192.168.0.242:3000", //THIS PC
   // API_URL: "http://ec2-54-233-222-223.sa-east-1.compute.amazonaws.com:3000", //AWS
    PASSWORD_REGEX: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
    EMAIL_REGEX: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
};

export default Config;
