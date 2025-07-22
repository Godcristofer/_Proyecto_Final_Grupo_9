
'use server';

import { 
  connectorConfig, 
  createUser as createUserMutation, 
  listUsers,
  getUserById as getUserByIdQuery,
  updateUserRole as updateUserRoleMutation
} from '@firebasegen/default-2-connector';
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
            role: 'user', // Asignar rol por defecto
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
            role: user.role,
            createdAt: user.createdAt,
            dni: user.dni,
            phone: user.phone
        }));
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        return [];
    }
};

export const getUserById = async (id: string) => {
    try {
        const app = getFirebaseApp();
        const dataConnect = getDataConnect(connectorConfig, { app });
        const { data } = await getUserByIdQuery(dataConnect, { id });

        if (!data || !data.users) {
            return null;
        }
        return data.users;
    } catch (error) {
        console.error(`Error al obtener usuario con id ${id}:`, error);
        return null;
    }
}

export const updateUserRole = async (id: string, role: string) => {
    try {
        const app = getFirebaseApp();
        const dataConnect = getDataConnect(connectorConfig, { app });
        await updateUserRoleMutation(dataConnect, { id, role });
        return { success: true };
    } catch (error) {
        console.error(`Error al actualizar el rol del usuario ${id}:`, error);
        return { success: false };
    }
}
