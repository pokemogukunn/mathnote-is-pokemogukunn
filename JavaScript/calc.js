$(function() {
 
	$("body").append('<div id="flash_msg" style="position:fixed;z-index:1000;display:none;opacity: 0;padding:5px 10px;background:#333;color:#fff;font-size:1.2em;white-space: nowrap;border-radius: 5px;-moz-border-radius: 5px;-webkit-border-radius: 5px;"></div>');
 
	//$("main").append('<div id="area_msg"></div>');
	//msg_err( '数字を入力してください', $('#calc_num2') );
 
	$("#btn_clear").click(function(){
		msg_hide();
		$(".js_clear_val").val("");
		$(".js_clear_val").removeClass("bg_ans");
		$(".js_clear_bg").removeClass("bg_ans");
		$(".js_clear_html").html("");
		$(".js_clear_display").css('display', 'none');
		$(".js_clear_remove").remove();
		$(".js_clear_oi").html('<span class="oi_i oi_i_last"></span>');
		
		$('.js_clear_dd').each(function() {
			$(this).html( $(this).attr('data-init') );
		});
		return false;
	});
 
	$(".copy_url").click(function(){
 
		window.getSelection().removeAllRanges();
		var $copyP = $('#area_mainfooter_url');
		var copyPNode = $copyP[0];
		var range = document.createRange();
		range.selectNode(copyPNode);
		window.getSelection().addRange(range);
		document.execCommand('copy');
      
		flash_msg('<i class="fas fa-check-circle"></i> コピーしました');
 
		window.getSelection().removeAllRanges();
 
		return false;
	});
 
	$("#area_toc_list a").click(function(){
		var id = $(this).attr('href');
		var t = $(id).offset();
		var s = t.top - 10;
		$('html, body').animate({scrollTop:s}, 500);
		return false;
	});
 
 
});	
 
function msg_err(msg){
	$('#area_msg').html(msg);
	//var p = ele.position();
	//var t = p.top - $('#area_msg').outerHeight() - 10;
	//var l = p.left;
	//$('#area_msg').css({'top':t, 'left':l, 'display':'inline-block'});
	
	$('#area_msg').css({'display':'inline-block'});
}
 
function msg_hide(msg, ele){
	$('#area_msg').css('display', 'none');
}
 
function flash_msg(msg){
	$('#flash_msg')
		.html(msg)
		.css({"display":"block","opacity":"1","top":"50%","left":"50%","transform":"translateY(-50%)","transform":"translateX(-50%)"})
		//.offset({top:(pst.top - 45), left:pst.left})
		.animate({"opacity":"0"},2000,'',function(){
			$('#flash_msg').css({"display":"none"});
		});
 
}
 
function check_num(val){
	if(val.match(/^[-]?\d*(\.\d+)?$/) == null){
		return false;
	}
	return true;
}
 
function compareFunc(a, b) {
  return a - b;
}
 
//絶対値を返す
function getAbs(val) {
  return val < 0 ? -val : val;
}
 
//少数の桁数を返す
function getDigitCount(value) {
	var list = (value + '').split('.'), result = 0;
	if (list[1] !== undefined && list[1].length > 0) {
		result = list[1].length;
	}
	return result;
}
 
 
//小数点をずらす
//引数１：変更する数値
//引数２：ずらす数（正は左、負は右にずらす）
function shiftDigit(value1, value2) {
 
	var mns = false;
	if(value1 < 0){
		mns = true;
		value1 = getAbs(value1);
	}
	
	var list = (value1 + '').split('.'), result = 0, zero = '0';
 
	if (list[1] == undefined) { list[1] = ''; }
 
	if(value2 == 0){
		if(mns){ value1 = -(value1); }
		return value1; 
	}else if(value2 > 0){
		var len = list[0].length;
		if(value2 < len){
			e = len - value2;
			result = list[0].substr(0, e) + "." + list[0].substr(e) + list[1]; 
		}else{
			e = value2 - len;
			result = "0." + zero.repeat(e) + list[0] + list[1]; 
		}
	}else if(value2 < 0){
		var len = list[1].length;
		var v2p = -(value2);
		if(v2p < len){
			result = list[0] + list[1].substr(0, v2p) + "." + list[1].substr(v2p); 
		}else{
			e = v2p - len;
			result = list[0] + list[1] + zero.repeat(e); 
		}
	}
 
	if ( result.indexOf('.') != -1) {
		l = result.length;
		for(var i=0;i<=l;i++){
			if(result.substr(-1,1) == '0'){
				result = result.slice(0, -1);
			}else if(result.substr(-1,1) == '.'){
				result = result.slice(0, -1);
				break;
			}else{
				break;
			}
		}
	}
 
	l = result.length;
	for(var i=0;i<=l;i++){
		if(result.substr(0,1) == '0'){
			if(result.substr(1,1) == '.'){
				break;
			}else{
				result = result.slice(1);
			}
		}else if(result.substr(0,1) == '.'){
			break;
		}else{
			break;
		}
	}
 
	if(mns){ result = -(result); }
	
    return result;
}
 
 
//少数計算(flg=1:加算, 2:減算, 3:乗算, 4:除算, 5:除算の整数, 6:除算の余り)
function calcDigit(value_a, value_b, flg) {
 
	var di = getDigitCount(value_a);
	var di2 = getDigitCount(value_b);
	var result = 0;
	
	if(di < di2){ di = di2; }
 
	value1 = shiftDigit(value_a, -(di));
	value2 = shiftDigit(value_b, -(di));
 
	if(flg == 1){
		result = Number(value1) + Number(value2);
		result = shiftDigit(result, di);
	}else if(flg == 2){
		result = Number(value1) - Number(value2);
		result = shiftDigit(result, di);
	}else if(flg == 3){
		result = value1 * value2;
		result = shiftDigit(result, (di*2));
	}else if(flg == 4){
		result = value1 / value2;
	}else if(flg == 5){
		result = value1 / value2;
		result = Math.trunc(result);
	}else if(flg == 6){
		result = value1 % value2;
		result = shiftDigit(result, di);
		result = Number(result);
	}
	
	return result;
}
 
