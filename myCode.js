var arr = [5,6,1,3,2,9,8];

var maxSum = 0;
var flag = true;//标识是否可以开始计数
var sum = 0;

//循环获取高度
for(var i=0;i<arr.length;i++){
	//设置初始值
	flag = true;//标识是否可以开始计数
	sum = 0;

	for(var j=0;j<arr.length;j++){
		//计数
		if(arr[j]>arr[i] && flag==true){
				sum++;
				flag = false;
		}
		//设置标识位
		if( arr[j] <= arr[i] && flag==false){
				flag = true;
		}
	}

	if(sum>maxSum){
		maxSum = sum;
	}
}

console.log('island number:',maxSum);
