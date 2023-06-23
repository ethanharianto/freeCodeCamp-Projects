function convertToRoman(num) {
    let letter = ''
    while (num - 1000 >= 0) {
      letter += 'M'
      num -= 1000
    }
     while (num - 900 >= 0) {
      letter += 'CM'
      num -= 900
    }
     while (num - 500 >= 0) {
      letter += 'D'
      num -= 500
    }
     while (num - 400 >= 0) {
      letter += 'CD'
      num -= 400
    }
     while (num - 100 >= 0) {
      letter += 'C'
      num -= 100
    }
     while (num - 90 >= 0) {
      letter += 'XC'
      num -= 90
    }
     while (num - 50 >= 0) {
      letter += 'L'
      num -= 50
    }
     while (num - 40 >= 0) {
      letter += 'XL'
      num -= 40
    }
     while (num - 10 >= 0) {
      letter += 'X'
      num -= 10
    }
     while (num - 9 >= 0) {
      letter += 'IX'
      num -= 9
    }
     while (num - 5 >= 0) {
      letter += 'V'
      num -= 5
    }
     while (num - 4 >= 0) {
      letter += 'IV'
      num -= 4
    }
     while (num - 1 >= 0) {
      letter += 'I'
      num -= 1
    }
    return letter;
   }
   
   convertToRoman(36);