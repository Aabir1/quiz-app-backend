let configurations = {};


configurations.APPLICATION_TOKEN = '614e3577b0bdeb211931bf0d';

configurations.APP = {
    ENV: "dev",
    PORT: "3030",
    BASE_PATH: '/v1/',
    NODE_APP_VERSION: '1',
}

configurations.DATABASE = {
    url: 'mongodb://localhost/quiz',
    username: '',
    password: ''
}

module.exports = configurations;