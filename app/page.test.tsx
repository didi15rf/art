import { render, screen } from '@testing-library/react';
import Page from '../app/Page';

test('renders page component', () => {
    render(<Page />);
    const linkElement = screen.getByText(/expected text/i);
    expect(linkElement).toBeInTheDocument();
});