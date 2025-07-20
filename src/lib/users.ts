
'use server';

import { createUser as createUserMutation } from '@firebasegen/default-connector';

interface CreateUserInput {
    id: string;
    email: string;
    name: string | null;
}

export const createUser = async (userData: CreateUserInput) => {
    try {
        const { data, error } = await createUserMutation({
            id: userData.id,
            email: userData.email,
            name: userData.name
        });

        if (error) {
            console.error('Error creating user in DB:', error);
            throw new Error(error.message);
        }

        return data;
    } catch (err) {
        console.error('An unexpected error occurred while creating user:', err);
        throw err;
    }
};
