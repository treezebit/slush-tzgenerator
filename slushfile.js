/*
 * slush-tzgenerator
 * https://github.com/Felipe/slush-tzgenerator
 *
 * Copyright (c) 2016,
 * Licensed under the MIT license.
 */

'use strict';

var gulp = require('gulp'),
    install = require('gulp-install'),
    conflict = require('gulp-conflict'),
    template = require('gulp-template'),
    rename = require('gulp-rename'),
    _ = require('underscore.string'),
    inquirer = require('inquirer'),
    path = require('path'),
    mkdirp = require('mkdirp'),
    inflections = require('inflection'),
    rename = require('gulp-rename');

function format(string) {
    var username = string.toLowerCase();
    return username.replace(/\s/g, '');
}

var defaults = (function () {
    var workingDirName = path.basename(process.cwd()),
      homeDir, osUserName, configFile, user;

    if (process.platform === 'win32') {
        homeDir = process.env.USERPROFILE;
        osUserName = process.env.USERNAME || path.basename(homeDir).toLowerCase();
    }
    else {
        homeDir = process.env.HOME || process.env.HOMEPATH;
        osUserName = homeDir && homeDir.split('/').pop() || 'root';
    }

    configFile = path.join(homeDir, '.gitconfig');
    user = {};

    if (require('fs').existsSync(configFile)) {
        user = require('iniparser').parseSync(configFile).user;
    }

    return {
        appName: workingDirName,
        userName: osUserName || format(user.name || ''),
        authorName: user.name || '',
        authorEmail: user.email || ''
    };
})();

gulp.task('default', function (done) {
    var prompts = [{
        name: 'appName',
        message: 'What is the name of your Module?',
        default: defaults.appName
    }, {
        name: 'appDescription',
        message: 'What is the description?'
    }, {
        name: 'appVersion',
        message: 'What is the version of your project?',
        default: '0.1.0'
    }, {
        name: 'authorName',
        message: 'What is the author name?',
        default: defaults.authorName
    }, {
        name: 'authorEmail',
        message: 'What is the author email?',
        default: defaults.authorEmail
    }, {
        name: 'userName',
        message: 'What is the github username?',
        default: defaults.userName
    }, {
        type: 'confirm',
        name: 'moveon',
        message: 'Continue?'
    }];

    inquirer.prompt(prompts,
        function (answers) {
            if (!answers.moveon) {
                return done();
            }
            answers.appNameSlug = _.slugify(answers.appName);

            answers.slugifiedPluralName = answers.appName; //inflections.pluralize(answers.appName);

            mkdirp( answers.slugifiedPluralName );
//            mkdirp( answers.slugifiedPluralName + '/client' );
//            mkdirp( answers.slugifiedPluralName + '/client/config');
//            mkdirp( answers.slugifiedPluralName + '/client/controllers');
//            mkdirp( answers.slugifiedPluralName + '/client/services');
//            mkdirp( answers.slugifiedPluralName + '/client/directives');

            gulp.src(__dirname + '/templates/module/**')
                .pipe( template(answers) )
                .pipe( rename(function(file) {
		                    if (file.basename.indexOf('_') == 0) {
		                        file.basename = file.basename.replace('_',answers.slugifiedPluralName);
		                    }
		             }))
                .pipe(rename(function (file) {
                    if (file.basename[0] === '_') {
                        file.basename = '.' + file.basename.slice(1);
                    }
                }))
//                .pipe(conflict('./'))
                .pipe(gulp.dest('./' + answers.slugifiedPluralName + '/'))
                .pipe(install())
                .on('end', function () {
                    done();
                });
        });
});
