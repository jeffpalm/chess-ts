Status: Active development

# Essential knowledge

## Board Representation
![Project board representation](https://github.com/jeffpalm/chess-ts/raw/main/assets/board-representation.png)

## FEN Notation [source](https://en.wikipedia.org/wiki/Forsyth%E2%80%93Edwards_Notation)
### Definition
A FEN "record" defines a particular game position, all in one text line and using only the ASCII character set. A text file with only FEN data records should have the file extension ".fen".

A FEN record contains six fields. The separator between fields is a space. The fields are:

- Piece placement (from White's perspective). Each rank is described, starting with rank 8 and ending with rank 1; within each rank, the contents of each square are described from file "a" through file "h". Following the Standard Algebraic Notation (SAN), each piece is identified by a single letter taken from the standard English names (pawn = "P", knight = "N", bishop = "B", rook = "R", queen = "Q" and king = "K"). White pieces are designated using upper-case letters ("PNBRQK") while black pieces use lowercase ("pnbrqk"). Empty squares are noted using digits 1 through 8 (the number of empty squares), and "/" separates ranks.
- Active color. "w" means White moves next, "b" means Black moves next.
- Castling availability. If neither side can castle, this is "-". Otherwise, this has one or more letters: "K" (White can castle kingside), "Q" (White can castle queenside), "k" (Black can castle kingside), and/or "q" (Black can castle queenside). A move that temporarily prevents castling does not negate this notation.
- En passant target square in algebraic notation. If there's no en passant target square, this is "-". If a pawn has just made a two-square move, this is the position "behind" the pawn. This is recorded regardless of whether there is a pawn in position to make an en passant capture.
- Halfmove clock: The number of halfmoves since the last capture or pawn advance, used for the fifty-move rule.
- Fullmove number: The number of the full move. It starts at 1, and is incremented after Black's move.
### Examples
The following example is from the FEN specification:

Here's the FEN for the starting position:

```
rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1
```
And after the move 1.e4:

```
rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1
```
And then after 1...c5:

```
rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR w KQkq c6 0 2
```
And then after 2.Nf3:

```
rnbqkbnr/pp1ppppp/8/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2
```
