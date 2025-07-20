use crate::puyo::Puyo;

#[derive(Clone, Debug)]
pub struct Field {
    pub width: usize,
    pub height: usize,
    cells: Vec<Option<Puyo>>,
}

impl Field {
    pub fn new(width: usize, height: usize) -> Self {
        Self {
            width,
            height,
            cells: vec![None; width * height],
        }
    }

    pub fn index(&self, x: usize, y: usize) -> usize {
        y * self.width + x
    }

    pub fn get(&self, x: usize, y: usize) -> Option<Puyo> {
        self.cells[self.index(x, y)]
    }

    pub fn set(&mut self, x: usize, y: usize, puyo: Option<Puyo>) {
        let idx = self.index(x, y);
        self.cells[idx] = puyo;
    }
}

impl Default for Field {
    fn default() -> Self {
        Self::new(6, 13)
    }
}
