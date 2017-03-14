//匿名自执行函数来封装
//基本思路就是利用setTimeInterval控制opacity的变换

;(function(window,u){
	function Hotspot(){
		this.init();
	}

//在原型上扩展init()方法  
//#对于原型和构造函数的理解多看《javascript高级程序语言》第六章#

	Hotspot.prototype ={
		init:function(){
			this.onHotspotHover();


		},
		//给热点绑定事件
		 onHotspotHover:function(){
			var hotSpots =this.$$('hotSpot'),//得到页面上所有拥有hotSpot样式的元素
				len =hotSpots.length,
				i,
				that=this,
				currDetailImg;
				for ( i = 0; i < len; i++) {
					currDetailImg= that.$$('detailImg',hotSpots[i])[0];
					// currDetailImg.timer;
					// currDetailImg.alpha=0;
					hotSpots[i].onmouseover=function(e){
						that.doTransform(that.$$('detailImg',this[0]),100);
						that.$$('dot',this)[0].style.display='none';//闪烁红点在mouseover时候隐藏

					}
					hotSpots[i].onmouseout=function(e){
						that.doTransform(that.$$('detailImg',this[0]),0);
						that.$$('dot',this)[0].style.display='block';
					}
				}

		},

		//doTransform()动画方法
		//实现元素透明度缓冲效果的变化
		
		doTransform:function(me,alpha){
			var times=0;
			if (alpha==100) {
				times=5;
			}else{
			   times=-5;
			}

			// me.style.display="block";
			clearInterval(me.timer);
			me.timer=setInterval(function(){
				if (me.alpha==alpha) {
					clearInterval(me.timer);
					if (alpha==0) {		
						me.style.display='none';
					}
				}else{
					me.alpha+=times;
					me.style.opacity=me.alpha/100;
					me.style.filter='alpha(opacity:'+me.alpha+')';//兼容老ie浏览器
				}
			},30);

		},



		$$: function(clsName,ele){
			//如果当前浏览器支持原生的getElementsByClaasName方法，就用这个方法实现$$
			if (document.getElementsByClassName) {

				return(ele || document.getElementsByClassName(clsName));
			}else{
				//不支持的时候
				//通过getElementsByTagName方法得到页面上所有标签
				var nodes=(ele || document).getElementsByTagName('*'),
					eles=[],//用这个数组存放筛选出的节点
					len=nodes.length,
					i,
					j,
					currrNode,
					clsNames,
					clsLen;
				for (i = 0; i < len; i++) {
					currrNode=nodes[i];
					clsNames= currrNode.className.split(' ');//得到当前元素上所有样式的名字
					clsLen = clsNames.length;
					// 通过for循环依次判断与传入的样式名字是否相等
					for (j = 0; j<clsLen; j++) {
						if(clsNames[j]==clsName){
							eles.push(currNode);//如果相等就（就是我们需要找的元素），把它放进eles数组里面，并退出循环
							break;
						}
					}
				}
				return eles;
			}
		}
	}
	new Hotspot();
})(window);