//べき乗計算
function calcPow(value1, value2) {
	var di = getDigitCount(value1);
	var result = 0;
 
	value1 = shiftDigit(value1, -(di));
 
	result = Number(value1) ** Number(value2);
	result = shiftDigit(result, (di * Number(value2)));
 
	return result;
}
 
//四捨五入（小数桁指定）
function calcRound(value1, value2) {
	var round = shiftDigit(value1, -(value2));
	round = Math.round(round);
	round = shiftDigit(round, value2);
	return round;
	
	//return Math.round(value1 * (10 ** value2)) / (10 ** value2);
}
 
//切り上げ（小数桁指定）
function calcCeil(value1, value2) {
	var round = shiftDigit(value1, -(value2));
	round = Math.ceil(round);
	round = shiftDigit(round, value2);
	return round;
}
 
//切り捨て（小数桁指定）
function calcFloor(value1, value2) {
	var round = shiftDigit(value1, -(value2));
	round = Math.floor(round);
	round = shiftDigit(round, value2);
	return round;
}
 
 
//最大公約数
function calcGcd(value1, value2) {
 
	var gcd = 0;
 
	var ary1 = [];
	for(i=value1;i>0;i--){
		a = calcDigit(value1, i, 6);
		if(a==0){ ary1.push(Number(i)); }
	}
			
	for(i=value2;i>0;i--){
		a = calcDigit(value2, i, 6);
		if(a==0){ 
			if(ary1.indexOf(Number(i)) >= 0){
				gcd = i;
				break;		
			}
		}
	}
 
	return gcd;
}
 
//最大公約数（高速化）
function calcGcd2(value1, value2) {
 
	var gcd = 0;
 
	var num1 = value1;
	var num2 = value2;
	if(num2 < num1){
		num1 = value2;
		num2 = value1;
	}
 
	for(i=num1;i>0;i--){
		a = calcDigit(num1, i, 6);
		a2 = calcDigit(num2, i, 6);
		if(a==0 && a2==0){ 
			gcd = i;
			break;
		}
	}
	return gcd;
}
 
 
 
//最大公約数（複数対応）
function calcGcdMul(ary) {
 
	var min = 0;
	ary.forEach((v) => {
		if(min==0 || v < min){
			min = v;
		}
	});
		
	var ary2 = ary.filter(n => n !== min);
	
	var flg;
	for(var j=min;j>=1;j--){
		if(calcDigit(min, j, 6)==0){
			flg = true;
			ary2.some(function(v){
				if(calcDigit(v, j, 6)!=0){
					flg = false;
					return true;
				}
			});
			if(flg){ break; }
		}
	}
 
	return j;
}
 
 
//最小公倍数
function calcLcm(value1, value2) {
	var b = value1;
	var s = value2;
	if(value2 > value1){
		b = value2;
		s = value1;
	}
	
	var i = 1;
	var j = 1;
	for(;;){
		i2 = calcDigit(s, i, 3);
		j2 = calcDigit(b, j, 3);
		if(i2 == j2){
			break;
		}else if(i2 > j2){
			for(;;){
				j++;
				j2 = calcDigit(b, j, 3);
				if(i2 == j2){
					break;
				}else if(j2 > i2){
					i++;
					break;
				}
			}
		}else{
			i++;
		}
	}
	return i2;
}
 
 
//最小公倍数（複数対応）
function calcLcmMul(ary) {
 
	var max = 0;
	var ary2 = [];
	ary.forEach((v) => {
		if(v > max){ max = v; }
		ary2.push(v);
	});
 
	ary2 = ary2.filter(n => n !== max);
	var lcm = max;
	var flg;
	for(;;){
		flg = true;
		ary2.forEach((value) => {
			if(calcDigit(lcm, value, 6)!=0){
				flg = false;
				return false;
			}
		});
		if(flg){ break; }
		lcm = Number(lcm) + Number(max);	
	}
 
	return lcm;
 
}
 
 
