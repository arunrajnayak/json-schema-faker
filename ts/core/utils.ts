/**
 * Returns true/false whether the object parameter has its own properties defined
 *
 * @param obj
 * @returns {boolean}
 */
function hasProperties(obj: Object): boolean {
  return Array.prototype.slice.call(arguments, 1).filter(function(key: string): boolean {
    return typeof obj[key] !== 'undefined';
  }).length > 0;
}

function clone(arr) {
  var out = [];
  arr.forEach(function(item, index) {
    if (typeof item === 'object' && item !== null) {
      out[index] = Array.isArray(item) ? clone(item) : merge({}, item);
    } else {
      out[index] = item;
    }
  });
  return out;
}

function merge(a, b) {
  for (var key in b) {
    if (typeof b[key] !== 'object' || b[key] === null) {
      a[key] = b[key];
    } else if (Array.isArray(b[key])) {
      a[key] = (a[key] || []).concat(clone(b[key]));
    } else if (typeof a[key] !== 'object' || a[key] === null || Array.isArray(a[key])) {
      a[key] = merge({}, b[key]);
    } else {
      a[key] = merge(a[key], b[key]);
    }
  }
  return a;
}

export = {
  hasProperties: hasProperties,
  clone: clone,
  merge: merge
};