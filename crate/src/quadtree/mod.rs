mod quad;

use self::quad::*;
use std::ops::Index;

pub enum QuadTree {
    Node {
        depth: u16,
        population: u32,
        quads: Box<Quad<QuadTree>>,
    },
    Cell(bool),
}

macro_rules! tree {
    ($alive:expr) => {
        QuadTree::Cell($alive)
    };
    [$nw:expr; $ne:expr; $sw:expr; $se:expr $(;)?] => {
        QuadTree::new(Quad {
            nw: $nw,
            ne: $ne,
            sw: $sw,
            se: $se,
        })
    };
}

impl QuadTree {
    pub fn new(quads: Quad<QuadTree>) -> QuadTree {
        let depth = 1 + match quads.nw {
            QuadTree::Cell(_) => 0,
            QuadTree::Node { depth, .. } => depth,
        };

        QuadTree::Node {
            depth,
            population: population(quads),
            quads: Box::new(quads),
        }
    }

    pub fn empty(level: u16) -> QuadTree {
        match level {
            0 => QuadTree::Cell(false),
            otherwise => {
                let n = QuadTree::empty(level - 1);
                tree![n; n; n; n]
            }
        }
    }

    pub fn quads(self) -> Result<Quad<QuadTree>, &'static str> {
        match self {
            QuadTree::Node { quads, .. } => Ok(*quads),
            QuadTree::Cell(_) => Err("expected `QuadTree::Node`, found `QuadTree::Cell`"),
        }
    }

    pub fn tick(self, simulate: fn(u8) -> bool) -> QuadTree {
        fn center_node(tree: QuadTree) -> QuadTree {
            let Quad { nw, ne, sw, se } = tree.quads().unwrap().map(|node| node.quads().unwrap());
            tree![nw.se; ne.sw; sw.ne; se.nw]
        }

        fn horizontal_center_node(left: QuadTree, right: QuadTree) -> QuadTree {
            let Quad { ne, se, .. } = left.quads().unwrap();
            let Quad { nw, sw, .. } = right.quads().unwrap();
            center_node(tree![ne; se; nw; sw])
        }

        fn vertical_center_node(top: QuadTree, bottom: QuadTree) -> QuadTree {
            let Quad { sw, se, .. } = top.quads().unwrap();
            let Quad { nw, ne, .. } = bottom.quads().unwrap();
            center_node(tree![sw; se; nw; ne])
        }

        match self {
            QuadTree::Node {
                population: 0,
                quads,
                ..
            } => quads.nw,
            QuadTree::Node {
                depth: 2,
                population,
                ..
            } => QuadTree::Cell(simulate(population as u8)),
            QuadTree::Node { depth, quads, .. } if depth > 2 => {
                let nw = center_node(quads.nw);
                let nh = horizontal_center_node(quads.nw, quads.ne);
                let ne = center_node(quads.ne);
                let wv = vertical_center_node(quads.nw, quads.sw);
                let cc = center_node(center_node(self));
                let ev = vertical_center_node(quads.ne, quads.se);
                let sw = center_node(quads.sw);
                let sh = horizontal_center_node(quads.sw, quads.se);
                let se = center_node(quads.se);

                tree![
                    tree![nw; nh; wv; cc].tick(simulate);
                    tree![nh; ne; cc; ev].tick(simulate);
                    tree![wv; cc; sw; sh].tick(simulate);
                    tree![cc; ev; sh; se].tick(simulate);
                ]
            }
            _ => panic!("unexpected pattern"),
        }
    }

    fn expand(self) -> QuadTree {
        match self {
            QuadTree::Cell(alive) => {
                let dead = QuadTree::Cell(false);
                tree![dead; dead; tree!(alive); dead].expand()
            }
            QuadTree::Node { depth, quads, .. } => {
                let dead = QuadTree::empty(depth - 1);
                tree![
                    tree![dead; dead; dead; quads.nw];
                    tree![dead; dead; quads.ne; dead];
                    tree![dead; quads.sw; dead; dead];
                    tree![quads.se; dead; dead; dead];
                ]
            }
        }
    }
}

impl Index<(i32, i32)> for QuadTree {
    type Output = bool;

    /// Gets the value of a cell from the center
    fn index(&self, (x, y): (i32, i32)) -> &bool {
        match self {
            QuadTree::Cell(alive) => &alive,
            QuadTree::Node { depth, quads, .. } => {
                let offset = 1 << (depth - 2);

                match (i32::signum(x), i32::signum(y)) {
                    (0..=1, 0..=1) => &quads.ne[(x - offset, y - offset)],
                    (0..=1, -1) => &quads.se[(x - offset, y + offset)],
                    (-1, 0..=1) => &quads.nw[(x + offset, y - offset)],
                    (-1, -1) => &quads.sw[(x + offset, y + offset)],
                }
            }
        }
    }
}

fn population(quad: Quad<QuadTree>) -> u32 {
    quad.map(|t| match t {
        QuadTree::Cell(alive) => alive.into(),
        QuadTree::Node { population, .. } => population,
    })
    .into_iter()
    .sum()
}
