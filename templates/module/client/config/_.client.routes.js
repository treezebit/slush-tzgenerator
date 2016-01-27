'use strict';


define(['angular', 'init', '<%= slugifiedPluralName %>'], function (angular) {
    //    console.log('sales.client.routes');
    angular.module('<%= slugifiedPluralName %>').config(['$stateProvider', '$ocLazyLoadProvider', function ($stateProvider, $ocLazyLoadProvider) {

//            $ocLazyLoadProvider.config({
//                loadedModules: ['sales'],
//                asyncLoader: require
//            });
            $stateProvider
                .state('<%= slugifiedPluralName %>', {
                    abstract: true,
                    url: '/<%= slugifiedPluralName %>',
                    template: '<ui-view/>',
                    resolve: {
                        load: function ($ocLazyLoad, $q) {
                            //                            console.log('resolver controller');
                        }
                    }
                })
                .state('sales.dashboard', {
                    url: '',
                    templateUrl: 'modules/<%= slugifiedPluralName %>/client/views/dashboard-<%= slugifiedPluralName %>.client.view.html',
                    controller: 'Dashboard<%= slugifiedPluralName %>Controller',
                    resolve: {
                        load: function ($ocLazyLoad, $q) {
                            var lazyDeferred = $q.defer();
                            return $ocLazyLoad
                                .load('/modules/<%= slugifiedPluralName %>/client/controllers/dashboard-<%= slugifiedPluralName %>.client.controller.js');
                            //                                .then(function () {
                            //                                    console.log('arquivo carregado com sucesso');
                            //                                });
                        }
                    }
                });
            //            .state('articles.create', {
            //                url: '/create',
            //                templateUrl: 'modules/articles/client/views/create-article.client.view.html',
            //                data: {
            //                    roles: ['user', 'admin']
            //                }
            //            })
            //            .state('articles.view', {
            //                url: '/:articleId',
            //                templateUrl: 'modules/articles/client/views/view-article.client.view.html'
            //            })
            //            .state('articles.edit', {
            //                url: '/:articleId/edit',
            //                templateUrl: 'modules/articles/client/views/edit-article.client.view.html',
            //                data: {
            //                    roles: ['user', 'admin']
            //                }
            //            });
  }
]);
});
