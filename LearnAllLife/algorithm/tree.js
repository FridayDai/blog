class BTreeNode {
    constructor(value, left, right) {
        this.value = value;
        this.left = left;
        this.right = right;
    }
}

//         0
//      1      3
//    2   4
const tree = {
    value: 0,
    left: {
        value: 1,
        left: {
            value: 2
        },
        right: {
            value: 4
        }
    },
    right: {
        value: 3
    }
};

// 求二叉树的深度
// 思路：树的深度 = 左右子树深度的最大值 + 1
function getDepthLoop(root) {
    console.log(root);
    if(!root) {
        return 0;
    }

    const leftDepth = getDepth(root.left);
    const rightDepth = getDepth(root.right);

    console.log(leftDepth, rightDepth);
    return Math.max(leftDepth, rightDepth) + 1;
}
// 非递归实现，借助队列和计数器（用于统计每一层的节点数量），现将跟节点压入队列中，当队列不为空时，取出node同时计数器加1，当计数器=每层节点数量时
// 深度加1，同时清空计数器，刷新下层宽度。
function getDepth(root) {
    let depth = 0;
    let count = 0;
    let nextCount = 1;
    const queue = [];
    queue.push(root);

    while(queue.length !== 0) {
        const node = queue.shift(); // 先进先出
        count++;

        if(node.left) {
            queue.push(node.left);
        }
        if(node.right) {
            queue.push(node.right);
        }
        if(count === nextCount) {
            count = 0;
            nextCount = queue.length;
            depth++;
            console.log(depth, nextCount); // 这里还能获得宽度 depth层有几个节点就是nextCount
        }
    }
    return depth;
}
console.log(getDepth(tree));
