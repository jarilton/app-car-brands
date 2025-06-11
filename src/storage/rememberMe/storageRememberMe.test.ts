import { storageRememberMeGet } from './storageRememberMe'

describe('Storage: RememberMeStorage', () => {
  it("should be return false when don't have a remember me storaged ", async () => {
    const response = await storageRememberMeGet()

    expect(response).toBeFalsy()
  })
})
