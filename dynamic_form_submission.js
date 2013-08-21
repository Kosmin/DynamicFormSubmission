// Author: Cosmin Atanasiu
// Source: github.com/Kosmin/DynamicFormSubmission

;(function($, doc, win) {
  "use strict";

  $.DFS_Form = {
    BUTTON_REL : "data-dfs-register-button",
    ID: "DynamicFormSubmissionsHandler",
    SELECTOR: function() {
      return "#" + this.ID; 
    },
    name : "",
    // these are fields that will be inserted into a virtual form dynamically.
    fields: [],
    is_initialized: function() {
      return this.method != "" && this.action != "";
    },
    init: function ( method, action ) {
      this.fields = new Array();
      this.method = method;
      this.action = action;
      $("body").append( '<form id="' + this.ID + '"\
                        action="' + action + '"\
                        method="' + method + '"\
                        style="display:none; visibility:hidden; height:0px; width:0px;">\
                    </form>' );
    },
    register_button: function( button, callback, delay_submit ){
      button.on("click", function(e){
        if ( typeof callback !== "undefined" ) {
          callback();
        }
        if( typeof delay_submit === "undefined" ) {
          $.DFS_Form.submit();
        }

        //preventDefault and stopPropagation
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
        fields_string += '<input type="hidden" name="' + name + '" value="' + this.fields[ name ] + '" />';
      }
      $( this.SELECTOR() ).html( fields_string );
      $( this.SELECTOR() ).submit();
    }
  };

  $( "button[" + $.DFS_Form.BUTTON_REL + "]" ).each(function() {
    $.DFS_Form.register_button( $(this) );
  });
})(jQuery, document, window);
//$.DFS_Form.init( "POST", "<address-to-submit-data>");
