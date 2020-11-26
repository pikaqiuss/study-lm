import {globalUrls} from "./utils.js";
const network = {
    getMovieList:function(params){
      params.type = 'movie';
      this.getItemList(params);
    },
    getTvList:function(params){
      params.type = 'tv';
      this.getItemList(params);
    },
    getShowList:function(params){
      params.type = 'show';
      this.getItemList(params);
    },
    getItemList:function(params){
      var url = "";
      if(params.type === 'movie'){
        url = globalUrls.movieList;
      }else if(params.type === 'tv'){
        url = globalUrls.tvList;
      }else{
        url = globalUrls.showList;
      }
      var count = params.count?params.count:7;
      wx.request({
        url: url,
        data:{
            count:count
        },
        success: (res) => {
            var items = res.data.subject_collection_items;
            // List页面剩余两个数据一左一右布局情况的处理
            var itemsCount = items.length;
            var left = itemsCount%3;
            if(left === 2){
              items.push(null);
            }
            if(params && params.success){
              params.success(items);
            }            
          }
      });
    },
    // 确认两个参数才能拿到具体的详情页面数据  type和id
    getItemDetail:function(params){
      var type = params.type;
      var id = params.id;
      var url = "";
      if(type === 'movie'){
        url = globalUrls.movieDetail+id;
      }else if(type === 'tv'){
        url = globalUrls.tvDetail+id;
      }else{
        url = globalUrls.showDetail+id;
      }
      wx.request({
        url: url,
        success:(res)=>{
          console.log(res);
          var item = res.data;
          if(params.success){
            params.success(item);
          }
        }
      })
    }
}
export {network}
