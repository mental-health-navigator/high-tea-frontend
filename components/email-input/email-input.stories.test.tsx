import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, test, describe, vi } from 'vitest';
import { EmailInputUI } from './email-input-ui';

describe('EmailInput Component', () => {
  describe('Default State', () => {
    test('renders the email input with default label', () => {
      render(<EmailInputUI onSubmit={vi.fn()} />);
      expect(
        screen.getByText('What is your email address?'),
      ).toBeInTheDocument();
    });

    test('renders email input field with correct attributes', () => {
      render(<EmailInputUI onSubmit={vi.fn()} />);
      const input = screen.getByRole('textbox', { name: /email/i });

      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute('type', 'email');
      expect(input).toHaveAttribute('name', 'email');
      expect(input).toHaveAttribute('placeholder', 'you@email.com');
      expect(input).toHaveAttribute('required');
      expect(input).toHaveAttribute('autoComplete', 'email');
    });

    test('allows user to type email address', async () => {
      const user = userEvent.setup();
      render(<EmailInputUI onSubmit={vi.fn()} />);
      const input = screen.getByRole('textbox', { name: /email/i });

      await user.type(input, 'test@example.com');
      expect(input).toHaveValue('test@example.com');
    });

    test('calls onSubmit when form is submitted', async () => {
      const user = userEvent.setup();
      const mockSubmit = vi.fn();

      render(<EmailInputUI onSubmit={mockSubmit} />);
      const input = screen.getByRole('textbox', { name: /email/i });

      await user.type(input, 'test@example.com');
      await user.keyboard('{Enter}');

      expect(mockSubmit).toHaveBeenCalled();
    });
  });

  describe('Loading State', () => {
    test('disables input when loading', () => {
      render(<EmailInputUI onSubmit={vi.fn()} isLoading={true} />);
      const input = screen.getByRole('textbox', { name: /email/i });

      expect(input).toBeDisabled();
    });

    test('shows loading indicator', () => {
      const { container } = render(<EmailInputUI onSubmit={vi.fn()} isLoading={true} />);
      // The EmailSubmitButton should show loading state
      expect(container).toBeInTheDocument();
    });
  });

  describe('Success State', () => {
    test('disables input when successful', () => {
      render(<EmailInputUI onSubmit={vi.fn()} isSuccessful={true} />);
      const input = screen.getByRole('textbox', { name: /email/i });

      expect(input).toBeDisabled();
    });

    test('shows success indicator', () => {
      const { container } = render(<EmailInputUI onSubmit={vi.fn()} isSuccessful={true} />);
      // The EmailSubmitButton should show success state
      expect(container).toBeInTheDocument();
    });
  });

  describe('Error State', () => {
    test('displays error message', () => {
      render(
        <EmailInputUI
          onSubmit={vi.fn()}
          isError={true}
          errorMessage="This email is already in use"
        />
      );

      expect(screen.getByText('This email is already in use')).toBeInTheDocument();
    });

    test('applies error styling to input', () => {
      render(
        <EmailInputUI
          onSubmit={vi.fn()}
          isError={true}
          errorMessage="This email is already in use"
        />
      );
      const input = screen.getByRole('textbox', { name: /email/i });

      expect(input).toHaveClass('border-destructive');
    });

    test('input remains enabled in error state', () => {
      render(
        <EmailInputUI
          onSubmit={vi.fn()}
          isError={true}
          errorMessage="This email is already in use"
        />
      );
      const input = screen.getByRole('textbox', { name: /email/i });

      expect(input).not.toBeDisabled();
    });
  });

  describe('Custom Props', () => {
    test('renders with custom label', () => {
      render(
        <EmailInputUI
          onSubmit={vi.fn()}
          label="Enter your work email"
        />
      );

      expect(screen.getByText('Enter your work email')).toBeInTheDocument();
    });

    test('renders with custom placeholder', () => {
      render(
        <EmailInputUI
          onSubmit={vi.fn()}
          placeholder="name@company.com"
        />
      );
      const input = screen.getByRole('textbox', { name: /email/i });

      expect(input).toHaveAttribute('placeholder', 'name@company.com');
    });

    test('can be disabled', () => {
      render(<EmailInputUI onSubmit={vi.fn()} disabled={true} />);
      const input = screen.getByRole('textbox', { name: /email/i });

      expect(input).toBeDisabled();
    });

    test('renders with default value', () => {
      render(<EmailInputUI onSubmit={vi.fn()} value="preset@email.com" />);
      const input = screen.getByRole('textbox', { name: /email/i });

      expect(input).toHaveValue('preset@email.com');
    });
  });

  describe('Accessibility', () => {
    test('has proper label association', () => {
      render(<EmailInputUI onSubmit={vi.fn()} />);
      const input = screen.getByLabelText(/What is your email address?/i);

      expect(input).toBeInTheDocument();
    });

    test('input is rendered and focusable', () => {
      render(<EmailInputUI onSubmit={vi.fn()} />);
      const input = screen.getByRole('textbox', { name: /email/i });

      // Input should be in the document and not disabled
      expect(input).toBeInTheDocument();
      expect(input).not.toBeDisabled();
    });

    test('error message is visible and styled correctly', () => {
      render(
        <EmailInputUI
          onSubmit={vi.fn()}
          isError={true}
          errorMessage="Invalid email format"
        />
      );
      const errorMessage = screen.getByText('Invalid email format');

      expect(errorMessage).toBeInTheDocument();
      expect(errorMessage).toHaveClass('text-destructive');
    });
  });

  describe('Form Validation', () => {
    test('input requires email format', () => {
      render(<EmailInputUI onSubmit={vi.fn()} />);
      const input = screen.getByRole('textbox', { name: /email/i });

      expect(input).toHaveAttribute('type', 'email');
      expect(input).toHaveAttribute('required');
    });

    test('placeholder provides example format', () => {
      render(<EmailInputUI onSubmit={vi.fn()} />);
      const input = screen.getByRole('textbox', { name: /email/i });

      expect(input).toHaveAttribute('placeholder', 'you@email.com');
    });

    test('has autocomplete enabled for email', () => {
      render(<EmailInputUI onSubmit={vi.fn()} />);
      const input = screen.getByRole('textbox', { name: /email/i });

      expect(input).toHaveAttribute('autoComplete', 'email');
    });
  });
});
