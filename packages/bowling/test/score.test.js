const { score, isScorable } = require('../src/score.mjs');
const { strictEqual } = require('assert');

describe('score', ()=>{
  it('scores 12 strikes correctly', ()=>{
    const result = score(Array(12).fill(10))
    strictEqual(300, result.totalScore)
  })

  it('works', ()=>{
    const input = [
      10,
      7,3,
      7,2,
      9,1,
      10,
      10,
      10,
      2,3,
      6,4,
      7,3,3
    ];
    const result = score(input)
    strictEqual(152, result.totalScore)
  })


  describe('isScorable', ()=>{
    it('should be able to score a strike', ()=>{
      strictEqual(false, isScorable([10]))
      strictEqual(false, isScorable([10, 4]))
      strictEqual(true, isScorable([10, 10, 2]))
      strictEqual(true, isScorable([10, 4, 2]))
    })

    it('should be able to score a spare', ()=>{
      strictEqual(false, isScorable([4, 6	]))
      strictEqual(false, isScorable([5, 5]))
      strictEqual(true, isScorable([10, 0, 2]))
      strictEqual(true, isScorable([5, 5, 2]))
    })
  })
})