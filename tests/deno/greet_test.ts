import { assertEquals } from 'https://deno.land/std@0.208.0/assert/mod.ts';
import { greet } from '../../pkg-deno/hello_wasm.js';

Deno.test('greet function', () => {
  const result = greet('World');
  assertEquals(result, 'Hello, World! from Rust WebAssembly');
});

Deno.test('greet function with empty string', () => {
  const result = greet('');
  assertEquals(result, 'Hello, ! from Rust WebAssembly');
});

Deno.test('greet function with different name', () => {
  const result = greet('Deno');
  assertEquals(result, 'Hello, Deno! from Rust WebAssembly');
});
