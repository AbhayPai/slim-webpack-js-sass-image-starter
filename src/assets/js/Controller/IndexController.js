require("Sass/index.scss");

import BaseController from './BaseController';

new BaseController().register({
    render: function() {
        console.log('render');
    },
    preprocess: function() {
        console.log('preprocess');
    },
    ready: function() {
        console.log('ready');
    },
    interactive: function() {
        console.log('interactive');
    },
    complete: function() {
        console.log('complete');
    }
});
