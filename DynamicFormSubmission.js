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
		// lists buttons existing on the page, that will have submission events attached to them
		buttons_registered: [],
		init: function ( method, action ) {
			this.fields = [];
			this.buttons_registered = [];
			this.method = method;
			this.action = action;
			$("body").append( '<form id="' + this.ID + '"\
												action="' + action + '"\
												method="' + method + '"\
												style="display:none; visibility:hidden; height:0px; width:0px;">\
										</form>' );
		},
		add_field: function( name, value ) {
			var pos = this.fields.indexOf( name );

			// remove existing fields with same name
			if ( pos >= 0 ) {
				this.fields.splice( name, fields.length );
			}

			this.fields[ name ] = value;
		},

		// registers an existing element on the page to trigger the form submission on click
		register_button: function( selector ) {
			$( selector ).on("click", function(e){
				e.preventDefault();
				$( this.SELECTOR ).submit();
			});
		},
		submit: function() {
			var fields_string = "";
			for( var name in this.fields ) {
				fields_string += '<input type="hidden" name="' + name + '" value="' + this.fields[ name ] + '" />';
			}
			$( this.SELECTOR() ).html( fields_string );
			alert( $( this.SELECTOR() ).html() );
		}
	};

	$( "button[" + $.DFS_Form.BUTTON_REL + "]" ).each(function() {
		$(this).on( 'click', function(e) {
			//we don't want to do this because of analytics tied to the click & other events
			//e.preventDefault();
			
			$.DFS_Form.submit();
		});
	});
})(jQuery, document, window);
//$.DFS_Form.init( "POST", "<address-to-submit-data>");
