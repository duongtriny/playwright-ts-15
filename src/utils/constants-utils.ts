import { getEnv } from "./config-utils";

export const adminUsername = getEnv('ADMIN_USERNAME');
export const adminPassword = getEnv('ADMIN_PASSWORD');
export const host = getEnv('HOST');
export const port = getEnv('PORT');
export const adminLoginPath = '/admin/login';
export const adminBaseUrl = `${host}:${port}${adminLoginPath}`;
export const apiBaseUrl = `${host}:${port}`;