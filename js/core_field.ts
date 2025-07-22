// Colors used in the field.
export enum PuyoColor {
  Empty,
  Ojama,
  Red,
  Green,
  Blue,
  Yellow,
  Purple,
}

// Bit-based field representation.
export class BitField {}
// Plain field used for conversions.
export class PlainField {}
// List of puyos per column.
export class ColumnPuyoList {}
// Decision of where to place a KumiPuyo.
export class Decision {}
// Pair of puyos.
export class Kumipuyo {}
export interface Position {
  x: number;
  y: number;
}
export class FieldBits {}
export class RensaResult {}
export class RensaStepResult {}
// Context for continuing simulation from intermediate points.
export class SimulationContext {}

/**
 * CoreField represents a field. Without strong reason,
 * this class should be used for field implementation.
 */
export class CoreField {
  private heights: number[] = Array(6).fill(0);
  private bitField: BitField = new BitField();

  /** Constructs an empty CoreField. */
  constructor() {}

  /** Creates a CoreField from a puyop.com URL. */
  static fromUrl(_url: string): CoreField {
    throw new Error('not implemented');
  }

  /** Creates a CoreField from PlainField. */
  static fromPlainField(_pf: PlainField): CoreField {
    throw new Error('not implemented');
  }

  /** Creates a CoreField from BitField. */
  static fromBitField(_bf: BitField): CoreField {
    throw new Error('not implemented');
  }

  /** Creates a CoreField from PlainField and drops floating puyos. */
  static fromPlainFieldWithDrop(_pf: PlainField): CoreField {
    throw new Error('not implemented');
  }

  /** Gets a color of puyo at a specified position. */
  color(_x: number, _y: number): PuyoColor {
    throw new Error('not implemented');
  }

  /** Returns true if puyo on (x, y) is `c`. */
  isColor(_x: number, _y: number, _c: PuyoColor): boolean {
    throw new Error('not implemented');
  }

  /** Returns true if puyo on (x, y) is empty. */
  isEmpty(_x: number, _y: number): boolean {
    throw new Error('not implemented');
  }

  /** Returns true if puyo on (x, y) is a normal color. */
  isNormalColor(_x: number, _y: number): boolean {
    throw new Error('not implemented');
  }

  height(x: number): number {
    return this.heights[x];
  }

  /** Returns internal BitField representation. */
  bitFieldRef(): BitField {
    return this.bitField;
  }

  /** Converts this field to PlainField. */
  toPlainField(): PlainField {
    throw new Error('not implemented');
  }

  /** Returns true if the field does not have any puyo. Valid only all puyos are dropped. */
  isZenkeshi(): boolean {
    throw new Error('not implemented');
  }

  /** Counts the number of color puyos. */
  countColorPuyos(): number {
    throw new Error('not implemented');
  }

  /** Counts all puyos including ojama. */
  countPuyos(): number {
    throw new Error('not implemented');
  }

  /** Counts the specified color. */
  countColor(_c: PuyoColor): number {
    throw new Error('not implemented');
  }

  /** Returns the number of puyos connected to (x, y). */
  countConnectedPuyos(_x: number, _y: number): number {
    throw new Error('not implemented');
  }

  /** Same as countConnectedPuyos but with a checked bitmap. */
  countConnectedPuyosWithChecked(
    _x: number,
    _y: number,
    _checked: FieldBits,
  ): number {
    throw new Error('not implemented');
  }

  /** Fast count connected puyos. If >=4, any value >=4 may be returned. */
  countConnectedPuyosMax4(_x: number, _y: number): number {
    throw new Error('not implemented');
  }

  /** Same as above with specified color. */
  countConnectedPuyosMax4WithColor(
    _x: number,
    _y: number,
    _c: PuyoColor,
  ): number {
    throw new Error('not implemented');
  }

  /** Returns true if color(x, y) is connected in some direction. */
  isConnectedPuyo(_x: number, _y: number): boolean {
    throw new Error('not implemented');
  }

  /** Same as above with specified color. */
  isConnectedPuyoWithColor(_x: number, _y: number, _c: PuyoColor): boolean {
    throw new Error('not implemented');
  }

  /** Returns true if there is an empty neighbor of (x, y). */
  hasEmptyNeighbor(_x: number, _y: number): boolean {
    throw new Error('not implemented');
  }

  /** Returns the number of empty unreachable spaces. */
  countUnreachableSpaces(): number {
    throw new Error('not implemented');
  }

  /** Returns the number of reachable spaces. */
  countReachableSpaces(): number {
    throw new Error('not implemented');
  }

  countConnection(
    _count2: { value: number },
    _count3: { value: number },
  ): void {
    throw new Error('not implemented');
  }

