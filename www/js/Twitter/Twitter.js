function Twitter(){};

<<<<<<< HEAD
Twitter.prototype.openApp = function(aText){
    var aOpenUrl = 'twitter://post?message=' + aText + ' ';
    alert(aOpenUrl);
    window.open(aOpenUrl, '_system', 'location=no');
=======
Twitter.prototype.openApp = function(){
    window.open('twitter://post?message=test', '_system', 'location=no');
>>>>>>> 821f11ad2da98908c9e7196c17e48339487e6a31
};
