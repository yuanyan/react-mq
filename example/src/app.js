var React = require('react');
var Media = require('react-mq');
var App1 = React.createClass({
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
                    <Media query='(min-resolution: 2dppx)'>
                        <div>You are retina</div>
                    </Media>
                    <Media query='(max-resolution: 1dppx)'>
                        <div>You are not retina</div>
                    </Media>
                </Media>
                <Media query='(min-width: 1201px)'>
                    <div>You are jumbo screen</div>
                </Media>
            </div>
        );
    }
});

React.render(<App1/>, example1);


var MediaMixin = require('react-mq').Mixin;
// Global scope
MediaMixin.addMediaQueries({
    mobile:  '(max-width: 768px)',
    tablet:  '(min-width: 769px) and (max-width: 992px)',
    desktop: '(min-width: 993px) and (max-width: 1200px)'
});

var App2 = React.createClass({
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


React.render(<App2/>, example2);