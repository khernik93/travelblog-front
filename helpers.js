"use strict";

const path = require('path');
const glob = require('glob');

const _root = path.resolve(__dirname);

function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [_root].concat(args));
}

function getMultipleFiles(path) {
  return glob.sync(root(path));
}

exports.root = root;
exports.getMultipleFiles = getMultipleFiles;
