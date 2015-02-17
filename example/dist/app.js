require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var React = require('react');
var Media = require('react-mq');
var App1 = React.createClass({displayName: "App1",
    render: function(){
        return (
            React.createElement("div", null, 
                React.createElement(Media, {query: "(max-width: 768px)"}, 
                    React.createElement("div", null, "You are mobile screen")
                ), 
                React.createElement(Media, {query: "(min-width: 769px) and (max-width: 992px)"}, 
                    React.createElement("div", null, "You are tablet screen")
                ), 
                React.createElement(Media, {query: "(min-width: 993px) and (max-width: 1200px)"}, 
                    React.createElement("div", null, "You are desktop screen"), 
                    React.createElement(Media, {query: "(min-resolution: 2dppx)"}, 
                        React.createElement("div", null, "You are retina")
                    ), 
                    React.createElement(Media, {query: "(max-resolution: 1dppx)"}, 
                        React.createElement("div", null, "You are not retina")
                    )
                ), 
                React.createElement(Media, {query: "(min-width: 1201px)"}, 
                    React.createElement("div", null, "You are jumbo screen")
                )
            )
        );
    }
});

React.render(React.createElement(App1, null), example1);


var MediaMixin = require('react-mq').Mixin;
// Global scope
MediaMixin.addMediaQueries({
    mobile:  '(max-width: 768px)',
    tablet:  '(min-width: 769px) and (max-width: 992px)',
    desktop: '(min-width: 993px) and (max-width: 1200px)'
});

var App2 = React.createClass({displayName: "App2",
    mixins: [MediaMixin],
    // Component scope
    media: {
        jumbo:  '(min-width: 1201px)'
    },
    render: function(){
        // State will update whenever a media query matches or unmatches
        if (this.state.media.mobile){
            return React.createElement("div", null, "You are mobile screen")
        }
        else if (this.state.media.tablet) {
            return React.createElement("div", null, "You are tablet screen")
        }
        else if (this.state.media.desktop) {
            return React.createElement("div", null, "You are desktop screen")
        }
        else {
            return React.createElement("div", null, "You are jumbo screen")
        }
    }
});


React.render(React.createElement(App2, null), example2);
},{"react":undefined,"react-mq":undefined}]},{},[1]);
