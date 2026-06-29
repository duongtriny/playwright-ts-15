import { configDotenv } from 'dotenv';

let currentEnv = process.env.TEST_ENV;
if (!currentEnv) {
    currentEnv = 'local';
}
configDotenv({
    path: `env/.env.${currentEnv}`
});

export function getEnv(name: string) {
    return process.env[name];
}