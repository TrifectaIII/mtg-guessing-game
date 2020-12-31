(this["webpackJsonpmtg-guessing-game"]=this["webpackJsonpmtg-guessing-game"]||[]).push([[0],[,,,,,,,,,,,,,,,function(e,t,r){e.exports=r(35)},,,,,,,,,,,function(e,t,r){},function(e,t,r){},function(e,t,r){},function(e,t,r){},function(e,t,r){},function(e,t,r){},function(e,t,r){},function(e,t,r){},function(e,t,r){},function(e,t,r){"use strict";r.r(t);var n=r(0),a=r(7);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var c,o=r(1),l=r(6),i=r(5),u={difficulty:null,playing:!1,error:!1,errorMessage:""},s={card:null,score:0,wrong:!1},f=Object(l.combineReducers)({main:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:u,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"main/SelectDiff":return e.playing?e:Object(i.a)(Object(i.a)({},e),{},{difficulty:t.difficulty,playing:!0});case"main/FatalError":return Object(i.a)(Object(i.a)({},e),{},{error:!0,errorMessage:t.message});case"main/EndGame":return u;default:return e}},game:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:s,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"game/GuessCard":return e.card&&e.card.name===t.cardName?Object(i.a)(Object(i.a)({},e),{},{score:e.score+1,card:null}):e.card?Object(i.a)(Object(i.a)({},e),{},{wrong:!0}):e;case"game/NextCard":return e.card?e:Object(i.a)(Object(i.a)({},e),{},{card:t.card});case"game/resetGame":return s;default:return e}}}),p=r(13),m=Object(l.createStore)(f,Object(p.composeWithDevTools)()),d=r(2),h=r(4),g=r(3),v=function(){return{type:"main/EndGame"}},b=function(e){return{type:"main/FatalError",message:e}},E=["Creature","Instant","Sorcery","Enchantment","Artifact","Land","Planeswalker"];function O(e){return e?fetch("https://api.scryfall.com/cards/random?q=".concat(e)):fetch("https://api.scryfall.com/cards/random")}!function(e){e.STANDARD="STANDARD",e.MODERN="MODERN",e.VINTAGE="VINTAGE"}(c||(c={}));r(26);var j={selectDiff:function(e){return{type:"main/SelectDiff",difficulty:e}}},y=Object(o.b)((function(e,t){return{}}),j)(function(e){Object(h.a)(r,e);var t=Object(g.a)(r);function r(e){var a;return Object(d.a)(this,r),(a=t.call(this,e)).handleChange=function(e){a.setState({inputValue:e.target.value})},a.render=function(){return n.createElement("div",{className:"ChooseDifficulty"},n.createElement("h2",null,"Choose Difficulty:"),n.createElement("button",{className:"standard",onClick:function(){return a.props.selectDiff(c.STANDARD)}},"Standard"),n.createElement("br",null),n.createElement("button",{className:"modern",onClick:function(){return a.props.selectDiff(c.MODERN)}},"Modern"),n.createElement("br",null),n.createElement("button",{className:"vintage",onClick:function(){return a.props.selectDiff(c.VINTAGE)}},"Vintage"))},a.state={inputValue:"0"},a}return r}(n.Component)),C=function(){return{type:"game/resetGame"}},N=(r(27),{nextCard:function(e){return{type:"game/NextCard",card:e}},fatalError:b}),w=Object(o.b)((function(e,t){return{difficulty:e.main.difficulty}}),N)(function(e){Object(h.a)(r,e);var t=Object(g.a)(r);function r(){var e;Object(d.a)(this,r);for(var a=arguments.length,o=new Array(a),l=0;l<a;l++)o[l]=arguments[l];return(e=t.call.apply(t,[this].concat(o))).componentDidMount=function(){var t=null;switch(e.props.difficulty){case c.STANDARD:t="standard";break;case c.MODERN:t="modern";break;case c.VINTAGE:t="vintage";break;default:return}O(t?"is:booster+legal:".concat(t):null).then((function(e){return e.json()})).then((function(t){return e.props.nextCard(t)})).catch((function(t){return e.props.fatalError("Error with Scryfall API Call")}))},e.render=function(){return n.createElement("div",null,n.createElement("h2",null,"Loading Next Card..."))},e}return r}(n.Component)),D=r(14),A=(r(28),{guessCard:function(e){return{type:"game/GuessCard",cardName:e}}}),G=Object(o.b)((function(e,t){return{}}),A)(function(e){Object(h.a)(r,e);var t=Object(g.a)(r);function r(){var e;Object(d.a)(this,r);for(var a=arguments.length,c=new Array(a),o=0;o<a;o++)c[o]=arguments[o];return(e=t.call.apply(t,[this].concat(c))).render=function(){return n.createElement(n.Fragment,null,n.createElement("button",{className:"choiceButton",onClick:function(){return e.props.guessCard(e.props.cardName)}},e.props.cardName),n.createElement("br",null))},e}return r}(n.Component)),M=(r(29),{fatalError:b}),S=Object(o.b)((function(e,t){return{card:e.game.card}}),M)(function(e){Object(h.a)(r,e);var t=Object(g.a)(r);function r(e){var a;return Object(d.a)(this,r),(a=t.call(this,e)).componentDidMount=function(){if(a.props.card){a.setState({cardNames:[a.props.card.name]});var e=null;E.some((function(t){var r;return!!(null===(r=a.props.card)||void 0===r?void 0:r.type_line.includes(t))&&(e=t.toLowerCase(),!0)}));var t=e?"+type:".concat(e):"",r=a.props.card.color_identity.map((function(e){return"color>=".concat(e)})).join("+OR+"),n=r.length?"+(".concat(r,")"):"+color=C",c="";if("creature"===e){for(var o,l=[],i=(null===(o=a.props.card)||void 0===o?void 0:o.type_line).split("//"),u=0;u<i.length;u++){var s=i[u];if(s.includes("Creature")){var f,p=s.split("\u2014")[1].split(" ").filter((function(e){return e.length>0}));l=null===(f=l)||void 0===f?void 0:f.concat(p)}}var m=l.map((function(e){return"type=".concat(e)})).join("+OR+");c="+(".concat(m,")"),n="",console.log(l)}for(var d=0;d<3;d++)O("is:booster".concat(t).concat(n).concat(c)).then((function(e){return e.json()})).then((function(e){a.setState({cardNames:k(a.state.cardNames.concat([e.name]))})})).catch((function(e){return a.props.fatalError("Error with Scryfall API Call")}))}},a.render=function(){var e,t,r=a.props.card?(t=a.props.card.id,"https://api.scryfall.com/cards/".concat(t,"/?format=image&version=art_crop")):void 0;return n.createElement("div",null,n.createElement("img",{src:r,alt:"The card art"}),(null===(e=a.props.card)||void 0===e?void 0:e.artist)?n.createElement("p",null,"Artist: ",a.props.card.artist):null,4===a.state.cardNames.length?function(e){var t=[];return e.forEach((function(e){e&&!t.includes(e)&&t.push(e)})),t}(a.state.cardNames).map((function(e){return n.createElement(G,{cardName:e,key:e})})):n.createElement("p",null,"Loading Choices..."))},a.state={cardNames:[]},a}return r}(n.Component));function k(e){for(var t=Object(D.a)(e),r=t.length-1;r>0;r--){var n=Math.floor(Math.random()*(r+1)),a=[t[n],t[r]];t[r]=a[0],t[n]=a[1]}return t}r(30);var R={resetMain:v,resetGame:C},T=Object(o.b)((function(e,t){var r;return{cardName:null===(r=e.game.card)||void 0===r?void 0:r.name}}),R)(function(e){Object(h.a)(r,e);var t=Object(g.a)(r);function r(){var e;Object(d.a)(this,r);for(var a=arguments.length,c=new Array(a),o=0;o<a;o++)c[o]=arguments[o];return(e=t.call.apply(t,[this].concat(c))).restart=function(){e.props.resetGame(),e.props.resetMain()},e.render=function(){return n.createElement("div",null,n.createElement("h1",null,"Game Over"),n.createElement("h3",null,"The card was: ",e.props.cardName),n.createElement("button",{onClick:e.restart},"Reset"))},e}return r}(n.Component)),I=(r(31),Object(o.b)((function(e,t){return{score:e.game.score,card:e.game.card,wrong:e.game.wrong}}),{})(function(e){Object(h.a)(r,e);var t=Object(g.a)(r);function r(){var e;Object(d.a)(this,r);for(var a=arguments.length,c=new Array(a),o=0;o<a;o++)c[o]=arguments[o];return(e=t.call.apply(t,[this].concat(c))).render=function(){return n.createElement("div",null,n.createElement("h2",null,"Score: ",e.props.score),e.props.wrong?n.createElement(T,null):null,e.props.wrong||e.props.card?null:n.createElement(w,null),!e.props.wrong&&e.props.card?n.createElement(S,null):null)},e}return r}(n.Component))),V=(r(32),{resetMain:v,resetGame:C}),x=Object(o.b)((function(e,t){return{message:e.main.errorMessage}}),V)(function(e){Object(h.a)(r,e);var t=Object(g.a)(r);function r(){var e;Object(d.a)(this,r);for(var a=arguments.length,c=new Array(a),o=0;o<a;o++)c[o]=arguments[o];return(e=t.call.apply(t,[this].concat(c))).restart=function(){e.props.resetGame(),e.props.resetMain()},e.render=function(){return n.createElement("div",null,n.createElement("h1",null,"Fatal Error"),n.createElement("h2",null,e.props.message),n.createElement("button",{onClick:e.restart},"Reset"))},e}return r}(n.Component)),F=(r(33),Object(o.b)((function(e,t){return{playing:e.main.playing,error:e.main.error}}),{})(function(e){Object(h.a)(r,e);var t=Object(g.a)(r);function r(){var e;Object(d.a)(this,r);for(var a=arguments.length,c=new Array(a),o=0;o<a;o++)c[o]=arguments[o];return(e=t.call.apply(t,[this].concat(c))).render=function(){return n.createElement("div",null,n.createElement("h1",null,"MTG Guessing Game"),e.props.error?n.createElement(x,null):null,e.props.error||e.props.playing?null:n.createElement(y,null),!e.props.error&&e.props.playing?n.createElement(I,null):null)},e}return r}(n.Component)));r(34);a.render(n.createElement(n.StrictMode,null,n.createElement(o.a,{store:m},n.createElement(F,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}],[[15,1,2]]]);
//# sourceMappingURL=main.8a0bc8b5.chunk.js.map