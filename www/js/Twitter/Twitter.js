function Twitter(){};

Twitter.prototype.openApp = function(){
    window.open('twitter://post?message=test', '_system', 'location=no');
};
