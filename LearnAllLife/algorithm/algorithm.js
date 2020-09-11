// 1. 英文自我介绍，包括个人，家乡和工作项目
// 2. 主要是基础知识，算法和项目

// 输入一个正数n，输出所有和为n连续正数序列。
// 例如输入15，由于1+2+3+4+5=4+5+6=7+8=15，所以输出3个连续序列1-5、4-6和7-8。
// 思路，定义一个滑动窗口small，big游标,通过判断区间的和是否为N来判断，如果和小于n，sum + （++big），如果和大于n，sum减去small，再将small向右移一位
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

// 万能公式：
// 定义 dp[i][j] = s1[1-i] s2[1-j]的LCS长度
// 如果s1[i] === s2[j],那么就是求 dp[i - 1][j - 1] + 1
// 如果s1[i] !== s2[j], 那么就是求 dp[i-1][j] 和 dp[i][j-1]
// 初始状态为 dp[0][j] = 0 dp[i][0] = 0;


// 无重复字符的最长子串
// 滑动窗口 定义一个left = 0 和 right = -1，和一个set
function getMaxLCS(str) {
    const len = str.length;
    const set = new Set();
    let maxLength = 0;
    let right = -1;
    for(let i = 0; i < len; i++) {
        if(i !== 0) {
            set.delete(str.charAt(i - 1));
        }

        while(right + 1 < len && !set.has(str.charAt(right + 1))) {
            set.add(str.charAt(right + 1));
            right++;
        }
        if(set.size > maxLength) {
            maxLength = set.size;
        }
    }
    return maxLength;
}


// hash表的应用
// 两数之和 给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。
function addTwo(arr, target) {
    const map = new Map();
    for(let i = 0; i < arr.length; i++) {
        const rest = target - arr[i];
        if(map.has(rest)) {
            return [map.get(rest), i];
        }
        map.set(arr[i], i);
    }
}

// 三叔之和
// 给定一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？找出所有满足条件且不重复的三元组。
function addThree(array, target) {
    const res = [];

    function sum(arr) {
        return arr.reduce((a, b) => {
            return a + b;
        }, 0);
    }

    function backtrack(arr, track, n, start) {
        console.log(sum(track), track, n);
        if(n === 3 && sum(track) === target) {
            res.push(track);
            return res;
        }
        if(n >= 3) return;
        //
        for(let i = start; i < arr.length; i++) {
            track.push(arr[i]);
            backtrack(arr.slice(0), track.slice(0), n + 1, i);
            track.pop();
        }

    }
    backtrack(array, [], 0, 0);
    return res;
}

// 高楼扔鸡蛋问题 dp（K，N）表示有K个鸡蛋，N层楼至少需要扔几次
function dp(K, N) {
    if(N === 0) return 0;
    if(K === 1) return N;
    let res = 20000;
    for(let i = 1; i <= N; i++) {
        res = Math.min(
            res,
            Math.max(dp(K - 1, i - 1), dp(K, N - i)) + 1
        );
    }

    return res;
}

// 两个正序数组的中位数
// 给定两个大小为 m 和 n 的正序（从小到大）数组 nums1 和 nums2。
// 请你找出这两个正序数组的中位数，并且要求算法的时间复杂度为 O(log(m + n))。
function findMedianSortedArrays() {

}

// 最长递增子序列
// 定义 dp[i] = arr[i], i结尾的最长递增子序列的长度
// 如果arr[i] > arr[j], 那么 dp[i] = max(dp[i], dp[j] + 1)
// 如果arr[i] < arr[j], return
// 初始状态为 dp[1-i] = 1
function LIS(arr) {
    const dp = new Array(arr.length);
    const len = arr.length;
    dp.fill(1);
    let max = 0;

    for(let i = 0; i < len; i++) {
        for(let j = 0; j < i; j++) {
            if(arr[i] > arr[j]) {
                dp[i] = Math.max(dp[i], dp[j] + 1);
                max = Math.max(max, dp[i]);
            }
        }
    }

    return max;
}

