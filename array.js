/**
 * 配列の中身を確認する関数
 * 全て0ならfalse
 * @param {Array}
 * @returns {boolean}
 */
let isNull = (array) => {
    let ans = false;

    for (let i = 0; i < array.length; i++) {
        if (array[i] != 0) ans = true;
    }

    return ans
}

/**
 * 二つの配列が一致するか確認
 * @param {Array} array1 
 * @param {Array} array2 
 * @returns {boolean} 一致すれば`true`
 */
let array_equal = (array1, array2) => {
    if (array1.length != array2.length) {
        return false;
    }
    for (let i = 0; i < array1.length; i++) {
        if (array1[i] != array2[i]) {
            return false;
        }
    }

    return true;
}

/**
 * 二次元配列が一致するか確認
 * @param {Array} matrix1 二次元配列
 * @param {Array} matrix2 二次元配列
 * @returns {boolean}
 */
let matrix_equal = (matrix1, matrix2) => {
    if (matrix1.length != matrix2.length) {
        return false;
    }
    for (let i = 0; i < matrix1.length; i++) {
        let array1 = matrix1[i];
        let array2 = matrix2[i];
        if (!array_equal(array1, array2)) {
            return false;
        }
    }

    return true;
}

/**
 * 大きさ`size`の空の二次元正方行列を作成
 * @param {number} size 
 * @returns
 */
let create2DSquareArray = (size) => {
    let array = new Array(size);
    for (let i = 0; i < size; i++) {
        array[i] = new Array(size);
    }

    return array;
}

/**
 * 指定した列を全て0にする
 * @param {Array} matrix 二次元配列
 * @param {*} column 列（整数）
 * @returns 
 */
let deleteColumns = (matrix, column) => {
    let size = matrix.length;
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if (j == column) {
                matrix[i][j] = 0;
            }
        }
    }

    return matrix;
}

/**
 * 行列の転置を返す関数
 * @param {Array} matrix 二次元配列 
 * @returns {Array} 二次元配列
 */
let transpose = (matrix) => {
    let array = create2DSquareArray(matrix.length);

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix.length; j++) {
            array[i][j] = matrix[j][i];
        }
    }

    return array;
}

/**
 * 行列の二乗を返す関数
 * @param {Array} matrix 
 * @returns 
 */
// let square = (matrix) => {
//     let transMatrix = transpose(matrix);
//     let array = create2DSquareArray(matrix.length);

//     for (let i = 0; i < matrix.length; i++) {
//         for (let j = 0; j < matrix.length; j++) {
//             array[i][j] = matrix[i][j] * transMatrix[i][j];
//         }
//     }

//     return array;
// }

let dotMatrix = (matrix1, matrix2) => {
    let array = create2DSquareArray(matrix1.length);
    let transMatrix = transpose(matrix2);

    for (let i = 0; i < matrix1.length; i++) {
        for (let j = 0; j < matrix1.length; j++) {
            let _array_i = matrix1[i];
            let _array_j = transMatrix[j];

            let s = 0;
            for(let k=0; k<array.length ; k++){
                s += _array_i[k] * _array_j[k];
            }

            // 二値に変換
            if (s != 0){
                s = 1;
            }
            array[i][j] = s;
        }
    }

    return array;
}