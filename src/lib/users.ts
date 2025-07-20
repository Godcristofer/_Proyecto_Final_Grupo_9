
'use server';

// import { CreateUser } from '@/dataconnect/sdk';

interface CreateUserInput {
    id: string;
    email: string;
    name: string | null;
}

export const createUser = async (userData: CreateUserInput) => {
    try {
        // The Data Connect mutation is temporarily commented out to resolve build issues.
        // User creation in Firebase Auth will still work.
        /*
        const { data, error } = await CreateUser({
            id: userData.id,
            email: userData.email,
            name: userData.name
        });

        if (error) {
            console.error('Error creating user in DB:', error);
            throw new Error(error.message);
        }

        return data;
        */

        console.log('User created in Firebase Auth, skipping Data Connect insert for now.', userData);
        return { success: true };

    } catch (err) {
        console.error('An unexpected error occurred while creating user:', err);
        throw err;
    }
};
