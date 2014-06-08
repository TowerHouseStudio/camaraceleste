function Twitter(){};

Twitter.prototype.openApp = function(aText){
    var aOpenUrl = 'twitter://post?message=' + aText + ' ';
    window.open(aOpenUrl, '_system', 'location=no');

};
