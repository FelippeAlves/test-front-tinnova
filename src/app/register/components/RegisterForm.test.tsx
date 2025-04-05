import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RegisterForm from './RegisterForm';

jest.mock('next/navigation', () => ({
    redirect: jest.fn(),
}));

jest.mock('sonner', () => ({
    toast: {
        success: jest.fn(),
    },
}));

describe('<RegisterForm />', () => {
    it('renders all input fields and the submit button', () => {
        render(<RegisterForm />);
        expect(screen.getByTestId('input-name')).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/cpf/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/número com ddd/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
        expect(screen.getByRole('button')).toHaveTextContent(/cadastrar/i);
    });

    it('shows validation errors when fields are empty', async () => {
        render(<RegisterForm />);
        await userEvent.click(screen.getByRole('button'));
        expect(await screen.findAllByText(/campo.*caracteres/i)).toHaveLength(1);
        expect(await screen.findByText(/cpf inválido/i)).toBeInTheDocument();
        expect(await screen.findByText(/telefone\/celular inválido/i)).toBeInTheDocument();
        expect(await screen.findByText(/email inválido/i)).toBeInTheDocument();
    });
});
