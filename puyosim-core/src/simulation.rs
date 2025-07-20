use crate::field::Field;

/// Result of a chain simulation.
#[derive(Debug, Default, PartialEq, Eq)]
pub struct ChainResult {
    pub chains: u32,
    pub score: u32,
}

/// Simulate chains on the given field.
///
/// This is currently a placeholder implementation.
pub fn simulate_chains(_field: &mut Field) -> ChainResult {
    // TODO: implement chain reaction logic
    ChainResult {
        chains: 0,
        score: 0,
    }
}
