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

var encode = function(inputList) {
    return _.map(pack(inputList), function(l) {
        return [_.size(l), _.first(l)];
    });
};

var test2 = encode(['a', 'a', 'a', 'a', 'b', 'c', 'c', 'a', 'a', 'd', 'e', 'e', 'e', 'e']);
// NODE> test2
// [ [ 4, 'a' ],
//   [ 1, 'b' ],
//   [ 2, 'c' ],
//   [ 2, 'a' ],
//   [ 1, 'd' ],
//   [ 4, 'e' ] ]
