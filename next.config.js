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
        REACT_APP_GOOGLE_CLIENT_ID: process.env.REACT_APP_GOOGLE_CLIENT_ID,
    },     
  }
  
  module.exports = nextConfig
