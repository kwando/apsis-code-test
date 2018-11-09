const BowlingAPI = require('../src/BowlingAPI');
const { strictEqual, fail } = require('assert');

describe('BowlingAPI', ()=>{
  describe('score()', ()=>{
    it('returns a score correctly', async () => {
      let isCalled = false;
      const api = new BowlingAPI(async function(url, options){
        isCalled = true;
        return mockHttpResponse({score: 10})
      });
      const result = await api.score([]);
      strictEqual(true, isCalled, 'client should have http')
      strictEqual(10, result)
    })

    it('returns an error if API responds with an error', async () => {
      let isCalled = false;
      const errorMessage = 'this is a error message';
      const api = new BowlingAPI(async function(url, options){
        isCalled = true;
        return mockHttpResponse({error: errorMessage})
      });
      
      try{
        await api.score([]);
        fail('should throw an error')
      }catch(error){
        strictEqual(errorMessage, error.message)
      }
      
      strictEqual(true, isCalled, 'client should have http')
    })
  })
})

function mockHttpResponse(jsonData, status = 200){
  return {
    status,
    ok: status === 200,
    json: ()=> jsonData
  }
}
