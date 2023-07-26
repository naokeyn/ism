let displayMatrix = () => {
    let size = document.forms.MatrixSize.text.value;
    let table = document.getElementById("matrix");

    // 要素をクリア
    let target = table.querySelector("tr");
    while (target) {
        table.removeChild(target)
        target = table.querySelector("tr");
    }

    for (let i = 0; i < size; i++) {
        table.appendChild(addRow(size, `row${i}`, title=i+1));
    }
}



let addRow = (length, RowName, title="Head") => {
    let tableRow = document.createElement("tr");
    let tableHead = document.createElement("th");

    tableHead.textContent = title;
    tableRow.appendChild(tableHead);

    for (let i = 0; i < length; i++) {
        // th要素の作成
        let tableItem = document.createElement("th");

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