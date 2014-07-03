/*global module, require, process */
module.exports = function(grunt) {
  'use strict';
  
  var config = {
    pkg: grunt.file.readJSON('package.json'),
    env: process.env
  };

  function loadConfig(path) {
    var glob = require('glob');
    var object = {};
    var key;

    glob.sync('*', {cwd: path}).forEach(function(option) {
      key = option.replace(/\.js$/,'');
      object[key] = require(path + option);
    });

    return object;
  }

  require('load-grunt-tasks')(grunt);

  grunt.loadTasks('tasks');

  grunt.util._.extend(config, loadConfig('./tasks/options/'));

  grunt.registerTask('dev', ['connect', 'watch']);

  grunt.initConfig(config);
};
