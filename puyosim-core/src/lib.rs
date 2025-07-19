pub mod field;
pub mod puyo;
pub mod simulation;

pub use field::Field;
pub use puyo::Puyo;
pub use simulation::{simulate_chains, ChainResult};

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn empty_field_has_no_chains() {
        let mut field = Field::default();
        let result = simulate_chains(&mut field);
        assert_eq!(result.chains, 0);
        assert_eq!(result.score, 0);
    }
}
