//wrap toastr into a service
angular.module('app').value('mvToastr', toastr);

angular.module('app').factory('Notifier', function(mvToastr){
  return {
    success : function(msg){
      mvToastr.success(msg);
    },
    error: function(msg){
      mvToastr.error(msg);
    }
  }
})
