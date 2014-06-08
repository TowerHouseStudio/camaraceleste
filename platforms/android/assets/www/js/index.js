/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {

        var aHeight = screen.height;

        $('body').css('height', aHeight);

        app.ON_DEVICE = true;
        if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|IEMobile)/)) {
            document.addEventListener("deviceready", this.onDeviceReady, false);
        } else {
            app.ON_DEVICE = false;
            this.onDeviceReady(); //this is the browser
        }

        //document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {


        function isTwitterAvailable(availability){
            // availability is either true or false
            if(availability) {
                var aHomePage = new HomePage();
                aHomePage.initialize();
            }else{
                //show no avail
                var aBody = $($.find("body"));
                aBody.removeClass('home_page');
                aBody.addClass('no_twitter_page');
            }
        };


        if(app.ON_DEVICE){
            //Check if twitter is installed
            var appTestUrl = (device.platform == "Android") ? 'com.twitter.android' : 'twitter://';
            appAvailability.check(appTestUrl, isTwitterAvailable);
        }else{
            isTwitterAvailable(true);
        }

/*
        var aRecordButton = $($.find('#record_button'));
        aRecordButton.on('tap', function(aElement){
            alert("tap");
            var av = new VideoRecorder();
            av.recordVideo();

        });*/


    }
};
