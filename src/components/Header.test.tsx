// __tests__/Header.test.tsx

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '@/components/Header';

jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}));

describe('<Header />', () => {
    it('renders the logo image with alt text', () => {
        render(<Header />);
        const logo = screen.getByAltText('Logo Tinnova');
        expect(logo).toBeInTheDocument();
    });

    it('renders a link to the list page', () => {
        render(<Header />);
        const listLink = screen.getAllByRole('link', { name: /lista/i })[0];
        expect(listLink).toBeInTheDocument();
        expect(listLink).toHaveAttribute('href', '/list');
    });

    it('renders a link to the register page', () => {
        render(<Header />);
        const registerLink = screen.getByRole('link', { name: /cadastro/i });
        expect(registerLink).toBeInTheDocument();
        expect(registerLink).toHaveAttribute('href', '/register');
    });
});
