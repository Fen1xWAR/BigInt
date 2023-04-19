var LNList=[];

function push_long_list(rand=true){
	let new_int=new TLNum({});
	let n_id=`span_id_${LNList.length}`;
	let generated_html
	if(rand){
	generated_html=`<span id="${n_id}" class="ln_container">${new_int.setRand()} [${new_int.digits(rand = true).join(", ")}]</span>`;
    }
	else{generated_html=`<span id="${n_id}" class="ln_container">${new_int.str()} [${new_int.digits(rand = false).join(", ")}]</span>`;}
	
	$("#num_list").append($(generated_html));
	new_int.layout=$(`#${n_id}`);
	
	LNList.push(new_int);
}
function LNNumsSum(){
	let first = LNList[0]
	for ( let i = 1;i<LNList.length;i++) {
		first.add(LNList[i])
	}
	let n_id=`span_id_${LNList.length}`;
	let generated_html
	generated_html=`<span id="${n_id}" class="ln_container">Сумма [${first._digits.join(", ")}]</span>`;
	$("#num_list").append($(generated_html));
}
function getRandomInt(max) {
	return Math.floor(Math.random() * max);
}

// function my_first_function(e){
// 	console.log(arguments);
// 	console.log(event.target);
// }
//
// var hideme = function(e){
// 	$(e.target).hide();
// }

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
	    $("#addLInt").on('click',() => {LNNumsSum()})
});
