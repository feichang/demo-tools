/**
 * Responsive Test Tool
 * @author 飞长 <veryued@gmail.com>
 * http://veryued.org
 * version 1.0 着急用 代码写的有点烂，下一个版本再改进
 */
(function(window, document, undefined){
	var version = '1.0',
		DESKTOP = ['1024x600','1024x768','1280x800','1366x768','1440x900','1600x900','1680x1050','1920x1080','1920x1200'], 	//纪录屏幕常用尺寸
		TABLET = ['800x480','800x600','1024x600','1024x768','768x1024','1280x800'], 	//纪录平板电脑常用尺寸
		MOBILE = ['176x220','240x320','320x240','320x480', '480x800'], 	//纪录手机常用尺寸
		TELEVISION = ['640x480','1280x720','1920x1080']; 	//纪录电视常用尺寸

	ResponsiveTest = {
		IFRAMEWRAPPER : null,
		mapcall : function (match, callback)
		{
			if (match === null)
			{
				return;
			}

			var length = match.length;
			if (callback)
			{
				if (length !== undefined)
				{
					if (length > 0)
					{
						$each(match, function (i, item)
						{
							callback(item);
						});
					}
					return match;
				}
				else
				{
				 	return callback(match);
				}
			}
			else
			{
				return match;
			}
		},
		$id : function(sel){
			return document.getElementById(sel);
		},
		$each: function (haystack, callback)
		{
			var i = 0,
				length = haystack.length,
				name;

			if (length !== undefined)
			{
				for (; i < length;)
				{
					if (callback.call(haystack[i], i, haystack[i++]) === false)
					{
						break;
					}
				}
			}
			else
			{
				for (name in haystack)
				{
					callback.call(haystack[name], name, haystack[name]);
				}
			}
		},
		$bind: function (elem, type, handler)
		{
			return mapcall(elem, function (elem)
			{
				if (typeof type === 'object')
				{
					$each(type, function (type, handler)
					{
						$event.add(elem, type, handler);
					});
					return elem;
				}
				if (elem.nodeType === 3 || elem.nodeType === 8 || !type || !handler)
				{
					return false;
				}
				if (elem.addEventListener)
				{
					if (type === 'mouseenter' || type === 'mouseleave')
					{
						type = type === 'mouseenter' ? 'mouseover' : 'mouseout';
						handler = $event.handler.mouseenter(handler);
					}
					elem.addEventListener(type, handler, false);
				}
				else
				{
					// Prevent attaching duplicate event with same event type and same handler for IE8-6
					if (elem.getAttribute)
					{
						var handlerName = handler.toString();
						if ($data.get(elem, 'event-' + type + '-' + handlerName))
						{
							return false;
						}
						$data.set(elem, 'event-' + type + '-' + handlerName, true);
					}
					elem.attachEvent('on' + type, handler);
				}
				return elem;
			});
		},
		//设置css
		$setCss: function (elem, name, value)
		{
			return mapcall(elem, function (elem)
			{
				if (!elem.currentStyle || !elem.currentStyle.hasLayout)
				{
					elem.style.zoom = 1;
				}
				if (name === 'opacity')
				{
					elem.style.filter = 'alpha(opacity=' + value * 100 + ')';
					elem.style.zoom = 1;
				}
				else
				{
					elem.style[name] = value;
				}
				return true;
			});
		},

		//打开iframe
		$openIframe: function(size){
			var width = size.split('x')[0],
				height = size.split('x')[1];
			IFRAMEWRAPPER.innerHTML = '<iframe id="ResponsiveTest-Iframe" src="'+window.location.href+'" style="border: 10px solid #333;position:absolute;left: 220px;z-index:9999;width:'+width+'px;height:'+height+'px"></iframe>';
			document.getElementsByTagName('body')[0].appendChild(IFRAMEWRAPPER);
		},

		$initSizePanel: function(){
			$bind($id('ResponsiveTest-DesktopBtn'), 'click', function(e){
				var str = '',
					panel = $id('ResponsiveTest-SizeChosePanel');
				$each(DESKTOP, function(d, item){
					str +='<a style="display:block;color:#fff;line-height: 24px;cursor:pointer;">'+item+'</a>';
				});
				str += '<a style="display:block;color:#fff;line-height: 24px;cursor:pointer;">Close</a>'
				panel.innerHTML = str;
				$setCss(panel, 'left', '100px');
				$setCss(panel, 'top', '110px');
				$setCss(panel, 'display', 'block');

				$bind($id('ResponsiveTest-SizeChosePanel').childNodes, 'click', function(e){
					if(e.target.text == "Close"){
						$setCss(panel, 'display', 'none');
					}else{
						$openIframe(e.target.text);
					}
				});
			});
			$bind($id('ResponsiveTest-TabletBtn'), 'click', function(e){
				var str = '',
					panel = $id('ResponsiveTest-SizeChosePanel');
				$each(TABLET, function(d, item){
					str +='<a style="display:block;color:#fff;line-height: 24px;cursor:pointer;">'+item+'</a>';
				});
				str += '<a style="display:block;color:#fff;line-height: 24px;cursor:pointer;">Close</a>'
				panel.innerHTML = str;
				$setCss(panel, 'left', '100px');
				$setCss(panel, 'top', '170px');
				$setCss(panel, 'display', 'block');

				$bind($id('ResponsiveTest-SizeChosePanel').childNodes, 'click', function(e){
					if(e.target.text == "Close"){
						$setCss(panel, 'display', 'none');
					}else{
						$openIframe(e.target.text);
					}
				});
			});
			$bind($id('ResponsiveTest-MobileBtn'), 'click', function(e){
				var str = '',
					panel = $id('ResponsiveTest-SizeChosePanel');
				$each(MOBILE, function(d, item){
					str +='<a style="display:block;color:#fff;line-height: 24px;cursor:pointer;">'+item+'</a>';
				});
				str += '<a style="display:block;color:#fff;line-height: 24px;cursor:pointer;">Close</a>'
				panel.innerHTML = str;
				$setCss(panel, 'left', '100px');
				$setCss(panel, 'top', '230px');
				$setCss(panel, 'display', 'block');

				$bind($id('ResponsiveTest-SizeChosePanel').childNodes, 'click', function(e){
					if(e.target.text == "Close"){
						$setCss(panel, 'display', 'none');
					}else{
						$openIframe(e.target.text);
					}
				});
			});
			$bind($id('ResponsiveTest-TelevisionBtn'), 'click', function(e){
				var str = '',
					panel = $id('ResponsiveTest-SizeChosePanel');
				$each(TELEVISION, function(d, item){
					str +='<a style="display:block;color:#fff;line-height: 24px;cursor:pointer;">'+item+'</a>';
				});
				str += '<a style="display:block;color:#fff;line-height: 24px;cursor:pointer;">Close</a>'
				panel.innerHTML = str;
				$setCss(panel, 'left', '100px');
				$setCss(panel, 'top', '300px');
				$setCss(panel, 'display', 'block');

				$bind($id('ResponsiveTest-SizeChosePanel').childNodes, 'click', function(e){
					if(e.target.text == "Close"){
						$setCss(panel, 'display', 'none');
					}else{
						$openIframe(e.target.text);
					}
				});
			});
		},

		$initUI: function(){
			var self = this,
				body = document.getElementsByTagName('body')[0],
				responsiveToolBar = document.createElement('div'),
				panelHTML = '<h2 style="font-size:30px;color:#fff;text-align:center;margin-top:10px;line-height:26px;font-family:"Microsoft Yahei"">RT</h2>'
						+'<div style="margin-top: 50px; padding: 30px;">'
					   	+'<a id="ResponsiveTest-DesktopBtn" style="display:block;cursor:pointer;width:40px;height:40px;margin-bottom:20px;background:url(http://img03.taobaocdn.com/tps/i3/T1npEoXaVfXXXjasMR-80-160.png) 0 -40px no-repeat;"></a>'
					   	+'<a id="ResponsiveTest-TabletBtn" style="display:block;cursor:pointer;width:40px;height:40px;margin-bottom:20px;background:url(http://img03.taobaocdn.com/tps/i3/T1npEoXaVfXXXjasMR-80-160.png)  0 -80px no-repeat;"></a>'
					   	+'<a id="ResponsiveTest-MobileBtn" style="display:block;cursor:pointer;width:40px;height:40px;margin-bottom:20px;background:url(http://img03.taobaocdn.com/tps/i3/T1npEoXaVfXXXjasMR-80-160.png) 0 0 no-repeat;"></a>'
					   	+'<a id="ResponsiveTest-TelevisionBtn" style="display:block;cursor:pointer;width:40px;height:40px;margin-bottom:20px;background:url(http://img03.taobaocdn.com/tps/i3/T1npEoXaVfXXXjasMR-80-160.png) 0 -120px no-repeat;"></a>'
						+'<div id="ResponsiveTest-SizeChosePanel" style="position:absolute;background:#333;width: 80px;padding:10px;display:none;"></div>'
						+'</div>'
						+'<a href="http://veryued.org" style="display:block;color:#fff;font-size:12px;font-weight:700;text-align:center;position:absolute;bottom:20px;left:15px;">VeryUED</a>';
				responsiveToolBar.setAttribute('id','ResponsiveTest-Header');
				responsiveToolBar.innerHTML = panelHTML;
				$setCss(responsiveToolBar, 'background' ,'#222');
				$setCss(responsiveToolBar, 'height' ,'100%');
				$setCss(responsiveToolBar, 'width' ,'100px');
				$setCss(responsiveToolBar, 'position', 'fixed');
				$setCss(responsiveToolBar, 'left', '0');
				$setCss(responsiveToolBar, 'top', '0');
				$setCss(responsiveToolBar, 'z-index', '99999');
				IFRAMEWRAPPER = document.createElement('div');
				$setCss(IFRAMEWRAPPER, 'z-index', '9997');
				body.innerHTML = '';
				body.appendChild(responsiveToolBar);
		},

		//开始测试，既初始化函数
		$test: function(){
			$initUI();
			$initSizePanel();
			$openIframe(DESKTOP[0]);
		}

	}

	for (var fn in ResponsiveTest)
	{
		window[fn] = ResponsiveTest[fn];
	}
	ResponsiveTest.version = version;
	window.ResponsiveTest = ResponsiveTest;

	ResponsiveTest.$test();

})(window, document);