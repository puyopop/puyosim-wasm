/// Colors used in the field.
#[allow(dead_code)]
#[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
pub enum PuyoColor {
    Empty,
    Ojama,
    Red,
    Green,
    Blue,
    Yellow,
    Purple,
}

/// Bit-based field representation.
#[allow(dead_code)]
#[derive(Default, Clone)]
pub struct BitField;

/// Plain field used for conversions.
#[allow(dead_code)]
#[derive(Default, Clone)]
pub struct PlainField;

/// List of puyos per column.
#[allow(dead_code)]
#[derive(Default, Clone)]
pub struct ColumnPuyoList;

/// Decision of where to place a KumiPuyo.
#[allow(dead_code)]
#[derive(Default, Clone)]
pub struct Decision;

/// Pair of puyos.
#[allow(dead_code)]
#[derive(Default, Clone)]
pub struct Kumipuyo;

/// Position on the field.
#[allow(dead_code)]
#[derive(Default, Clone)]
pub struct Position {
    pub x: i32,
    pub y: i32,
}

/// Bit mask for marking cells.
#[allow(dead_code)]
#[derive(Default, Clone)]
pub struct FieldBits;

/// Result of chain simulation.
#[allow(dead_code)]
#[derive(Default, Clone)]
pub struct RensaResult;

/// Result of one chain step.
#[allow(dead_code)]
#[derive(Default, Clone)]
pub struct RensaStepResult;

/// Context for continuing simulation from intermediate state.
#[allow(dead_code)]
#[derive(Default, Clone)]
pub struct SimulationContext;

pub const MAP_WIDTH: usize = 6;

/// CoreField represents a field. Without strong reason this should be used
/// for field implementation.
#[allow(dead_code)]
#[derive(Clone)]
pub struct CoreField {
    heights: [i32; MAP_WIDTH],
    bit_field: BitField,
}

impl CoreField {
    /// Constructs an empty CoreField.
    pub fn new() -> Self {
        Self {
            heights: [0; MAP_WIDTH],
            bit_field: BitField::default(),
        }
    }

    /// Creates a CoreField from a puyop.com URL.
    pub fn from_url(_url: &str) -> Self {
        todo!("from_url not implemented")
    }

    /// Creates a CoreField from PlainField.
    pub fn from_plain_field(_pf: &PlainField) -> Self {
        todo!()
    }

    /// Creates a CoreField from BitField.
    pub fn from_bit_field(_bf: &BitField) -> Self {
        todo!()
    }

    /// Creates a CoreField from PlainField and drops floating puyos.
    pub fn from_plain_field_with_drop(_pf: &PlainField) -> Self {
        todo!()
    }

    /// Gets a color of puyo at a specified position.
    pub fn color(&self, _x: i32, _y: i32) -> PuyoColor {
        todo!()
    }

    /// Returns true if puyo on (x, y) is |c|.
    pub fn is_color(&self, _x: i32, _y: i32, _c: PuyoColor) -> bool {
        todo!()
    }

    /// Returns true if puyo on (x, y) is empty.
    pub fn is_empty(&self, _x: i32, _y: i32) -> bool {
        todo!()
    }

    /// Returns true if puyo on (x, y) is a normal color.
    pub fn is_normal_color(&self, _x: i32, _y: i32) -> bool {
        todo!()
    }

    /// Returns the height of the specified column.
    pub fn height(&self, x: usize) -> i32 {
        self.heights[x]
    }

    /// Returns internal bit field representation.
    pub fn bit_field(&self) -> &BitField {
        &self.bit_field
    }

    /// Converts this field to PlainField.
    pub fn to_plain_field(&self) -> PlainField {
        todo!()
    }

    /// Returns true if the field does not have any puyo. Valid only all puyos are dropped.
    pub fn is_zenkeshi(&self) -> bool {
        todo!()
    }

    /// Counts the number of color puyos.
    pub fn count_color_puyos(&self) -> i32 {
        todo!()
    }

    /// Counts all puyos including ojama.
    pub fn count_puyos(&self) -> i32 {
        todo!()
    }

    /// Counts the specified color.
    pub fn count_color(&self, _c: PuyoColor) -> i32 {
        todo!()
    }

    /// Returns the number of puyos connected to (x, y).
    pub fn count_connected_puyos(&self, _x: i32, _y: i32) -> i32 {
        todo!()
    }

    /// Same as count_connected_puyos but with a checked bitmap.
    pub fn count_connected_puyos_with_checked(
        &self,
        _x: i32,
        _y: i32,
        _checked: &mut FieldBits,
    ) -> i32 {
        todo!()
    }

    /// Fast count connected puyos. If >=4, any value >=4 may be returned.
    pub fn count_connected_puyos_max4(&self, _x: i32, _y: i32) -> i32 {
        todo!()
    }

    /// Same as above with specified color.
    pub fn count_connected_puyos_max4_with_color(&self, _x: i32, _y: i32, _c: PuyoColor) -> i32 {
        todo!()
    }

    /// Returns true if color(x, y) is connected in some direction.
    pub fn is_connected_puyo(&self, _x: i32, _y: i32) -> bool {
        todo!()
    }

    /// Same as above with specified color.
    pub fn is_connected_puyo_with_color(&self, _x: i32, _y: i32, _c: PuyoColor) -> bool {
        todo!()
    }

    /// Returns true if there is an empty neighbor of (x, y).
    pub fn has_empty_neighbor(&self, _x: i32, _y: i32) -> bool {
        todo!()
    }

    /// Returns the number of empty unreachable spaces.
    pub fn count_unreachable_spaces(&self) -> i32 {
        todo!()
    }

    /// Returns the number of reachable spaces.
    pub fn count_reachable_spaces(&self) -> i32 {
        todo!()
    }

