var _ = require('lodash');

// 1. Afficher le nombre de tweets
var tweets = require('./data/tweets.js');

_.size(tweets);

// 2. Afficher la liste des textes de tous les tweets (en utilisant une fonction anonyme puis sans). Stocker le résultat dans la variable texts.

//var texts = _.map(tweets, function(tweet) {return tweet.text; });
var texts = _.map(tweets, _.property('text'));

// 3. Afficher le texte du premier tweet.

_.first(texts);

// 4. Afficher le texte du des 10 premiers tweets.

_.take(texts, 10);

// 5. Afficher le texte des 10 derniers tweets.

_.last(texts, 10);

// 6. Afficher le texte des tweets sauf les 10 premiers.

_.drop(texts);

// 7. Afficher le texte des tweets sauf les 10 derniers.

_.initial(texts, 10);

// 8. Afficher tous les user.screen_name des tweets (en utilisant une fonction anonyme puis sans). Stocker le résultat dans la variable usernames.

// 9. Afficher une liste des usernames sans doublons.
// 10. Regrouper la liste des textes de tweet par utilisateur.
