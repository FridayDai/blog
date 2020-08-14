class ListNode {
    constructor(value, next) {
        this.value = value;
        this.next = null;
    }
}

const link = {
    value: 1,
    next: {
        value: 2,
        next: {
            value: 3,
            next: {
                value: 4,
                next: {
                    value: 5,
                    next: null
                }
            }
        }
    }
};

// 反转链表
// 输入: 1->2->3->4->5->NULL
// 输出: 5->4->3->2->1->NULL
function reverseLinkListLoop(head) {
    if(!head.next) return head;
    const last = reverseLinkList(head.next);
    head.next.next = head; // o -> last
    head.next = null;

    return last;
}

//       1    2    3    4   5
// pre  cur  next
//      pre  cur  next
function reverseLinkList(head) {
    let cur = head;
    let pre = null;

    while(cur !== null) {
        const next = cur.next;
        cur.next = pre;
        pre = cur;
        cur = next;
    }
    return pre;
}

// 反转链表前n项
let successor = null;
function reverseLinkListN(head, n) {
    if(n === 1) {
        successor = head.next;
        return head;
    }
    const last = reverseLinkListN(head.next, n - 1);
    head.next.next = head;
    head.next = successor;
    return last;
}


// 反转链表[n, m]
function reverseLinkMN(head, m, n) {
    if(m === 1) return reverseLinkListN(head, n);

    reverseLinkMN(head.next, m - 1, n - 1);
}
