export default {
    app: {
        name: process.env.APP_NAME,
        version: process.env.APP_VERSION,
    },
    jwt: {
        secret: process.env.JWT_SECRET,
    },
    cloudinary: {
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    },
    mail: {
        host: process.env.MAIL_HOST as string,
        port: parseInt(process.env.MAIL_PORT) ,
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
        defaultFrom: process.env.MAIL_DEFAULT_FROM,
    },
    allowedOrigins: process.env.ALLOWED_ORIGINS?.split(","),
};