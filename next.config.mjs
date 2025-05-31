/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
        return [
            {
                source: '/:path*',
                headers: [
                    { key: 'Access-Control-Allow-Origin', value: '*' }
                ],
            },
        ]
    },
    // Разрешаем доступ с локальной сети
    allowedDevOrigins: ['192.168.8.109'],
};

export default nextConfig;
