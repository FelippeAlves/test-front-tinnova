'use client';

import { useEffect, useState } from 'react';
import { fetchUsers } from '@/services/userService';
import { getUsersFromStorage, saveUsersToStorage } from '@/storage/userStorage';
import { maskCPF } from '@/utils/maskCPF';
import { maskPhone } from '@/utils/maskPhone';
import { UserList } from '@/types/UserList';
import { Pencil, Trash2 } from 'lucide-react';

export default function ClientList() {
    const [users, setUsers] = useState<UserList>([]);

    useEffect(() => {
        const localUsers = getUsersFromStorage();

        if (localUsers && localUsers.length > 0) {
            setUsers(localUsers);
        } else {
            fetchUsers().then((data) => {
                setUsers(data);
                saveUsersToStorage(data);
            });
        }
    }, []);

    const handleEdit = (id: string) => {
        console.log('Editar usuário:', id);
    };

    const handleDelete = (id: string) => {
        const updated = users.filter(user => user.id !== id);
        setUsers(updated);
        saveUsersToStorage(updated);
    };

    if (users.length === 0) {
        return <p className="text-center text-gray-500">Nenhum usuário cadastrado.</p>;
    }

    return (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {users.map((user) => (
                <div
                    key={user.id}
                    className="bg-white relative rounded-2xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-300"
                >
                    <div className="absolute top-3 right-3 flex space-x-2">
                        <button
                            onClick={() => handleEdit(user.id)}
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                            aria-label="Editar"
                        >
                            <Pencil size={18} />
                        </button>
                        <button
                            onClick={() => handleDelete(user.id)}
                            className="text-red-300 hover:text-red-700 transition-colors"
                            aria-label="Deletar"
                        >
                            <Trash2 size={18} />
                        </button>
                    </div>

                    <h2 className="text-lg font-semibold text-gray-900 mb-2">{user.name}</h2>
                    <p className="text-sm text-gray-700">
                        <strong>CPF:</strong> {maskCPF(user.cpf)}
                    </p>
                    <p className="text-sm text-gray-700">
                        <strong>Telefone:</strong> {maskPhone(user.phone)}
                    </p>
                    <p className="text-sm text-gray-700">
                        <strong>Email:</strong> {user.email}
                    </p>
                </div>
            ))}
        </div>
    );
}
