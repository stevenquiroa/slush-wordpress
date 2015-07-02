/*
 * slush-wordpress
 * https://github.com/stevenquiroa/slush-wordpress
 *
 * Copyright (c) 2015, Steven Quiroa
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
    path = require('path')

function format(string) {
    var username = string.toLowerCase()
    return username.replace(/\s/g, '')
}

var defaults = (function () {
    var workingDirName = path.basename(process.cwd()),
      homeDir, osUserName, configFile, user

    if (process.platform === 'win32') {
        homeDir = process.env.USERPROFILE
        osUserName = process.env.USERNAME || path.basename(homeDir).toLowerCase()
    }
    else {
        homeDir = process.env.HOME || process.env.HOMEPATH
        osUserName = homeDir && homeDir.split('/').pop() || 'root'
    }

    configFile = path.join(homeDir, '.gitconfig')
    user = {}

    if (require('fs').existsSync(configFile)) {
        user = require('iniparser').parseSync(configFile).user
    }

    return {
        appName: workingDirName,
        userName: osUserName || format(user.name || ''),
        authorName: user.name || '',
        authorEmail: user.email || ''
    }
})()

gulp.task('default', function (done) {
    var prompts = [{
        name: 'appName',
        message: 'What is the name of your project?',
        default: defaults.appName
    }, {
        name: 'appDescription',
        message: 'What is the description?'
    }, {
        name: 'appVersion',
        message: 'What is the version of your project?',
        default: '0.1.0'
    }, {
        name: 'appUri',
        message: 'What is the url of your project?',
        default: 'http://codex.wordpress.org/Theme_Development'
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
        name: 'authorUri',
        message: 'What is the author url?',
        default: 'http://github.com/stevenquiroa'
    }, {
        type: 'confirm',
        name: 'moveon',
        message: 'Continue?'
    }]
    //Ask
    inquirer.prompt(prompts,
        function (answers) {
            if (!answers.moveon) {
                return done()
            }
            var today = new Date()
            var dd = today.getDate()
            var mm = today.getMonth()+1

            if(dd<10) dd='0'+dd
            if(mm<10) mm='0'+mm

            today = today.getFullYear() + '-' + mm + '-' + dd
            answers.todayDate = today
            answers.appNameSlug = _.slugify(answers.appName)
            answers.appNameSlug = _.underscored(answers.appNameSlug)
            answers.appNameSlugUPPER = answers.appNameSlug.toUpperCase()
            gulp.src(__dirname + '/templates/**')
                .pipe(template(answers))
                .pipe(rename(function (file) {
                    if (file.basename[0] === '_') {
                        file.basename = '.' + file.basename.slice(1)
                    } else if(file.basename[0] === '+') {
                        file.basename = answers.appNameSlug
                    }
                }))
                .pipe(conflict('./'))
                .pipe(gulp.dest('./'))  
                .pipe(install())
                .on('end', function () {
                    done()
                })
        })
})
