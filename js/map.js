// JavaScript Document
//搜索按钮的显示与消失
function anniu(){
	if(document.getElementById("anniu").style.display=="block"){
		document.getElementById("anniu").style.display="none";
	}else{
		document.getElementById("anniu").style.display="block";
	}
}
//腾讯地图API
var searchService, markers = [];
        var init = function() {
            var center = new qq.maps.LatLng(22.743746,114.229966);
            var map = new qq.maps.Map(document.getElementById('container'), {
                center: center,
                zoom: 17
            });

            var marker = new qq.maps.Marker({
		        position: center,
		        map: map
		    });

            var latlngBounds = new qq.maps.LatLngBounds();
            //设置Poi检索服务，用于本地检索、周边检索
            searchService = new qq.maps.SearchService({
                //设置搜索范围为深圳
                location: "深圳",
                //设置搜索页码为1
                pageIndex: 1,
                //设置每页的结果数为5
                pageCapacity: 2,
                //设置展现查询结构到infoDIV上
                panel: document.getElementById('infoDiv'),
                //设置动扩大检索区域。默认值true，会自动检索指定城市以外区域。
                autoExtend: true,
                //检索成功的回调函数
                complete: function(results) {
                    //设置回调函数参数
                    var pois = results.detail.pois;
                    for (var i = 0, l = pois.length; i < l; i++) {
                        var poi = pois[i];
                        //扩展边界范围，用来包含搜索到的Poi点
                        latlngBounds.extend(poi.latLng);
                        var marker = new qq.maps.Marker({
                            map: map,
                            position: poi.latLng
                        });

                        marker.setTitle(i + 1);

                        markers.push(marker);

                    }
                    //调整地图视野
                    map.fitBounds(latlngBounds);
                },
                //若服务请求失败，则运行以下函数
                error: function() {
                    alert("出错了。");
                }
            });

        }

         //清除地图上的marker
            function clearOverlays(overlays) {
                var overlay;
                while (overlay = overlays.pop()) {
                    overlay.setMap(null);
                }
            }
            //设置搜索的范围和关键字等属性
            function searchKeyword() {
                var keyword = document.getElementById("keyword").value;
                clearOverlays(markers);
                //根据输入的城市设置搜索范围
                // searchService.setLocation("北京");
                //根据输入的关键字在搜索范围内检索
                searchService.search(keyword);
            }

    