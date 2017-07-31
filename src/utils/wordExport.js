import jQuery from 'jquery'
import Doc from './export-doc'
const $=jQuery;
const wordExport = function(el,fileName) {
    fileName = typeof fileName !== 'undefined' ? fileName : "Qite-Word-Export";
    var _static = {
        mhtml: {
            top: "Mime-Version: 1.0\nContent-Base: " + location.href + "\nContent-Type: Multipart/related; boundary=\"NEXT.ITEM-BOUNDARY\";type=\"text/html\"\n\n--NEXT.ITEM-BOUNDARY\nContent-Type: text/html; charset=\"utf-8\"\nContent-Location: " + location.href + "\n\n<!DOCTYPE html>\n<html>\n_html_</html>",
            head: "<head>\n<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\">\n<style>\n_styles_\n</style>\n</head>\n",
            body: "<body>_body_</body>"
        }
    };
    var options = {
        maxWidth: 624
    };
    // Clone selected element before manipulating it
    var markup = $(el).clone();

    // Remove hidden elements from the output
    markup.each(function() {
        var self = $(this);
        if (self.is(':hidden'))
            self.remove();
    });
    // Embed all images using Data URLs
    var images = Array(),img=[];
    var tmpimg=markup.find('img'),_img;
    for(var i=0;i<tmpimg.length;i++){
        if(tmpimg[i].src && tmpimg[i].src.indexOf('-qtedimg-')>-1){
            img.push(tmpimg[i])
        }
    }
    // console.log(img,img[0].style.width,img[0].style.height)
    var completeNubs=0;
    for (var i = 0; i < img.length; i++) {
        // Calculate dimensions of output image
        var _w=img[i].style.width || 0,_h=img[i].style.height || 0;
        if(_w) _w=_w.replace('px','');
        if(_h) _h=_h.replace('px','');

        var w = Math.min(_w?_w:img[i].width, options.maxWidth);
        var h = (_h?_h:img[i].height) * (w / (_w?_w:img[i].width));
        _img = new Image();
        // Set allow cross origin
        _img.setAttribute('crossOrigin', 'anonymous');
        _img.onload = function(){
            completeNubs++;
            // Create canvas for converting image to data URL
            var canvas = document.createElement("CANVAS");
            canvas.width = w || 100;
            canvas.height = h || 100;
            // Draw image to canvas
            var context = canvas.getContext('2d');
            context.drawImage(_img, 0, 0, w, h);
            // Get data URL encoding of image
            var uri = canvas.toDataURL("image/png");
            
            // Save encoded image to array
            images[i] = {
                type: uri.substring(uri.indexOf(":") + 1, uri.indexOf(";")),
                encoding: uri.substring(uri.indexOf(";") + 1, uri.indexOf(",")),
                location: $(_img) && $(_img).attr("src")  || '',
                data: uri.substring(uri.indexOf(",") + 1)
            };
            canvas=null;
            completeNubs===img.length && saveAs();  
        };
        _img.onerror=function(){
            completeNubs++;
        }
        _img.src = img[i].src;
    }
    var saveAs=function(){
        // Prepare bottom of mhtml file with image data
        var mhtmlBottom = "\n";
        for (var i = 0; i < images.length; i++) {
            if(images && images[i] && images[i]['location']){
                mhtmlBottom += "--NEXT.ITEM-BOUNDARY\n";
                mhtmlBottom += "Content-Location: " + images[i]['location'] + "\n";
                mhtmlBottom += "Content-Type: " + images[i].type + "\n";
                mhtmlBottom += "Content-Transfer-Encoding: " + images[i].encoding + "\n\n";
                mhtmlBottom += images[i].data + "\n\n";
            }
        }
        mhtmlBottom += "--NEXT.ITEM-BOUNDARY--";

        //TODO: load css from included stylesheet
        var styles = "";

        // Aggregate parts of the file together
        var fileContent = _static.mhtml.top.replace("_html_", _static.mhtml.head.replace("_styles_", styles) + _static.mhtml.body.replace("_body_", markup.html())) + mhtmlBottom;

        
        Doc.download(fileName+".doc",fileContent);
    }
};
module.exports = wordExport