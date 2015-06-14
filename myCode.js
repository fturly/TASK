var height = 2.3;
var arr = [5,6,1,3,2,9,8];

var flag = true;//标识是否可以开始计数
var sum = 0;

for(var i=0;i<arr.length;i++){
		//计数
		if(arr[i]>height && flag==true){
				sum++;
				flag = false;
		}
		//设置标识位
		if( arr[i] <= height && flag==false){
				flag = true;
		}
}

console.log('island number:',sum);
