class BowlingAPI{
  constructor(http){
    this.http = http;
  }
  async score(frames){
    const body = JSON.stringify({ frames })
    const headers = {
      'Content-Type': 'application/json'
    }
    const method = 'POST';
    const response = await fetch('/api/score', { method, headers, body })

    const { score, error } = await response.json()
    if(error){
      throw new Error(error);
    }
    return score;
  }
}

module.exports = BowlingAPI;