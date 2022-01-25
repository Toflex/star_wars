require('dotenv').config();

export = {
    HOST: process.env.HOST,
    PORT: process.env.PORT || 3000,
    
    
    DBUSER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_NAME: process.env.DB_NAME,
    DB_HOST: process.env.DB_HOST,
    DIALECT: process.env.DB_DRIVER,

    DEBUG: process.env.DEBUG as string
};
