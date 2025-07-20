
'use server';

// import { connectorConfig, CreateUser } from '@/dataconnect/sdk';
// import { getDataConnect } from 'firebase/data-connect';


interface CreateUserInput {
    id: string;
    email: string;
    name: string | null;
}

export const createUser = async (userData: CreateUserInput) => {
    try {
        console.warn("La llamada a Data Connect para crear usuario está desactivada temporalmente para resolver problemas de compilación.");
        // const dataConnect = getDataConnect(connectorConfig);
        // await CreateUser(dataConnect, { 
        //     id: userData.id,
        //     email: userData.email,
        //     name: userData.name,
        //  });
        return { success: true };

    } catch (err) {
        console.error('Ocurrió un error inesperado al crear el usuario:', err);
        throw err;
    }
};

export const getUsers = async () => {
    try {
        console.warn("La llamada a Data Connect para obtener usuarios está desactivada temporalmente para resolver problemas de compilación.");
        return [];
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        return [];
    }
};
