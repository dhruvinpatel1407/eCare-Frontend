import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Footer from './Footer'; // Adjust the import path if needed

describe('Footer component', () => {
  it('renders company name and description', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    expect(screen.getByTestId('logo-image')).toBeInTheDocument();
    expect(
      screen.getByText(/Your trusted partner in healthcare/i)
    ).toBeInTheDocument();
  });

  it('renders quick links', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Services')).toBeInTheDocument();
    expect(screen.getByText('Appointments')).toBeInTheDocument();
  });

  it('renders contact info', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    expect(screen.getByText(/info@ecare.com/i)).toBeInTheDocument();
    expect(screen.getByText(/555/)).toBeInTheDocument();
    expect(screen.getByText(/123 Health Street/)).toBeInTheDocument();
  });

  it('renders all social media icons', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    // Social media icons don't have text so we check by role or container
    const links = screen.getAllByRole('link');
    // There should be 4 social icons (and 3 quick links = 7)
    expect(links.length).toBeGreaterThanOrEqual(7);
  });

  it('shows current year in copyright', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    const year = new Date().getFullYear();
    expect(screen.getByText(`© ${year} eCare. All rights reserved.`)).toBeInTheDocument();
  });
});
