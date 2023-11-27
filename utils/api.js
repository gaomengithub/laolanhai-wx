import { request_ } from "../modules/requestManager"


export async function updatMatchePoints(match, user, score) {
  let obj = {
    url: '/match/createIntegral',
    method: 'POST',
    data: {
      match_id: match,
      member_id: user,
      current_score: score,
    }
  }
  return await request_(obj)
}


export async function delNews(id) {
  let obj = {
    url: '/match/deleteMatchNews',
    method: 'GET',
    data: {
      id
    }
  }
  return await request_(obj)
}

export async function delArena(id) {
  let obj = {
    url: '/arena/deleteSportsHall',
    method: 'GET',
    data: {
      id
    }
  }
  return await request_(obj)
}


export async function getArenaDetails(id) {
  let obj = {
    url: '/arena/getSportsHall',
    method: 'GET',
    data: {
      id
    }
  }
  return await request_(obj)
}

export async function getStarData(id) {
  let obj = {
    url: '/user/getBallStarCard',
    method: 'GET',
    data: {
      userId: id
    }
  }
  return await request_(obj)
}


export async function updateStarData(data) {
  let obj = {
    url: '/user/updateBallStarCard',
    method: 'POST',
    data: data
  }
  return await request_(obj)
}


export async function getMatches(data) {
  let obj = {
    url: '/match/list',
    method: 'POST',
    data: data
  }
  return await request_(obj)
}


export async function joinMatch(matchID) {
  let obj = {
    url: '/match/join',
    method: 'POST',
    data: {
      match_id: matchID
    }
  }
  return await request_(obj)
}

export async function getMatchDesc(id) {
  let obj = {
    url: '/match/get',
    data: {
      id: id
    }
  }
  return await request_(obj)
}


export async function createMatch(data) {
  let obj = {
    url: '/match/create',
    method: 'POST',
    data: data
  }
  return await request_(obj)
}

export async function updateMatch(data) {
  let obj = {
    url: '/match/update',
    method: 'POST',
    data: data
  }
  return await request_(obj)
}

export async function updateTeam(data) {
  let obj = {
    url: '/team/update',
    method: 'POST',
    data: data
  }
  return await request_(obj)
}

export async function createTeam(data) {
  let obj = {
    url: '/team/create',
    method: 'POST',
    data: data
  }
  return await request_(obj)
}

export async function getUploadToken() {
  let obj = {
    url: '/attachment/getUploadToken',
  }
  return await request_(obj)
}



export async function updateUserInfo(data) {
  let obj = {
    url: '/user/update',
    method: 'POST',
    data: data
  }
  return await request_(obj)
}

export async function getDownloadToken(data) {
  let obj = {
    url: '/attachment/listDownloadLinks',
    method: 'POST',
    data: data
  }
  return await request_(obj)
}

export async function searchAngthing(data) {
  let obj = {
    url: '/match/search',
    data: {
      input: data
    }
  }
  return await request_(obj)
}

export async function getUserInfo(id) {
  let obj = {
    url: '/user/get',
    method: 'POST',
    data: {
      id
    }
  }
  return await request_(obj)
}


export async function getTeamsList() {
  let obj = {
    url: '/team/list',
    method: 'POST',
    data: {
      page_size: 10,
      page_token: ""
    }
  }
  return await request_(obj)
}



/**
 * 
 * @param {string} id 队伍id
 */
export async function getTeamDesc(id) {
  let obj = {
    url: '/team/get',
    data: {
      id: id
    }
  }
  return await request_(obj)
}

export async function joinTeam(teamID, comment) {
  let obj = {
    url: '/team/join',
    method: 'POST',
    data: {
      comment: comment,
      team_id: teamID
    }
  }
  return await request_(obj)
}

export async function getTeamApprovalList(teamID) {
  let obj = {
    url: '/team/listApproval',
    method: 'POST',
    data: {
      teamId: teamID
    }
  }
  return await request_(obj)
}

export async function getMatchApprovals() {
  let obj = {
    url: '/match/listApproval',
    method: 'POST',
    data: {
    }
  }
  return await request_(obj)
}

export async function getMyJoinMatches() {
  let obj = {
    url: '/match/listMyJoinMatch',
    data: {
    }
  }
  return await request_(obj)
}

export async function updateApproval(data) {
  let obj = {
    url: '/team/updateApproval',
    method: 'POST',
    data: data
  }
  return await request_(obj)
}

export async function deleteMatch(matchID) {
  let obj = {
    url: '/match/delete',
    method: 'GET',
    data: {
      id: matchID
    }
  }
  return await request_(obj)
}

export async function createArena(data) {
  let obj = {
    url: '/arena/createSportsHall',
    method: 'POST',
    data: data
  }
  return await request_(obj)
}

export async function getArenas() {
  let obj = {
    url: '/arena/listSportsHalls',
    method: 'POST',
  }
  return await request_(obj)
}


export async function createNews(data) {
  let obj = {
    url: '/match/createMatchNews',
    method: 'POST',
    data: data
  }
  return await request_(obj)
}


export async function getNewsList() {
  let obj = {
    url: '/match/listMatchNews',
    method: 'GET',
  }
  return await request_(obj)
}


export async function getNewsDetails(id) {
  let obj = {
    url: '/match/getMatchNews',
    method: 'GET',
    data: {
      id
    }
  }
  return await request_(obj)
}


export async function updateMatchStatus(data) {
  let obj = {
    url: '/match/updateMatchStatus',
    method: 'POST',
    data: data
  }
  return await request_(obj)
}


export async function updateMatchPhoto(data) {
  let obj = {
    url: '/match/uploadMatchPhoto',
    method: 'POST',
    data: data
  }
  return await request_(obj)
}


export async function getArenaList(data) {
  let obj = {
    url: '/arena/listSportsHalls',
    method: 'POST',
    data: data
  }
  return await request_(obj)
}