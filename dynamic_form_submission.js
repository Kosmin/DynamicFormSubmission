// Author: Cosmin Atanasiu
// Source: github.com/Kosmin/DynamicFormSubmission

;(function($, doc, win) {
  "use strict";

  $.DFS_Form = {
    BUTTON_REL : "data-dfs-register-button",
    id: "",
    selector: function() {
      return "#" + this.id;
    },
    name : "",
    // these are fields that will be inserted/updated into an existing form dynamically
    fields: [],
    isInitialized: function() {
      return this.id != "";
    },
    init: function ( formId ) {
      this.id = formId;
      this.fields = new Array();
    },
    registerButton: function( button, callback, delaySubmit ){
      button.on("click", function(e){
        if ( typeof callback !== "undefined" ) {
          callback();
        }
        if( typeof delaySubmit === "undefined" || delaySubmit != "true" || delaySubmit != true) {
          $.DFS_Form.submit();
        }

        // preventDefault and stopPropagation
        return false;
      });
    },
    addField: function( name, value ) {
      var pos = this.fields.indexOf( name );

      // add new field into fields arra
      this.fields[ name ] = value;
    },
    submit: function() {
      var fieldsString = "";
      for( var name in this.fields ) {
        var existingElement = $( this.selector() ).children("input[name=" + name + "]");
        if( existingElement.length <= 0 ) {
          // hidden field not in form yet
          fieldsString += '<input type="hidden" name="' + name + '" value="' + this.fields[ name ] + '" />';
          $( this.selector() ).prepend( fieldsString );
        }
        else
        {
          // hidden element already exists
          fieldsString += '<input type="hidden" name="' + name + '" value="' + this.fields[ name ] + '" />';
          existingElement.attr("value", this.fields[ name ])
        }
      }
      $( this.selector() ).submit();
    }
  };

  $( "button[" + $.DFS_Form.BUTTON_REL + "]" ).each(function() {
    $.DFS_Form.registerButton( $(this) );
  });
})(jQuery, document, window);
//$.DFS_Form.init( "POST", "<address-to-submit-data>");
