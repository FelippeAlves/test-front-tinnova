import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from '@/components/ui/Button';

describe('<Button />', () => {
  it('renders with text', () => {
    render(<Button>Send</Button>);
    expect(screen.getByRole('button', { name: /send/i })).toBeInTheDocument();
  });

  it('renders with different sizes', () => {
    const { rerender } = render(<Button size="small">Small</Button>);
    expect(screen.getByRole('button')).toHaveClass('w-36');

    rerender(<Button size="medium">Medium</Button>);
    expect(screen.getByRole('button')).toHaveClass('w-52');

    rerender(<Button size="large">Large</Button>);
    expect(screen.getByRole('button')).toHaveClass('w-70');
  });

  it('renders loading spinner when loading is true', () => {
    render(<Button loading>Loading...</Button>);
    const button = screen.getByRole('button');
    expect(button.querySelector('div')).toBeInTheDocument();
  });

  it('cannot be clicked when disabled', async () => {
    const onClick = jest.fn();
    render(<Button disabled onClick={onClick}>Disabled</Button>);
    const btn = screen.getByRole('button', { name: /disabled/i });

    expect(btn).toBeDisabled();
    await userEvent.click(btn);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('calls function on click', async () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick}>Click here</Button>);
    await userEvent.click(screen.getByRole('button', { name: /click here/i }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
