//获取读取文件名参数
var fileNameArr = process.argv.splice(2);
var fileName = fileNameArr[0];
//获取文件内容
var rf=require("fs");
var data=rf.readFileSync(fileName,"utf-8");

//换行符位置
var end = data.indexOf('\n');
var begin = 0;

//长度
var lengthArr =getLineArr(data,0,end+1);

//获取文件数组
var fileArr = new Array();
for(var i=0;i<lengthArr[0];i++){
		begin = end;
		end = data.indexOf('\n',end+1);
		fileArr.push(getLineArr(data,begin+1,end+1));
}

//获取文件每行数据
function getLineArr(data,begin,end){
	var resultArr = new Array();
	var num = "";
	for(var i=begin;i<end;i++){
		if(data[i]!=" " && data[i]!="\n"){
			num+=data[i];
		}else{
				if(num!=""){
					resultArr.push(parseInt(num));
					num = "";
				}
		}
	}
	return resultArr;
}

var height = 3.5;//水平面高度
var flag = true;//标识是否可以开始计数
var sum = 0;
var visitedArr = new Array();

//获取岛屿数量
function getNumber(array){
		for(var i=0;i<array.length;i++){
			for(var j=0;j<array[i].length;j++){
				if(visitedArr.indexOf("("+i+","+j+")")==-1){

					//计数
					if(array[i][j]>height){ //NO LOGNER NEEDED : && flag==true){
							sum++;
							flag = false;
							visitedArr.push("("+i+","+j+")");
							getNext(i,j,array);
					}
					// NO LONGER NEEDED
					// //设置标识位
					// if( array[i][j] <= height && flag==false){
					// 		flag = true;
					// }
				}

			}
		}
}

//相邻
function getNext(i,j,array){
		//向上
		if(visitedArr.indexOf("("+(i-1)+","+j+")")==-1){
			if(i-1>=0 && (array[i-1][j]>height)){
				visitedArr.push("("+(i-1)+","+j+")");
				getNext((i-1),j,array);
			}
		}
		//向左
		if(visitedArr.indexOf("("+i+","+(j-1)+")")==-1){
			if(j-1>=0 && (array[i][j-1]>height)){
				visitedArr.push("("+i+","+(j-1)+")");
				getNext(i,(j-1),array);
			}
		}
		//向下
		if(visitedArr.indexOf("("+(i+1)+","+j+")")==-1){
			if(i+1<array.length && ( array[i+1][j]>height)){
				visitedArr.push("("+(i+1)+","+j+")");
				getNext((i+1),j,array);
			}
		}
		//向右
		if(visitedArr.indexOf("("+i+","+(j+1)+")")==-1){
			if(j+1<array[i].length&&(array[i][j+1]>height)){
				visitedArr.push("("+i+","+(j+1)+")");
				getNext(i,(j+1),array);
			}
		}

}

// List out all possible land height levels
var levels = new Array();
for(var i = 0; i < lengthArr[0]; i++) {
	for(var j = 0; j < fileArr[i].length; j++) {
		if(levels.indexOf(fileArr[i][j]) < 0) {
			levels.push(fileArr[i][j]);
		}
	}
}

// Test each level for number of islands
var max = 0;
for(var i = 0; i < levels.length; i++) {
	height = levels[i] - 0.5;
	sum = 0;
	visitedArr = [];
	getNumber(fileArr);
	if(sum > max) max = sum;
}
console.log(max);
//
// //计算
// getNumber(fileArr);
// //打印结果
// console.log("number:",sum);
