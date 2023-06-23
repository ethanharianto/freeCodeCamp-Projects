const currencyTable = {
    "PENNY": 1,
    "NICKEL": 5,
    "DIME": 10,
    "QUARTER": 25,
    "ONE": 100,
    "FIVE": 500,
    "TEN": 1000,
    "TWENTY": 2000,
    "ONE HUNDRED": 10000
  }
  
  
  function checkCashRegister(price, cash, cid) {
  
    let change_amount = cash * 100 - price * 100;
    let change_check = change_amount;
    let change = {};
    let change_list = []
    let cidSum = 0;
    let filteredCid = cid.filter(elem => elem[1] !== 0).reverse();
  
    filteredCid.forEach(elem => {
      let current = elem[0] ;
      let currencySum = elem[1] * 100;
      cidSum += currencySum;
      let amount = 0;
      while (change_amount >= currencyTable[current] && currencySum > 0) {
        amount += currencyTable[current];
        change_amount -= currencyTable[current];
        currencySum -= currencyTable[current];
      }
      if (amount !== 0) {
        change_list.push([current, amount / 100]);
      }
    });
  
    if (change_amount > 0) {
      change['status'] = 'INSUFFICIENT_FUNDS';
      change_list = [];
    } else if (change_amount == 0 && change_check == cidSum) {
      change['status'] = 'CLOSED';
      change_list = cid;
    } else {
      change['status'] = 'OPEN';
    }
    change['change'] = change_list
    return(change);
  }