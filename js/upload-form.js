'use strict';

define([
    'resize-picture'
],function(Resizer) {
  var uploadForm = document.forms['upload-select-image'];
  var resizeForm = document.forms['upload-resize'];
  var filterForm = document.forms['upload-filter'];

  var fileElement = uploadForm['upload-file'];

  function uploadImage(element, callback) {
    var fileReader = new FileReader();
    fileReader.onload = function(evt) {
      var image = evt.target.result;
      callback(image);
    }

    fileReader.readAsDataURL(element.files[0]);
  }

  fileElement.onchange = function(evt) {
    if (fileElement.value) {
      fileElement.classList.add('upload-input-hasvalue');
    }
  };

  uploadForm.onsubmit = function(evt) {
    evt.preventDefault();

    uploadImage(fileElement, function(image) {
      sessionStorage.setItem('uploaded-image', image);
      var imageObj = new Image();
      imageObj.src = image;

      resizer = new Resizer(image);

      resizer.setElement(resizeForm);
      filterForm.querySelector('.filter-image-preview').src = image;

      uploadForm.classList.add('invisible');
      resizeForm.classList.remove('invisible');
    });
  };

  uploadForm.onreset = function() {
    fileElement.classList.remove('upload-input-hasvalue');
  };
});
