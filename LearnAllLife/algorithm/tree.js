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

    const leftDepth = getDepthLoop(root.left);
    const rightDepth = getDepthLoop(root.right);

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

// z字形遍历二叉树
// 需要一个level_list来存每一行的节点信息，为双端队列 is_left = true就从尾部进每一层的节点，反之从头部进每一层的节点
// 通过每一层最后加null为层与层之间的分隔符
function zTraverse(root) {
    const queue = [];
    queue.push(root);
    queue.push(null);

    let res = [];
    let level_list = [];
    let is_left = true;

    while(queue.length > 0) {
        const node = queue.shift();
        if(node !== null) {
            if(is_left) {
                level_list.push(node.value);
            } else {
                level_list.unshift(node.value);
            }

            if(node.left) queue.push(node.left);
            if(node.right) queue.push(node.right);
        } else {
            res.push(level_list);
            level_list = [];
            is_left = !is_left;
            if(queue.length > 0) {
                queue.push(null);
            }
        }
    }
    return res;
}
// console.log(zTraverse(tree));
// 遍历二叉树
function traverseTreeLoop(root) {
    if(!root) return;
    // pre
    traverseTreeLoop(root.left);
    // mid
    traverseTreeLoop(root.right);
    // last
}

function traverseTree(root) {
    const queue = [];
    queue.push(root);

    while (queue.length) {
        const node = queue.shift();
        // todo

        if(node.left) queue.push(node.left);
        if(node.right) queue.push(node.right);
    }
}

// 反转二叉树
function reverseBTree(root) {
    if(!root) return;
    [root.left, root.right] =  [root.right, root.left];

    reverseBTree(root.left);
    reverseBTree(root.right);
}

// 遍历N茶树
function traverseNTree(root) {
    if(!root) return;

    for(let i = 0; i < root.children.length; i++) {
        // pre
        traverseNTree(root.children[i]);
        // last
    }
}

// 二叉树的最近公共祖先，给出p，q，求公共祖先节点 1.遍历一边树，记录节点map，key为curValue，value为parentValue。2。沿着p构建轨迹路线 3。查q及q的父级再其中是否包含
function getCommonRoot(rot, p, q) {
    const map = new Map();
    const traverse = [];
    function con(root, parentRoot) {
        map[root.value] = parentRoot.value;

        if(root.left) con(root.left, root);
        if(root.right) con(root.right, root);
    }
    con(rot, null);

    while(p !== null) {
        traverse.push(p.value);
        p = map.get(p.value);
    }

    while(q !== null) {
        if(traverse.includes(q.value)) {
            return q;
        }

        q = map.get(q.value);
    }
    return null;
}

// 求一棵树的所有路径 先序遍历
function getAllPath(rot) {
    const res = [];
    function dfs(root, track) {
        if(!root) return;
        track.push(root.value);
        if(!root.left && !root.right) {
            res.push(track);
        }
        dfs(root.left, track.slice(0));
        dfs(root.right, track.slice(0));
    }
    dfs(rot, []);
    return res;
}

// 验证二叉搜索树：节点的左子树只包含小于当前节点的数。 节点的右子树只包含大于当前节点的数。 所有左子树和右子树自身必须也是二叉搜索树。
function isBTree(root, min, max) {
    if(!root) return true;
    if(root.value >= max || root.value <= min) {
        return false;
    }

    return isBTree(root.left, min, root.value) && isBTree(root.right, root.value, max);
}

// 数组构建二叉搜索树[1,2,3,4,5]
function array2BTree(arr) {
    function helper(nums, left, right) {
        if(left > right) return;
        const mid = Math.floor((left + right) / 2);

        const node = new BTreeNode(nums[mid], null, null);
        node.left = helper(nums, left, mid - 1);
        node.right = helper(nums, mid + 1, right);
        return node;
    }
    return helper(arr, 0, arr.length - 1);
}

// 先序和中序遍历
function preOrder(root) {
    const queue = [];
    let cur = root;
    while(queue.length !== 0 || cur) {
        while(cur) {
            // preOrder
            queue.push(cur);
            cur = cur.left;
        }

        cur = queue.pop();
        // midOrder
        cur = cur.right;
    }
}

// 后序遍历
function lastOrder(root) {
    const stack = [];
    let cur = root;
    let lastVisited = root;
    while(stack.length !== 0 || cur) {
        while(cur) {
            stack.push(cur);
            cur = cur.left;
        }

        cur = stack.pop();
        if(!cur.right || cur.right === lastVisited) {
            // lastOrder cur.val
            console.log(cur.value);
            stack.pop();
            lastVisited = cur;
            cur = null;
        } else {
            cur = cur.right;
        }
    }
}
console.log(lastOrder(tree));