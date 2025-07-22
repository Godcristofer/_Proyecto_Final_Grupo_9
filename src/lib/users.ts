
'use server';

import { connectorConfig, createUser as createUserMutation, listUsers } from '@firebasegen/default-2-connector';
import { getDataConnect } from 'firebase/data-connect';
import { getFirebaseApp } from './firebase';


interface CreateUserInput {
    id: string;
    email: string;
    name: string | null;
    dni?: string | null;
    phone?: string | null;
}

export const createUser = async (userData: CreateUserInput) => {
    try {
        const app = getFirebaseApp();
        const dataConnect = getDataConnect(connectorConfig, { app });
        await createUserMutation(dataConnect, {
            id: userData.id,
            email: userData.email,
            name: userData.name,
            dni: userData.dni || null,
            phone: userData.phone || null,
         });
        return { success: true };

    } catch (err) {
        console.error('Ocurrió un error inesperado al crear el usuario:', err);
        throw err;
    }
};

export const getUsers = async () => {
    try {
        const app = getFirebaseApp();
        const dataConnect = getDataConnect(connectorConfig, { app });
        const { data } = await listUsers(dataConnect);

        if (!data || !data.userss) {
            return [];
        }
        return data.userss.map(user => ({
            id: user.id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt,
            dni: user.dni,
            phone: user.phone
        }));
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        return [];
    }
};

