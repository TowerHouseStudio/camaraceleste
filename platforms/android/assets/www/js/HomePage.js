function HomePage(){
    this.mApp = $('.app');
};

HomePage.prototype.initialize = function(){
    var self = this;

    var aDiv = $('<div id="home_page"><div id="image_container"><img src="img/home.png" /><div id="hit_area"></div></div></div>');

    this.mApp.html(aDiv);

    var aRecButton = $(aDiv.find("#hit_area"));
    aRecButton.on("tap", function(aElement){
        aRecButton.off("tap");
        self.startRecording();
    });
};

HomePage.prototype.startRecording = function(){
    var av = new VideoRecorder();
    av.recordVideo();
};