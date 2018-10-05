extern crate bit_vec;
extern crate cfg_if;
extern crate js_sys;
extern crate wasm_bindgen;

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console)]
    fn log(msg: &str);

    #[wasm_bindgen(js_namespace = console)]
    fn time(name: &str);

    #[wasm_bindgen(js_namespace = console)]
    fn timeEnd(name: &str);
}

mod utils;

use bit_vec::BitVec;
use wasm_bindgen::prelude::*;

// A macro to provide `println!(..)`-style syntax for `console.log` logging.
macro_rules! log {
    ($($t:tt)*) => (log(&format!($($t)*)))
}

pub struct Timer<'a> {
    name: &'a str,
}

impl<'a> Timer<'a> {
    pub fn new(name: &'a str) -> Timer<'a> {
        time(name);
        Timer { name }
    }
}

impl<'a> Drop for Timer<'a> {
    fn drop(&mut self) {
        timeEnd(self.name);
    }
}

#[wasm_bindgen]
pub struct Universe {
    width: u32,
    height: u32,
    cells: BitVec,
}

/// Public methods, exported to JavaScript.
#[wasm_bindgen]
impl Universe {
    // #[wasm_bindgen(constructor)]
    pub fn new(width: u32, height: u32) -> Universe {
        utils::set_panic_hook();
        let cells = BitVec::from_fn((width * height) as usize, |_i| js_sys::Math::random() < 0.5);

        Universe {
            width,
            height,
            cells,
        }
    }

    pub fn tick(&mut self) {
        let mut next = self.cells.clone();

        for row in 0..self.height {
            for col in 0..self.width {
                let idx = self.get_index(row, col);
                let cell = self.cells[idx];
                let live_neighbors = self.live_neighbor_count(row, col);

                let next_cell = match (cell, live_neighbors) {
                    // Rule 1: Any live cell with fewer than two live neighbours
                    // dies, as if caused by underpopulation.
                    (true, x) if x < 2 => false,
                    // Rule 2: Any live cell with two or three live neighbours
                    // lives on to the next generation.
                    (true, 2) | (true, 3) => true,
                    // Rule 3: Any live cell with more than three live
                    // neighbours dies, as if by overpopulation.
                    (true, x) if x > 3 => false,
                    // Rule 4: Any dead cell with exactly three live neighbours
                    // becomes a live cell, as if by reproduction.
                    (false, 3) => true,
                    // All other cells remain in the same state.
                    (otherwise, _) => otherwise,
                };

                next.set(idx, next_cell);
            }
        }

        self.cells = next;
    }

    pub fn width(&self) -> u32 {
        self.width
    }

    pub fn height(&self) -> u32 {
        self.height
    }

    pub fn cells(&self) -> *const u32 {
        self.cells.storage().as_ptr()
    }

    pub fn toggle_cell(&mut self, row: u32, column: u32) {
        let idx = self.get_index(row, column);
        let val = self.cells[idx].clone();
        self.cells.set(idx, !val);
    }

    pub fn clear_cells(&mut self) {
        self.cells = BitVec::from_elem((self.width * self.height) as usize, false);
    }

    pub fn create_glider(&mut self, row: u32, column: u32) {
        self.create_pattern(GLIDER, row, column);
    }

    pub fn create_pulsar(&mut self, row: u32, column: u32) {
        self.create_pattern(PULSAR, row, column);
    }
}

impl Universe {
    fn get_index(&self, row: u32, column: u32) -> usize {
        (row * self.width + column) as usize
    }

    fn live_neighbor_count(&self, row: u32, column: u32) -> u8 {
        let mut count = 0;

        let north = if row == 0 { self.height - 1 } else { row - 1 };
        let south = if row == self.height - 1 { 0 } else { row + 1 };

        let west = if column == 0 {
            self.width - 1
        } else {
            column - 1
        };
        let east = if column == self.width - 1 {
            0
        } else {
            column + 1
        };

        let nw = self.get_index(north, west);
        count += self.cells[nw] as u8;

        let n = self.get_index(north, column);
        count += self.cells[n] as u8;

        let ne = self.get_index(north, east);
        count += self.cells[ne] as u8;

        let w = self.get_index(row, west);
        count += self.cells[w] as u8;

        let e = self.get_index(row, east);
        count += self.cells[e] as u8;

        let sw = self.get_index(south, west);
        count += self.cells[sw] as u8;

        let s = self.get_index(south, column);
        count += self.cells[s] as u8;

        let se = self.get_index(south, east);
        count += self.cells[se] as u8;

        count
    }

    fn create_pattern(&mut self, pattern: Pattern, row: u32, column: u32) {
        let mut next = self.cells.clone();

        let rows = pattern.len() as i32;
        let cols = pattern[0].len() as i32;

        for delta_row in -rows / 2..(rows + 1) / 2 {
            for delta_col in -cols / 2..(cols + 1) / 2 {
                let current_row =
                    (row as i32 + delta_row + self.height as i32) as u32 % self.height;
                let current_col =
                    (column as i32 + delta_col + self.width as i32) as u32 % self.width;
                let idx = self.get_index(current_row, current_col);
                next.set(idx, pattern[delta_row as usize][delta_col as usize]);
            }
        }

        self.cells = next;
    }
}

type Pattern = &'static [&'static [bool]];

static GLIDER: Pattern = &[
    &[false, true, false],
    &[false, false, true],
    &[true, true, true],
];

static PULSAR: Pattern = &[
    &[
        false, true, true, true, false, false, false, true, true, true, false,
    ],
    &[
        true, false, false, false, true, false, true, false, false, false, true,
    ],
    &[
        true, false, false, false, true, false, true, false, false, false, true,
    ],
    &[
        true, false, false, false, true, false, true, false, false, false, true,
    ],
    &[
        false, true, true, true, false, false, false, true, true, true, false,
    ],
    &[
        false, false, false, false, false, false, false, false, false, false, false,
    ],
    &[
        false, true, true, true, false, false, false, true, true, true, false,
    ],
    &[
        true, false, false, false, true, false, true, false, false, false, true,
    ],
    &[
        true, false, false, false, true, false, true, false, false, false, true,
    ],
    &[
        true, false, false, false, true, false, true, false, false, false, true,
    ],
    &[
        false, true, true, true, false, false, false, true, true, true, false,
    ],
];
