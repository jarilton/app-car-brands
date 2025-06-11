import React from 'react'

import { render } from '@testing-library/react-native'

import { PhotoUser } from '..'

describe('Component: PhotoUser', () => {
  it('should render an image when not loading', () => {
    const { getByTestId } = render(
      <PhotoUser
        size={50}
        source={{ uri: 'https://example.com/image.jpg' }}
        loading={false}
      />,
    )

    // Verifica se a imagem foi renderizada
    expect(getByTestId('user-photo-image')).toBeTruthy()
  })

  it('should render an ActivityIndicator when loading', () => {
    const { getByTestId } = render(
      <PhotoUser
        size={50}
        source={{ uri: 'https://example.com/image.jpg' }}
        loading
      />,
    )

    // Verifica se o ActivityIndicator foi renderizado
    expect(getByTestId('user-photo-activity-indicator')).toBeTruthy()
  })
})
