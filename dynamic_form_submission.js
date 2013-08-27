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
    is_initialized: function() {
      return this.id != "";
    },
    init: function ( form_id ) {
      this.id = form_id;
      this.fields = new Array();
    },
    register_button: function( button, callback, delay_submit ){
      button.on("click", function(e){
        if ( typeof callback !== "undefined" ) {
          callback();
        }
        if( typeof delay_submit === "undefined" || delay_submit != "true" || delay_submit != true) {
          $.DFS_Form.submit();
        }

        // preventDefault and stopPropagation
        return false;
      });
    },
    add_field: function( name, value ) {
      var pos = this.fields.indexOf( name );

      // add new field into fields arra
      this.fields[ name ] = value;
    },
    submit: function() {
      var fields_string = "";
      for( var name in this.fields ) {
        var existing_element = $( this.selector() ).children("input[name=" + name + "]");
        if( existing_element.length <= 0 ) {
          // hidden field not in form yet
          fields_string += '<input type="hidden" name="' + name + '" value="' + this.fields[ name ] + '" />';
          $( this.selector() ).prepend( fields_string );
        }
        else
        {
          // hidden element already exists
          fields_string += '<input type="hidden" name="' + name + '" value="' + this.fields[ name ] + '" />';
          existing_element.attr("value", this.fields[ name ])
        }
      }
      $( this.selector() ).submit();
    }
  };

  $( "button[" + $.DFS_Form.BUTTON_REL + "]" ).each(function() {
    $.DFS_Form.register_button( $(this) );
  });
})(jQuery, document, window);
//$.DFS_Form.init( "POST", "<address-to-submit-data>");