// 岛屿问题
function numIslands(grid) {
    if(!grid.length || !grid[0].length) return 0;

    const row = grid.length;
    const col = grid[0].length;
    let max = 0;
    for(let i = 0; i < row; i++) {
        for(let j = 0; j < col; j++) {
            if(grid[i][j] === 1) {
                max = Math.max(getArea(grid, i, j, row, col), max);
            }
        }
    }

    function getArea(grid, i, j, row, col) {
        let max_area = 0;

        function getMax(grid, i, j, row, col, area) {
            if(i >= row || j >= col || i < 0 || j < 0 || grid[i][j] === 0) return;
            if(i < row && j < col && grid[i][j] === 1) {
                grid[i][j] = 0;
                max_area = Math.max(max_area, area + 1);
            }
            console.log(i, j, area, max_area);
            getMax(grid, i+ 1, j, row, col, area++);
            getMax(grid, i - 1, j, row, col, area++);
            getMax(grid, i, j + 1, row, col, area++);
            getMax(grid, i, j - 1, row, col, area++);
        }
        getMax(grid, i, j, row, col, 0);
        return max_area;
    }
    return max;
}

// console.log(numIslands([[1,1,1,0,0],[1,1,0,0,0],[0,0,0,1,1],[0,0,0,1,1]]));
//
// 1,1,1,0,0
// 1,1,0,0,0
// 0,0,0,1,1
// 0,0,0,1,1

// 前缀树
class Trie {
    constructor() {
        this.root = Object.create(null)
    }
    insert(word) {
        let node = this.root
        for (const c of word) {
            if (!node[c]) node[c] = Object.create(null)
            node = node[c]
        }
        node.isWord = true
    }
    traverse(word) {
        let node = this.root
        for (const c of word) {
            node = node[c]
            if (!node) return null
        }
        return node
    }
    search(word) {
        const node = this.traverse(word)
        return !!node && !!node.isWord
    }
    startsWith(prefix) {
        return !!this.traverse(prefix)
    }
}

// 字符串的所有子串 'abc' = [a,b,c,ab,bc,abc]
function getAllSubString(str) {
    const res = [];
    for(let i = 0; i < str.length; i++) {
        for(let j = i; j < str.length + 1; j++) {
            if(i !== j) {
                const substr = str.substring(i, j);
                res.push(substr);
            }
        }
    }
    return res;
}

// 盛水最多的容器: 找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。
// 输入：[1,8,6,2,5,4,8,3,7]
// 输出：49
// 双指针法： 左右指针指向两端，比较其高度，面积为 Min(h[left], h[right]) * (right - left),如果h[left] <= h[right]那么left++， 反之right--；
// 每轮都能算出area，找到最大的area
var maxArea = function(height) {
    const len = height.length;
    let left = 0;
    let right = len - 1;
    let maxArea = 0;
    while(left < right) {
        const h = Math.min(height[left], height[right]);
        const area = h * (right - left);
        maxArea = Math.max(area, maxArea);
        if(height[left] <= height[right]) {
            left++;
        } else {
            right--;
        }
    }
    return maxArea;
};

// 最长连续序列
// 给定一个未排序的整数数组，找出最长连续序列的长度。
// 要求算法的时间复杂度为 O(n)。
// 示例:
// 输入: [100, 4, 200, 1, 3, 2]
// 输出: 4
// 解释: 最长连续序列是 [1, 2, 3, 4]。它的长度为 4。
var longestConsecutive = function(nums) {
    nums = [...new Set(nums)];
    const map = {};
    for(let i = 0; i < nums.length; i++) {
        map[nums[i]] = nums[i] + 1; // 并查集，查找下一个元素，所以key：value为这样
    }

    function find(x, m) {
        if(m[x]) {
            return find(m[x+1], m);
        } else {
            return x;
        }
    }

    let max = 0;
    for(let i = 0; i < nums.length; i++) {
        const temp = find(nums[i] + 1, map) - nums[i];
        max = Math.max(temp, max);
    }
    return max;
};

