function FUPController($scope, $element, $attrs, $timeout) {
    var __this = this;
    /**
     * for demo storing the API keys 
     */
    __this.wistia_key = "9aed82a0052367b3ede169e0d36905f9129207276c0b619e58ee212244293b26";
    __this.wistia_id = "2vo0svrip7";
    //
    /**
     * initialize the properties which controls the state of
     * all controls and visual elements
     */
    __this.percentage = 0;
    __this.showCancel = false;
    __this.showVideo = false;
    __this.showError = false;
    __this.upload = null;
    /**
     * elements that needs to be updated or initialized
     * thats helps us in uploading/vieing the video file
     */
    var $cont = angular.element($element);
    //
    var $pgb = $cont.find(".progress .progress-bar");
    //
    var $uploader = $cont.find("input.fileupload");
    var $cancel_btn = $cont.find(".fileupload-cancel");
    //
    var $video_cont = $cont.find(".video-embed");
    var $wistia_cont = $video_cont.find(".cont");
    //
    var $error = $cont.find(".fileupload-error-msg");
    //
    /**
     * abort file upload on click of cancel button
     */
    $cancel_btn.click(function () {
        if (__this.upload) {
            __this.upload.abort();
            /** reset the progress bar state */
            var p = "0%"
            $pgb.css("width", p).html(p);
            $scope.$apply(function () {
                __this.showCancel = false;
                __this.percentage = 0;
            })
        }
    })
    //  
    /**
     * triggered when a video file is selected
     * which will initiate the upload process
     */
    __this.add = function (evt, data) {
        /**
         * add the API keys/id 
         */
        data.formData = {
            api_password: __this.wistia_key,
            project_id: __this.wistia_id
        }
        __this.upload = data.submit();
        $scope.$apply(function () {
            __this.showCancel = true;
            __this.showError = false;
            __this.percentage = 1;
        })
    }
    /**
     * updates the progress bar
     */
    __this.progress = function (evt, data) {

        __this.percentage = Math.floor((data.loaded / data.total) * 100);
        var p = __this.percentage + "%"
        $pgb.css("width", p).html(p);
    }
    /**
     * triggered when upload is finished
     * this is were we embed wistia video player and add uploaded video
     */
    __this.done = function (evt, data) {
        $scope.$apply(function () {
            __this.showCancel = false;
            __this.showVideo = true;
        })
        var id = data.result.hashed_id;
        $wistia_cont.attr("id", "wistia_" + id);
        Wistia.embed(id);

    }
    /**
     * triggered when upload fails
     */
    __this.fail = function (evt, data) {
        if (data.textStatus !== "error")
            return;
        $error.html("Error: " + (data.jqXHR.responseJSON.error));
        $scope.$apply(function () {
            __this.showError = true;
            __this.percentage = 0;
            __this.showCancel = false;
        })

    }
    //console.log($element);
    //console.log($pgb);
    //
    /**
     * initialize jquery-file-upload plugin
     */
    $uploader.fileupload({
        dataType: "json",
        add: __this.add,
        progress: __this.progress,
        done: __this.done,
        fail: __this.fail

    });

}

myTest.component('fileUploadComp', {
    scope: {},
    templateUrl: 'templates/fup-comp.html',
    controller: FUPController
});
