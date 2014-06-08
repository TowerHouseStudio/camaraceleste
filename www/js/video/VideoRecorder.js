function VideoRecorder(){
<<<<<<< HEAD
    this.mBasePath = "http://www.camaraceleste.com.uy/";
=======
    this.mBasePath = "http://www.camaraceleste.com.uy";
>>>>>>> 821f11ad2da98908c9e7196c17e48339487e6a31
};

VideoRecorder.prototype.recordVideo = function(){
    var self = this;
    // capture callback
    var captureSuccess = function(mediaFiles) {
        alert("success");

        if(mediaFiles.length >= 1){
            var aMedia = mediaFiles[0];

            var aType = aMedia.type;
            alert("Type: " + aType);

            var aPath = mediaFiles[0].fullPath;

            self.uploadVideo(aPath, aType);
        }

    };

// capture error callback
    var captureError = function(error) {
        alert("Error: " + error);
        navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
    };

    alert("record");
// start video capture
    navigator.device.capture.captureVideo(captureSuccess, captureError, {duration:8});
    //this.uploadVideo("C:/video-js.swf", "image/jpeg");
};

VideoRecorder.prototype.uploadVideo = function(aFilePath, aType){

    var self = this;
    var aProgress = $($.find("#upload_percent"));

    function completed(r) {
        alert("completed");
<<<<<<< HEAD
        var aJson = JSON.parse(r.response);
        alert("Response = " + aJson);
        alert("Response = " + aJson.success);
        if(aJson.success == 1){
            alert("about to twit");
            self.uploadToTwitter(aJson.message);
        }
=======
        alert("Code = " + r.responseCode);
        alert("Response = " + r.response);
        alert("Sent = " + r.bytesSent);
>>>>>>> 821f11ad2da98908c9e7196c17e48339487e6a31
    }

    function fail(error) {
        alert("Error: " + error);
        alert("An error has occurred: Code = " + error.code);
        alert("upload error source " + error.source);
        alert("upload error target " + error.target);
    }

<<<<<<< HEAD
    var uri = encodeURI(this.mBasePath + "camara_upload.php");

=======
    var uri = encodeURI(this.mBasePath + "/camara_upload.php");
    alert(uri);
>>>>>>> 821f11ad2da98908c9e7196c17e48339487e6a31
    var options = new FileUploadOptions();
    options.fileKey="file";
    options.fileName=aFilePath.substr(aFilePath.lastIndexOf('/')+1);
    options.mimeType=aType;


    var ft = new FileTransfer();
    ft.onprogress = function(progressEvent) {
        if (progressEvent.lengthComputable) {
            aProgress.html("Progress: " + ((progressEvent.loaded / progressEvent.total)) + "%");
        }
    };
    alert("Start upload");
    try{
        ft.upload(aFilePath, uri, completed, fail, options);
    }catch(e){
        alert(e);
    }

};

VideoRecorder.prototype.uploadToTwitter = function(aVideoUrl){

    /*var appTestUrl = (device.platform == "Android") ? 'twitter://' : 'com.twitter.android';

    appAvailability.check(appTestUrl, function(availability) {
        // availability is either true or false
        if(availability) { console.log('Twitter is available'); }
    });*/

    var aUrl = this.mBasePath + aVideoUrl;

    var aTwit = new Twitter();
    aTwit.openApp("%23test " + encodeURI(aUrl));
};
