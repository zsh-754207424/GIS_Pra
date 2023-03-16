/*!
* 鼠标控制图层
* JiangZengYue
* 2017-12-05
*/
var popup;
var hinttitle;
var hinttext;
var bMoveOn;	//鼠标是否移动到对象上
var g_serverIP;
function dispHint( map, serverIP )
{
	g_serverIP =  serverIP;
	popup = new ol.Overlay({
	  element: document.getElementById('popup'),
	  dragging: true
	});
	map.addOverlay(popup);
	geoMap.setShowHintCallback(  showHint  );
	// display popup on click
  var dragPan;
  map.getInteractions().forEach(function(interaction){
    if (interaction instanceof ol.interaction.DragPan) {
      dragPan = interaction;
    }
  });

	var element = popup.getElement();
  element.addEventListener('mousedown', function(evt) {
    dragPan.setActive(false);
    popup.set('dragging', true);
    console.info('start dragging');
  });

  map.on('pointerup', function(evt) {
    if (popup.get('dragging') === true) {
      console.info('stop dragging');
      dragPan.setActive(true);
      popup.set('dragging', false);
    }
  });

	map.on("pointermove", function(e)
	{
    bMoveOn = false;
		$(element).popover('destroy');
		var unMask = true;  //保证井位在站点图片上时能够正常显示
		bMoveOn = false;	//鼠标是否移动到对象上
		var serverObjectMap = geoMap.getServerObjectAttrMap();
		if( serverObjectMap==null || serverObjectMap.size==0   )
		{

				var top = 0;
				var lastFeature = null;
				var lastLayer = null;
				//按照Top排序，最后保留最大的top值的图层中的选中的对象
				map.forEachFeatureAtPixel(e.pixel, function (feature, layer) {

					  var curTop = layer.get("top");
					  if(  curTop == null )
					     curTop = 0;
					  if( curTop>= top )
					  {
					  	   top = curTop ;
					  	   lastFeature = feature;
					  	   lastLayer = layer;
					  }
		 		});
				if( lastFeature==null )
				    return;
				//alert( top );
				var metry = lastFeature.getGeometry();
				var center = metry.getExtent();

				var Callback =   lastLayer.values_['hintCallback'];
				if( Callback==null )
				    return;
		    bMoveOn = true;
				var coordinate = ol.extent.getCenter( center );
				$(element).popover('destroy');
				popup.setPosition(coordinate);

				var retobj =  Callback( lastFeature );
				//hinttitle = lastLayer.get('title') + retobj.title    ;
				hinttitle = retobj.title;
				hinttext = retobj.text;
	 }
	 else //从服务器上传来鼠标位置对象的数据
	 	{
	 		  bMoveOn = true;
	 		   //获得当前鼠标的大地坐标
	 		  var coordinate = geoMap.getCurrentXY();
	 		  $(element).popover('destroy');
				popup.setPosition(coordinate);
	 		  hinttitle = "服务器对象";
	 		  var strServerObjInfo = "";
	 		  serverObjectMap.forEach( function(value,key)
	 		      {
	 		    	   strServerObjInfo += key + ": " + value;//console.log(key, value);
               strServerObjInfo += "\n";
	 		    	}
	 		    );

	 		  hinttext = strServerObjInfo;
	 	}
    setTimeout( "showPopup()", 1000 );
});
}
//回调显示提示信息函数
//换行 需要用 "<br>" 字符串代替 "\n"
function showHint( serverObjectMap )
{
	      if( serverObjectMap==null )
	           return;
	      bMoveOn = true;
	 		   //获得当前鼠标的大地坐标
	 		  var coordinate = geoMap.getCurrentXY();
	 		  var element = popup.getElement();
	 		  $(element).popover('destroy');
				popup.setPosition(coordinate);
	 		  hinttitle = "井";
	 		  var strServerObjInfo = "";
	 		  var id = serverObjectMap.get( "ENTRYID" );

	 		  if( id!=null )
	 		  {
	 		  	   var Params = "ENTRYID%3D" + id;
		         var rs = GetRecordSetSync( g_serverIP,   "getHint", Params  );
		         if( rs!=null )
		         {
		         	  strServerObjInfo = rs.getFieldValue( "HINT", 0);
		         }
		         hinttitle = serverObjectMap.get("NAME");
	 		  }
	 		  //井号
	 		  var strWellName = serverObjectMap.get( "JH" );
	 		  if( strWellName!=null )
	 		  {
	 		  	  var Params = "P_JH%3D" + strWellName;
		         var rs = GetRecordSetSync( g_serverIP,   "getWellInfo", Params  );
		         if( rs!=null   )
		         {
					   strServerObjInfo+="<div style='line-height:26px;'>";
		         	   var Fields = rs.Fields;
		         	   var count = Fields.length;
		         	   for( var i=0; i<count; i++ )
		         	   {
		         	     if( Fields[i]!="JH" )
		         	     {
		         	        strServerObjInfo += Fields[i] + ": " + ((rs.getFieldValue(Fields[i],0)=== null )?"无数据":rs.getFieldValue(Fields[i],0));
		         	        if(i!=count-1){
								strServerObjInfo += "<br/>";
							}

		         	     }
		         	   }
					   strServerObjInfo+="</div>";
		         	  //strServerObjInfo = rs.getFieldValue( "HINT", 0);
		         }
		         hinttitle = serverObjectMap.get("JH");
	 		  }
	 		  //GetRecordSetSync
	 		  if( strServerObjInfo==null ||  strServerObjInfo.length==0 )
	 		  {
		 		  serverObjectMap.forEach( function(value,key)
		 		      {
		 		    	   strServerObjInfo += key + ": " + value;//console.log(key, value);
						   strServerObjInfo += "<br/>";
		 		    	}
		 		    );
	 		  }
	 		  hinttext = strServerObjInfo;
	 		  setTimeout( "showPopup()", 1000 );
}
function showPopup()
{
	if(bMoveOn)//触发后鼠标离开对象不再显示
	{
		var element = popup.getElement();

		$(element).popover('destroy');
		if(hinttext!="")
		{
			$(element).popover({
			'title': hinttitle,
			'placement': 'auto',
			'animation': false,
			'html': true,
			'content': hinttext
			});
			$(element).popover('show');
		}

	}

}
