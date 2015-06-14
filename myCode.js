//获取读取文件名参数
var fileNameArr = process.argv.splice(2);
var fileName = fileNameArr[0];
//获取文件内容
var rf=require("fs");  
var data=rf.readFileSync(fileName,"utf-8");  

//换行符位置
var index = data.indexOf('\n');

//数组长度
var arrLength = "";
for(var i=0;i<index;i++){
	arrLength+=data[i];
}
arrLength = parseInt(arrLength);

//获取文件数组
var fileArr = new Array();
var num = "";
for(var i=index+1;i<data.length;i++){
	if(data[i]!=" " && data[i]!="\n"){
		num+=data[i];
	}else{
			if(num!=""){
				fileArr.push(parseInt(num));
				num = "";
			}
	}
}


//获取岛屿最大高度差
//var minH = Math.min.apply(null, fileArr);
//var maxH = Math.max.apply(null, fileArr);
var minH = 0;
var maxH;
for(var i=0;i<fileArr.length;i++){
	if(fileArr[i]>fileArr[i+1]){
			var t = fileArr[i];
			fileArr[i] = fileArr[i+1];
			fileArr[i+1] = t;
	}
}
maxH = fileArr[fileArr.length-1];


//获取最大岛屿数
function max(arr){
	var maxSum = 0;
	var flag = true;//标识是否可以开始计数
	var sum = 0;
	
	//循环获取高度
	for(var i=minH;i<=maxH;i++){
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
	
	return maxSum;
}

//打印结果
console.log(max(fileArr));


