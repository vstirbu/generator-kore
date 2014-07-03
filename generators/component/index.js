'use strict';
var esprima = require('esprima');
var escodegen = require('escodegen');
var estraverse = require('estraverse');
var fs = require('fs');
var util = require('util');
var yeoman = require('yeoman-generator');


var ComponentGenerator = yeoman.generators.NamedBase.extend({
  init: function () {
    console.log('Setting up component ' + this.name + '.');
  },

  files: function () {
    var targetDir = 'src/components/' + this.name;

    this.mkdir(targetDir);
    this.copy('index.js', targetDir + '/index.js');
    this.copy('template.jade', targetDir + '/template.jade');
  },

  browserify: function () {
    var file = 'tasks/options/browserify.js',
        conf = fs.readFileSync(file, 'utf8'),
        syntax = esprima.parse(conf),
        self = this;

    function addElementAlias(node) {
      if (node.type === 'Property' && node.key.name === 'alias') {
        var value = ['src/components/', self.name, ':', self.name].join('');

        var exists = node.value.elements.some(function (element) {
          return element.value === value;
        });

        if (!exists) {
          node.value.elements.push({
            type: 'Literal',
            value: value
          });

          node.value.elements.sort(function (a, b) {
            return a.value.split(':')[1] > b.value.split(':')[1] ? 1 : -1;
          });
        }
      }
    }

    estraverse.traverse(syntax, {
      enter: function (node) {
        addElementAlias(node);
      }
    });

    fs.writeFileSync(file, escodegen.generate(syntax), 'utf8');
  }
});

module.exports = ComponentGenerator;
