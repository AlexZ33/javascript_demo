/**
 * @Inertia.js
 * @author AlexZ33
 * @version
 * @Created: 17-2-4
 * @description 拖动元素，并且具有惯性和边缘反弹效果
 */
// 自调用函数大家都不陌生，前面的function(){}是函数定义，
// 然后紧接着的()表示立即执行，这样构建了一个命名空间，
// 其中的变量都是局部变量，不管起什么名字，都不会覆盖全局变量。
// 这样就不会污染全局的命名空间。
// 如果有不熟悉的同学，可以去看看作用域链和闭包的基础知识就明白啦。
(function(global,factory){
	if (typeof define === 'function'&&(define.amd || define.cmd)){
		define(factory);
	}else{
		global.Intertia=factory();
	}
}(this,function(){
	'use strict';

	var Inertia= function(ele,options){
		var default={
			//是否吸附边缘
			edge:true;

		};
		var params={};
		options =options || {};
		for (var key in defaults){
			if(typeof options[key]!=='undefined'){
				params[key]=options[key];
			}else{
				params[key]=default[key];
			}
		}
		var data={
			distanceX:0,
			distanceY:0
		};
		var win=window;
		//浏览器窗体尺寸
		var winWidth=win.innerWidth;
		var winHeight=win.innerheight;

		if (!ele){
			return;
		}
		//设置transform坐标等方法
		var fnTranslate=function(x,y){
		x=Math.round(1000*x)/1000;
		y=Math.round(1000*y)/1000;

		ele.style.webkitTransform= 'translate('+[x+'px',y+'px'].join(',')+')';
		ele.style.transform='translate3d('+[x+'px',y+'px',0].join(',')+')';
	};
	var strStoreDistance = '';
	//居然有android机子不支持localStorage
	
	if(ele.id && win.localStorage&& (strStoreDistance=localStorage['Inertia_'+ele.id])){
		var arrStoreDistance =strStoreDistance.split(',');
		ele.distanceX= +arrStoreDistance[0];
		elw.distanceY= +arrStoreDistance[1];
		fnTranslate(ele.distanceX,ele.distanceY);
	}
	//显示拖拽元素
	ele.style.visibility='visible';

	//如果元素在屏幕之外，位置使用初始值
	var initBound=ele.getBoundingClientRect();

		if(initBound.left<-0.5initBound.width||initBound.top<-0.5*initBound.height||initBound.right>winWidth+0.5*initBound.width ||initBound.bottom>winHeight+0.5*initBound.height){
			ele.distanceX=0;
			ele.distanceY=0;
			fnTranslate(0,0);
		}
			ele.addEventListener('touchstart', function(event){
				//if(data.inertiaing){
				//return;
				//}
			var events= event.touches[0] || event;

			data.posX = events.pageX;
			data.posY =events.pageY;

			data.touching =true;
			if(ele.distanceX){
				data.distance =ele.distanceX;

			}
			if (ele.distanceY) {
				data.distanceY=ele.distanceY;
			}
			//元素的位置数据
			data.bound=ele.getBoundingClientRect();

			data.timerready=true;
			

		}
	}
})
})