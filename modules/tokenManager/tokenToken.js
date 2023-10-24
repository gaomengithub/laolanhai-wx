import { getAccessToken, checkExpired } from './tokenHandler'
import { loginForToken, updateAccessToken } from './getToken'


export async function getAvailableAccessToken(force = false) {
  let accessToken = getAccessToken()
  if (accessToken === "" || accessToken == null || force === true) {
    const data = await loginForToken()
    accessToken = data.accessToken
  } else {
    const isExpired = checkExpired()
    if (isExpired) {
      const data = await updateAccessToken()
      accessToken = data.accessToken
    }
  }
  return accessToken
}

