"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.init=init,exports.pageview=pageview,exports.reachGoal=reachGoal;var key,_reactYm=require("react-ym"),IS_BROWSER="undefined"!=typeof window;function init(a,b,c){key="yaCounter".concat(a),IS_BROWSER&&!window[key]&&a&&_reactYm.ym.initialize(a,b,c)}function pageview(){window[key]&&window[key].hit(window.location.pathname)}function reachGoal(){if(window[key]){var a;(a=window[key]).reachGoal.apply(a,arguments)}}