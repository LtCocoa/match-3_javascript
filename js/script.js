let board = [
    [],
    [],
    [],
    [],
    []
]

let tmp = [];
let isSelected = false;

let table = $('<table>');
$('body').append(table);
for(let i = 0; i < 5; i++) {
    let tr = $('<tr>');
    for(let j = 0; j < 5; j++) {
        board[i][j] = Math.floor(Math.random() * (5 - 1) + 1);
        let td = $('<td>');
        td.append('</td>');
        tr.append(td);
        //td.html(board[i][j]);
        let color;
        switch(board[i][j]) {
            case 1:
                td.css("background-color", "yellow");
                console.log("yellow");
                break;
            case 2:
                td.css("background-color", "green");
                break;
            case 3:
                td.css("background-color", "blue");
                break;
            case 4:
                td.css("background-color", "red");
                break;
        }
        td.on('click', function() {
            onClick(i, j)
        });
    }
    table.append(tr);
}

function dump() {
    console.log(board);
}

function render() {
    console.log("rendering");
    table.empty();
    for(let i = 0; i < 5; i++) {
        let tr = $('<tr>');
        for(let j = 0; j < 5; j++) {
            let td = $('<td>');
            td.append('</td>');
            tr.append(td);
            //td.html(board[i][j]);
            let color;
            switch(board[i][j]) {
                case 1:
                    td.css("background-color", "yellow");
                    console.log("yellow");
                    break;
                case 2:
                    td.css("background-color", "green");
                    break;
                case 3:
                    td.css("background-color", "blue");
                    break;
                case 4:
                    td.css("background-color", "red");
                    break;
            }
            td.on('click', function() {
                onClick(i, j);
            });
        }
        table.append(tr);
    }
}

function onClick(pI, pJ) {
    console.log("clicked");
    if(!isSelected) {
        tmp[0] = pI;
        tmp[1] = pJ;
        isSelected = true;
    } else {
        let horizontalCheck = (tmp[0] == pI) 
                                && (Math.abs(tmp[1] - pJ) == 1);
        let verticalCheck = (tmp[1] == pJ)
                                && (Math.abs(tmp[0] - pI) == 1);

        if(horizontalCheck || verticalCheck) {
            let a = board[tmp[0]][tmp[1]];
            board[tmp[0]][tmp[1]] = board[pI][pJ];
            board[pI][pJ] = a;

            let matchItem = board[0][pI];
            let matchCounter = 1;
            let arr = [];

            for(let i = 1; i < 5; i++) {
                if(matchItem == board[0][i]) {
                    matchCounter++;
                } else {
                    matchItem = board[0][i];

                    if (matchCounter >= 3) {
                        for(let j = i; j > j - matchCounter; j--) {
                            arr.push([0, i]);
                        }
                    }
                }
                console.log(`Matches: ${matchCounter}\n`);
                console.log(arr);
            }

            render();
        }

        isSelected = false;
    }
}

dump();