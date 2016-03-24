(function() {
  'use strict';

  angular
    .module('app')
    .controller('MainCtrl', MainCtrl);

  MainCtrl.$inject = ['$scope', '$http'];

  function MainCtrl($scope, $http) {
    $scope.item = {};
    $scope.scrapePostForm = true;
    $scope.showScrapeDetails = false;
    $scope.loading = false;
    $scope.gotScrapeResults = false;
    $scope.alertContain = false;

    // Watch for changes to URL, Scrape & Display the image
    $scope.$watch("item.link", function(newVal, oldVal) {
      // console.log('newVal: ', newVal, ' oldVal: ', oldVal);
      if (newVal.length > 5) {
        $scope.loading = true;
        $http.post('/api/scrape', {
          url: $scope.item.link
        })
          .then(function(data) {
            console.log(data);
            $scope.showScrapeDetails = true;
            $scope.gotScrapeResults = true;
            $scope.uploaditemTitle = false;
            $scope.item.imgThumb = data.data.img;
            $scope.item.description = data.data.desc;
            $scope.items.splice(0, 0, data);
          }, function(error) {
            console.log('failed to return from scrape');
            $scope.loading = false;
            $scope.item.link = '';
            $scope.gotScrapeResults = false;
          })
          .finally(function() {
            $scope.loading = false;
            $scope.uploaditemForm = false;
          });
      }
    });

    // $scope.addScrapePost = function() {
    //   // Send post details to DB
    //   var item = {
    //     description: $scope.item.description,
    //     title: $scope.item.title,
    //     image: $scope.item.imgThumb,
    //     url: $scope.item.url
    //   }

    //   $http.post('api/postItem', item)
    //     .then(function(data) {
    //       console.log('posted from frontend success');
    //       alertSuccess.show();
    //       $scope.showScrapeDetails = false;
    //       $scope.gotScrapeResults = false;
    //       $scope.item.title = '';
    //       $scope.item.link = '';
    //       $scope.items.splice(0, 0, data);
    //     })
    //     .catch(function() {
    //       console.log('failed to post from frontend');
    //       $scope.showScrapeDetails = false;
    //       alertFail.show();
    //     });
    // }

  }
})();