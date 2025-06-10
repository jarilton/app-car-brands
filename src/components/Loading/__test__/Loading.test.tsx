import React from 'react'

import { render } from '@testing-library/react-native'

import { Loading } from '..'

describe('Component: Loading ', () => {
  it('renders the Loading component without errors', () => {
    const { getByTestId } = render(<Loading />)

    const loadingComponent = getByTestId('loading-component')
    expect(loadingComponent).toBeTruthy()
  })
})
