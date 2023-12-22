/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'www.gravatar.com',
                port: '',
            },
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '5000'
            },
        ],
    },
}

module.exports = nextConfig
