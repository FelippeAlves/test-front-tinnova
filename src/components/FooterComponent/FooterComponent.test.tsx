
import { render, screen } from '@testing-library/react';
import FooterComponent from '@/components/FooterComponent/FooterComponent';

describe('<Footer />', () => {
    it('renders the developer name', () => {
        render(<FooterComponent />);
        expect(screen.getByText(/desenvolvido por/i)).toBeInTheDocument();
        expect(screen.getByText(/felippe alves de paula/i)).toBeInTheDocument();
    });

    it('contains a link to the GitHub profile', () => {
        render(<FooterComponent />);
        const link = screen.getByRole('link', { name: /felippe alves de paula/i });
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('href', 'https://github.com/FelippeAlves');
        expect(link).toHaveAttribute('target', '_blank');
        expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('renders the GitHub icon', () => {
        render(<FooterComponent />);
        const icon = screen.getByTestId('github-icon');
        expect(icon).toBeInTheDocument();
    });
});
