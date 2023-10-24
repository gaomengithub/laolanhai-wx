import { getMatches } from '$/api'

class Match {
  constructor() {
    this.matches = []
    this.next_page_token = ''
    
  }

  async getMatches() {
    const data = await getMatches()
    this.matches = data.matches
    this.next_page_token = data.next_page_token
  }

}

export default Match