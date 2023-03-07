import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom'

import LandingNoAuth from '../components/LandingNoAuth/LandingNoAuth';

test('should be titleLandingNoAuth if route = /', () => {
    const route = '/'
  
    // use <MemoryRouter> when you want to manually control the history
    render(
      <MemoryRouter initialEntries={[route]}>
        <LandingNoAuth />
      </MemoryRouter>,
    )
  
    // verify location display is rendered
    expect(screen.getByTestId('titleLandingNoAuth')).toHaveTextContent('Plan & Vote')
  })

  test('should be titleLandingNoAuth if route = ', () => {
    const route = ''
  
    // use <MemoryRouter> when you want to manually control the history
    render(
      <MemoryRouter initialEntries={[route]}>
        <LandingNoAuth />
      </MemoryRouter>,
    )
  
    // verify location display is rendered
    expect(screen.getByTestId('titleLandingNoAuth')).toHaveTextContent('Plan & Vote')
  })