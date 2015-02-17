!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.mq=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
var React = (typeof window !== "undefined" ? window.React : typeof global !== "undefined" ? global.React : null);
var matchMedia = typeof window !== 'undefined' ? window.matchMedia : null;

var globalMediaQueries = {};
var globalMediaQueryList = {};

function removeMediaQuery (mediaQuery, mediaQueryList){
    var mq = mediaQueryList[mediaQuery];
    if(mq){
        mq.mql.removeListener(mq.listener);
        mediaQueryList[mediaQuery] = null;
    }
}

var Mixin = {
    // Component scope
    componentMediaQueryList: {},

    getInitialState: function() {
        return {
            media: {}
        };
    },

    componentWillMount: function(){
        var query = this.getMediaQuery();
        if(query){
            this.updateMediaQuery(query);
        }else{
            this.listenGlobalMediaQueries();
            this.listenComponentMediaQueries();
        }

    },

    componentWillUnmount: function(){
        if(this.mql){
            this.mql.removeListener(this.updateMatches);
        }else{
            Object.keys(this.componentMediaQueryList).forEach(function(key){

            })
        }
    },

    addMediaQueries: function(mediaQueries){
        for(var mediaQuery in mediaQueries){
            if(mediaQueries.hasOwnProperty(mediaQuery)){
                globalMediaQueries[mediaQuery] = mediaQueries[mediaQuery];
            }
        }
    },

    removeMediaQuery: function(mediaQuery){
        removeMediaQuery(mediaQuery, globalMediaQueryList);
    },

    listenGlobalMediaQueries: function(){
        this.listenMediaQueries(globalMediaQueries, globalMediaQueryList);
        // Reset global media query after listened
        globalMediaQueries = {};
    },

    listenComponentMediaQueries: function(componentMediaQueries){
        if(this.media){
            this.listenMediaQueries(this.media, this.componentMediaQueryList);
        }
    },

    setMediaQueryState: function(key, doesMatch) {
        if (this.state.media[key] != doesMatch) {
            this.state.media[key] = doesMatch;
            this.setState({
                media: this.state.media
            });
        }
    },

    listenMediaQueries: function(mediaQueries, mediaQueryLists){
        var self = this;
        Object.keys(mediaQueries).forEach(function(key){
            mediaQueryLists[key] = {};

            var mediaQuery = mediaQueries[key];
            var mql = matchMedia(mediaQuery);
            mediaQueryLists[key].mql = mql;

            // Create listener
            var listener = function(mql){
                self.setMediaQueryState(key, mql.matches);
            };

            mediaQueryLists[key].listener = listener;

            listener(mql);

            // Listen for changes
            mql.addListener(listener);
        })
    },

    getMediaQuery: function(){
        var query = this.props.query;
        return query;
    },

    updateMediaQuery: function(query){
        if (!query) {
            throw new Error('Invalid or missing Media Query');
        }

        if(matchMedia){
            this.mql = matchMedia(query);
            this.mql.addListener(this.updateMatches);
            this.updateMatches();
        }
    },

    updateMatches: function(){
        if (this.mql.matches === this.state.matches) {
            return;
        }
        this.setState({
            matches: this.mql.matches
        });
    }
};

var MediaQuery = React.createClass({displayName: "MediaQuery",
    mixins: [Mixin],

    statics: {
        add: function(name, query, override){
            if(media[name] && !override){
                throw new Error('Set duplicate media alias');
            }
            media[name] = query;
        }
    },

    getInitialState: function(){
        return {
            matches: false
        };
    },

    render: function(){
        if (this.state.matches === false) {
            return null;
        }
        return React.DOM.div(this.props, this.props.children);
    }
});

MediaQuery.Mixin = Mixin;

module.exports = MediaQuery;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[1])(1)
});