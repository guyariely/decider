// '÷', '×'
// let equation = "78-2-2+8×5+4÷2+2+2";

// let equation_1 = equation.split('').map((char) => {
//   if (char == '×') return '*';
//   else if (char == '÷') return '/';
//   return char;
// });

let equation = "*2";

try {
  let equation_2 = equation.replace(/×/g, '*').replace(/÷/g, '/');
  console.log(eval(equation_2));
} catch (error) {
  console.log("Invalid Syntax");
}





