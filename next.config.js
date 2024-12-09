module.exports = {
    async redirects() {
        return [
            {
                source: '/dashboard',
                has: [
                    {
                        type: 'query',
                        key: 'callbackUrl',
                    },
                ],
                destination: '/dashboard/stok',
                permanent: false,
            },
        ];
    },
    eslint: {
      ignoreDuringBuilds: true,
    },
  };
  