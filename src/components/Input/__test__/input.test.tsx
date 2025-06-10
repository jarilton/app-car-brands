import React from 'react'

import { fireEvent, render } from '@testing-library/react-native'

import { Input } from '..'

describe('Component: Input', () => {
  beforeEach(() => {
    // Use fake timers para que as animações e timeouts sejam controlados
    jest.useFakeTimers()
  })

  afterEach(() => {
    // Limpa todos os timers ao final de cada teste
    jest.runOnlyPendingTimers()
    jest.clearAllTimers()
  })

  it('renders correctly with label and placeholder', () => {
    const { getByText, getByPlaceholderText } = render(
      <Input
        label="Username"
        placeholder="Enter your username"
        value=""
        onChangeText={() => ''}
      />,
    )

    const label = getByText('Username')
    const input = getByPlaceholderText('Enter your username')

    expect(label).toBeTruthy()
    expect(input).toBeTruthy()
  })

  it('toggles password visibility', () => {
    const { getByTestId } = render(
      <Input
        type="password"
        label="Username"
        placeholder="Enter your username"
        value=""
        onChangeText={() => ''}
      />,
    )
    const toggleButton = getByTestId('toggle-password-visibility')

    expect(toggleButton).toBeTruthy()

    fireEvent.press(toggleButton)
  })

  it('displays an error message', () => {
    const { getByText } = render(
      <Input
        message="This is an error message"
        label="Username"
        placeholder="Enter your username"
        value=""
        onChangeText={() => ''}
      />,
    )

    const errorMessage = getByText('This is an error message')
    expect(errorMessage).toBeTruthy()
  })
})
