import React, { useState, useEffect } from "react";
import styled from "styled-components";

enum Piece {
  RED = "red",
  BLACK = "black",
  BLANK = "blank"
}

const GameBoard: React.FC = () => {
  const [winner, setWinner] = useState<"Red" | "Black" | "">("");
  const [turn, setTurn] = useState(0);
  const [columns, setColumns] = useState<Piece[][]>([
    [Piece.BLANK, Piece.BLANK, Piece.BLANK, Piece.BLANK, Piece.BLANK],
    [Piece.BLANK, Piece.BLANK, Piece.BLANK, Piece.BLANK, Piece.BLANK],
    [Piece.BLANK, Piece.BLANK, Piece.BLANK, Piece.BLANK, Piece.BLANK],
    [Piece.BLANK, Piece.BLANK, Piece.BLANK, Piece.BLANK, Piece.BLANK],
    [Piece.BLANK, Piece.BLANK, Piece.BLANK, Piece.BLANK, Piece.BLANK]
  ]);

  const checkWinner = () => {
    const checkBlack = (): boolean => {
      return (
        checkHorizontal(Piece.BLACK) ||
        checkVertical(Piece.BLACK) ||
        checkUpDiagonal(Piece.BLACK) ||
        checkDownDiagonal(Piece.BLACK)
      );
    };

    const checkRed = (): boolean => {
      return (
        checkHorizontal(Piece.RED) ||
        checkVertical(Piece.RED) ||
        checkUpDiagonal(Piece.RED) ||
        checkDownDiagonal(Piece.RED)
      );
    };

    if (checkBlack()) {
      setWinner("Black");
    }

    if (checkRed()) {
      setWinner("Red");
    }
  };

  useEffect(checkWinner, [turn]);

  const isRedTurn = () => {
    return turn % 2 === 0;
  };

  const displayToPlay = () => {
    return (
      <TurnHeader>{isRedTurn() ? "Red to Play" : "Black to Play"}</TurnHeader>
    );
  };

  const addPiece = (column: number) => () => {
    if (winner) {
      return;
    }

    const mapNewPiece = (col: Piece[]): Piece[] => {
      let played = false;

      return col.map(piece => {
        if (!played && piece === Piece.BLANK) {
          played = true;

          return isRedTurn() ? Piece.RED : Piece.BLACK;
        }

        return piece;
      });
    };

    const newColumns = columns.map((col, index) => {
      if (index === column) {
        return mapNewPiece(col);
      }

      return col;
    });
    setColumns(newColumns);
    setTurn(turn + 1);
  };

  const checkHorizontal = (color: Piece): boolean => {
    let count = 0;

    for (let x = 0; x < columns.length; x++) {
      for (let y = 0; y < columns[x].length; y++) {
        if (columns[y][x] === color) {
          count++;
          if (count >= 4) {
            return true;
          }
        } else {
          count = 0;
        }
      }
    }

    return false;
  };

  const checkVertical = (color: Piece): boolean => {
    let count = 0;

    for (let x = 0; x < columns.length; x++) {
      for (let y = 0; y < columns[x].length; y++) {
        if (columns[x][y] === color) {
          count++;
          if (count >= 4) {
            return true;
          }
        } else {
          count = 0;
        }
      }
    }

    return false;
  };

  const checkUpDiagonal = (color: Piece): boolean => {
    return false;
  };

  const checkDownDiagonal = (color: Piece): boolean => {
    return false;
  };

  const Header: React.FC = () => {
    if (winner) {
      return <TurnHeader>{winner} wins!</TurnHeader>;
    }

    return displayToPlay();
  };

  return (
    <>
      <Header />
      <Grid>
        {columns.map((col: Piece[], i: number) => {
          return (
            <Column key={i} onClick={addPiece(i)}>
              {col.map((piece, j: number) => {
                return <Space key={j} piece={piece} />;
              })}
            </Column>
          );
        })}
      </Grid>
    </>
  );
};

interface Space {
  piece: Piece;
}

const Space = styled.div<Space>`
  width: 50px;
  height: 50px;
  border: black solid 2px;
  border-radius: ${({ piece }) => (piece === Piece.BLANK ? 0 : "50%")};
  background-color: ${({ piece }) =>
    piece === Piece.BLANK ? "white" : piece === Piece.RED ? "red" : "black"};
`;

const Grid = styled.main`
  width: 500px;
  margin-left: auto;
  margin-right: auto;
  display: grid;
  grid-gap: 16px;
  grid-template-columns: repeat(5, 50px);
`;

const Column = styled.section`
  display: flex;
  flex-direction: column-reverse;
  justify-content: space-between;
`;

const TurnHeader = styled.h1`
  margin-left: auto;
  margin-right: auto;
  width: 500px;
`;

export default GameBoard;
