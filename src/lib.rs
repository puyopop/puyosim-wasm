use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern "C" {
    fn alert(s: &str);

    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
}

macro_rules! console_log {
    ($($t:tt)*) => ({
        #[cfg(not(test))]
        log(&format_args!($($t)*).to_string());
    });
}

// Internal functions for business logic (testable)
pub fn greet_internal(name: &str) -> String {
    format!("Hello, {name}! from Rust WebAssembly")
}

pub fn add_internal(a: i32, b: i32) -> i32 {
    a + b
}

// WebAssembly exports
#[wasm_bindgen]
pub fn greet(name: &str) -> String {
    console_log!("greet関数が呼ばれました: {}", name);
    greet_internal(name)
}

#[wasm_bindgen]
pub fn add(a: i32, b: i32) -> i32 {
    console_log!("add関数が呼ばれました: {} + {}", a, b);
    add_internal(a, b)
}

// Internal Calculator for business logic (testable)
pub struct CalculatorInternal {
    value: i32,
}

impl Default for CalculatorInternal {
    fn default() -> Self {
        Self::new()
    }
}

impl CalculatorInternal {
    pub fn new() -> CalculatorInternal {
        CalculatorInternal { value: 0 }
    }

    pub fn add(&mut self, amount: i32) {
        self.value += amount;
    }

    pub fn get_value(&self) -> i32 {
        self.value
    }
}

// WebAssembly exports
#[wasm_bindgen]
pub struct Calculator {
    internal: CalculatorInternal,
}

impl Default for Calculator {
    fn default() -> Self {
        Self::new()
    }
}

#[wasm_bindgen]
impl Calculator {
    #[wasm_bindgen(constructor)]
    pub fn new() -> Calculator {
        console_log!("Calculatorが初期化されました");
        Calculator {
            internal: CalculatorInternal::new(),
        }
    }

    pub fn add(&mut self, amount: i32) {
        console_log!("Calculatorに{}を加算します", amount);
        self.internal.add(amount);
    }

    pub fn get_value(&self) -> i32 {
        console_log!("現在の値を取得します: {}", self.internal.value);
        self.internal.get_value()
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_greet_with_name() {
        let result = greet_internal("World");
        assert_eq!(result, "Hello, World! from Rust WebAssembly");
    }

    #[test]
    fn test_greet_with_empty_string() {
        let result = greet_internal("");
        assert_eq!(result, "Hello, ! from Rust WebAssembly");
    }

    #[test]
    fn test_greet_with_japanese() {
        let result = greet_internal("太郎");
        assert_eq!(result, "Hello, 太郎! from Rust WebAssembly");
    }

    #[test]
    fn test_add_positive_numbers() {
        assert_eq!(add_internal(2, 3), 5);
        assert_eq!(add_internal(10, 20), 30);
    }

    #[test]
    fn test_add_negative_numbers() {
        assert_eq!(add_internal(-5, 3), -2);
        assert_eq!(add_internal(-10, -20), -30);
    }

    #[test]
    fn test_add_with_zero() {
        assert_eq!(add_internal(0, 5), 5);
        assert_eq!(add_internal(5, 0), 5);
        assert_eq!(add_internal(0, 0), 0);
    }

    #[test]
    fn test_calculator_new() {
        let calc = CalculatorInternal::new();
        assert_eq!(calc.get_value(), 0);
    }

    #[test]
    fn test_calculator_add() {
        let mut calc = CalculatorInternal::new();
        calc.add(10);
        assert_eq!(calc.get_value(), 10);

        calc.add(20);
        assert_eq!(calc.get_value(), 30);
    }

    #[test]
    fn test_calculator_add_negative() {
        let mut calc = CalculatorInternal::new();
        calc.add(-5);
        assert_eq!(calc.get_value(), -5);

        calc.add(10);
        assert_eq!(calc.get_value(), 5);
    }

    #[test]
    fn test_calculator_multiple_operations() {
        let mut calc = CalculatorInternal::new();
        calc.add(100);
        calc.add(-30);
        calc.add(50);
        assert_eq!(calc.get_value(), 120);
    }
}
