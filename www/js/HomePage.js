function HomePage(aConfig){
    this.mApp = $('.app');
    this.mConfig = aConfig;
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
        //self.showCategory(aVideoUrl);
        var aEndDiv = $('<div id="end_page"><div id="image_container"><img src="img/completed.jpg" /></div><div id="hit_area"></div><div id="hit_area_gotopage"></div></div>');
        var aRecButton = $(aEndDiv.find("#hit_area"));
        aRecButton.on("tap", function(aElement){
            aRecButton.off("tap");
            self.startRecording();
        });

        var aPageButton = $(aEndDiv.find("#hit_area_gotopage"));
        aPageButton.on("tap", function(aElement){
            aPageButton.off("tap");
            window.open("http://www.camaraceleste.com.uy");
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

    var aDivString = '<div id="cat_page"><div id="image_container"><img src="img/category.jpg" /></div><div id="hit_area"></div><div id="cat_list" class="ui-field-contain"><fieldset data-role="controlgroup">';



    //<input type="radio" name="radio-choice" id="radio-choice-1" value="choice-1" checked="checked"><label for="radio-choice-1">Cat</label><input type="radio" name="radio-choice" id="radio-choice-2" value="choice-2"><label for="radio-choice-2">Dog</label><input type="radio" name="radio-choice" id="radio-choice-3" value="choice-3"><label for="radio-choice-3">Hamster</label><input type="radio" name="radio-choice" id="radio-choice-4" value="choice-4"><label for="radio-choice-4">Lizard</label></fieldset></div></div>

    for(var i = 0; i < this.mConfig.sponsors.length; i++){
        aDivString += '<input class="cat_radio" type="radio" name="radio-choice" id="radio-choice-"' + i +'" value="choice-"'+ i +'" checked="checked"><label class="car_label" for="radio-choice-"'+ i +'">'+ this.mConfig.sponsors[i].text +'</label>'
    }

    aDivString += '</fieldset></div></div>';
    var aCatDiv = $(aDivString);



    /*var aRecButton = $(aEndDiv.find("#hit_area"));
    aRecButton.on("tap", function(aElement){
        aRecButton.off("tap");
        self.startRecording();
    });*/
    this.mApp.html(aCatDiv);
};

