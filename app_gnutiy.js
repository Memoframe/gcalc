angular.module('myApp', [])
.controller('calcController', function($scope){
	$scope.variables = {};
	$scope.variables = {
		tx: 300,
		ty: 350,
		th: 19,
		rv: 281,
		H: 713
	}
})
.directive('calc', function($document){
	    return {
			restrict: 'A',
			link: function(scope, element){
				//Canvas settings
				var canvas = element[0];
				canvas.height = 800;
				canvas.width  = 1000;

				var ctx = canvas.getContext('2d');
				
				var clearCanvas = function(){
					ctx.clearRect(0, 0, canvas.width, canvas.height);
				};

				var drawCanvas = function(){
					//ctx.strokeRect(0, 0, canvas.width, canvas.height);
					
					//Nachalo koordinat
					var ox = 60;
					var oy = 50;
					
					//Peremennie fasada
					var zazor = 2;
					
					if ( ( ty - tx - zazor ) > 0 ) {
					   var falsh = ty - tx
					} else {
					   var falsh = 0
					}
					

					var rn = rv + th;		//Radius naruzhniy
					var px = tx - rv;		//Pryamoy uchastok po shirine
					var py = ty - rv - falsh;		//Pryamoy uchastok po visote		
					var crx = tx - rv;		//Tsentr okruzhnosti po osi X
					var cry = ty - rv;		//Tsentr okruzhnosti po osi Y
					var okr = Math.round ( ( rn * Math.PI / 2) + px + py - zazor * 2 );	//Dlinna okruzhnosti
					var horda = Math.round ( Math.sqrt ( ( tx - zazor ) * ( tx - zazor ) + ( ty - falsh - zazor ) * ( ty - falsh - zazor ) ) ); //Horda
					var c = Math.round ( Math.sqrt ( Math.pow ( Math.sqrt ( ( Math.pow ( rv, 2 ) ) / 2 ) + px - zazor, 2 ) + Math.pow ( tx - Math.sqrt ( ( Math.pow ( rv, 2 ) ) / 2 ) - px , 2 ) ) ); //Ot kraya do tsentra
					
					//Peremennie tsokolya
					var ttx = tx - 37; //37 - utaplivanie tsokolya
					var tty = ty - 37;
					var trv = rv - 37;
					if (trv > (203+247)/2 && trv < (247+263)/2) {
					var truetrv = 247
					}
					else if( trv < 203){
					var truetrv = 203
					}
					else if( trv > 203 && trv < (203+247)/2 ){
					var truetrv = 203
					}
					else if( trv > (247+263)/2 && trv < (283 + 263)/2 ){
					var truetrv = 263
					}
					else if (  trv > (263+283)/2 && trv < (283 +300)/2 ){
					var truretrv = 283
					}
					else  if(trv > (283+300)/2){
					var truetrv = 300
					}
					else{
				   var truetrv = trv
					};

					var trn = trv + th;
					var truetrn = truetrv + th;
					var tokr = Math.round ( truetrn * Math.PI / 2 ) + ( ttx - truetrv ) + ( tty - truetrv );	//Dlinna okruzhnosti tsokolya
					var thorda = Math.round ( Math.sqrt ( Math.pow ( tx - 37, 2 ) + Math.pow ( ty - 37, 2 ) ) ) ;
					
					var k = Math.sqrt ( Math.pow(truetrv, 2) / 2);
					var kx = k + tx - truetrv - 37;
					var ky = k + ty - truetrv - 37;
					var kxx = truetrv - k;
					var kyy = truetrv - k;
					
					if ( truetrv > ttx || truetrv > tty ){
					var tcx = "?"
					var tcy = "?"
					}
					else{
					var tcx = Math.round(Math.sqrt(Math.pow (kx, 2) + Math.pow (kyy, 2)));
					var tcy = Math.round(Math.sqrt(Math.pow (ky, 2) + Math.pow (kxx, 2)));
					}
					
					
					if (ttx - truetrv < 0 || tty - truetrv < 0){
					// var tpx = 0;
					// var tpy = 0;
					}
					else {
					var tpx = ttx - truetrv;
					var tpy = tty - truetrv;
					}
					var tcrx = ttx - truetrv;
					var tcry = tty - truetrv;
					
					//Otrisovka tsokolya
					ctx.beginPath();
					ctx.moveTo(ox + ttx, oy);
					ctx.lineTo(ox + ttx, oy + tpy);
					ctx.arc(ox + tcrx, oy + tcry, truetrv, 0, Math.PI/2, false);
					ctx.lineTo(ox, oy + tty);
					ctx.lineTo(ox, oy + tty + th);
					ctx.lineTo(ox + tpx, oy + tty + th);
					ctx.arc(ox + tcrx, oy + tcry, truetrn, Math.PI/2, 0, true);
					ctx.lineTo(ox + ttx + th, oy);
					ctx.lineTo(ox + ttx, oy);
					ctx.lineWidth=2;
					ctx.stroke();
					ctx.fillStyle="grey"; // color
					ctx.fill();				
					ctx.clearRect(0, 0, ox, canvas.height);
					ctx.clearRect(0, 0, canvas.width, oy);
					
					//Otrisovka fasada
					ctx.beginPath();
					ctx.moveTo(ox + tx, oy + falsh);
					ctx.lineTo(ox + tx, oy + falsh + py);
					ctx.arc(ox + crx, oy + cry, rv, 0, Math.PI/2, false);
					ctx.lineTo(ox, oy + ty);
					ctx.lineTo(ox, oy + ty + th);
					ctx.lineTo(ox + px, oy + ty + th);
					ctx.arc(ox + crx, oy + cry, rn, Math.PI/2, 0, true);
					ctx.lineTo(ox + tx + th, oy + falsh);
					ctx.lineTo(ox + tx, oy + falsh);
					ctx.lineWidth=2;
					ctx.stroke();
					ctx.fillStyle="brown"; // color
					ctx.fill();
					
					// Otrisovka falshpaneli
					if ( falsh > 3 ) {
					ctx.beginPath();
					ctx.moveTo(ox + tx, oy);
					ctx.lineTo(ox + tx, oy + falsh);
					ctx.lineTo(ox + tx + th, oy + falsh);
					ctx.lineTo(ox + tx + th, oy);
					ctx.lineTo(ox + tx, oy);
					ctx.lineWidth=2;
					ctx.stroke();
					ctx.fillStyle="black"; // color
					ctx.fill();  
					} else {}
					
					//Otrisovka petli
					ctx.beginPath();
					ctx.moveTo(ox + tx - 10, oy + ty - rv - py+ 5);
					ctx.lineTo(ox + tx + 13, oy + ty - rv - py + 5);
					ctx.lineTo(ox + tx + 13, oy + ty - rv - py + 5 + 35 );
					ctx.lineTo(ox + tx - 10, oy + ty - rv - py + 5 + 35 );
					ctx.lineTo(ox + tx - 10, oy + ty - rv - py + 5 );
					ctx.fillStyle = "white";
					ctx.fill();
					
					//Otrisovka tumbi
					ctx.beginPath();
					ctx.moveTo(ox + tx, oy);
					ctx.lineTo(ox, oy);
					ctx.lineTo(ox, oy + ty);
					ctx.lineTo(ox + 18, oy + ty); // 18 - Tolshina DSP
					ctx.lineTo(ox + 18, oy + 18);
					ctx.lineTo(ox + tx, oy + 18);
					ctx.lineTo(ox + tx, oy);
					ctx.lineWidth=2;
					ctx.stroke();
					ctx.fillStyle="brown"; // color
					//ctx.fill();
								

					
					//Razmery
					ctx.font = "12px Tahoma";
					ctx.lineWidth=1;
					ctx.fillStyle="black"; // color
					ctx.fillText("Фасад: " + H + "x"+ okr + "x" + th + ", R" + rv, ox * 2 + tx + th, oy + 20);
					ctx.fillText("Хорда торец-торец: " + horda, ox * 2 + tx + th, oy + 20 * 2)
					ctx.fillText("Хорда центр-торец: " + c, ox * 2 + tx + th, oy + 20 * 3)
					if ((falsh - zazor) > 0){
					ctx.fillText("Фальш: " + H + "x"+ (falsh - zazor), ox * 2 + tx + th, oy + 20 * 5)}
					else {
					ctx.fillText("Фальш: - ", ox * 2 + tx + th, oy + 20 * 5);
					}
					ctx.fillText("Цоколь: " + H + "x" + tokr + ", R" + truetrv , ox * 2 + tx + th, oy + 20 * 7);
					ctx.fillText("Хорда торец-торец: " + thorda, ox * 2 + tx + th, oy + 20 * 8)
					ctx.fillText("Хорда центр-торец: " + tcx + ", " + tcy, ox * 2 + tx + th, oy + 20 * 9)
					
					//Razmery vynos
					ctx.beginPath();
					ctx.lineWidth=1;
					ctx.moveTo ( ox, oy + ty + 0.5 );
					ctx.lineTo ( ox - 20 - 0.5, oy + ty + 0.5 );
					ctx.lineTo ( ox - 20 - 0.5, oy - 0.5 );
					ctx.lineTo ( ox - 0.5, oy - 0.5 );
					ctx.lineTo ( ox - 0.5, oy - 20 - 0.5 );
					ctx.lineTo ( ox + tx + 0.5, oy - 20 - 0.5 );
					ctx.lineTo ( ox + tx + 0.5, oy );
					ctx.stroke (); //gabarity tumby
					
					ctx.beginPath();
					ctx.moveTo ( ox + tx, oy + falsh );
					ctx.lineTo ( ox + tx - 28, oy + falsh - 28 );
					ctx.lineTo ( ox - 28, oy+ ty - 28 );
					ctx.lineTo ( ox, oy+ ty );
					ctx.lineWidth=1;
					ctx.stroke (); //horda fasad
					
					ctx.beginPath();
					ctx.moveTo ( ox + tx - 37, oy );
					ctx.lineTo ( ox + tx - 37 - 28, oy - 28 );
					ctx.lineTo ( ox - 28, oy+ ty - 37 - 28 );
					ctx.lineTo ( ox, oy+ ty - 37 );
					ctx.lineWidth=1;
					ctx.stroke (); //horda tsokol
					
					ctx.font = "12px Tahoma";
					ctx.fillStyle="black"; // color
					ctx.lineWidth=1;
					ctx.fillText ( tx, ox + tx/2, oy - 22 );
					ctx.fillText ( ty, ox - 45, oy + ty / 2 );
					// ctx.clearRect ( ox + tx / 2 - 28 - 35, oy + ty - tx / 2 - 28 - 20, 100, 30 );
					ctx.fillText ( horda + "(" + c +")" + " R" + rv, ox + tx / 2 - 28, oy + ty - tx / 2 - 28);
					ctx.fillText ( thorda + "(" + tcx +", " + tcy +")" + " R" + truetrv, ox + tx / 2 - 28 - 100, oy + ty - tx / 2 - 28 - 30);
				};

				scope.$watchCollection('variables', function(variables){
					if (variables) {
						if (variables.tx < 203 || variables.ty < 203 || variables.rv < 203 || variables.ty < variables.tx || variables.th < 9 || variables.rv>variables.tx ){
						tx = 300;
						ty = 300;
						rv = 300;
						th = 19;
						H = 713;
						}
						else {
						tx = parseInt(variables.tx);
						ty = parseInt(variables.ty);
						th = parseInt(variables.th);
						H = parseInt(variables.H);
							if(variables.rv<203){
							rv = 203;
							}
							else if(variables.rv > tx){
							rv = parseInt(variables.tx);
							}
							else {
							rv = parseInt(variables.rv);
							};
						};
						
					}

					clearCanvas();
					drawCanvas();
				});

				drawCanvas();
			},
			scope: {
				"variables" : "=variables"
			}
		}
	})
;

