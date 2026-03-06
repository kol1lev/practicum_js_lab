// лк 1 зд 2

// const arr = [1, 2, 3, 4, 5];
// const newarr = [...arr.slice(2),
//     100,
//     200,
//     ...arr.slice(4, 4)
// ];

// console.log(newarr);


// лк 1 зд 3
// const arr = [2, 2, 4, 1, 6, 12]
// const newarr = arr.map((item, index) => {
//     if (index != 0 && index != arr.length - 1) return (arr[index - 1] + item + arr[index + 1]) / 3;
//     if (index == 0) return (arr[index + 1] + item) / 2;
//     return (arr[index - 1] + item) / 2
// });

// console.log(newarr);

// лк 1 зд 5
// const arr = [2, 2, 4, 8, 6, 12]
// const minel = arr.reduce((mini, item) => item < mini ? item : mini);
// console.log(minel);

// лк 1 зд 6
// const add = (a, b) => a + b;
// const mult = (a, b) => a * b;

// const groupArr(func, ...args) => args.reduce((accum, item) => func(accum, item));

// лк 1 зд 7
// let guests = ['petr', 'ivan', 'alina', 'olga', 'matvey'];

// const search = (users, newUser) => {
//   const arr = users.filter(item => item === newUser);
//   if (arr.length === 0) {
//     return [...users, newUser];
//   }

//   return [...users];
// }

const tostr = function(...args) {
    const filtred = args.filter((item, index) => index === args.indexOf(item))
    .reduce((accum, item) => accum +  " " + (String(item).length === (new Set(String(item))).size ? String(item) : ''), '');
    return filtred;
}

