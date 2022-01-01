/**
 * sampl_env.js is a sample file from which
 * you can create env.js file which will contains
 * all application configurations depends on the environment.
 *
 * env.js file is similar to .env file.
 *
 * @author Aabir Hussain <aabir.hussain1@gmail.com>
 */
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