[![Build Status](https://travis-ci.com/jul1u5/game-of-life.svg?branch=master)](https://travis-ci.com/jul1u5/game-of-life)
[![Build status](https://ci.appveyor.com/api/projects/status/x18cnrlliw91gauc/branch/master?svg=true)](https://ci.appveyor.com/project/jul1u5/game-of-life/branch/master)

# Game of Life

## About
Conway's Game of Life implemented in Rust and WebAssembly. 

## Prerequisites
* Rust toolchain: `rustup`, `rustc`, `cargo`
* [wasm-pack](https://rustwasm.github.io/wasm-pack/installer/)
* npm

## Build and Run
### First time build
```console
$ wasm-pack build
$ cd pkg
$ npm link

$ cd ../www
$ npm install
$ npm link game-of-life
```
### Run
```console
$ npm run start
```
### Build Rust
```console
$ wasm-pack build
```
