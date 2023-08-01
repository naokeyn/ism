let ITEM_WIDTH = 50;        // 表の要素の幅

/**
 * 
 * @param {Integer} length 
 * @param {String} RowName 
 * @param {String} title 
 * @returns 
 */
let addRow = (length, RowName, title = "Head") => {
    let tableRow = document.createElement("tr");
    let tableHead = document.createElement("th");

    tableHead.textContent = title;
    tableHead.style = "width: 32px;"
    tableRow.appendChild(tableHead);

    for (let i = 0; i < length; i++) {
        // th要素の作成
        let tableItem = document.createElement("th");
        tableItem.style = `width: ${ITEM_WIDTH}px;`

        // input要素の作成
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.name = RowName;

        // 要素の追加
        tableItem.append(checkbox);
        tableRow.appendChild(tableItem);
    }

    return tableRow;
}

/**
 * 次数から行列を入力するためのチェックボックステーブルを表示
 */
let displayMatrix = () => {
    let size = document.forms.MatrixSize.text.value;
    let table = document.getElementById("matrix");

    // 要素をクリア
    let target = table.querySelector("tr");
    while (target) {
        table.removeChild(target);
        target = table.querySelector("tr");
    }

    for (let i = 0; i < size; i++) {
        table.appendChild(addRow(size, `row${i}`, title = i + 1));
    }
}


let displayAnswer = (dictMatrix) => {
    let ansArea = document.getElementById("ansArea");
    let size = Object.keys(dictMatrix).length;

    // 要素をクリア
    let target = ansArea.querySelector("tr");
    while (target) {
        ansArea.removeChild(target);
        target = ansArea.querySelector("tr");
    }

    // 要素を追加
    for (let i = 0; i < size; i++) {
        let row = document.createElement("tr");
        for (let j = 0; j < size; j++) {
            let item = document.createElement("th");
            item.style = `width: ${ITEM_WIDTH}px;`
            item.textContent = dictMatrix[i][j];
            row.appendChild(item);
        }
        ansArea.appendChild(row);
    }
}

let drawGraph = () => {
    let canvas = document.getElementById("graphArea");
    let ctx = canvas.getContext("2d");

    ctx.font = "10px serif";

    let nodeWidth = 20;
    let nodeHeight = 20;
    let nodes = {
        0: [50, 50],
        1: [100, 50],
        2: [150, 50],
        3: [100, 100]
    }
    let edges = [
        [0, 3], [1, 3], [2, 3]
    ]

    // エッジの描画
    for (let edge of edges) {
        let startNode = nodes[edge[0]];
        let goalNode = nodes[edge[1]];
        let startX = startNode[0];
        let startY = startNode[1];
        let goalX = goalNode[0];
        let goalY = goalNode[1];

        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(goalX, goalY);
        ctx.stroke()
    }

    // ノードの描画
    for (let i of Object.keys(nodes)) {
        let nodeX = nodes[i][0] - nodeWidth / 2;
        let nodeY = nodes[i][1] - nodeHeight / 2;
        ctx.clearRect(nodeX, nodeY, nodeWidth, nodeHeight);
        ctx.strokeRect(nodeX, nodeY, nodeWidth, nodeHeight);
        ctx.fillText(i, nodes[i][0] - 1.5, nodes[i][1] + 1.5);
    }
}