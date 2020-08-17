import shell from 'shelljs';

shell.exec('prettier --write "src/**/*.ts" "src/**/*.tsx" "__tests__/**/*.ts" "eng/**/*.ts" "eng/**/*.js"');
