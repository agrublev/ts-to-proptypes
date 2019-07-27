module.exports = {
    presets: [
        [
            "@babel/preset-env",
            {
                modules: "commonjs",
                targets: {
                    node: "current"
                }
            }
        ]
    ],
    plugins: [
        // ["@babel/plugin-syntax-class-properties"],
        // [
        //     "@babel/plugin-proposal-class-properties",
        //     {
        //         loose: true
        //     }
        // ]
        // "@babel/plugin-transform-runtime"
    ]
};
