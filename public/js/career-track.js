jQuery(function($){
	 $('.repeater').repeater({
            // (Required if there is a nested repeater)
            // Specify the configuration of the nested repeaters.
            // Nested configuration follows the same format as the base configuration,
            // supporting options "defaultValues", "show", "hide", etc.
            // Nested repeaters additionally require a "selector" field.
            repeaters: [{
                // (Required)
                // Specify the jQuery selector for this nested repeater
                selector: '.inner-repeater'
            }]
        });
	
	if($(".loadchildcareertrackorgchart").length > 0){
		var rootchild = {"id":0,"name":"Full Stack Developer"}
		var data = {};
			data["1"]={"id":"1","name":"Backend Developer"};
			data["2"]={"id":"2","name":"Front Developer"};
			data["3"]={"id":"3","name":"Full, Stack "};
			data["4"]={"id":"4","name":"Backend Developer"};
			data["6"]={"id":"6","name":"Backend Developer"};
			data["7"]={"id":"7","name":"Backend Developer"};
			data["8"]={"id":"8","name":"Backend Seller"};data["9"]={"id":"9","name":"QA"};
			data["1"]["child"] = [{"id":"11","name":"Backend Developer 1"},{"id":"12","name":"Backend Developer 2"},{"id":"13","name":"Backend Developer 3"}];
		   data["2"]["child"] = [{"id":"21","name":"Front Developer 1"},{"id":"22","name":"Front Developer 2"},{"id":"23","name":"Front Developer 3"},{"id":"24","name":"Front Developer 4"}];
			data["3"]["child"] = [{"id":"31","name":"Full Stack 1"},{"id":"32","name":"Full Stack 2"}];
		data["4"]["child"] = [{"id":"41","name":"Full Stack 1"},{"id":"42","name":"Full Stack 2"}];
		data["6"]["child"] = [{"id":"61","name":"Full Stack 1"}];data["7"] = [{"id":"71","name":"Full Stack 77  7 7"}];
		data["8"]["child"] = [{"id":"81","name":"Seller 1"},{"id":"82","name":"Seller 2"},{"id":"83","name":"Buyer 2"},{"id":"84","name":"Manager Seller"}];
		data["9"]["child"] = [{"id":"91","name":"QA sub"}];
		
		rootchild["child"] = data;
			$('.loadchildcareertrackorgchart').each(function() {
					 $(this).unbind();
					 $(this).bind( "click", function() {

						  var id = $(this).attr("data-id");
						 var parent = $(this).attr("data-parent");
						 //console.log(data[id]);
						 createcontainerchart(data[id],parent);
						
					});
			  });
	
	}
});/* Add here all your JS customizations */


function createcontainerchart(data,parent){	
		
	var html = "";
		
	
	 	html += '<div class="slidecontainerchart"  id="containerchart-'+data["id"]+'">';
		html += '<div class="containerchart">';
		html += ' <a href="#" class="level-1 rectangle backcareertrack" data-parent="'+parent+'">'+data["name"]+'</a>';
		
		if(data["child"].length >0 ){
			html += '<ol class="level-2-wrapper">';
			$.each(data["child"], function( index, value ) {
				html += '<li>';
				html += '<a href="javascript:void(0)" class="level-2 rectangle loadchildcareertrackorgchart" data-id="'+this["id"]+'">'+this["name"]+'</a>';
				html += '</li>';
			});
			html += '</ol>';
		}
		html += '</div></div>';
	
	$("#rootcareertrackchart .slidecontainerchart.showcareertrack").removeClass("showcareertrack").hide();
	$("#rootcareertrackchart").append(html);
	$('#containerchart-'+data["id"]).slideToggle().addClass("showcareertrack");
	containerchartslideshow();
	return html;
}

function containerchartslideshow(data,parent){
	$('.backcareertrack').each(function() {
			 $(this).unbind();
			 $(this).bind( "click", function() {

				 var parent = $(this).attr("data-parent");
				
				 $("#rootcareertrackchart .slidecontainerchart.showcareertrack").removeClass("showcareertrack").hide();
				  $('#'+parent).addClass("showcareertrack").slideToggle();

			});
	  });
	
}

