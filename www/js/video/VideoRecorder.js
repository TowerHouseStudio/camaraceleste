function VideoRecorder(onUploading, onCancel, onProgress, onUploadComplete){
    this.mBasePath = "http://www.camaraceleste.com.uy/";
    this.mOnUploading = onUploading;
    this.mOnCancel = onCancel;
    this.mOnProgress = onProgress;
    this.mOnUploadComplete = onUploadComplete;
};

VideoRecorder.prototype.recordVideo = function(){
    var self = this;

    function capture(){
        navigator.device.capture.captureVideo(captureSuccess, captureError, {duration:8});
    }

    // capture callback
    var captureSuccess = function(mediaFiles) {

        if(mediaFiles.length >= 1){
            self.mOnUploading();
            var aMedia = mediaFiles[0];

            var aType = aMedia.type;

            var aPath = mediaFiles[0].fullPath;

            self.uploadVideo(aPath, aType);
        }

    };

// capture error callback
    var captureError = function(error) {

        function response(aButtonIndex){
            if(aButtonIndex == 1){
                //Intentar de nuevo
                capture();
            }else{
                //No hacer nada
                self.mOnCancel();
            }
        }

        navigator.notification.confirm("Se produjo un error al grabar el video, quires intentarlo de nuevo?", response, "Intentalo de nuevo", ['Si', 'No']);
    };
    // start video capture
    capture();

};

VideoRecorder.prototype.uploadVideo = function(aFilePath, aType){

    var self = this;
    var aProgress = $($.find("#upload_percent"));

    function upload(){
        var uri = encodeURI(self.mBasePath + "camara_upload.php");


        var options = new FileUploadOptions();
        options.fileKey="file";
        options.fileName=aFilePath.substr(aFilePath.lastIndexOf('/')+1);
        options.mimeType=aType;


        var ft = new FileTransfer();
        ft.onprogress = function(progressEvent) {
            if (progressEvent.lengthComputable) {
                self.mOnProgress(parseInt((progressEvent.loaded / progressEvent.total)*100));
                //aProgress.html("Progress: " + ((progressEvent.loaded / progressEvent.total)) + "%");
            }
        };
        ft.upload(aFilePath, uri, completed, fail, options);
    }

    function completed(r) {
        var aJson = JSON.parse(r.response);
        if(aJson.success == 1){
            self.uploadToTwitter(aJson.message);
        }

    }

    function fail(error) {
        function response(aButtonIndex){
            if(aButtonIndex == 1){
                //Intentar de nuevo
                upload();
            }else{
                //No hacer nada
                self.mOnCancel();
            }
        }

        navigator.notification.confirm("Se produjo un error al subir el video, quires intentarlo de nuevo?", response, "Intentalo de nuevo", ['Si', 'No']);

    }

    upload();

};

VideoRecorder.prototype.uploadToTwitter = function(aVideoUrl){

    this.mOnUploadComplete(aVideoUrl);

    var aUrl = this.mBasePath + aVideoUrl;

    var aTwit = new Twitter();
    aTwit.openApp("%23test " + encodeURI(aUrl));
};
