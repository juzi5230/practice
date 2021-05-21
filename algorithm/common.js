/**
 给一非空的单词列表，返回前 k 个出现次数最多的单词。

返回的答案应该按单词出现频率由高到低排序。如果不同的单词有相同出现频率，按字母顺序排序。

示例 1：

输入: ["i", "love", "leetcode", "i", "love", "coding"], k = 2
输出: ["i", "love"]
解析: "i" 和 "love" 为出现次数最多的两个单词，均为2次。
    注意，按字母顺序 "i" 在 "love" 之前。

链接：https://leetcode-cn.com/problems/top-k-frequent-words
*/
/**
 * 
 * @param {Array} words 需要比较的数组
 * @param {*} k 筛选出的元素个数
 * @returns 
 */
var topKFrequent = function(words, k) {
  let map = new Map()
  let arr = words.sort()
  arr.forEach(item => {
    if(map.has(item)) {
      let count = map.get(item)
      map.set(item, ++count)
    } else {
      map.set(item, 1)
    }
  })
  let ent = [...map.entries()].sort((a, b) => {
    return b[1] - a[1]
  })
  let result = []
  for(let i = 0; i < k; i++) {
    result.push(ent[i][0])
  }
  return result
};


/**
 * 给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度。
 * 示例 1:

 * 输入: s = "abcabcbb"
 * 输出: 3 
 * 解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
 * 
 * 来源：力扣（LeetCode）
 * 链接：https://leetcode-cn.com/problems/longest-substring-without-repeating-characters
*/

// 除了暴力 循环的思路之外，看了题解才做出来的一道题 ！！！！！！！！！！！！！！！！！！！！！！！！！！！！

/**
 * @param {string} s
 * @return {number}
 */
 var lengthOfLongestSubstring = function(s) {
    let codeSet = new Set()
    let n = s.length
    let ans = 0
    let end = 0
    for(let i = 0; i < n; i++) {
      if(i) {
        codeSet.delete(s.charAt(i -1))
      }
      while(end < n && !codeSet.has(s.charAt(end))) {
        codeSet.add(s.charAt(end))
        end++
      }
      ans = Math.max(ans, end - i)
    }
    return ans
  };

 

