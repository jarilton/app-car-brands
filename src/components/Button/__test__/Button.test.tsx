import React from 'react'

import { fireEvent, render } from '@testing-library/react-native'

import '@testing-library/jest-native/extend-expect'
import { Button } from '..'

describe('Component: Button ', () => {
  it('renders correctly with title', () => {
    const { getByText } = render(
      <Button
        title="Submit"
        onPress={() => {
          ;('')
        }}
      />,
    )

    const button = getByText('Submit')

    expect(button).toBeTruthy()
  })

  it('triggers onPress when clicked', () => {
    const onPressMock = jest.fn()
    const { getByText } = render(
      <Button title="Submit" onPress={onPressMock} />,
    )
    const button = getByText('Submit')

    fireEvent.press(button)

    expect(onPressMock).toBeCalledTimes(1)
  })

  it('disables the button when loading', () => {
    const { getByTestId } = render(
      <Button
        title="Submit"
        loading
        onPress={() => {
          ;('')
        }}
      />,
    )
    const button = getByTestId('test-id-for-disabled-button')

    expect(button).toBeDisabled()
  })

  it('renders as outlined button', () => {
    const { getByTestId } = render(
      <Button
        title="Submit"
        outlined
        onPress={() => {
          ;('')
        }}
      />,
    )
    const button = getByTestId('test-id-for-outlined-button')

    expect(button).toBeTruthy()
  })
  it('renders as disabled button', () => {
    const { getByText } = render(
      <Button
        title="Submit"
        disabled
        onPress={() => {
          ;('')
        }}
      />,
    )
    const button = getByText('Submit')

    expect(button).toBeDisabled()
  })
})
