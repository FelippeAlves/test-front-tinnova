
import { render, screen, waitFor } from '@testing-library/react';
import { getUsersFromStorage, saveUsersToStorage } from '@/storage/userStorage';
import { fetchUsers } from '@/services/userService';
import userEvent from '@testing-library/user-event';
import ClientList from './ClientList';

jest.mock('../../../storage/userStorage');
jest.mock('../../../services/userService');

const mockUsers = [
    {
        id: '1',
        name: 'João Silva',
        cpf: '12345678901',
        phone: '11987654321',
        email: 'joaosilva@example.com',
    },
    {
        id: '2',
        name: 'Maria José',
        cpf: '98765432100',
        phone: '21912345678',
        email: 'mariajose@example.com',
    },
];

describe('<ClientList />', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('displays message when no users exist', async () => {
        (getUsersFromStorage as jest.Mock).mockReturnValue(null);
        (fetchUsers as jest.Mock).mockResolvedValue([]);

        render(<ClientList />);

        await waitFor(() => {
            expect(screen.getByText(/nenhum usuário cadastrado/i)).toBeInTheDocument();
        });
    });

    it('loads users from storage if available', async () => {
        (getUsersFromStorage as jest.Mock).mockReturnValue(mockUsers);

        render(<ClientList />);

        expect(await screen.findByText(/João Silva/i)).toBeInTheDocument();
        expect(screen.getByText(/Maria José/i)).toBeInTheDocument();
    });

    it('fetches users and saves to storage if no local data', async () => {
        (getUsersFromStorage as jest.Mock).mockReturnValue(null);
        (fetchUsers as jest.Mock).mockResolvedValue(mockUsers);

        render(<ClientList />);

        expect(await screen.findByText(/João Silva/i)).toBeInTheDocument();
        expect(saveUsersToStorage).toHaveBeenCalledWith(mockUsers);
    });

    it('deletes a user from the list', async () => {
        (getUsersFromStorage as jest.Mock).mockReturnValue(mockUsers);

        render(<ClientList />);

        expect(await screen.findByText(/João Silva/i)).toBeInTheDocument();

        const deleteButtons = screen.getAllByLabelText('Deletar');
        await userEvent.click(deleteButtons[0]);

        await waitFor(() => {
            expect(screen.queryByText(/João Silva/i)).not.toBeInTheDocument();
        });

        expect(saveUsersToStorage).toHaveBeenCalledWith([mockUsers[1]]);
    });

    /* Preciso lembrar de fazer teste para a fn de edit */
});