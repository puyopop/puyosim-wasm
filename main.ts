import { add, Calculator, greet } from './pkg-deno/hello_wasm.js';

console.log(greet('World'));
console.log(`1 + 2 = ${add(1, 2)}`);

const calc = new Calculator();
calc.add(10);
calc.add(20);
console.log(`Calculator result: ${calc.get_value()}`);
