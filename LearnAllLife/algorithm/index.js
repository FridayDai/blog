function resolve(root) {
    const queue = [];
    let count = 0;
    let len = 0;
    let is_left = true;
    queue.push(root);

    while(queue.length) {
        const node = queue.shift();
        if(node !== null) {
            if(is_left) {
                queue.push(node.value);
            } else {
                queue.unshift(node.value);
            }

            if(node.left) {
                node.push(node.left);
            }
            if(node.right) {
                node.unshift(node.right);
            }
        }


    }
}