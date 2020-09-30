let players = ['x', 'o'];
let playerName = ['Игрок X', 'Игрок 0'];
let activePlayer = 0;
let boardSize = 3;
let newBoard = [];

function startGame () {
  // "вызывается без параметров при открытии или перезапуске игры. В ней нужно создать поле игры и выбрать активного игрока"

  newBoard.length = 1; // обнуляем длину массива, чтобы доска рисовалась правильно при выборе меньших полей на кнопках ресета

  //заполняем переменные игры
  boardSize = prompt('Новая игра крестики-нолики. Введите размер доски:', boardSize);
  if (!boardSize) {
    boardSize = 3;
  }
  playerName[0] = prompt('Введите имя первого игрока:', playerName[0]);
  if (!playerName[0]) {
    playerName[0] = 'Игрок X';
  }
  playerName[1] = prompt('Введите имя второго игрока:', playerName[1]);
  if (!playerName[1]) {
    playerName[1] = 'Игрок 0';
  }

  // набиваем массив доски
  for (let i = 0; i < boardSize; i++){
    newBoard[i] = [];
    for (let j = 0; j < boardSize; j++){
      newBoard[i][j] = '';
    }
  }
  
  // рендерим доску
  renderBoard(newBoard);

  // вносим случайность в выбор первого игрока
  if (Math.floor(Math.random()*10) > 5) { 
    activePlayer = 1;
  }
  alert(`Первым ходит ${playerName[activePlayer]}`);
}

function click (clickRow, clickCol) {
  //вызывается при клике игрока по полю. Вызов происходит с двумя значениями — номер строки и колонки, по которой произошел клик. В этой функции нужно обновить игровое поле и проверить, выиграл ли игрок, либо можно передавать ход следующему

  // записываем в доску символ активного игрока
  if (newBoard[clickRow][clickCol] === '') {
    newBoard[clickRow][clickCol] = players[activePlayer];
    renderBoard(newBoard);
  }
  
  // выигрываем
  if (checkWin(activePlayer)) {
    showWinner(playerName[activePlayer]);
    return;
  }
  else { // или передаём ход 
    if (activePlayer == '0') {
      activePlayer = '1';
    }
    else {
      activePlayer = '0';
    }
  }
}

function checkWin(whoIsChecking) {
  // объявляем символы активного игрока и оппонента
  let checkSymbolActive = players[0];
  let checkSymbolOpponent = players[1];
  if (whoIsChecking == '1') {
    checkSymbolActive = players[1];
    checkSymbolOpponent = players[0];
  }

  //проверяем наличие символа противника или пустого символа в горизонталях
  for (let i = 0; i < boardSize; i++) {
    if (newBoard[i].includes(checkSymbolActive) && !newBoard[i].includes('') && !newBoard[i].includes(checkSymbolOpponent)) {
      return true;
    }
  }

  //проверяем наличие символа противника или пустого символа в вертикалях
  for (let i = 0, checkArray = []; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      checkArray[j] = newBoard[j][i]; // набиваем проверочный массив данными из вертикалей
    }
    if (checkArray.includes(checkSymbolActive) && !checkArray.includes('') && !checkArray.includes(checkSymbolOpponent)) {
      return true;
    }
  }

  //проверяем наличие символа противника или пустого символа в диагоналях
  for (let i = 0, checkArray = []; i < boardSize; i++) {
    checkArray[i] = newBoard[i][i];
  
    if (i == (boardSize - 1) && checkArray.includes(checkSymbolActive) && !checkArray.includes('') && !checkArray.includes(checkSymbolOpponent)) {
      return true;
    }
  }

  for (let i = 0, j = boardSize - 1, checkArray = []; i < boardSize; i++, j--) {
    checkArray[i] = newBoard[i][j];
    
    if (i == (boardSize - 1) && checkArray.includes(checkSymbolActive) && !checkArray.includes('') && !checkArray.includes(checkSymbolOpponent)) {
     return true;
    }
  }

  //возвращаем результат
  return false;
}