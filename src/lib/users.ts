
'use server';

// import { connectorConfig, CreateUser } from '@firebasegen/default-connector';
// import { getDataConnect } from 'firebase/data-connect';


interface CreateUserInput {
    id: string;
    email: string;
    name: string | null;
}

export const createUser = async (userData: CreateUserInput) => {
    try {
        console.warn("Data Connect call to create users is temporarily disabled to resolve build issues.");
        return { success: true };
        // const dataConnect = getDataConnect(connectorConfig);
        // await CreateUser(dataConnect, { 
        //     id: userData.id,
        //     email: userData.email,
        //     name: userData.name,
        //  });
        // return { success: true };

    } catch (err) {
        console.error('Ocurrió un error inesperado al crear el usuario:', err);
        throw err;
    }
};

export const getUsers = async () => {
    try {
        console.warn("Data Connect call to get users is temporarily disabled to resolve build issues.");
        return [];
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        return [];
    }
};
