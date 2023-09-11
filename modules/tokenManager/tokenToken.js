import { getAccessToken, checkExpired } from './tokenHandler'
import { loginForToken, updateAccessToken } from './getToken'


export async function getAvailableAccessToken(force = false) {
  let accessToken = getAccessToken()
  if (accessToken === "" || accessToken == null || force === true) {
    await loginForToken().then(res => {
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

