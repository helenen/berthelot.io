---
title: Les modules en JavaScript
date: 2017-10-17
---

<!-- .slide: data-background="#ff9900" -->
# Les modules en JavaScript

  
<!-- .slide: data-background="#0af" -->
## Déroulement de la soirée

- Historique
- AMD
- CommonJS
- UMD
- ES Module
- Webpack vs Rollup vs SystemJS


## Historique

![brendan Eich](https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Brendan_Eich_Mozilla_Foundation_official_photo.jpg/220px-Brendan_Eich_Mozilla_Foundation_official_photo.jpg)
> T'as 2 jours pour mettre Java sur Netscape !
> - <cite>Le patron de Brendan Eich</cite>



## Historique

On charge tout en global dans le navigateur via 
```html
<script src="./unelib.js" type="text/javascript"></script>
<script src="./monapp.js" type="text/javascript"></script>
```

```javascript
// monapp.js
var password = 'ceciEstUnSecret';
```



## Historique

*IIFE* (Immediately Invoked Function Expression)
```html
<script src="./unelib.js" type="text/javascript"></script>
<script src="./monapp.js" type="text/javascript"></script>
```

```javascript
// monapp.js
(function() {
  var password = 'ceciEstUnSecret';
})();
```



## Historique

![dojo](http://tomwayson.github.io/mwd-jsapi/img/dojo-blue-circle.png)
VS
![Mozilla](https://www.mozilla.org/media/img/pebbles/moz-wordmark-dark-reverse.2cbc28bb9895.svg)
VS
![Ecma](https://www.ecma-international.org/ecma-262/5.1/Ecma_RVB-003.jpg)


## CommonJS

![Ryan Dahl](https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Ryan_Dahl.jpg/800px-Ryan_Dahl.jpg)
> J'suis un developpeur C qui a problèmes asynchrones des - <cite>Ryan Dahl</cite>



## CommonJS

![Mozilla](https://www.mozilla.org/media/img/pebbles/moz-wordmark-dark-reverse.2cbc28bb9895.svg)
> Et si on rendait le JS cool - <cite>Kevin Dangoor</cite>



## CommonJS

- Créé en Janvier 2009
- ServerJS puis renommé en CommonJS
```javascript
// Fichier A
module.exports.password = 'ceciEstUnSecret';
```
```javascript
// Fichier B
const lePasswordDeFlorent = require('./fichierA');
```


## RequireJS

![dojo](http://tomwayson.github.io/mwd-jsapi/img/dojo-blue-circle.png)
> What the fuck did mozilla ?? - <cite>un dev dojo</dev>



## RequireJS

- Créé en 2009
- RunJS puis renommé en RequireJS
```javascript
define(['jquery'], function ($) {
  return {
    motDePasse: 'CeciEstLeMDPDeFlorent'
  };
});
```
```javascript
define(['motDePasse'], function (mdp) {
  console.log(`rhoo comment j'ai hacké sont MDP : ${mdp}`);
});
```


## UMD

![tous ensemble TF1](https://img2.closermag.fr/var/closermag/storage/images/media/images-des-contenus/tele/news-tele/2014-01-04-polemique-tf1-une-nouvelle-famille-regrette-l-intervention-de-tous-ensemble/l-emission-tous-ensemble-de-tf1/2352789-1-fre-FR/L-emission-Tous-Ensemble-de-TF1_exact1024x768_l.jpg)
> Marc Emanuel m'a inspiré pour UMD - <cite>Addy Osmani</cite>


## Universal Module Loader

```javascript
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['exports', 'b'], factory);
    } else if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {
        // CommonJS
        factory(exports, require('b'));
    } else {
        // Browser globals
        factory((root.commonJsStrict = {}), root.b);
    }
}(typeof self !== 'undefined' ? self : this, function (exports, b) {
    // Use b in some fashion.

    // attach properties to the exports object to define
    // the exported module properties.
    exports.action = function () {};
}));
```



## ES Module

