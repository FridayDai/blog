const testArr = [5, 3, 1, 2, 9, 4, 8, 6];

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
    for(let i = arr.length - 1; i > 0; i--) {
        for(let j = 0; j < i; j++) {
            if(arr[j] > arr[j + 1]) {
                swap(arr, j, j + 1);
            }
        }
    }
    return arr;
}

//寻找第K大的数
function findkk(arr, k) {
    for(let i = arr.length - 1; i > arr.length - 1 - k; i--) {
        for(let j = 0; j < i; j++) {
            if(arr[j] > arr[j + 1]) {
                swap(arr, j, j + 1);
            }
        }
    }
    return arr[arr.length - k];
}
// console.log(findkk(testArr, 2));

// 快速排序
function quickSort(array, left = 0, right = array.length - 1) {
    if(left > right) return;
    let i = left;
    let j = right;
    const pivot = array[left];

    while(i !== j) {
        while(i < j && array[j] <= pivot) {
            j--;
        }
        while(i < j && array[i] >= pivot) {
            i++;
        }
        swap(array, i, j);
    }
    swap(array, i, left);

    quickSort(array, left, i - 1);
    quickSort(array, i + 1, right);
}

function findK(arr, k) {

    function sort(arr, left, right) {
        if(left > right) return null;

        let i = left;
        let j = right;
        const pivot = arr[left];

        while(i !== j) {
            while(i < j && arr[j] >= pivot) {
                j--;
            }
            while(i < j && arr[i] <= pivot) {
                i++;
            }
            swap(arr, i, j);
        }
        swap(arr, left, i);
        console.log(i, arr.length - k);
        if(i === (arr.length - k)) return arr[i];
        if(i < (arr.length - k)) {
            return sort(arr, i + 1, right);
        } else {
            return sort(arr, left, i - 1);
        }
    }
    return sort(arr, 0, arr.length - 1);
}

// 归并排序
function mergeSort(arr, left, right) {
    if(left < right) {
        const mid = Math.floor((right + left) / 2);

        mergeSort(arr, left, mid);
        mergeSort(arr, mid + 1, right);

        return mergeTwoArr(arr.slice(left, mid), arr.slice(mid + 1, right));
    }
}

// 注意子序列本身要有序才可行
function mergeTwoArr(arr, l, mid, r, temp) {
    let k = 0;
    let left = l;
    let right = mid + 1;

    while(left <= mid && right <= r) {
        if(arr[left] < arr[right]) {
            temp[k++] = arr[left++];
        } else {
            temp[k++] = arr[right++];
        }
    }
    while(left <= mid) {
        temp[k++] = arr[left++];
    }
    while(right <= r) {
        temp[k++] = arr[right++];
    }

    return temp;
}

// 合并两个有序数组
function mergeTwoArray(arr1, arr2) {
    let l1 = arr1.length - 1;
    let l2 = arr2.length - 1;
    let lastIndex = arr1.length + arr2.length - 1;

    while (l1 >= 0 && l2 >= 0) {
        if (arr1[l1] > arr2[l2]) {
            arr1[lastIndex] = arr1[l1];
            l1--;
        } else {
            arr1[lastIndex] = arr2[l2];
            l2--;
        }
        lastIndex--;
    }

    if(l1 > l2) {
        return arr1;
    } else {
        arr1.splice(0, l2 + 1, ...arr2.slice(0, l2 + 1));
    }
    return arr1;
}
// 堆排序
function heap(array) {
    // 将最大值交换到首位
    for (let i = 0; i < array.length; i++) {
        heapInsert(array, i);
    }
    let size = array.length;
    // 交换首位和末尾
    swap(array, 0, --size);
    while (size > 0) {
        heapify(array, 0, size);
        swap(array, 0, --size);
    }
    return array;
}

function heapInsert(array, index) {
    // 如果当前节点比父节点大，就交换
    while (array[index] > array[parseInt((index - 1) / 2)]) {
        swap(array, index, parseInt((index - 1) / 2));
        // 将索引变成父节点
        index = parseInt((index - 1) / 2);
        console.log('index:', index);
    }
}
function heapify(array, index, size) {
    let left = index * 2 + 1;
    while (left < size) {
        // 判断左右节点大小
        let largest =
            left + 1 < size && array[left] < array[left + 1] ? left + 1 : left;
        // 判断子节点和父节点大小
        largest = array[index] < array[largest] ? largest : index;
        if (largest === index) break;
        swap(array, index, largest);
        index = largest;
        left = index * 2 + 1;
    }
}
