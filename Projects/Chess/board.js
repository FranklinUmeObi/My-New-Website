class GameBoard {
  constructor(images) {
    this.images = images;
    this.selected = false;
    this.selectedRow = null;
    this.selectedColl = null;

    this.piecePositions =
    [
    [images[0],images[1],images[2],images[4],images[3],images[2],images[1],images[0]],
    [images[5],images[5],images[5],images[5],images[5],images[5],images[5],images[5]],
    [null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null],
    [images[11],images[11],images[11],images[11],images[11],images[11],images[11],images[11]],
    [images[6],images[7],images[8],images[10],images[9],images[8],images[7],images[6]]
    ]
  }

//draw the boxes of the chess piece
  displayBoard() {
    for (var i = 0; i < 8; i++) {
      for (var j = 0; j < 8; j++) {
        strokeWeight(2.5);
        if (j % 2 === 0 && i % 2 == 0) fill(255);
        else if (j % 2 === 1 && i % 2 == 1) fill(255);
        else fill(35);

        rect(
          SQUARE_SIZE + i * SQUARE_SIZE,
          SQUARE_SIZE + j * SQUARE_SIZE,
          SQUARE_SIZE,
          SQUARE_SIZE
        );
      }
    }


    if (this.selected)
    {
      //draw a green box on a box that is selected
      fill(34,139,34)
      rect(
        SQUARE_SIZE + this.selectedCol * SQUARE_SIZE,
        SQUARE_SIZE + this.selectedRow * SQUARE_SIZE,
        SQUARE_SIZE,SQUARE_SIZE);

      let piece = this.piecePositions[this.selectedRow][this.selectedCol]
      let boxes = this.legalMoves(piece)
      for (var i = 0; i < boxes.length; i++)
      {
        //draw a blue box on a box that is a valid movePiece
        fill(100,149,237)
        let aBox = createVector(boxes[i].x, boxes[i].y);
        //capturable pieces are highlighted red
        if(this.spotIsWhite(aBox)|| this.spotIsBlack(aBox)) fill(178,34,34)
        rect(
          SQUARE_SIZE + boxes[i].x * SQUARE_SIZE,
          SQUARE_SIZE + boxes[i].y * SQUARE_SIZE,
          SQUARE_SIZE,SQUARE_SIZE);
      }



    }
  }

//draw the images in the 2d array of piece images
  displayPieces() {
    for (var i = 0; i < 8; i++) {
      for (var j = 0; j < 8; j++) {
        if (this.piecePositions[j][i] != null) {
          image(
            this.piecePositions[j][i],
            8 + SQUARE_SIZE + i * SQUARE_SIZE,
            7 + SQUARE_SIZE + j * SQUARE_SIZE,
            50,
            50
          );
        }
      }
    }

    this.pawnToQueen()
  }

//move piece from selected box to the box passed in by parameters
  movePiece(col, row) {
    var toMove = this.piecePositions[this.selectedRow][this.selectedCol]
    this.piecePositions[row][col] = toMove
    this.piecePositions[this.selectedRow][this.selectedCol] = null

  }


  legalMoves(piece){
    let boxes = []
    let x = this.selectedCol
    let y = this.selectedRow

//----------------------------------------------------------------
    if (piece == this.images[5]) //black pawn
    {
      let r = createVector(x+1, y+1);
      let l = createVector(x-1, y+1);
      if (this.spotIsWhite(r))  boxes.push(r)
      if(this.spotIsWhite(l))   boxes.push(l)
      let a = createVector(x, y+1);
      if(this.spotIsEmpty(a)) boxes.push(a)
      if (y == 1) {
        let b = createVector(x, y+2);
        if(this.spotIsEmpty(b)) boxes.push(b)
      }
    }
//-----------------------------------------------------------------









//----------------------------------------------------------------
    else if (piece == this.images[11]) //white pawn
    {
      let r = createVector(x+1, y-1);
      let l = createVector(x-1, y-1);
      if (this.spotIsBlack(r))  boxes.push(r)
      if(this.spotIsBlack(l))   boxes.push(l)
      let a = createVector(x, y-1);
      if(this.spotIsEmpty(a))   boxes.push(a)
      if (y == 6){
        let b = createVector(x, y-2);
        if(this.spotIsEmpty(b)) boxes.push(b)
      }
    }
//----------------------------------------------------------------








//----------------------------------------------------------------
    else if (piece == this.images[0]) //black rook
    {
      for (var i = 1; i < 8; i++)
      {
        if (x+i < 8) {//right
          let a = createVector(x+i, y);
          if(this.spotIsEmpty(a)) boxes.push(a)
          let a1 = createVector(x+i, y);
          if(this.spotIsWhite(a1))
          {
            boxes.push(a1)
            break
          }
          if(this.spotIsBlack(a1)) i = 9;
        }
      }
      for (var i = 1; i < 8; i++)
      {
        if (x-i >= 0) {//left
          let b = createVector(x-i, y);
          if(this.spotIsEmpty(b)) boxes.push(b)
          let b1 = createVector(x-i, y);
          if(this.spotIsWhite(b1))
          {
            boxes.push(b1)
            break
          }
          if(this.spotIsBlack(b1)) i = 9;
        }
      }
      for (var i = 1; i < 8; i++)
      {
        if (y+i < 8) {//down
          let c = createVector(x, y+i);
          if(this.spotIsEmpty(c)) boxes.push(c)
          let c1 = createVector(x, y+i);
          if(this.spotIsWhite(c1))
          {
            boxes.push(c1)
            break
          }
          if(this.spotIsBlack(c1)) i = 9;
        }
      }
      for (var i = 1; i < 8; i++)
      {
        if (y-i >= 0) {//up
          let d = createVector(x, y-i);
          if(this.spotIsEmpty(d)) boxes.push(d)
          let d1 = createVector(x, y-i);
          if(this.spotIsWhite(d1))
          {
            boxes.push(d1)
            break
          }
          if(this.spotIsBlack(d1)) i = 9;
        }
      }
    }
//----------------------------------------------------------------










//----------------------------------------------------------------
    else if (piece == this.images[6]) //white rook
    {
      for (var i = 1; i < 8; i++)
      {
        if (x+i < 8) {//right
          let a = createVector(x+i, y);
          if(this.spotIsEmpty(a)) boxes.push(a)
          let a1 = createVector(x+i, y);
          if(this.spotIsBlack(a1))
          {
            boxes.push(a1)
            break
          }
          if(this.spotIsWhite(a1)) i = 9;
        }
      }
      for (var i = 1; i < 8; i++)
      {
        if (x-i >= 0) {//left
          let b = createVector(x-i, y);
          if(this.spotIsEmpty(b)) boxes.push(b)
          let b1 = createVector(x-i, y);
          if(this.spotIsBlack(b1))
          {
            boxes.push(b1)
            break
          }
          if(this.spotIsWhite(b1)) i = 9;
        }
      }
      for (var i = 1; i < 8; i++)
      {
        if (y+i < 8) {//down
          let c = createVector(x, y+i);
          if(this.spotIsEmpty(c)) boxes.push(c)
          let c1 = createVector(x, y+i);
          if(this.spotIsBlack(c1))
          {
            boxes.push(c1)
            break
          }
          if(this.spotIsWhite(c1)) i = 9;
        }
      }
      for (var i = 1; i < 8; i++)
      {
        if (y-i >= 0) {//up
          let d = createVector(x, y-i);
          if(this.spotIsEmpty(d)) boxes.push(d)
          let d1 = createVector(x, y-i);
          if(this.spotIsBlack(d1))
          {
            boxes.push(d1)
            break
          }
          if(this.spotIsWhite(d1)) i = 9;
        }
      }
    }
//----------------------------------------------------------------










//----------------------------------------------------------------
    else if (piece == this.images[2])//black Bishop
    {
      for (var i = 1; i < 8; i++)
      {
        if (x+i < 8 && y-i >=0) {//up right
          let a = createVector(x+i, y-i);
          if(this.spotIsEmpty(a)) boxes.push(a)
          let a1 = createVector(x+i, y-i);
          if(this.spotIsWhite(a1))
          {
            boxes.push(a1)
            break
          }
          if(this.spotIsBlack(a1)) i = 9;
        }
      }
      for (var i = 1; i < 8; i++)
      {
        if (x-i >= 0 && y-i >= 0) {//up left
          let b = createVector(x-i, y-i);
          if(this.spotIsEmpty(b)) boxes.push(b)
          let b1 = createVector(x-i, y-i);
          if(this.spotIsWhite(b1))
          {
            boxes.push(b1)
            break
          }
          if(this.spotIsBlack(b1)) i = 9;
        }
      }
      for (var i = 1; i < 8; i++)
      {
        if (y+i < 8 && x+i < 8) {//down right
          let c = createVector(x+i, y+i);
          if(this.spotIsEmpty(c)) boxes.push(c)
          let c1 = createVector(x+i, y+i);
          if(this.spotIsWhite(c1))
          {
            boxes.push(c1)
            break
          }
          if(this.spotIsBlack(c1)) i = 9;
        }
      }
      for (var i = 1; i < 8; i++)
      {
        if (y+i < 8 && x-i >= 0) {//down left
          let d = createVector(x-i, y+i);
          if(this.spotIsEmpty(d)) boxes.push(d)
          let d1 = createVector(x-i, y+i);
          if(this.spotIsWhite(d1))
          {
            boxes.push(d1)
            break
          }
          if(this.spotIsBlack(d1)) i = 9;
        }
      }
    }
//----------------------------------------------------------------








//----------------------------------------------------------------
    else if (piece == this.images[8])//white Bishop
    {
      for (var i = 1; i < 8; i++)
      {
        if (x+i < 8 && y-i >=0) {//up right
          let a = createVector(x+i, y-i);
          if(this.spotIsEmpty(a)) boxes.push(a)
          let a1 = createVector(x+i, y-i);
          if(this.spotIsBlack(a1))
          {
            boxes.push(a1)
            break
          }
          if(this.spotIsWhite(a1)) i = 9;
        }
      }
      for (var i = 1; i < 8; i++)
      {
        if (x-i >= 0 && y-i >= 0) {//up left
          let b = createVector(x-i, y-i);
          if(this.spotIsEmpty(b)) boxes.push(b)
          let b1 = createVector(x-i, y-i);
          if(this.spotIsBlack(b1))
          {
            boxes.push(b1)
            break
          }
          if(this.spotIsWhite(b1)) i = 9;
        }
      }
      for (var i = 1; i < 8; i++)
      {
        if (y+i < 8 && x+i < 8) {//down right
          let c = createVector(x+i, y+i);
          if(this.spotIsEmpty(c)) boxes.push(c)
          let c1 = createVector(x+i, y+i);
          if(this.spotIsBlack(c1))
          {
            boxes.push(c1)
            break
          }
          if(this.spotIsWhite(c1)) i = 9;
        }
      }
      for (var i = 1; i < 8; i++)
      {
        if (y+i < 8 && x-i >= 0) {//down left
          let d = createVector(x-i, y+i);
          if(this.spotIsEmpty(d)) boxes.push(d)
          let d1 = createVector(x-i, y+i);
          if(this.spotIsBlack(d1))
          {
            boxes.push(d1)
            break
          }
          if(this.spotIsWhite(d1)) i = 9;
        }
      }
    }
//-------------------------------------------------------------










//-------------------------------------------------------------
    else if (piece == this.images[4])//black queen
    {
      //DIAGONALS
      for (var i = 1; i < 8; i++)
      {
        if (x+i < 8 && y-i >=0) {//up right
          let a = createVector(x+i, y-i);
          if(this.spotIsEmpty(a)) boxes.push(a)
          let a1 = createVector(x+i, y-i);
          if(this.spotIsWhite(a1))
          {
            boxes.push(a1)
            break
          }
          if(this.spotIsBlack(a1)) i = 9;
        }
      }
      for (var i = 1; i < 8; i++)
      {
        if (x-i >= 0 && y-i >= 0) {//up left
          let b = createVector(x-i, y-i);
          if(this.spotIsEmpty(b)) boxes.push(b)
          let b1 = createVector(x-i, y-i);
          if(this.spotIsWhite(b1))
          {
            boxes.push(b1)
            break
          }
          if(this.spotIsBlack(b1)) i = 9;
        }
      }
      for (var i = 1; i < 8; i++)
      {
        if (y+i < 8 && x+i < 8) {//down right
          let c = createVector(x+i, y+i);
          if(this.spotIsEmpty(c)) boxes.push(c)
          let c1 = createVector(x+i, y+i);
          if(this.spotIsWhite(c1))
          {
            boxes.push(c1)
            break
          }
          if(this.spotIsBlack(c1)) i = 9;
        }
      }
      for (var i = 1; i < 8; i++)
      {
        if (y+i < 8 && x-i >= 0) {//down left
          let d = createVector(x-i, y+i);
          if(this.spotIsEmpty(d)) boxes.push(d)
          let d1 = createVector(x-i, y+i);
          if(this.spotIsWhite(d1))
          {
            boxes.push(d1)
            break
          }
          if(this.spotIsBlack(d1)) i = 9;
        }
      }

      //Straights
      for (var i = 1; i < 8; i++)
      {
        if (x+i < 8) {//right
          let a = createVector(x+i, y);
          if(this.spotIsEmpty(a)) boxes.push(a)
          let a1 = createVector(x+i, y);
          if(this.spotIsWhite(a1))
          {
            boxes.push(a1)
            break
          }
          if(this.spotIsBlack(a1)) i = 9;
        }
      }
      for (var i = 1; i < 8; i++)
      {
        if (x-i >= 0) {//left
          let b = createVector(x-i, y);
          if(this.spotIsEmpty(b)) boxes.push(b)
          let b1 = createVector(x-i, y);
          if(this.spotIsWhite(b1))
          {
            boxes.push(b1)
            break
          }
          if(this.spotIsBlack(b1)) i = 9;
        }
      }
      for (var i = 1; i < 8; i++)
      {
        if (y+i < 8) {//down
          let c = createVector(x, y+i);
          if(this.spotIsEmpty(c)) boxes.push(c)
          let c1 = createVector(x, y+i);
          if(this.spotIsWhite(c1))
          {
            boxes.push(c1)
            break
          }
          if(this.spotIsBlack(c1)) i = 9;
        }
      }
      for (var i = 1; i < 8; i++)
      {
        if (y-i >= 0) {//up
          let d = createVector(x, y-i);
          if(this.spotIsEmpty(d)) boxes.push(d)
          let d1 = createVector(x, y-i);
          if(this.spotIsWhite(d1))
          {
            boxes.push(d1)
            break
          }
          if(this.spotIsBlack(d1)) i = 9;
        }
      }
    }
//-------------------------------------------------------------










//-------------------------------------------------------------
    else if (piece == this.images[10])//white queen
    {
      //DIAGONALS
      for (var i = 1; i < 8; i++)
      {
        if (x+i < 8 && y-i >=0) {//up right
          let a = createVector(x+i, y-i);
          if(this.spotIsEmpty(a)) boxes.push(a)
          let a1 = createVector(x+i, y-i);
          if(this.spotIsBlack(a1))
          {
            boxes.push(a1)
            break
          }
          if(this.spotIsWhite(a1)) i = 9;
        }
      }
      for (var i = 1; i < 8; i++)
      {
        if (x-i >= 0 && y-i >= 0) {//up left
          let b = createVector(x-i, y-i);
          if(this.spotIsEmpty(b)) boxes.push(b)
          let b1 = createVector(x-i, y-i);
          if(this.spotIsBlack(b1))
          {
            boxes.push(b1)
            break
          }
          if(this.spotIsWhite(b1)) i = 9;
        }
      }
      for (var i = 1; i < 8; i++)
      {
        if (y+i < 8 && x+i < 8) {//down right
          let c = createVector(x+i, y+i);
          if(this.spotIsEmpty(c)) boxes.push(c)
          let c1 = createVector(x+i, y+i);
          if(this.spotIsBlack(c1))
          {
            boxes.push(c1)
            break
          }
          if(this.spotIsWhite(c1)) i = 9;
        }
      }
      for (var i = 1; i < 8; i++)
      {
        if (y+i < 8 && x-i >= 0) {//down left
          let d = createVector(x-i, y+i);
          if(this.spotIsEmpty(d)) boxes.push(d)
          let d1 = createVector(x-i, y+i);
          if(this.spotIsBlack(d1))
          {
            boxes.push(d1)
            break
          }
          if(this.spotIsWhite(d1)) i = 9;
        }
      }

      for (var i = 1; i < 8; i++)
      {
        if (x+i < 8) {//right
          let a = createVector(x+i, y);
          if(this.spotIsEmpty(a)) boxes.push(a)
          let a1 = createVector(x+i, y);
          if(this.spotIsBlack(a1))
          {
            boxes.push(a1)
            break
          }
          if(this.spotIsWhite(a1)) i = 9;
        }
      }
      for (var i = 1; i < 8; i++)
      {
        if (x-i >= 0) {//left
          let b = createVector(x-i, y);
          if(this.spotIsEmpty(b)) boxes.push(b)
          let b1 = createVector(x-i, y);
          if(this.spotIsBlack(b1))
          {
            boxes.push(b1)
            break
          }
          if(this.spotIsWhite(b1)) i = 9;
        }
      }
      for (var i = 1; i < 8; i++)
      {
        if (y+i < 8) {//down
          let c = createVector(x, y+i);
          if(this.spotIsEmpty(c)) boxes.push(c)
          let c1 = createVector(x, y+i);
          if(this.spotIsBlack(c1))
          {
            boxes.push(c1)
            break
          }
          if(this.spotIsWhite(c1)) i = 9;
        }
      }
      for (var i = 1; i < 8; i++)
      {
        if (y-i >= 0) {//up
          let d = createVector(x, y-i);
          if(this.spotIsEmpty(d)) boxes.push(d)
          let d1 = createVector(x, y-i);
          if(this.spotIsBlack(d1))
          {
            boxes.push(d1)
            break
          }
          if(this.spotIsWhite(d1)) i = 9;
        }
      }
    }
    //----------------------------------------------------------------------





  //----------------------------------------------------------------------------
    else if (piece == this.images[1])//black knight
    {
      let a = createVector(x+1, y+2);
      let b = createVector(x+2, y+1);
      let c = createVector(x-1, y+2);
      let d = createVector(x-2, y+1);
      let e = createVector(x+1, y-2);
      let f = createVector(x+2, y-1);
      let g = createVector(x-1, y-2);
      let h = createVector(x-2, y-1);
      if(this.spotIsEmpty(a) || this.spotIsWhite(a)) boxes.push(a)
      if(this.spotIsEmpty(b) || this.spotIsWhite(b)) boxes.push(b)
      if(this.spotIsEmpty(c) || this.spotIsWhite(c)) boxes.push(c)
      if(this.spotIsEmpty(d) || this.spotIsWhite(d)) boxes.push(d)
      if(this.spotIsEmpty(e) || this.spotIsWhite(e)) boxes.push(e)
      if(this.spotIsEmpty(f) || this.spotIsWhite(f)) boxes.push(f)
      if(this.spotIsEmpty(g) || this.spotIsWhite(g)) boxes.push(g)
      if(this.spotIsEmpty(h) || this.spotIsWhite(h)) boxes.push(h)
    }
    //------------------------------------------------------------------






        //------------------------------------------------------------------
    else if (piece == this.images[7])//white knight
    {
      let a = createVector(x+1, y+2);
      let b = createVector(x+2, y+1);
      let c = createVector(x-1, y+2);
      let d = createVector(x-2, y+1);
      let e = createVector(x+1, y-2);
      let f = createVector(x+2, y-1);
      let g = createVector(x-1, y-2);
      let h = createVector(x-2, y-1);
      if(this.spotIsEmpty(a) || this.spotIsBlack(a)) boxes.push(a)
      if(this.spotIsEmpty(b) || this.spotIsBlack(b)) boxes.push(b)
      if(this.spotIsEmpty(c) || this.spotIsBlack(c)) boxes.push(c)
      if(this.spotIsEmpty(d) || this.spotIsBlack(d)) boxes.push(d)
      if(this.spotIsEmpty(e) || this.spotIsBlack(e)) boxes.push(e)
      if(this.spotIsEmpty(f) || this.spotIsBlack(f)) boxes.push(f)
      if(this.spotIsEmpty(g) || this.spotIsBlack(g)) boxes.push(g)
      if(this.spotIsEmpty(h) || this.spotIsBlack(h)) boxes.push(h)
    }
    //-----------------------------------------------------------------







    //------------------------------------------------------------------
    else if (piece == this.images[3])//black king
    {
      let a = createVector(x+1, y);
      let b = createVector(x-1, y);
      let c = createVector(x, y+1);
      let d = createVector(x, y-1);
      let e = createVector(x+1, y-1);
      let f = createVector(x-1, y-1);
      let g = createVector(x+1, y+1);
      let h = createVector(x-1, y+1);
      if((this.spotIsEmpty(a) || this.spotIsWhite(a)) && this.spotIsNotCheckForBlack(a)) boxes.push(a)
      if((this.spotIsEmpty(b) || this.spotIsWhite(b)) && this.spotIsNotCheckForBlack(b)) boxes.push(b)
      if((this.spotIsEmpty(c) || this.spotIsWhite(c)) && this.spotIsNotCheckForBlack(c)) boxes.push(c)
      if((this.spotIsEmpty(d) || this.spotIsWhite(d)) && this.spotIsNotCheckForBlack(d)) boxes.push(d)
      if((this.spotIsEmpty(e) || this.spotIsWhite(e)) && this.spotIsNotCheckForBlack(e)) boxes.push(e)
      if((this.spotIsEmpty(f) || this.spotIsWhite(f)) && this.spotIsNotCheckForBlack(f)) boxes.push(f)
      if((this.spotIsEmpty(g) || this.spotIsWhite(g)) && this.spotIsNotCheckForBlack(g)) boxes.push(g)
      if((this.spotIsEmpty(h) || this.spotIsWhite(h)) && this.spotIsNotCheckForBlack(h)) boxes.push(h)
    }
        //------------------------------------------------------------------








    //------------------------------------------------------------------
    else if (piece == this.images[9])//white king
    {
      let a = createVector(x+1, y);
      let b = createVector(x-1, y);
      let c = createVector(x, y+1);
      let d = createVector(x, y-1);
      let e = createVector(x+1, y-1);
      let f = createVector(x-1, y-1);
      let g = createVector(x+1, y+1);
      let h = createVector(x-1, y+1);
      if((this.spotIsEmpty(a) || this.spotIsBlack(a)) && this.spotIsNotCheckForWhite(a)) boxes.push(a)
      if((this.spotIsEmpty(b) || this.spotIsBlack(b)) && this.spotIsNotCheckForWhite(b)) boxes.push(b)
      if((this.spotIsEmpty(c) || this.spotIsBlack(c)) && this.spotIsNotCheckForWhite(c)) boxes.push(c)
      if((this.spotIsEmpty(d) || this.spotIsBlack(d)) && this.spotIsNotCheckForWhite(d)) boxes.push(d)
      if((this.spotIsEmpty(e) || this.spotIsBlack(e)) && this.spotIsNotCheckForWhite(e)) boxes.push(e)
      if((this.spotIsEmpty(f) || this.spotIsBlack(f)) && this.spotIsNotCheckForWhite(f)) boxes.push(f)
      if((this.spotIsEmpty(g) || this.spotIsBlack(g)) && this.spotIsNotCheckForWhite(g)) boxes.push(g)
      if((this.spotIsEmpty(h) || this.spotIsBlack(h)) && this.spotIsNotCheckForWhite(h)) boxes.push(h)
    }
    return boxes
  }
    //------------------------------------------------------------------


  spotIsEmpty(pos){
    //check if the box is within board
    if (pos.x < 0 || pos.x > 7 ||pos.y < 0 || pos.y > 7 ) return false
    //check if spot is empty
    if(this.piecePositions[pos.y][pos.x] == null) return true
  }

  spotIsBlack(pos){
    //check if the box is within board
    if (pos.x < 0 || pos.x > 7 ||pos.y < 0 || pos.y > 7 ) return false
    let img = this.piecePositions[pos.y][pos.x]
    //check if its a black piece
    for (var i = 0; i < 6; i++) {
      if(images[i] == img) return true
    }
    return false
  }

  spotIsWhite(pos){
    //check if the box is within board
    if (pos.x < 0 || pos.x > 7 ||pos.y < 0 || pos.y > 7 ) return false
    let img = this.piecePositions[pos.y][pos.x]
    //check if its a white piece
    for (var i = 6; i < 12; i++) {
      if(images[i] == img) return true
    }
    return false
  }







//FixThis
  spotIsNotCheckForBlack(pos)
  {
    //looping through all board positions
    for (var row = 0; row < 8; row++)
    {
      for (var col = 0; col < 8; col++)
      {
        let a = createVector(col,row)
        let ignore = 0
        //if the current position is a white piece
        if(this.spotIsWhite(a) && this.piecePositions[row][col] != images[9])
        {
          let enemy = this.piecePositions[row][col]
          let tempCol = this.selectedCol
          let tempRow = this.selectedRow
          this.selectedRow = row
          this.selectedCol = col
          let spots = this.legalMoves(enemy)
          this.selectedRow = tempRow
          this.selectedCol = tempCol
          //loop through that pieces legal moves
          for (var k = 0; k < spots.length; k++)
          {
            //if that legal move intersects then the spot is in check
            if (pos.x == spots[k].x && pos.y == spots[k].y)
            {
              //if enemy is a white pawn
              if (enemy = this.images[11])
              {
                //pawn can't check in the same col
                if(spots[k].x == col) ignore = 1
                else return false
              }
              else return false
            }
          }
        }

      }
    }
    //if spot doesn't intersect, the spot is = not in check
    return true
  }





  spotIsNotCheckForWhite(pos)
  {
    //looping through all board positions
    for (var row = 0; row < 8; row++)
    {
      for (var col = 0; col < 8; col++)
      {
        let a = createVector(col,row)
        let ignore = 0
        //if the current position is a black piece
        if(this.spotIsBlack(a) && this.piecePositions[row][col] != images[3])
        {
          let enemy = this.piecePositions[row][col]
          let tempCol = this.selectedCol
          let tempRow = this.selectedRow
          this.selectedRow = row
          this.selectedCol = col
          let spots = this.legalMoves(enemy)
          this.selectedRow = tempRow
          this.selectedCol = tempCol
          //loop through that pieces legal moves
          for (var k = 0; k < spots.length; k++)
          {
            //if that legal move intersects then the spot is in check
            if (pos.x == spots[k].x && pos.y == spots[k].y)
            {
              //if enemy is a black pawn
              if (enemy = this.images[5])
              {
                //pawn can't check in the same col
                if(spots[k].x == col) ignore = 1
                else return false
              }
              else return false
            }
          }
        }

      }
    }
    //if spot doesn't intersect, the spot is = not in check
    return true
  }



    pawnToQueen(){
      for (var i = 0; i < 8; i++) {
        if(this.piecePositions[0][i] == this.images[11]) this.piecePositions[0][i] = this.images[10]
        if(this.piecePositions[7][i] == this.images[5]) this.piecePositions[7][i] = this.images[4]
      }
    }



}
