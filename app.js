var _ = require('./node_modules/underscore/underscore-min.js');

//exercises from: http://www.ic.unicamp.br/~meidanis/courses/mc336/2006s2/funcional/L-99_Ninety-Nine_Lisp_Problems.html

// P08 (**) Eliminate consecutive duplicates of list elements.
//     If a list contains repeated elements they should be replaced with a single copy of the element. The order of the elements should not be changed.

//     Example:
//     * (compress '(a a a a b c c a a d e e e e))
//     (A B C A D E)

var compress = function(inputList) {
    return _.reduce(inputList, function(acc, elem) {
        if(_.last(acc) === elem) {
            return acc;
        }
        acc.push(elem);
        return acc;
    }, []);
};

var test0 = compress(['a', 'a', 'a', 'a', 'b', 'c', 'c', 'a', 'a', 'd', 'e', 'e', 'e', 'e']);
// NODE> test0
// [ 'a', 'b', 'c', 'a', 'd', 'e' ]
