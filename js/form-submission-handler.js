(function() {
  // get all data in form and return object
  function getFormData(form) {
    var elements = form.elements;
    var honeypot;

    var fields = Object.keys(elements).filter(function(k) {
      if (elements[k].name === "honeypot") {
        honeypot = elements[k].value;
        return false;
      }
      return true;
    }).map(function(k) {
      if(elements[k].name !== undefined) {
        return elements[k].name;
      // special case for Edge's html collection
      }else if(elements[k].length > 0){
        return elements[k].item(0).name;
      }
    }).filter(function(item, pos, self) {
      return self.indexOf(item) == pos && item;
    });

    var formData = {};
    fields.forEach(function(name){
      var element = elements[name];

      // singular form elements just have one value
      formData[name] = element.value;

      // when our element has multiple items, get their values
      if (element.length) {
        var data = [];
        for (var i = 0; i < element.length; i++) {
          var item = element.item(i);
          if (item.checked || item.selected) {
            data.push(item.value);
          }
        }
        formData[name] = data.join(', ');
      }
    });

    // add form-specific values into the data
    formData.formDataNameOrder = JSON.stringify(fields);
    formData.formGoogleSheetName = form.dataset.sheet || "responses"; // default sheet name
    formData.formGoogleSendEmail
      = form.dataset.email || ""; // no email by default

    return {data: formData, honeypot: honeypot};
  }

  function handleFormSubmit(event) {  // handles form submit without any jquery
    event.preventDefault();           // we are submitting via xhr below
    var form = event.target;
    var formData = getFormData(form);
    var data = formData.data;

    // If a honeypot field is filled, assume it was done so by a spam bot.
    if (formData.honeypot) {
      return false;
    }

    disableAllButtons(form);
    var url = form.action;
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    // xhr.withCredentials = true;
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
          document.getElementById("error_message").style.display = "none";
          form.reset();
          var formElements = form.querySelector(".form-elements")
          if (formElements) {
            formElements.style.display = "none"; // hide form
          }
          var thankYouMessage = form.querySelector(".thankyou_message");
          if (thankYouMessage) {
            document.getElementById("submit-loader").style.display = "none";
            thankYouMessage.style.display = "block";
            setTimeout(hidePopUpMessage, 3000);

          }
        } else {
          document.getElementById("thankyou_message").style.display = "none";
          var errorMessage = form.querySelector(".error_message");
          if (errorMessage) {
            document.getElementById("submit-loader").style.display = "none";
            errorMessage.style.display = "block";
            setTimeout(hidePopUpMessage, 3000);
          }
        }
    };
    // url encode form data for sending as post data
    var encoded = Object.keys(data).map(function(k) {
        return encodeURIComponent(k) + "=" + encodeURIComponent(data[k]);
    }).join('&');
    xhr.send(encoded);
  }

  function loaded() {
    // bind to the submit event of our form
    var forms = document.querySelectorAll("form.gform");
    for (var i = 0; i < forms.length; i++) {
      forms[i].addEventListener("submit", handleFormSubmit, false);
    }
  };
  document.addEventListener("DOMContentLoaded", loaded, false);

  function disableAllButtons(form) {
    var buttons = form.querySelectorAll("button");
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].disabled = true;
    }
  }



})();
function hidePopUpMessage() {

    document.getElementById("thankyou_message").style.display = "none";
    document.getElementById("error_message").style.display = "none";

}
function showLoader() {
  document.getElementById("submit-loader").style.display = "block";
}

function enableSubmit(){
let inputs = document.getElementsByClassName('required'); // Enter your class name for a required field, this should also be reflected within your form fields.
let btn = document.querySelector('input[type="submit"]');
let isValid = true;
for (var i = 0; i < inputs.length; i++){
let changedInput = inputs[i];
if (changedInput.value.trim() === "" || changedInput.value === null){
isValid = false;
break;
}
}
btn.disabled = !isValid;

}