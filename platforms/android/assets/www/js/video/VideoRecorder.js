function VideoRecorder(){
    this.mBasePath = "http://www.camaraceleste.com.uy";
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

    var aProgress = $($.find("#upload_percent"));

    function completed(r) {
        alert("completed");
        alert("Code = " + r.responseCode);
        alert("Response = " + r.response);
        alert("Sent = " + r.bytesSent);
    }

    function fail(error) {
        alert("Error: " + error);
        alert("An error has occurred: Code = " + error.code);
        alert("upload error source " + error.source);
        alert("upload error target " + error.target);
    }

    var uri = encodeURI(this.mBasePath + "/camara_upload.php");
    alert(uri);
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
    ft.upload(aFilePath, uri, completed, fail, options);
};
