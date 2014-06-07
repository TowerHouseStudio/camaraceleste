function Twitter(){};

Twitter.prototype.openApp = function(){
    window.open('twitter://user?screen_name=test', '_system', 'location=no');
};
