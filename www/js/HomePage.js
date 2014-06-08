function HomePage(){
    this.mApp = $('.app');
};

HomePage.prototype.initialize = function(){
    var self = this;

    var aDiv = $('<div id="home_page"><div id="image_container"><img src="img/background.jpg" /><div id="hit_area"></div></div></div>');

    this.mApp.html(aDiv);

    var aRecButton = $(aDiv.find("#hit_area"));
    aRecButton.on("tap", function(aElement){
        aRecButton.off("tap");
        self.startRecording();
    });
};

HomePage.prototype.startRecording = function(){

    var self = this;

    var aUploadDiv = $('<div id="upload_page"><div id="image_container"><img src="img/uploading.jpg" /></div><p id="progress_text"></p></div>');
    var aProgressText = aUploadDiv.find('#progress_text');

    function uploadStarted(){
        var aBody = $($.find("body"));
        aBody.addClass('uploading_page');

        self.mApp.html(aUploadDiv);

    }
    function uploadCancelled(){
        self.initialize();
    };
    function onProgress(aProgress){
        aProgressText.text("SUBIENDO "+ aProgress +"%");
    }
    function onUploadComplete(aVideoUrl){
        var aEndDiv = $('<div id="end_page"><div id="image_container"><img src="img/completed.jpg" /></div><div id="hit_area"></div></div>');
        var aRecButton = $(aEndDiv.find("#hit_area"));
        aRecButton.on("tap", function(aElement){
            aRecButton.off("tap");
            self.startRecording();
        });
        self.mApp.html(aEndDiv);
    }

    /*uploadStarted();
    onProgress(20);
    onUploadComplete();*/

    var av = new VideoRecorder(uploadStarted, uploadCancelled, onProgress, onUploadComplete);
    av.recordVideo();
};

HomePage.prototype.showCategory = function(aVideoUrl){

};

