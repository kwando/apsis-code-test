const playGame = require('../src/playGame');
const { strictEqual, throws } = require('assert');

describe('playGame', ()=>{
    it('scores an empty game', async () => {
      const { score, error } = playGame({frames: []})
      strictEqual(0, score);
      strictEqual(undefined, error)
    })

    it('scores an unfinished game', async () => {
      const { score, error } = playGame({frames: [
        {first: 10, second: 0}, 
        {first: 10, second: 0}, 
        {first: 5, second: 5}]})
      strictEqual(45, score);
      strictEqual(undefined, error)
    })

  it('rejects a bad game', async () => {
    const { score, error } = playGame({frames: [{first: 3, second: 8}]});
    strictEqual(undefined, score);
    strictEqual(error, "frame 1 is invalid")
  })

  it('scores an all strike game', async () => {
    const { score, error } = playGame({frames: [
      {first: 10, second: 0},
      {first: 10, second: 0},
      {first: 10, second: 0},
      {first: 10, second: 0},
      {first: 10, second: 0},
      {first: 10, second: 0},
      {first: 10, second: 0},
      {first: 10, second: 0},
      {first: 10, second: 0},
      {first: 10, second: 10, third: 10},
    ]})
    strictEqual(300, score)
    strictEqual(undefined, error)
  })

  it('ignores third ball if in the last frame when not needed', async () => {
    const { score, error } = playGame({frames: [
      {first: 0, second: 0},
      {first: 0, second: 0},
      {first: 0, second: 0},
      {first: 0, second: 0},
      {first: 0, second: 0},
      {first: 0, second: 0},
      {first: 0, second: 0},
      {first: 0, second: 0},
      {first: 0, second: 0},
      {first: 5, second: 4, third: 10},
    ]})
    strictEqual(9, score)
    strictEqual(undefined, error)
  })

  it('should fail if last frame needs the third ball', async () => {
    const frames = [
      {first: 0, second: 0},
      {first: 0, second: 0},
      {first: 0, second: 0},
      {first: 0, second: 0},
      {first: 0, second: 0},
      {first: 0, second: 0},
      {first: 0, second: 0},
      {first: 0, second: 0},
      {first: 0, second: 0},
      {first: 5, second: 5},
    ]
    const { score, error } = playGame({ frames });
    strictEqual(undefined, score)
    strictEqual("frame 10 is invalid", error)
  })
})
