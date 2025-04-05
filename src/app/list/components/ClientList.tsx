'use client';

import { useEffect, useState } from 'react';
import { fetchUsers } from '@/services/userService';
import { getUsersFromStorage, saveUsersToStorage } from '@/storage/userStorage';
import { maskCPF } from '@/utils/maskCPF';
import { maskPhone } from '@/utils/maskPhone';
import { UserList } from '@/types/UserList';
import { Pencil, Trash2 } from 'lucide-react';
import { User } from '@/interfaces/User';
import EditUserModal from './EditUserModal';
import ConfirmDeleteModal from './ConfirmDeleteModal';
import { toast } from 'sonner';

export default function ClientList() {
    const [users, setUsers] = useState<UserList>([]);
    const [openModal, setOpenModal] = useState(false);
    const [userToEdit, setUserToEdit] = useState<User | null>(null);
    const [userToDelete, setUserToDelete] = useState<User | null>(null);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);

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

    const handleEditUser = (user: User) => {
        setUserToEdit(user);
        setOpenModal(true);
    };

    const handleDeletUser = () => {
        if (!userToDelete) return;

        const updated = users.filter((u) => u.id !== userToDelete.id);
        setUsers(updated);
        saveUsersToStorage(updated);
        setOpenDeleteModal(false);
        toast.success(`Usuário ${userToDelete.name} excluído com sucesso!`);
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
                            onClick={() => handleEditUser(user)}
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                            aria-label="Editar"
                        >
                            <Pencil size={18} />
                        </button>
                        <button
                            onClick={() => {
                                setUserToDelete(user);
                                setOpenDeleteModal(true);
                            }}
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
            <EditUserModal
                open={openModal}
                onClose={() => setOpenModal(false)}
                userToEdit={userToEdit}
                onUserUpdated={() => {
                    const updatedUsers = getUsersFromStorage();
                    setUsers(updatedUsers!);
                }}
            />
            <ConfirmDeleteModal
                open={openDeleteModal}
                onClose={() => setOpenDeleteModal(false)}
                onConfirm={handleDeletUser}
                userName={userToDelete?.name || ''}
            />

        </div>
    );
}
