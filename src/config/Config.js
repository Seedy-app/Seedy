const Config = {
    API_URL: "http://192.168.1.47:3000", //THIS PC
    //API_URL: "http://ec2-18-228-170-49.sa-east-1.compute.amazonaws.com:3000", //AWS
    PASSWORD_REGEX: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
    EMAIL_REGEX: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
};

export default Config;