// top K问题
// 求数组中最小的k个数
// 1. 利用快排的思想，每一轮都会固定pivot的位置，如果pivot在索引m处的话
// if k === m,则前K个数为最小的K个数
// if m > k, 递归左边部分
// if m < k, 递归右半部分

// 2. 堆
// 找最小的K个数，就用大根堆。现将前k个数插入堆中，遍历数组当第K+1个数小于堆顶时，就将堆顶出堆，小的数进去。遍历完后，留在堆中的k个数即为最小的K个数。
// 找最大的K个数，就用小根堆。遍历数组时，如果当前元素大于堆顶，堆顶就出堆，大的数进去，遍历完后，留在堆中的K个数即为最大的K个数
// 堆的插入和删除O(logk)
function getMinK(arr, k) {
    if(k === 0) return 0;
    const maxHeap = new MaxHeap();
    for(let i = 0; i < k; i++) {
        maxHeap.push(arr[i]);
    }
    for(let i = k; i < arr.length; i++) {
        if(maxHeap.top() > arr[i]) {
            maxHeap.pop();
            maxHeap.push(arr[i]);
        }
    }
    return maxHeap;
}
function getMinKByQuickSort(arr, k) {
    if(k === 0) return 0;

    function swap(arr, i, j) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    function quickSort(arr, left, right) {
        let i = left;
        let j = right;
        const pivot = arr[left];

        while(i < j) {
            while(i < j && arr[j] >= pivot) {
                j--;
            }
            while(i < j && arr[i] <= pivot) {
                i++;
            }
            swap(arr, i, j);
        }
        swap(arr, i, left);
        console.log(i);
        if(i === (k - 1)) {
            return arr.slice(0, i + 1);
        } else if(i < k - 1) {
            return quickSort(arr, i+ 1, right);
        } else {
            return quickSort(arr, left, i - 1);
        }
    }

    return quickSort(arr, 0, arr.length - 1);
}

// 二进制数相加
function addBinary(a, b) {
    let carry = 0;
    let ans = '';
    for(let i = a.length - 1, j = b.length - 1; i >= 0 || j >= 0; i--, j--) {
        let sum = carry;
        sum += i >= 0 ? parseInt(a[i]) : 0;
        sum += j >= 0 ? parseInt(b[j]) : 0;

        carry = Math.floor(sum / 2); //
        ans += sum % 2;
    }

    if(carry > 0) {
        ans += '1';
    }
    return ans.split('').reverse().join('');
}

// 前K个高频元素
// 用map记录每个元素的出现次数
// 维护一个大小为k的最小堆，依次遍历map，如果当前元素大于堆顶，则堆定出堆，当前元素进堆，最终堆中的K个数即为频率最高的K个数


// 柱状图中的最大矩形
// 思路： 遍历每一条高，对于当前位置为i的柱子来说，他这个位置所能达到的最大矩形为，其左边第一个小于其高度的柱子位置left，其右边第一个小于其高度的柱子位置right
// area = height[i] * (right - left - 1)，我们遍历一遍所有的高度即可
// 优化：我们要找的是其左边第一个小于其高度的柱子的位置和右边第一个小于其高度的柱子的位置
// 优化思路：单调栈，单调递增栈出站时，说明新元素是出战元素向后找第一个比其小的元素 1， 5  《- 2
function getMaxRect(heights) {
    let ans = 0;
    const stack = [];
    heights = [0, ...heights, 0];

    for(let i = 0; i < heights.length; i++) {
        while(stack.length !== 0 && heights[stack[stack.length - 1]] > heights[i]) {
            const cur = stack[stack.length - 1]; // 出战的当前最高元素位置
            stack.pop(); // 出战
            const left = stack[stack.length - 1]; // 出战后比当前元素小的索引位置
            const right = i - 1; // 宽度指针
            ans = Math.max(ans, (right - left) * heights[cur]); // 计算面积
        }
        stack.push(i);
    }
    return ans;
}