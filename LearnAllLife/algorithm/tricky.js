// 只出现一次的数字
// 给定一个非空整数数组，除了某个元素只出现一次以外，其余每个元素均出现两次。找出那个只出现了一次的元素
// 异或法
var singleNumber = function(nums) {
    let sum = nums[0];
    for(let i = 1; i < nums.length; i++) {
        sum = nums[i] ^ sum;
    }
    return sum;
};

// 缺失的数字
// 一个长度为n-1的递增排序数组中的所有数字都是唯一的，并且每个数字都在范围0～n-1之内。在范围0～n-1内的n个数字中有且只有一个数字不在该数组中，请找出这个数字。
// 输入: [0,1,2,3,4,5,6,7,9]
// 输出: 8
// 二分查找，mid === target ？


// 找到所有缺失的数字
// 给定一个范围在  1 ≤ a[i] ≤ n ( n = 数组大小 ) 的 整型数组，数组中的元素一些出现了两次，另一些只出现一次。
// 找到所有在 [1, n] 范围之间没有出现在数组中的数字。
// 输入:
// [4,3,2,7,8,2,3,1]
//
// 输出:
// [5,6]
// 正常情况下索引位置的值为索引值 + 1
// 因此我们可以将 nums[i] - 1这个位置的值置为负数，
// 如果nums中有没被置为负数的，则说明该索引位置的数字不存在
var findDisappearedNumbers = function(nums) {
    for(let i = 0; i < nums.length; i++) {
        if(nums[Math.abs(nums[i]) - 1] > 0) {
            nums[Math.abs(nums[i]) - 1] *= -1;
        }
    }
    const res = [];
    for(let j = 0; j < nums.length; j++) {
        if(nums[j] > 0) {
            res.push(j+1);
        }
    }
    return res;
};