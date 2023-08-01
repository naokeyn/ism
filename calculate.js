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
    let matrixB = matrixA;
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
        dictMatrixT[i] = matrixT[i];
    }
    // 可達行列を表示
    displayAnswer(dictMatrixT);

    // 先行集合の計算
    let groupList = new Array(0);
    while (Object.keys(dictMatrixT).length > 2){
        let level = 0;
        let deletKeys = new Array(0);
        for (let i of Object.keys(dictMatrixT)) {
            let array = dictMatrixT[i];
            let count = 0;
            // 配列の1の個数をカウント
            for (let j = 0; j < array.length; j++) {
                if (array[j] === 1) {
                    count++;
                }
            }
            // 
            if (count === 1) {
                deletKeys.push(i);
            }
        }
        

        level++;
    }

    // 階層グラフの描画

}