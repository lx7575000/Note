#Rotate Array
###2015-05-23

**基础版本**

```
C 语言

void rotateOne(int *nums, int numSize){
    int tmp = nums[0];
    for(int i = 1; i < numSize; i++){
        nums[i - 1] = nums[i];
    }
    nums[numSize - 1] = tmp;
}
//每次只左移一位

void rotate(int* nums, int numsSize, int k) {
    if(numsSize == 1 || k == 0){
        return ;
    }
    //如果此时要求转移的位数大于数组长度，可以认为只要知道它的余数就够了
    if(k > numsSize){
        k = k % numsSize;
    }
    //这个函数其实是为了进行右移数组的，懒得改了，直接用下面的方法操作其实意义相同
    int t = numsSize - k;
    while(t--){
        rotateOne(nums, numsSize);
    }
}
```

**进阶版本：三次反转**

```
void revese(int *nums, int from, int to){
    while(from < to){
        int tmp = nums[from];
        nums[from++] = nums[to];
        nums[to--] = tmp;
    }
}
//数组翻转，编程珠玑中有提到。

void rotate(int *nums, int n, int m){
    m %= n; //为了防止当m大于长度n的情况发生
    int t = n - m;//用于右转数组，才添加的这条哦
    revese(nums, 0, t - 1);//左翻转
    revese(nums, t, n - 1);//右翻转
    revese(nums, 0, n - 1);//大翻转
}

```