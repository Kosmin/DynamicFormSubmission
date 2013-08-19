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
		init: function ( method, action ) {
			this.fields = [];
			this.method = method;
			this.action = action;
			$("body").append( '<form id="' + this.ID + '"\
												action="' + action + '"\
												method="' + method + '"\
												style="display:none; visibility:hidden; height:0px; width:0px;">\
										</form>' );
		},
		register_button: function( button, callback ){
			button.on("click", function(e){
				if ( callback != undefined ) {
					callback();
				}
				$.DFS_Form.submit();
				e.preventDefault();
			});
		},
		add_field: function( name, value ) {
			var pos = this.fields.indexOf( name );

			// remove existing fields with same name
			if ( pos >= 0 ) {
				this.fields.splice( name, fields.length );
			}

			this.fields[ name ] = value;
		},
		submit: function() {
			var fields_string = "";
			for( var name in this.fields ) {
				fields_string += '<input type="hidden" name="' + name + '" value="' + this.fields[ name ] + '" />';
			}
			$( this.SELECTOR() ).html( fields_string );
		}
	};

	$( "button[" + $.DFS_Form.BUTTON_REL + "]" ).each(function() {
		$.DFS_Form.register_button( $(this) );
	});
})(jQuery, document, window);
//$.DFS_Form.init( "POST", "<address-to-submit-data>");
