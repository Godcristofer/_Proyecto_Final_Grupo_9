
'use server';

import { connectorConfig, listUsers } from '@/dataconnect/sdk';
import { getDataConnect } from 'firebase/data-connect';

interface CreateUserInput {
    id: string;
    email: string;
    name: string | null;
}

export const createUser = async (userData: CreateUserInput) => {
    try {
        console.log('User created in Firebase Auth, skipping Data Connect insert for now.', userData);
        return { success: true };

    } catch (err) {
        console.error('An unexpected error occurred while creating user:', err);
        throw err;
    }
};

export const getUsers = async () => {
    try {
        if (!process.env.FIREBASE_PRIVATE_KEY) {
            console.log("DataConnect SDK not initialized, returning empty array.");
            return [];
        }
        const dc = getDataConnect(connectorConfig);
        const { data } = await listUsers(dc);
        return data.userss;
    } catch (error) {
        console.error('Error fetching users:', error);
        return [];
    }
};
