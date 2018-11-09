const Game = require('../src/Game');
const { strictEqual } = require('assert');


describe('Game', ()=>{
  describe('a fully played game', ()=>{
    it('should have ended after then rounds', async ()=>{
      const game = new Game(fakeScoreService);
      for(var i = 0; i < 10; i++){
        strictEqual(false, game.hasEnded, `iteration ${i}`)
        strictEqual(7*i, game.currentScore);
        await game.playRound({ first: 5, second: 2 })
      }
      strictEqual(true, game.hasEnded);
      strictEqual(70, game.currentScore);
    })
  })


  describe('playRound()', ()=>{
    it('should not update if score service fails', async ()=>{
      const game = new Game(allwaysFailing('bad score'));
      try{
        await game.playRound({first: 10, second: 45});
        fail('playRound should fail')
      }catch(error){
        strictEqual('bad score', error.message);
        strictEqual(0, game.currentScore)
        strictEqual(1, game.currentRound)
        strictEqual(false, game.isLoading)
      }
    })
  })
})

const fakeScoreService = {
  async score(frames){
    return frames.length * 7
  }
}
function allwaysFailing(message){
  return {
    async score(){
      throw new Error(message);
    }
  }
}