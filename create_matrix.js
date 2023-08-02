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