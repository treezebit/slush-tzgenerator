define(['angular', '<%= slugifiedPluralName %>', '<%= slugifiedPluralName %>Client', 'init'], function (angular) {
    'use strict';
    angular.module('<%= slugifiedPluralName %>').run(['Menus', function (Menus) {
        Menus.addMenuItem('topbar', {
            title: '<%= slugifiedPluralName %>',
            state: '<%= slugifiedPluralName %>.dashboard',
            type: 'dropdown',
            roles: ['*'],
            icon: 'fa-television',
            id: 1,
            position: 1
        });
  }]);
});
