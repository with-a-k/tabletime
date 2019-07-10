function groupBy(xs, key) {
  return xs.reduce(function(rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};

function flatArray(array) {
  return array.reduce((acc, val) => Array.isArray(val) ? acc.concat(flatArray(val)) : acc.concat(val), []);
}

module.exports = { groupBy, flatArray };
