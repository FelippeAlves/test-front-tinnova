import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CustomInput from './CustomInput';

describe('<CustomInput />', () => {
    it('renders without label and error', () => {
        render(<CustomInput placeholder="Digite algo" />);
        const input = screen.getByPlaceholderText('Digite algo');
        expect(input).toBeInTheDocument();
    });

    it('renders with label', () => {
        render(<CustomInput label="Nome" placeholder="Seu nome" />);
        expect(screen.getByText('Nome')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Seu nome')).toBeInTheDocument();
    });

    it('renders with error message', () => {
        render(<CustomInput error="Campo obrigatório" />);
        expect(screen.getByText('Campo obrigatório')).toBeInTheDocument();
    });

    it('changes value when typed into', async () => {
        const user = userEvent.setup();
        render(<CustomInput placeholder="Email" />);
        const input = screen.getByPlaceholderText('Email') as HTMLInputElement;

        await user.type(input, 'teste@email.com');
        expect(input.value).toBe('teste@email.com');
    });
});
