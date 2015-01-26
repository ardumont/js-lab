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

// P09 (**) Pack consecutive duplicates of list elements into sublists.
//     If a list contains repeated elements they should be placed in separate sublists.

//     Example:
//     * (pack '(a a a a b c c a a d e e e e))
//     ((A A A A) (B) (C C) (A A) (D) (E E E E))

var pack = function(inputList) {
    return _.reduce(inputList, function(accSubLists, elem) {
        var subList = _.last(accSubLists);
        if(_.last(subList) === elem) {// group
            subList.push(elem);
            accSubLists.pop();// need to remove the last element
            accSubLists.push(subList);// to update with the new one
            return accSubLists;
        }
        accSubLists.push([elem]);
        return accSubLists;
    }, []);
};

var test1 = pack(['a', 'a', 'a', 'a', 'b', 'c', 'c', 'a', 'a', 'd', 'e', 'e', 'e', 'e']);
// NODE> test1
// [ [ 'a', 'a', 'a', 'a' ],
//   [ 'b' ],
//   [ 'c', 'c' ],
//   [ 'a', 'a' ],
//   [ 'd' ],
//   [ 'e', 'e', 'e', 'e' ] ]

// P10 (*) Run-length encoding of a list.
//     Use the result of problem P09 to implement the so-called run-length encoding data compression method. Consecutive duplicates of elements are encoded as lists (N E) where N is the number of duplicates of the element E.

//     Example:
//     * (encode '(a a a a b c c a a d e e e e))
//     ((4 A) (1 B) (2 C) (2 A) (1 D) (4 E))

var frequencies = function(inputList) {
    return _.map(inputList, function(l) {
        return [_.size(l), _.first(l)];
    });
};

var test11 = frequencies([ [ 'a', 'a', 'a', 'a' ],[ 'b' ],[ 'c', 'c' ],[ 'a', 'a' ],[ 'd' ],[ 'e', 'e', 'e', 'e' ] ]);
// NODE> test11
// [ [ 4, 'a' ],
//   [ 1, 'b' ],
//   [ 2, 'c' ],
//   [ 2, 'a' ],
//   [ 1, 'd' ],
//   [ 4, 'e' ] ]

var encode = _.compose(frequencies, pack);

var test2 = encode(['a', 'a', 'a', 'a', 'b', 'c', 'c', 'a', 'a', 'd', 'e', 'e', 'e', 'e']);
// NODE> test2
// [ [ 4, 'a' ],
//   [ 1, 'b' ],
//   [ 2, 'c' ],
//   [ 2, 'a' ],
//   [ 1, 'd' ],
//   [ 4, 'e' ] ]

// P12 (**) Decode a run-length encoded list.
// Given a run-length code list generated as specified in problem P11. Construct its uncompressed version.

// extend _ with mapcat definition (or we can add the http://documentcloud.github.io/underscore-contrib dependency)
_.mixin({
    /**
     * Like map but flatten one dimension as the expected return of fn is a list of data.
     * @param list The list we need to transform by feeding each element to fn
     * @param fn   The function to execute on an element of the list. The contract of fn is that it must return the result wrapped in a list.
     * @return transformed list
     */
    mapcat: function(list, fn) {
        return _.flatten(_.map(list, fn), true);
    }
});

var testMapcat = _.mapcat([1, 23, 3], function(e) { return [e+1]; });
// NODE> testMapcat
// [ 2, 24, 4 ]

var symbol = function(pair) {
    var frequency = _.first(pair);
    var elem = _.last(pair);
    if(frequency <= 0) return [];
    return _.times(frequency, _.constant(elem));
};

var test3 = symbol([10, 'b']);
// NODE> test3
// [ 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a' ]

var decode = function(encodedList) {
    return _(encodedList).mapcat(symbol);
};

var test33 = decode([[10, 'a'], [3, 1]]);
// NODE> test33
// [ 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 1, 1, 1 ]

// P11 (*) Modified run-length encoding.
// Modify the result of problem P10 in such a way that if an element has no duplicates it is simply copied into the result list. Only elements with duplicates are transferred as (N E) lists.
// Example:
//  * (encode-modified '(a a a a b c c a a d e e e e))
//     ((4 A) B (2 C) (2 A) D (4 E))
