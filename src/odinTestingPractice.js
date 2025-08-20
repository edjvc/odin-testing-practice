function capitalize(string) {
  if (string === '') return '';
  const array = string.split('');
  array[0] = array[0].toUpperCase();
  return array.join('');
}

function reverseString(string) {
  const array = string.split('');
  const reverseArray = [];
  for (const item of array) {
    reverseArray.unshift(item);
  }
  return reverseArray.join('');
}

const calculator = {
  add(a, b) {
    return a + b;
  },
  subtract(a, b) {
    return a - b;
  },
  divide(a, b) {
    return Math.floor((a / b) * 10) / 10;
  },
  multiply(a, b) {
    return a * b;
  },
};

// lowercase charCode start from 97, uppercase start from 65;
function caesarCipher(string, shiftNumber) {
  if (!Number.isInteger(shiftNumber) || shiftNumber < 0) return false;

  const lowercase = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode(97 + i)
  );

  const uppercase = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode(65 + i)
  );

  const array = string.split('');

  const shiftedArray = array.map((item) => {
    const lowercaseIndex = lowercase.findIndex((val) => val === item);
    const uppercaseIndex = uppercase.findIndex((val) => val === item);

    if (lowercaseIndex !== -1) {
      const newIndex = (lowercaseIndex + shiftNumber) % 26;
      const newChar = lowercase[newIndex];
      return newChar;
    } else if (uppercaseIndex !== -1) {
      const newIndex = (uppercaseIndex + shiftNumber) % 26;
      const newChar = uppercase[newIndex];
      return newChar;
    } else return item;
  });

  return shiftedArray.join('');
}

// map version
// function caesarCipher(string, shiftNumber) {
//   if (!Number.isInteger(shiftNumber)) return false;

//   const lowercase = Array.from({ length: 26 }, (_, i) =>
//     String.fromCharCode(97 + i)
//   );
//   const uppercase = Array.from({ length: 26 }, (_, i) =>
//     String.fromCharCode(65 + i)
//   );

//   // 建立查表
//   const lowerMap = new Map(lowercase.map((ch, i) => [ch, i]));
//   const upperMap = new Map(uppercase.map((ch, i) => [ch, i]));

//   // 處理 shift，支援負數
//   const shift = ((shiftNumber % 26) + 26) % 26;

//   return string
//     .split('')
//     .map((ch) => {
//       if (lowerMap.has(ch)) {
//         const newIndex = (lowerMap.get(ch) + shift) % 26;
//         return lowercase[newIndex];
//       } else if (upperMap.has(ch)) {
//         const newIndex = (upperMap.get(ch) + shift) % 26;
//         return uppercase[newIndex];
//       } else {
//         return ch; // 非字母原樣保留
//       }
//     })
//     .join('');
// }

function analyzeArray(array) {
  const average =
    Math.floor(
      (array.reduce((acc, cur) => acc + cur, 0) / array.length) * 1000
    ) / 1000;
  const min = Math.min(...array);
  const max = Math.max(...array);
  const length = array.length;

  return { average, min, max, length };
}

export { capitalize, reverseString, calculator, caesarCipher, analyzeArray };
