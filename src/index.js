module.exports = function check(str, bracketsConfig) {
  let first = [];
  let second = [];
  let storage = [];
  let obj = {};
  let same = [];

  obj = Object.fromEntries(bracketsConfig)

  for (let key of bracketsConfig) {
      first.push(key[0]);
      second.push(key[1]);
      if (first.includes(key[1]) && second.includes(key[0])) {
          first.pop(key[0]);
          second.pop(key[1]);
          same.push(key[0]);
      }
  }


  for (let i = 0; i < str.length; i++) {
      let char = str[i]

      if (first.includes(char)) {
          storage.push(char);
          continue;
      }

      if (same.includes(char)) {
          if (storage[storage.length - 1] != char || storage.length == 0) {
              storage.push(char);
              continue;
          } else if (storage[storage.length - 1] == char) {
              second.push(char);
          }
      }


      if (storage.length === 0) {
          return false;
      }

      if (storage[storage.length - 1] == storage[storage.length - 2] && same.includes(storage[storage.length - 1])) {
          storage.splice(storage.length - 1, 1);
          storage.splice(storage.length - 1, 1);
      }

      let check;
      if (second.includes(char)) {
          check = storage.pop();
          if (obj[check] != char) {
              return false;
          }
      }
  }
  return storage.length === 0;
}