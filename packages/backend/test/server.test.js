const createServer = require('../src/createServer');
const fetch = require('node-fetch');
const { strictEqual, deepStrictEqual } = require('assert');

describe('Server', ()=>{
  let app;
  const port = 37286;
  before(done => {
    const server = createServer();
    app = server.listen(port, done);
  });
  after(done => {
    app.close(done);
  })

  describe('POST /api/score', ()=>{
    const scoreGame = async (payload, status) => jsonResponse(await postJson(app, '/api/score', payload), status)

    it('accepts empty scores', async ()=>{
      const { score, error } = await scoreGame({ frames: [] }, 200);
      
      strictEqual(undefined, error)
      strictEqual(0, score)
    })

    it('accepts a full game', async ()=>{
      const { score, error } = await scoreGame({
        frames: [
          {first: 10, second: 0},
          {first: 10, second: 0},
          {first: 10, second: 0},
          {first: 10, second: 0},
          {first: 10, second: 0},
          {first: 10, second: 0},
          {first: 10, second: 0},
          {first: 10, second: 0},
          {first: 10, second: 0},
          {first: 10, second: 0, third: 0},
        ]
      }, 200);

      strictEqual(undefined, error)
      strictEqual(270, score)
    });

    it('rejects a bad game', async ()=>{
      const { score, error } = await scoreGame({
        frames: [
          {first: 3, second: 8},
        ]
      }, 200);

      strictEqual("frame 1 is invalid", error)
      strictEqual(undefined, score)
    });
  });
})

async function postJson(server, path = '/', params = {}){
  const response = await fetch(`http://localhost:${server.address().port}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params)
  })
  return response;
}
async function jsonResponse(response, status){
  try{
    if(status){
      strictEqual(response.status, status, 'HTTP status is not matching');
    }
    const contentType = response.headers.get('Content-Type');
    strictEqual(true, contentType.startsWith('application/json'), 'Content-Type must be applicaton/json');
    return await response.json();
  }catch(error){
    console.log(error);
    throw error;
  }
}