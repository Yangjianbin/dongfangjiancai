$(function() {
  $("img.lazy").lazyload({
	  	 threshold : 0,
		 failure_limit : 10,
  		 placeholder : "../images/loading.gif",
         effect : "fadeIn",
		 skip_invisible : false
   });



});