module.exports = {
    extends: [
        '@scandipwa',
    ],
    parserOptions: {
        sourceType: 'module',
        tsconfigRootDir: __dirname,
        project: './tsconfig.json',
        requireConfigFile: false,
        babelOptions: {
            parserOpts: {
                plugins: ['jsx'],
            },
        },
    },
    plugins: ['simple-import-sort', 'import'],
    rules: {
        '@typescript-eslint/object-curly-spacing': 'off',
        'simple-import-sort/imports': 'error',
        'simple-import-sort/exports': 'error',
        // TODO: disable or enable rules here
    },
};
