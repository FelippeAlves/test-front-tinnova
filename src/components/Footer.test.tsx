
import { render, screen } from '@testing-library/react';
import Footer from '@/components/Footer';

describe('<Footer />', () => {
    it('renders the developer name', () => {
        render(<Footer />);
        expect(screen.getByText(/desenvolvido por/i)).toBeInTheDocument();
        expect(screen.getByText(/felippe alves de paula/i)).toBeInTheDocument();
    });

    it('contains a link to the GitHub profile', () => {
        render(<Footer />);
        const link = screen.getByRole('link', { name: /felippe alves de paula/i });
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('href', 'https://github.com/FelippeAlves');
        expect(link).toHaveAttribute('target', '_blank');
        expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('renders the GitHub icon', () => {
        render(<Footer />);
        const icon = screen.getByTestId('github-icon');
        expect(icon).toBeInTheDocument();
    });
});
