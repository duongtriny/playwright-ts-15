import { configDotenv } from 'dotenv';

export function getEnv(name: string) {
    let currentEnv = process.env.TEST_ENV;
    if (!currentEnv) {
        currentEnv = 'local';
    }
    configDotenv({
        path: `env/.env.${currentEnv}`
    });
    return process.env[name];
}