function VideoRecorder(){};

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
    navigator.device.capture.captureVideo(captureSuccess, captureError);
};

VideoRecorder.prototype.uploadVideo = function(aFilePath, aType){

    var aProgress = $($.find("#upload_percent"));

    function completed(r) {
        alert("completed");
        console.log("Code = " + r.responseCode);
        console.log("Response = " + r.response);
        console.log("Sent = " + r.bytesSent);
    }

    function fail(error) {
        alert("Error: " + error);
        alert("An error has occurred: Code = " + error.code);
        console.log("upload error source " + error.source);
        console.log("upload error target " + error.target);
    }

    var uri = encodeURI("http://towerhousestudio.com/projects/camara_celeste/camara_upload.php");

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
