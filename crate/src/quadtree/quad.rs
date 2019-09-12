pub struct Quad<T> {
    pub nw: T,
    pub ne: T,
    pub sw: T,
    pub se: T,
}

impl<T> Quad<T> {
    pub fn map<R>(self, f: fn(T) -> R) -> Quad<R> {
        Quad {
            nw: f(self.nw),
            ne: f(self.ne),
            sw: f(self.sw),
            se: f(self.se),
        }
    }
}

impl<T> IntoIterator for Quad<T> {
    type Item = T;
    type IntoIter = QuadIntoIterator<T>;

    fn into_iter(self) -> Self::IntoIter {
        QuadIntoIterator {
            quads: self,
            index: 0,
        }
    }
}

struct QuadIntoIterator<T> {
    quads: Quad<T>,
    index: usize,
}

impl<T> Iterator for QuadIntoIterator<T> {
    type Item = T;

    fn next(&mut self) -> Option<Self::Item> {
        let result = match self.index {
            0 => self.quads.nw,
            1 => self.quads.ne,
            2 => self.quads.sw,
            3 => self.quads.se,
            _ => return None,
        };
        self.index += 1;
        Some(result)
    }
}
