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

    head.next = reverseLinkMN(head.next, m - 1, n - 1);
    return head;
}



// 链表判断是否有环 快慢指针法，快指针走两部，满指针走一步，相遇则为有环
const hasCycle = (head) => {
    const dummyHead = new ListNode(null, null);
    dummyHead.next = head;

    let fast = dummyHead;
    let slow = dummyHead;

    while(fast && fast.next) {
        fast = fast.next.next;
        slow = slow.next;
        if(fast === slow) {
            return true;
        }
    }
    return false;
};

// 合并两个有序链表
const mergeSortedLink = (l1, l2) => {
    if(!l1) {
       return l2;
    }
    if(!l2) {
        return l1;
    }
    if(l1.value <= l2.value) {
        l1.next = mergeSortedLink(l1.next, l2);
        return l1;
    } else {
        l2.next = mergeSortedLink(l2.next, l1);
        return l2;
    }
};

const mergeSortedLinkNotLoop = (l1, l2) => {

};

// 求链表的中间节点, 初始化一个dummyHead，然后快指针走两步，慢指针走一步，while（fast && fast.next）
function getMid(head) {
    const dummyHead = new ListNode(null);
    dummyHead.next = head;

    let fast = dummyHead;
    let slow = dummyHead;

    while(fast && fast.next) {
        fast = fast.next.next;
        slow = slow.next;
    }

    return slow;
}

// 链表排序, 使用归并的思想，将链表分递归的为两个部分，再有序的合并
function sortLink(head) {
    if(!head || !head.next) return head;
    const mid = getMid(head);

    // 分裂成两个链表
    const temp = mid.next;
    mid.next = null;

    const left = sortLink(head);
    const right = sortLink(temp);

    return mergeSortedLink(left, right);
}

// k个一组反转链表
// 先反转前K个，然后递归的反转后面，
// 出口是 链表长度不足K个
function reverseKGroup(head, k) {
    if(!head) {
        return head;
    }
    let a = head;
    let b = head;
    for(let i = 0; i < k; i++) {
        if(!b) return head;
        b = b.next;
    }

    const newHead = reverse(a, b);
    a.next = reverseKGroup(b, k);
    return newHead;
}
// 反转链表[a, b)
function reverse(a, b) {
    let pre = null;
    let cur = a;
    while(cur !== b) {
        const next = cur.next;
        cur.next = pre;
        pre = cur;
        cur = next;
    }
    return pre;
}

// 链表倒数第N个节点
// 双指针法：fast和slow都指向head，fast先向前走K步，然后俩一起走，当fast === null时，返回slow
