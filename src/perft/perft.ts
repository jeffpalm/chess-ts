import { Game } from "../game";
import { Worker } from "worker_threads";
import { Fen } from "../fen";
import path from "path";

const workerPath = path.resolve(__dirname, "./perft.worker.js")

export const runWorker = (fen: string, depth: number) => new Promise<number>((resolve, reject) => {
  const worker = new Worker(workerPath, { workerData: { fen, depth } });
  worker.on('message', resolve)
  worker.on('error', reject)
  worker.on('exit', (code) => {
    if (code !== 0) {
      reject(new Error(`Worker stopped with exit code ${code}`));
    }
  })
})
export class Perft {
  public static async run(game: Game, depth: number): Promise<number> {
    const moves = game.generateMoves()

    if (depth === 1) return moves.length

    let nodeCount = 0

    for (const move of moves) {
      game.makeMove(move)
      const fen = new Fen(game)
      nodeCount += await runWorker(fen.toString(), depth - 1)
      game.undoMove()
    }
    return nodeCount
  }
}