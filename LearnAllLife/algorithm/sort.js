function swap(arr, left, right) {
    const temp = arr[right];
    arr[right] = arr[left];
    arr[left] = temp;
}

// 插入排序
function insertSort(arr) {
    for(let i = 1; i < arr.length; i++) {
        for(let j = i - 1; j >= 0; j--) {
            if(arr[j] > arr[j + 1]) {
                swap(arr, j, j+ 1);
            }
        }
    }
    return arr;
}

//

// 冒泡排序
function bubbleSort(arr) {
    for(let i = 0; i < arr.length; i++) {
        for(let j = 1; j < arr.length; j++) {

        }
    }
}


// 快速排序