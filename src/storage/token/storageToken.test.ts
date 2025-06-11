import { storageTokenGet } from './storageToken'

describe('Storage: TokenStorage', () => {
  it("should be return undefined when don't have a token storaged ", async () => {
    const response = await storageTokenGet()

    expect(response).toBeUndefined()
  })
})
