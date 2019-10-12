// lib urlChecker.js

/**
 * 檢查網址是否包含 protocol，回傳純 URL String
 */
function checkFormat(input) {
  return /^https?:\/\//.test(input) ? input.split('//')[1] : input
}

/**
 * 檢查是 http or https，回傳 Boolean
 */
function hasSSL(input) {
  return /^https/.test(input)
}

module.exports = { checkFormat, hasSSL }