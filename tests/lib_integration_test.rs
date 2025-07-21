use hello_wasm::{add_internal, greet_internal, CalculatorInternal};

#[test]
fn test_greet_and_add_integration() {
    // Test that greet and add functions work together
    let name = "Calculator";
    let greeting = greet_internal(name);

    assert_eq!(greeting, "Hello, Calculator! from Rust WebAssembly");

    // Use add function to calculate some values
    let result1 = add_internal(5, 10);
    let result2 = add_internal(result1, 15);

    assert_eq!(result1, 15);
    assert_eq!(result2, 30);
}

#[test]
fn test_calculator_with_add_function_integration() {
    // Test CalculatorInternal struct with add_internal function
    let mut calc = CalculatorInternal::new();

    // Use add_internal function to get values, then add them to calculator
    let value1 = add_internal(10, 20);
    let value2 = add_internal(5, 15);

    calc.add(value1);
    calc.add(value2);

    assert_eq!(calc.get_value(), 50); // 30 + 20 = 50
}

#[test]
fn test_calculator_operations_sequence() {
    // Test multiple calculator operations in sequence
    let mut calc1 = CalculatorInternal::new();
    let mut calc2 = CalculatorInternal::new();

    calc1.add(100);
    calc1.add(-30);

    calc2.add(50);
    calc2.add(20);

    // Combine results using add_internal function
    let final_result = add_internal(calc1.get_value(), calc2.get_value());

    assert_eq!(calc1.get_value(), 70);
    assert_eq!(calc2.get_value(), 70);
    assert_eq!(final_result, 140);
}

#[test]
fn test_greet_with_calculator_values() {
    // Test greeting with values from calculator
    let mut calc = CalculatorInternal::new();
    calc.add(42);

    let value = calc.get_value();
    let name = format!("User{}", value);
    let greeting = greet_internal(&name);

    assert_eq!(greeting, "Hello, User42! from Rust WebAssembly");
}

#[test]
fn test_multiple_calculators_interaction() {
    // Test interaction between multiple calculator instances
    let mut calc_a = CalculatorInternal::new();
    let mut calc_b = CalculatorInternal::new();
    let mut calc_c = CalculatorInternal::new();

    calc_a.add(10);
    calc_b.add(calc_a.get_value());
    calc_b.add(5);

    let sum = add_internal(calc_a.get_value(), calc_b.get_value());
    calc_c.add(sum);

    assert_eq!(calc_a.get_value(), 10);
    assert_eq!(calc_b.get_value(), 15);
    assert_eq!(calc_c.get_value(), 25);
}
