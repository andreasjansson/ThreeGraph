// http://stackoverflow.com/questions/1187518/javascript-array-difference/4026828#4026828
Array.diff = function(a, b) {
  return a.filter(function(i) {
    return b.indexOf(i) < 0;
  });
};
