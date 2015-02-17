React Media Query
=================

Media Query Component for React.

## Demo & Examples

Live demo: [yuanyan.github.io/react-mq](http://yuanyan.github.io/react-mq/)

To build the examples locally, run:

```
npm install
gulp dev
```

Then open [`localhost:9999`](http://localhost:9999) in a browser.

## Installation

The easiest way to use `react-mq` is to install it from NPM and include it in your own React build process (using [Browserify](http://browserify.org), etc).

You can also use the standalone build by including `dist/react-mq.js` in your page. If you use this, make sure you have already included React, and it is available as a global variable.

```
npm install react-mq --save
```

## Usage

### Media Query
```
var React = require('react');
var Media = require('react-mq');
var App = React.createClass({
  render: function(){
    return (
      <div>
        <Media query='(max-width: 768px)'>
          <div>You are mobile screen</div>
        </Media>
        <Media query='(min-width: 769px) and (max-width: 992px)'>
          <div>You are tablet screen</div>
        </Media>
        <Media query='(min-width: 993px) and (max-width: 1200px)'>
          <div>You are desktop screen</div>
        </Media>
        <Media query='(min-width: 1201px)'>
          <div>You are jumbo screen</div>
        </Media>
      </div>
    );
  }
});
```

### Nested Media Query
```
var React = require('react');
var Media = require('react-mq');
var App = React.createClass({
  render: function(){
    return (
      <div>
        <Media query='(max-width: 768px)'>
          <div>You are a mobile screen</div>
          <Media query='(orientation: portrait)'>
            <div>You are portrait</div>
          </Media>
          <Media query='(orientation: landscape)'>
            <div>You are landscape</div>
          </Media>
          <Media query='(min-resolution: 2dppx)'>
            <div>You are retina</div>
          </Media>
          <Media query='(max-resolution: 1dppx)'>
            <div>You are not retina</div>
          </Media>
        </Media>
      </div>
    );
  }
});
```

### Mixin

```
var React = require('react');
var MediaMixin = require('react-mq').Mixin;
// Global scope
MediaMixin.addMediaQueries({
  mobile:  '(max-width: 768px)',
  tablet:  '(min-width: 769px) and (max-width: 992px)',
  desktop: '(min-width: 993px) and (max-width: 1200px)'
});

var App = React.createClass({
  mixins: [MediaMixin],
  // Component scope 
  media: {
      jumbo:  '(min-width: 1201px)'
  },
  render: function(){
        // State will update whenever a media query matches or unmatches
        if (this.state.media.mobile){
            return <div>You are mobile screen</div>
        }
        else if (this.state.media.tablet) {
            return <div>You are tablet screen</div>
        }
        else if (this.state.media.desktop) {
            return <div>You are desktop screen</div>
        }
        else {
            return <div>You are jumbo screen</div>
        }
  }
});
```
