import { exit } from "process";
import { workerData, parentPort } from "worker_threads";
import { Fen } from "../fen";
import { Game } from "../game";
import { runWorker } from "./perft";

const { fen, depth } = workerData

if (!fen || !depth || !parentPort) throw new Error('Invalid worker data')

const game = new Game(fen);

const moves = game.generateMoves();

if (depth === 1) {
  parentPort.postMessage(moves.length);
  exit(0)
}

let nodeCount = 0

for (const move of moves) {
  game.makeMove(move)
  const fen = new Fen(game)
  nodeCount += await runWorker(fen.toString(), depth - 1)
  game.undoMove()
}

parentPort.postMessage(nodeCount);