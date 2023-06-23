let nonAlphaRegex = /\W/g
let underscore = /_/g 

function palindrome(str) {
  str = str.replace(nonAlphaRegex,'');
  str = str.replace(underscore,'');
  str = str.toLowerCase();
  let len = str.length;
  for (let i = 0; i < len/2; i++) {
    if (str[i] !== str[len - i - 1]) {
      return false
    }
  } return true
}

palindrome("_eye");