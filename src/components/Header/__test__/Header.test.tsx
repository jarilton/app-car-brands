import React from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { render } from '@testing-library/react-native'

import { Header } from '..'

describe('Component: Header', () => {
  it('renders the Header component without errors', () => {
    const { getByTestId } = render(
      <NavigationContainer>
        <Header />
      </NavigationContainer>,
    )

    const headerComponent = getByTestId('header-component')
    expect(headerComponent).toBeTruthy()
  })
})
