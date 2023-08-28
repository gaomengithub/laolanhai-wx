import { request, uploadImg } from "./http"

export async function getMatchList() {
  let obj = {
    url: '/match/list',
    method: 'POST',
    data: {
      city: "",
      match_type: 3,
      page_size: 10,
      page_token: "",
      team_id: "",
      user_id: ""
    }
  }
  return await request(obj)
}


export async function joinMatch(matchID) {
  let obj = {
    url: '/match/join',
    method: 'POST',
    data: {
      match_id: matchID
    }
  }
  return await request(obj)
}

export async function getMatchDesc(matchID) {
  let obj = {
    url: '/match/get',
    data: {
      id: matchID
    }
  }
  return await request(obj)
}


export async function createMatch(data) {
  let obj = {
    url: '/match/create',
    method: 'POST',
    data: data
  }
  return await request(obj)
}

export async function createTeam(data) {
  let obj = {
    url: '/team/create',
    method: 'POST',
    data: data
  }
  return await request(obj)
}

export async function getUploadToken() {
  let obj = {
    url: '/attachment/getUploadToken',
  }
  return await request(obj)
}


export async function uploadImage(path, url) {
  return await uploadImg(path, url)
}


export async function updateUserInfo(data) {
  let obj = {
    url: '/user/update',
    method: 'POST',
    data: data
  }
  return await request(obj)
}

export async function getDownloadToken(data) {
  let obj = {
    url: '/attachment/listDownloadLinks',
    method: 'POST',
    data: data
  }
  return await request(obj)
}

export async function searchAngthing(data) {
  let obj = {
    url: '/match/search',
    data: {
      input: data
    }
  }
  return await request(obj)
}

export async function getUserInfoByID(id) {
  let obj = {
    url: '/user/get',
    method: 'POST',
    data: {
      id: id
    }
  }
  return await request(obj)
}