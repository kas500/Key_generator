module.exports = {
    apps: [
        {
            name: 'key_generator', 
            script: 'node_modules/next/dist/bin/next', 
            args: 'start -p 3003', 
            env: {
                NODE_ENV: 'production',
            },
        },
    ],
};
