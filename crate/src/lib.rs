extern crate cfg_if;
extern crate js_sys;
extern crate wasm_bindgen;

mod quadtree;
mod utils;

use quadtree::*;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct Universe {
    cells: QuadTree,
}

#[wasm_bindgen]
impl Universe {
    #[wasm_bindgen(constructor)]
    pub fn new() -> Universe {
        utils::set_panic_hook();
        let cells = tree![
            tree![tree!(false); tree!(true); tree!(false); tree!(false)];
            tree![tree!(false); tree!(false); tree!(true); tree!(false)];
            tree![tree!(true); tree!(true); tree!(false); tree!(false)];
            tree![tree!(true); tree!(false); tree!(false); tree!(false)];
        ];

        Universe { cells }
    }

    pub fn tick(&mut self) {
        self.cells = self.cells.tick();
    }

    pub fn toggle_cell(&mut self, row: i32, column: i32) {
        self.cells[(row, column)] = !self.cells[(row, column)];
    }

    pub fn clear_cells(&mut self) {
        self.cells = QuadTree::Cell(false);
    }
}

impl Universe {
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
}
