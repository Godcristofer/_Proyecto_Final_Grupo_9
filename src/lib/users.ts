
'use server';

import { connectorConfig, CreateUser } from '@firebasegen/default-2-connector';
import { getDataConnect } from 'firebase/data-connect';


interface CreateUserInput {
    id: string;
    email: string;
    name: string | null;
    dni?: string | null;
    phone?: string | null;
}

export const createUser = async (userData: CreateUserInput) => {
    try {
        const dataConnect = getDataConnect(connectorConfig);
        await CreateUser(dataConnect, { 
            id: userData.id,
            email: userData.email,
            name: userData.name,
            dni: userData.dni,
            phone: userData.phone,
         });
        return { success: true };

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
