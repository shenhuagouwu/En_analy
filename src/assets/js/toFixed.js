// toFixed 修复
function toFixed(num, s) {
  var times = Math.pow(10, s)
  var des = num * times + 0.5
  des = parseInt(des, 10) / times
  return des + ''
}
export default toFixed;