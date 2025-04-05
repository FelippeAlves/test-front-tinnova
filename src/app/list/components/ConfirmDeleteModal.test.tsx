import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ConfirmDeleteModal from './ConfirmDeleteModal';

describe('<ConfirmDeleteModal />', () => {
    const mockOnClose = jest.fn();
    const mockOnConfirm = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders with the correct user name', () => {
        render(
            <ConfirmDeleteModal
                open={true}
                onClose={mockOnClose}
                onConfirm={mockOnConfirm}
                userName="João Silva"
            />
        );

        expect(screen.getByText(/remover o usuário/i)).toHaveTextContent('João Silva');
        expect(screen.getByText(/tem certeza que deseja excluir/i)).toBeInTheDocument();
    });

    it('calls onClose when "Cancelar" is clicked', async () => {
        render(
            <ConfirmDeleteModal
                open={true}
                onClose={mockOnClose}
                onConfirm={mockOnConfirm}
                userName="Maria"
            />
        );

        const cancelButton = screen.getByRole('button', { name: /cancelar/i });
        await userEvent.click(cancelButton);

        expect(mockOnClose).toHaveBeenCalled();
    });

    it('calls onConfirm when "Excluir" is clicked', async () => {
        render(
            <ConfirmDeleteModal
                open={true}
                onClose={mockOnClose}
                onConfirm={mockOnConfirm}
                userName="Carlos"
            />
        );

        const deleteButton = screen.getByRole('button', { name: /excluir/i });
        await userEvent.click(deleteButton);

        expect(mockOnConfirm).toHaveBeenCalled();
    });
});
