// 最长公共子串的长度（注意要连续）
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

// 最长公共子序列，非连续子序列
// 例如：输入两个字符串BDCABA和ABCBDAB，字符串BCBA和BDAB都是是它们的最长公共子序列，则输出它们的长度4，并打印任意一个子序列。
// 思路：令 X=<x1,x2,…,xm> 和 Y=<y1,y2,…,yn> 为两个序列，Z=<z1,z2,z3,…,zk>为X和Y的任意LCS。则:
// 如果xm=yn，则zk=xm=yn且Zk−1是Xm−1和Yn−1的一个LCS。
// 如果xm≠yn，zk≠xm，意味着Z是Xm−1和Y的一个LCS。
// 如果xm≠yn，zk≠yn，意味着Z是X和Yn−1的一个LCS。
// dp[i][j] = 第一个字符串i 和 第二个字符串j的最长公共子序列长度
// dp[i][j] : 如果s[i] === s[j] dp[i][j] = dp[i - 1][j - 1] + 1
// 如果s[i] !== s[j],那么 dp[i][j] = Max(dp[i - 1][j], dp[i][j - 1]);
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
    console.log(dp);
    return dp[l1][l2];
}

function constructArray(x, y) {
    const arr = [];
    for(let i =0; i < x; i++) {
        arr[i] = new Array(y).fill(0);
    }
    return arr;
}

// 动态规划：最长回文子串 'abbad' -> abba, 画表法, 头和尾是否相等，如果相等的话则判断内部是否为回文子串
//  先定义 dp[i][j] = s[i - j] 是否为回文串 true or false
//  如果 s[i] = s[j] ，则判断 dp[i + 1][j - 1]是否为回文串
//  反之 s[i] !== s[j], 那么 dp[i][j] = false
function getPalidandString(str) {
    let maxLen = 1;
    let start = 0;
    const dp = constructArray(str.length);
    for(let i = 0; i < str.length; i++) {
        dp[i][i] = true;
    }
    for(let j = 1; j < str.length; j++) {
        for(let i = 0; i < j; i++) {
            if(str[i] !== str[j]) {
                dp[i][j] = false;
            } else {
                if(j - i < 3) {
                    dp[i][j] = true;
                } else {
                    dp[i][j] = dp[i + 1][j - 1];
                }
                if(dp[i][j] === true) {
                    if(j-i+1 > maxLen) {
                        maxLen = j - i + 1;
                        start = i;
                    }
                }
            }
        }
    }
    console.log(str.substr(start, maxLen));
}

// 凑硬币 【1，2，5，。。。】 mount = n
// 定义：dp[n] = 凑n需要的最少硬币数量
// dp[n] = min(dp[n - 5], dp[n-2], dp[n-1], ...) + 1
// dp[0] = 0


// 0-1背包问题
// i 个物品 j 背包容量
// w  [2, 1, 3]
// val[4, 3, 5]
// dp[i][W] 选前i个物品，放入重量不超过W的最大值
// 对于第i个来说 有两种情况 dp[i][j] : 选 dp[i - 1][j - w[i]] + value[i], 不选 dp[i-1][j], 二者取max
// 初始状态：dp[0][j] = 0; dp[i][0] = 0;
function bag(W, w, val) {
    const len = w.length;
    const dp = constructArray(len + 1, W + 1);
    for(let i = 1; i <= len; i++) {
        for(let j = 0; j <= W; j++) {
            if(j - w[i] >= 0) {
                dp[i][j] = Math.max(dp[i - 1][j - w[i - 1]] + val[i - 1], dp[i - 1][j]);
            } else {
                dp[i][j] = dp[i - 1][j];
            }
        }
    }
    console.log(dp[len][W]);
    // return dp[len - 1][j]
}

// 所有的回文串 : 给定一个字符串，你的任务是计算这个字符串中有多少个回文子串。
// 示例 1：
//
// 输入："abc"
// 输出：3
// 解释：三个回文子串: "a", "b", "c"
// 示例 2：
// 输入："aaa"
// 输出：6
// 解释：6个回文子串: "a", "a", "a", "aa", "aa", "aaa"
// 定义 dp[i][j] 表示 子串i-j是否是回文串
// 如果 s[i] === s[j],那么只需要判断dp[i+1][j-1]是否为回文串，即可知道dp[i][j],这里的状态关系是需要知道dp[i+1][j-1] => dp[i][j],画dp表的时候就要注意顺序
// 如果 s[i] !== s[j],那么 dp[i][j] = false
// 初始base case：dp[i][j] = true, 当 i=== j时
var countSubstrings = function(s) {
    function constructArray(x,y) {
        const arr = new Array(x).fill(false);
        for(let i = 0; i < y; i++) {
            arr[i] = new Array(y).fill(false);
        }
        return arr;
    }
    if(!s || !s.length) return 0;
    let count = 0;
    const dp = constructArray(s.length, s.length);

    for(let j = 0; j < s.length; j++) {
        for(let i = 0; i <= j; i++) {
            console.log(i, j);
            if(i === j) {
                dp[i][j] = true;
                count++;
            } else if(j - i === 1) {
                if(s[i] === s[j]) {
                    dp[i][j] = true;
                    count++;
                }
            } else if( j - i > 1) {
                if(s[i] === s[j] && dp[i + 1][j - 1] === true) {
                    dp[i][j] = true;
                    count++;
                }
            }
        }
    }
    return count;
};

// 连续子数组的最大和：输入一个整型数组，数组中的一个或连续多个整数组成一个子数组。求所有子数组的和的最大值。
// 输入: nums = [-2,1,-3,4,-1,2,1,-5,4]
// 输出: 6
// 解释: 连续子数组 [4,-1,2,1] 的和最大，为 6。
// dp[i] : 以i结尾的数组的连续子数组的最大值
// dp[i] = max(dp[i-1] + nums[i], nums[i]) 要不就是连续数组加一位，要不就是那一位新开一个子序列
// dp[0] = nums[0]
const maxSubArray = function(nums) {
    if(nums.length === 0) return 0;
    const dp = [];
    dp[0] = nums[0];
    let max = nums[0];
    for(let i = 1; i < nums.length; i++) {
        dp[i] = Math.max(dp[i - 1] + nums[i], nums[i]);
        max = Math.max(max, dp[i]);
    }
    return max;
};

