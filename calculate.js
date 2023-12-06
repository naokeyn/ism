const ITEM_WIDTH = 50;          // 表の要素の幅
const CANVAS_WIDTH = 200;       // キャンバスの幅
const GRAPH_HSPACE = 50;        // ノードの間隔

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
        checkbox.title = "check-item";

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

/**
 * 可達行列をブラウザに表示する関数
 * @param {Array} dictMatrix 辞書型の行列
 */
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

/**
 * 要素名から一行分の二値配列を作成する関数
 * @param {string} RowName 
 * @returns {Array}
 */
let GetRow = (RowName) => {
    let row = document.getElementsByName(RowName);
    let array = [];
    for (let i = 0; i < row.length; i++) {
        if (row[i].checked) {
            array.push(1);
        }
        else {
            array.push(0);
        }
    }

    return array;
}

/**
 * 二値行列を作成する関数
 * @param {Array} RowNames 行の名前を記述した配列
 * @returns {Array} 二次元配列
 */
let GetMatrix = (RowNames) => {
    let matrix = [];

    for (let i = 0; i < RowNames.length; i++) {
        array = GetRow(RowNames[i]);
        // if (isNull(array) == false) break;
        matrix.push(array);
    }

    // 行列の末尾を削り正方行列にする
    if (matrix.length != matrix[0].length) {
        for (let i = 0; i < matrix.length; i++) {
            matrix[0] = matrix[0].slice(0, matrix.length);
        }
    }

    return matrix;
}

/**
 * 可達行列からnodeとedgeを計算
 * @param {Array} matrixT 可達行列（2次元配列）
 * @param {Array} levelList グラフのレベル（1次元配列）
 * @returns {Object} nodes, edges
 */
let graphFormat = (dictMatrixT, levelList) => {
    let size = dictMatrixT.length;

    let nodeLevel = new Array();
    let allEdges = new Array();
    let nodes = {};
    let edges = new Array();

    // レベルの最大値を取得
    let maxLevel = Math.max(...levelList);

    // レベル0を計算
    let level_0 = [];
    for (let i = 0; i < levelList.length; i++) {

        if (levelList[i] == 0) {
            level_0.push(i);
            // deleteColumns(matrixT, i);
        }
    }
    nodeLevel.push(level_0);

    // レベル1以上を計算
    for (let i = 1; i <= maxLevel; i++) {
        let level_i = [];
        for (let j = 0; j < levelList.length; j++) {
            if (levelList[j] == i) {
                level_i.push(j);
                // deleteColumns(matrixT, j);
            }
        }
        // エッジを計算
        for (const idx of level_i) {
            for (let k = 0; k < size; k++) {
                if (dictMatrixT[idx][k] == 1 && idx != k) {
                    allEdges.push([k, idx]);
                }
            }
        }
        nodeLevel.push(level_i);
    }

    // ノードをグラフ化
    let level = 1;
    for (const row of nodeLevel) {
        let y = 50 * level;
        for (let i = 0; i < row.length; i++) {
            let x = CANVAS_WIDTH / (row.length + 1) * (i + 1);
            nodes[row[i]] = [x, y];
        }
        level++;
    }

    // エッジを整理
    for (let i = 0; i < allEdges.length; i++) {
        const edge = allEdges[i];

        // レベルが2つ以上違うときは重複を調べる
        if (levelList[edge[0]] - levelList[edge[1]] >= 2) {
            let isDouble = false;
            for (let j = i + 1; j < allEdges.length; j++) {
                if (edge[0] == allEdges[j][0]) {

                }
            }
        }
        else {
            edges.push(edge);
        }
    }

    console.log(allEdges)
    drawGraph(nodes, allEdges);
    // return { "nodes": nodes, "edges": edges }
}


let drawGraph = (nodes, edges) => {
    let canvas = document.getElementById("graphArea");
    let ctx = canvas.getContext("2d");

    ctx.font = "10px serif";

    let nodeWidth = 20;
    let nodeHeight = 20;

    // キャンバスのクリア
    ctx.clearRect(0, 0, canvas.width, canvas.height);

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
        ctx.fillText(Number(i) + 1, nodes[i][0] - 1.5, nodes[i][1] + 1.5);
    }
}

let calculate = () => {
    // フォームから行列の大きさを取得
    let size = document.forms.MatrixSize.text.value;

    // 行列を取得
    let row_names = [];
    for (let i = 0; i < size; i++) {
        row_names.push(`row${i}`);
    }
    let matrixA = GetMatrix(row_names);

    // 対角成分を1にする
    let matrixB = matrixA.slice();
    for (let i = 0; i < size; i++) {
        matrixB[i][i] = 1;
    }

    // 可達行列を計算
    let matrixT = matrixB.slice();
    let m = 2;
    while (!matrix_equal(matrixT, dotMatrix(matrixT, matrixB))) {
        matrixT = dotMatrix(matrixT, matrixB);
        m++;
        if (m > size) {
            break;
        }
    }
    // 可達行列を連想配列に変換
    let dictMatrixT = {};
    for (let i = 0; i < size; i++) {
        dictMatrixT[i] = matrixT[i].slice();
    }

    // 可達行列を表示
    displayAnswer(dictMatrixT);

    // 先行集合の計算
    let levelList = new Array(size);
    let level = 0;
    while (Object.keys(dictMatrixT).length > 1) {
        let deletKeys = new Array(0);
        let ok = false;
        for (const i of Object.keys(dictMatrixT)) {
            let array = dictMatrixT[i];
            let count = 0;
            // 配列の1の個数をカウント
            for (let j = 0; j < array.length; j++) {
                if (array[j] === 1) {
                    count++;
                }
            }
            if (count === 1) {
                deletKeys.push(i);
                levelList[i] = level;
                ok = true;
            }
        }
        // 指定した行・列を削除
        for (const i of deletKeys) {
            delete dictMatrixT[i]
            for (const j of Object.keys(dictMatrixT)) {
                dictMatrixT[j][i] = 0;
            }
        }
        level++;
        if (ok == false) break;
    }
    // 最上位のレベルを付与
    if (Object.keys(dictMatrixT).length > 0) {
        for (const i of Object.keys(dictMatrixT)) {
            levelList[i] = level;
        }
    }

    // 階層グラフの描画
    let graphComponents = graphFormat(matrixT, levelList);
}