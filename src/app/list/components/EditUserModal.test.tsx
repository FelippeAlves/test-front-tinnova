import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import EditUserModal from './EditUserModal';
import { RegisterFormData } from '../../register/components/RegisterForm';

jest.mock('../../register/components/RegisterForm', () => ({
    __esModule: true,
    default: ({ onSuccess }: any) => (
        <button onClick={onSuccess}>Salvar</button>
    )
}));

const mockUser: RegisterFormData & { id: string } = {
    id: '1',
    name: 'João Silva',
    cpf: '12345678901',
    phone: '11987654321',
    email: 'joao@example.com',
};

describe('<EditUserModal />', () => {
    const mockOnClose = jest.fn();
    const mockOnUserUpdated = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('does not render when userToEdit is null', () => {
        const { container } = render(
            <EditUserModal
                open={true}
                onClose={mockOnClose}
                onUserUpdated={mockOnUserUpdated}
                userToEdit={null}
            />
        );

        expect(container).toBeEmptyDOMElement();
    });

    it('renders modal when userToEdit is provided', () => {
        render(
            <EditUserModal
                open={true}
                onClose={mockOnClose}
                onUserUpdated={mockOnUserUpdated}
                userToEdit={mockUser}
            />
        );

        expect(screen.getByRole('button', { name: /salvar/i })).toBeInTheDocument();
    });

    it('calls onUserUpdated and onClose when form submits successfully', async () => {
        render(
            <EditUserModal
                open={true}
                onClose={mockOnClose}
                onUserUpdated={mockOnUserUpdated}
                userToEdit={mockUser}
            />
        );

        const saveButton = screen.getByRole('button', { name: /salvar/i });
        await userEvent.click(saveButton);

        expect(mockOnUserUpdated).toHaveBeenCalled();
        expect(mockOnClose).toHaveBeenCalled();
    });
});
