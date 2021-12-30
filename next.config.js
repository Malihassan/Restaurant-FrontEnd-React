/**
 * @type {import('next').NextConfig}
 */
 const nextConfig = {
    /* config options here */
    api: {
        bodyParser: {
            externalResolver: true,
          },
      }, 
    reactStrictMode: true,  
    env: {
        REACT_APP_GOOGLE_CLIENT_ID: '413684897547-2joj0mh2sien6if3m6jp3qsjuojce9v4.apps.googleusercontent.com',
    },     
  }
  
  module.exports = nextConfig
