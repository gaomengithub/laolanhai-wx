import { getAccessToken, checkExpired, setStorage } from './tokenHandler'
import { loginForToken, updateAccessToken } from './getToken'


export async function getAvailableAccessToken(force = false) {
  let accessToken = getAccessToken()
  if (accessToken === "" || accessToken == null || force === true) {
    await loginForToken().then(res => {
      setStorage(res)
      accessToken = res.accessToken
    })
  } else {
    const isExpired = checkExpired()
    if (isExpired) {
      updateAccessToken()
    }
  }
  return accessToken
}

