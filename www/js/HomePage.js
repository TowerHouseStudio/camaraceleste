function HomePage(){
    this.mApp = $('.app');
};

HomePage.prototype.initialize = function(){
    var aDiv = $('<div id="home_page"><div id="image_container"><img src="img/home.png" /><div id="hit_area"></div></div></div>');

    this.mApp.html(aDiv);
};
