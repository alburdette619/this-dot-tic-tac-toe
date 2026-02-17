# React Native Tic Tac Toe

React Native + Expo implementation of a single-player Tic Tac Toe game with an **<ins>unbeatable</ins>** computer opponent.

## Challenge requirements covered

- Start a new Tic Tac Toe game on a **3×3 grid**
- User can opt to go first or let the computer go first
  - The game assumes that `X` is for the user and `O` is for the computer player.
- Result screens:
  - **You Won** (user victory, this should never happen)
  - **You Lost** (computer victory)
  - **Tie** (draw)
- User can start a new game once the current one is completed
- Computer player is **unbeatable** (optimal play: user can only draw or lose)
- README includes run instructions + technical approach

---

## Tech stack

- **Expo** (bare with TypeScript)
- **React Native**
- **React Navigation** for navigation
- **Zustand** for state management
- **React Native Reanimated** for board/line animations
- **Lottie** for result screens

---

## Getting started

### Prerequisites

- Node.js (LTS recommended)
- Expo Go on a physical device **or** iOS Simulator / Android Emulator

### Install and Sync dependencies

```bash
npm install
```

Then to [sync dependencies](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/getting-started#step-2-rebuild-native-dependencies) for react-native-reanimated:

```bash
npx expo prebuild
```

### Run the app

```bash
npx expo start
```

Then:

- Scan the QR code with **Expo Go** (device), or
- Launch on a simulator/emulator via the Expo dev tools

---

## How to play

1. Choose who goes first (**X = You**, **O = CPU**).
2. Tap a cell to place your mark.
3. CPU responds.
4. When the game ends, an end screen is shown.
5. Tap **Play Again!** to reset and play again.

---

## Project structure

```bash
.
├── assets
│   └── lottie - lottie animation json files
└── src
    ├── navigation - navigation components
    ├── screens - screens directory
    │   └── TicTacToe - screen with dedicated components
    │       └── components
    ├── stores - zustand stores
    ├── styles - global styles
    ├── types - global types
    └── utils - tic tac toe minimax algorithm and utils
```

---

## Unbeatable AI (Minimax)

The computer player uses **minimax** (game-tree search) to guarantee optimal play.

### Why minimax (vs rules-based)

- **Rules-based**: implement a prioritized list of tactics (win now, block, take center, prevent forks, etc.). This can be unbeatable if fully implemented, but it’s easier to miss edge cases.
- **Minimax**: regresses over possible future game states and selects a move for the computer player that maximizes the best guaranteed outcome assuming the opponent plays optimally. For Tic Tac Toe (which is a tiny search space), this is straightforward, quick, and reliably correct.

**NOTE:** Super quick opening move optimization

To avoid doing the largest minimax search at the start of a game, the algorithm short-circuits on the first move:

- choose **center** (index 4) or a **corner** (0/2/6/8) at random.
- continues with minimax afterward

This keeps the computer's first turn feeling instant while remaining optimal.