  /** Returns the ridge height of column `x`. */
  ridgeHeight(_x: number): number {
    throw new Error('not implemented');
  }

  /** Returns the valley depth of column `x`. */
  valleyDepth(_x: number): number {
    throw new Error('not implemented');
  }

  /** Drops kumipuyo with decision. */
  dropKumipuyo(_decision: Decision, _kp: Kumipuyo): boolean {
    throw new Error('not implemented');
  }

  /** Returns frames to drop the next KumiPuyo. Does not drop. */
  framesToDropNext(_decision: Decision): number {
    throw new Error('not implemented');
  }

  /** Returns true if decision will cause chigiri. */
  isChigiriDecision(_decision: Decision): boolean {
    throw new Error('not implemented');
  }

  /** Falls ojama puyos lines lines. Returns the frame to fall. */
  fallOjama(_lines: number): number {
    throw new Error('not implemented');
  }

  dropPuyoOn(x: number, pc: PuyoColor): boolean {
    return this.dropPuyoOnWithMaxHeight(x, pc, 13);
  }

  /** Places a puyo on column `x` with maximum height limit. */
  dropPuyoOnWithMaxHeight(
    _x: number,
    _pc: PuyoColor,
    _maxHeight: number,
  ): boolean {
    throw new Error('not implemented');
  }

  dropPuyoList(cpl: ColumnPuyoList): boolean {
    return this.dropPuyoListWithMaxHeight(cpl, 13);
  }

  /** Drop puyos with maximum height limit. */
  dropPuyoListWithMaxHeight(_cpl: ColumnPuyoList, _maxHeight: number): boolean {
    throw new Error('not implemented');
  }

  /** Removes the puyo from top of column `x`. Undefined if none. */
  removePuyoFrom(_x: number): void {
    throw new Error('not implemented');
  }

  /** Inserts positions whose puyo color is the same as `c` and connected to (x, y). */
  fillSameColorPosition(
    _x: number,
    _y: number,
    _c: PuyoColor,
    _queue: Position[],
    _checked: FieldBits,
  ): number {
    throw new Error('not implemented');
  }

  /** Fills the positions where puyo is vanished in the 1-rensa. */
  fillErasingPuyoPositions(_positions: Position[]): number {
    throw new Error('not implemented');
  }

  /** TODO(mayah): Remove this. */
  erasingPuyoPositions(): Position[] {
    throw new Error('not implemented');
  }

  ignitionPuyoBits(): FieldBits {
    throw new Error('not implemented');
  }

  /** TODO(mayah): Remove this. */
  rensaWillOccurWhenLastDecisionIs(_d: Decision): boolean {
    throw new Error('not implemented');
  }

  rensaWillOccur(): boolean {
    throw new Error('not implemented');
  }

  /** Simulates chains. Returns RensaResult. */
  simulate(_initialChain = 1): RensaResult {
    throw new Error('not implemented');
  }

  /** Simulates chains with SimulationContext. */
  simulateWithContext(_context: SimulationContext): RensaResult {
    throw new Error('not implemented');
  }

  /** Simulates chains with Tracker. */
  simulateWithTracker<T>(_tracker: T): RensaResult {
    throw new Error('not implemented');
  }

  /** Simulates chains with SimulationContext and Tracker. */
  simulateFull<T>(_context: SimulationContext, _tracker: T): RensaResult {
    throw new Error('not implemented');
  }

  simulateFast(): number {
    throw new Error('not implemented');
  }

  simulateFastWithTracker<T>(_tracker: T): number {
    throw new Error('not implemented');
  }

  vanishDrop(): RensaStepResult {
    throw new Error('not implemented');
  }

  vanishDropWithContext(_context: SimulationContext): RensaStepResult {
    throw new Error('not implemented');
  }

  vanishDropWithTracker<T>(_tracker: T): RensaStepResult {
    throw new Error('not implemented');
  }

  vanishDropFull<T>(_context: SimulationContext, _tracker: T): RensaStepResult {
    throw new Error('not implemented');
  }

  vanishDropFast(): boolean {
    throw new Error('not implemented');
  }

  vanishDropFastWithContext(_context: SimulationContext): boolean {
    throw new Error('not implemented');
  }

  vanishDropFastWithTracker<T>(_tracker: T): boolean {
    throw new Error('not implemented');
  }

  vanishDropFastFull<T>(_context: SimulationContext, _tracker: T): boolean {
    throw new Error('not implemented');
  }

  hash(): number {
    throw new Error('not implemented');
  }

  toDebugString(): string {
    throw new Error('not implemented');
  }

  /** TODO(mayah): Remove this. */
  setPuyoAndHeight(_x: number, _y: number, _c: PuyoColor): void {
    throw new Error('not implemented');
  }
}
