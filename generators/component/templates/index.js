/*jshint -W003 */
module.exports = element;

var ko = require('knockout');

function element() {
  'use strict';
  var viewModel, template;

  viewModel = function (params) {
    this.example = ko.observable;
  };

  template = require('./template.jade');

  return {
    viewModel: viewModel,
    template: template()
  };
}
