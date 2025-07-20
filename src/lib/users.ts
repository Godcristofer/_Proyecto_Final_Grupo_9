
'use server';

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
        console.warn("Data Connect call for getUsers is temporarily disabled to resolve build issues.");
        return [];
    } catch (error) {
        console.error('Error fetching users:', error);
        return [];
    }
};
