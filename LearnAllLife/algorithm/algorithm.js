// 输入一个正数n，输出所有和为n连续正数序列。
// 例如输入15，由于1+2+3+4+5=4+5+6=7+8=15，所以输出3个连续序列1-5、4-6和7-8。
// 思路，定义一个small，big游标,通过判断区间的和是否为N来判断，如果和小于n，sum + （++big），如果和大于n，sum减去small，再将small向右移一位
function sumEqual(n) {
    if(n === 1) return 1;

    let small = 1;
    let big = 2;
    let sum = small + big;
    while(small < big && big <= n/2 +1) {
        if(sum === n) {
            console.log(small, big);
        }
        if(sum < n) {
            big++;
            sum = sum + big;
        } else {
            sum = sum - small;
            small++;
        }
    }
}

// 输入一个字符串，打印出该字符串中字符的所有排列。 全排列
// 回溯法 + 剪枝
function permute(str) {
    const res = [];
    function backtrack(array, track) {
        // 出口
        if(track.length === array.length) {
            res.push(track.join(''));
            return;
        }

        for(let i = 0; i < array.length; i++) {
            if(!track.includes(array[i])) {
                track.push(array[i]);
                backtrack(array, track.slice(0));
                track.pop(array[i]);
            }
        }
    }

    backtrack(str.split(''), []);
    return res;
}

// 最长公共子序列，非连续子序列
// 例如：输入两个字符串BDCABA和ABCBDAB，字符串BCBA和BDAB都是是它们的最长公共子序列，则输出它们的长度4，并打印任意一个子序列。
// 思路：令 X=<x1,x2,…,xm> 和 Y=<y1,y2,…,yn> 为两个序列，Z=<z1,z2,z3,…,zk>为X和Y的任意LCS。则:
// 如果xm=yn，则zk=xm=yn且Zk−1是Xm−1和Yn−1的一个LCS。
// 如果xm≠yn，zk≠xm，意味着Z是Xm−1和Y的一个LCS。
// 如果xm≠yn，zk≠yn，意味着Z是X和Yn−1的一个LCS。
function constructArray(x, y) {
    const arr = [];
    for(let i =0; i < x; i++) {
        arr[i] = new Array(y);
        for(let j = 0; j < y; j++) {
            arr[i][j] = 0;
        }
    }
    return arr;
}

function LCS(s1, s2) {
    const l1 = s1.length;
    const l2 = s2.length;

    const dp = constructArray(l1 + 1, l2 + 1);
    for(let i = 1; i < l1 + 1; i++) {
        for(let j = 1; j < l2 + 1; j++) {
            if(s1[i - 1] === s2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }
    return dp[l1][l2];
}

// 最长公共子字符串，需要连续
function maxLCS(s1, s2) {
    const l1 = s1.length;
    const l2 = s2.length;
    let biggest = 0;

    const dp = constructArray(l1 + 1, l2 + 1);
    for(let i = 1; i < l1 + 1; i++) {
        for(let j = 1; j < l2 + 1; j++) {
            if(s1[i - 1] === s2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
                biggest = Math.max(dp[i][j], biggest);
            } else {
                dp[i][j] = 0;
            }
        }
    }
    return biggest;
}