    /// Counts 2- and 3-chain connections.
    pub fn count_connection(&self, _count2: &mut i32, _count3: &mut i32) {
        todo!()
    }

    /// Returns the ridge height of column |x|.
    pub fn ridge_height(&self, _x: i32) -> i32 {
        todo!()
    }

    /// Returns the valley depth of column |x|.
    pub fn valley_depth(&self, _x: i32) -> i32 {
        todo!()
    }

    /// Drops kumipuyo with decision.
    pub fn drop_kumipuyo(&mut self, _decision: &Decision, _kp: &Kumipuyo) -> bool {
        todo!()
    }

    /// Returns frames to drop the next KumiPuyo. Does not drop.
    pub fn frames_to_drop_next(&self, _decision: &Decision) -> i32 {
        todo!()
    }

    /// Returns true if decision will cause chigiri.
    pub fn is_chigiri_decision(&self, _decision: &Decision) -> bool {
        todo!()
    }

    /// Falls ojama puyos by given lines. Returns frame to fall.
    pub fn fall_ojama(&mut self, _lines: i32) -> i32 {
        todo!()
    }

    /// Places a puyo on the top of column |x|.
    /// Returns true if succeeded; false otherwise.
    pub fn drop_puyo_on(&mut self, x: i32, pc: PuyoColor) -> bool {
        self.drop_puyo_on_with_max_height(x, pc, 13)
    }

    /// Places a puyo on column |x| with maximum height limit.
    pub fn drop_puyo_on_with_max_height(
        &mut self,
        _x: i32,
        _pc: PuyoColor,
        _max_height: i32,
    ) -> bool {
        todo!()
    }

    /// Drop all puyos in cpl. Returns false if failed.
    pub fn drop_puyo_list(&mut self, cpl: &ColumnPuyoList) -> bool {
        self.drop_puyo_list_with_max_height(cpl, 13)
    }

    /// Drop puyos with maximum height limit.
    pub fn drop_puyo_list_with_max_height(
        &mut self,
        _cpl: &ColumnPuyoList,
        _max_height: i32,
    ) -> bool {
        todo!()
    }

    /// Removes the puyo from top of column |x|. Undefined if none.
    pub fn remove_puyo_from(&mut self, _x: i32) {
        todo!()
    }

    /// Inserts positions whose puyo color is same as c and connected to (x, y).
    pub fn fill_same_color_position(
        &self,
        _x: i32,
        _y: i32,
        _c: PuyoColor,
        position_queue_head: &mut [Position],
        _checked: &mut FieldBits,
    ) -> usize {
        let _ = position_queue_head;
        todo!()
    }

    /// Fills the positions where puyo is vanished in the 1-rensa.
    pub fn fill_erasing_puyo_positions(&self, _positions: &mut [Position]) -> i32 {
        todo!()
    }

    /// TODO(mayah): Remove this.
    pub fn erasing_puyo_positions(&self) -> Vec<Position> {
        todo!()
    }

    /// Returns the ignition puyo bits.
    pub fn ignition_puyo_bits(&self) -> FieldBits {
        todo!()
    }

    /// TODO(mayah): Remove this.
    /// TODO(mayah): Remove this.
    pub fn rensa_will_occur_when_last_decision_is(&self, _d: &Decision) -> bool {
        todo!()
    }

    pub fn rensa_will_occur(&self) -> bool {
        todo!()
    }

    /// Simulates chains. Returns RensaResult.
    pub fn simulate(&mut self, _initial_chain: i32) -> RensaResult {
        todo!()
    }

    /// Simulates chains with SimulationContext.
    pub fn simulate_with_context(&mut self, _context: &mut SimulationContext) -> RensaResult {
        todo!()
    }

    /// Simulates chains with Tracker.
    pub fn simulate_with_tracker<T>(&mut self, _tracker: &mut T) -> RensaResult {
        todo!()
    }

    /// Simulates chains with SimulationContext and Tracker.
    pub fn simulate_full<T>(
        &mut self,
        _context: &mut SimulationContext,
        _tracker: &mut T,
    ) -> RensaResult {
        todo!()
    }

    pub fn simulate_fast(&mut self) -> i32 {
        todo!()
    }

    pub fn simulate_fast_with_tracker<T>(&mut self, _tracker: &mut T) -> i32 {
        todo!()
    }

    pub fn vanish_drop(&mut self) -> RensaStepResult {
        todo!()
    }

    pub fn vanish_drop_with_context(
        &mut self,
        _context: &mut SimulationContext,
    ) -> RensaStepResult {
        todo!()
    }

    pub fn vanish_drop_with_tracker<T>(&mut self, _tracker: &mut T) -> RensaStepResult {
        todo!()
    }

    pub fn vanish_drop_full<T>(
        &mut self,
        _context: &mut SimulationContext,
        _tracker: &mut T,
    ) -> RensaStepResult {
        todo!()
    }

    pub fn vanish_drop_fast(&mut self) -> bool {
        todo!()
    }

    pub fn vanish_drop_fast_with_context(&mut self, _context: &mut SimulationContext) -> bool {
        todo!()
    }

    pub fn vanish_drop_fast_with_tracker<T>(&mut self, _tracker: &mut T) -> bool {
        todo!()
    }

    pub fn vanish_drop_fast_full<T>(
        &mut self,
        _context: &mut SimulationContext,
        _tracker: &mut T,
    ) -> bool {
        todo!()
    }

    pub fn hash(&self) -> usize {
        todo!()
    }

    pub fn to_debug_string(&self) -> String {
        todo!()
    }

    /// TODO(mayah): Remove this.
    pub fn set_puyo_and_height(&mut self, _x: i32, _y: i32, _c: PuyoColor) {
        todo!()
    }
}
