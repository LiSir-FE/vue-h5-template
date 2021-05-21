export function GetParam(url, code) {
  url = url + ''
  const regstr = '/(\\?|\\&)' + code + '=([^\\&]+)/'
  // eslint-disable-next-line no-eval
  const reg = eval(regstr)
  // eval可以将 regstr字符串转换为 正则表达式
  const result = url.match(reg)
  if (result && result[2]) {
    return result[2]
  }
}
