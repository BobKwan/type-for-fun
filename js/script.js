function loadImg(obj,event){
	var curVal = $(obj).val();
	var imgSrc = "images/" + curVal + ".png";
	$(obj).siblings(".le_img").attr("src",imgSrc).fadeIn(1000);
	if(event.keyCode == 8 & curVal == ""){
		$(obj).siblings(".le_img").hide();
		$(obj).parent().prev(".le_con").find("input").val("").focus();
	}
	else{
		$(obj).parent().next(".le_con").find("input").focus();
	}
	//console.log(curVal);	
}
function focusBox(obj){
	$(obj).siblings("input").val("").focus();
}
$(function() {
	var curLine = curRow = lastLine = lastRow = 1;
	var add_num = 0;
	var inputBox = "<div class='le_con'><input type='text' maxlength='1' onKeyup='loadImg(this,event)' /><img src='' class='le_img' width='50' height='50' onclick='focusBox(this)' /></div>";
	$( "#resizable" ).resizable({
		grid: 67,
		containment: "#container",
		resize: function(event,ui){
			var $uiSize = ui.size,
				$num_w = Math.floor($uiSize.width/67),
				$num_h = Math.floor($uiSize.height/67),
				diff_w = $num_w - 1,
				diff_h = $num_h - 1,
				cur_w = 67*$num_w + 2*diff_w,
				cur_h = 67*$num_h + 2*diff_h;
			add_num = $num_w*$num_h - lastLine*lastRow;
			curLine = $num_w;
			curRow = $num_h;
			ui.element.css({"width":cur_w+"px","height":cur_h+"px"});
			if(add_num < 0){
				var temCo = $("#le_container").html().replace(/\n/g, "");
				var temAr = temCo.split("</div>");	
				var totalNum = curLine*curRow;
				$("#le_container").empty();
				for(i=0;i<totalNum;i++){
					var addVal = temAr[i] + "</div>";
					//console.log(addVal);
					$("#le_container").append(addVal);	
				}
				$(".le_con").eq(0).find("input").focus();
			}
			
		},
		stop: function(){
			//console.log(temAr);
			if(add_num > 0){
				for(i=0;i<add_num;i++){
					$("#le_container").append(inputBox);
				}
			}
			lastLine = curLine;
			lastRow = curRow;
			//console.log(tempCode);
		}
	});
});