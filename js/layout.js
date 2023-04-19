var LNList=[];

function push_long_list(rand=true){
	let new_int=new TLNum({});
	let n_id=`span_id_${LNList.length}`;
	let generated_html
	if(rand){
	generated_html=`<span id="${n_id}" class="ln_container">${new_int.setRand()} [${new_int.digits().join(", ")}]</span>`;
    }
	else{generated_html=`<span id="${n_id}" class="ln_container">${new_int.str()} [${new_int.digits().join(", ")}]</span>`;}
	
	$("#num_list").append($(generated_html));
	new_int.layout=$(`#${n_id}`);
	
	LNList.push(new_int);
}



function my_first_function(e){
	console.log(arguments); 
	console.log(event.target);
}

var hideme = function(e){
	$(e.target).hide();
}

function rndClick(clickEvent) {
	var buffer=new TBuffer(2,3);
	console.log(`init TBuffer with(2,3):${buffer.valData}`);
	buffer.pushProd(3,4);
	console.log(`pushProd TBuffer with (3,4): ${buffer.valData}`);
	var r=buffer.rem();
	console.log(`rem TBuffer
                         :    ${r}
	                    valData:${buffer.valData}`
			   );
}

$(document).ready(function(){
		$("#rndLInt").on('click',() => {push_long_list()})
		$("#newLInt").on('click',() => {push_long_list(false)})
	    $("addLInt").on('click',() => {push_long_list()})
});
