import { render, screen, waitFor } from '@testing-library/react';
import { getUsersFromStorage, saveUsersToStorage } from '@/storage/userStorage';
import { fetchUsers } from '@/services/userService';
import userEvent from '@testing-library/user-event';
import ClientList from './ClientList';
import { toast } from 'sonner';

jest.mock('../../../storage/userStorage');
jest.mock('../../../services/userService');
jest.mock('sonner', () => ({
    toast: {
        success: jest.fn(),
    },
}));

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

    it('deletes a user from the list after confirming modal', async () => {
        (getUsersFromStorage as jest.Mock).mockReturnValue(mockUsers);

        render(<ClientList />);

        const deleteButtons = screen.getAllByLabelText('Deletar');
        await userEvent.click(deleteButtons[0]);

        const confirmButton = screen.getByRole('button', { name: /Excluir/i });
        await userEvent.click(confirmButton);

        await waitFor(() => {
            expect(screen.queryByText(/João Silva/i)).not.toBeInTheDocument();
        });

        expect(saveUsersToStorage).toHaveBeenCalledWith([mockUsers[1]]);
        expect(toast.success).toHaveBeenCalledWith(
            `Usuário João Silva excluído com sucesso!`
        );
    });

    it('can cancel delete modal', async () => {
        (getUsersFromStorage as jest.Mock).mockReturnValue(mockUsers);

        render(<ClientList />);

        await userEvent.click(screen.getAllByLabelText('Deletar')[0]);

        const cancelButton = screen.getByRole('button', { name: /cancelar/i });
        await userEvent.click(cancelButton);

        expect(screen.getByText(/João Silva/i)).toBeInTheDocument();
    });

    it('opens edit modal', async () => {
        (getUsersFromStorage as jest.Mock).mockReturnValue(mockUsers);

        render(<ClientList />);

        const editButton = screen.getAllByLabelText('Editar')[0];
        await userEvent.click(editButton);

        expect(await screen.findByRole('dialog')).toBeInTheDocument();
    });

    it('updates users list after editing a user', async () => {
        (getUsersFromStorage as jest.Mock).mockReturnValue(mockUsers);

        render(<ClientList />);

        expect(await screen.findByText('João Silva')).toBeInTheDocument();

        const editButton = screen.getByTestId('user-edit-1');
        await userEvent.click(editButton);

        expect(editButton).toBeInTheDocument()

        const nameInput = screen.getByTestId('input-name')
        await userEvent.clear(nameInput);
        await userEvent.type(nameInput, 'João Editado');

        const submitButton = screen.getByRole('button', { name: /salvar/i });
        (getUsersFromStorage as jest.Mock).mockReturnValue([
            { ...mockUsers[0], name: 'João Editado' },
            mockUsers[1],
        ]);

        await userEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText('João Editado')).toBeInTheDocument();
        });
    });

});
