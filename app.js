angular.module('myApp', [])
.controller('calcController', function($scope){
	$scope.variables = {};
	$scope.variables = {
		tx: 600,
		ty: 600,
		glx: 300,
		gly: 300,
		th: 19,
		rv: 240
	}
})
.directive('calc', function($document){
	    return {
			restrict: 'A',
			link: function(scope, element){
				//Canvas settings
				var canvas = element[0];
				canvas.height = 800;
				canvas.width  = 1200;

				var ctx = canvas.getContext('2d');
				
				var clearCanvas = function(){
					ctx.clearRect(0, 0, canvas.width, canvas.height);
				};

				var drawCanvas = function(){
					ctx.strokeRect(0, 0, canvas.width, canvas.height);
					
					var ox = 100;
					var oy = 50;
					var rn = rv + th;
					var px = tx - glx - rn;
					var py = ty - gly - rn;
					var zazor = 2;
					var okr = Math.round ( Math.PI * rn / 2 + px + py - zazor * 2 );
					var horda = Math.round ( Math.sqrt ( Math.pow ( tx - glx - th - zazor, 2 ) + Math.pow ( ty - gly - th - zazor, 2 ) ) );
					var cx = Math.sqrt ( Math.pow ( rv, 2 ) / 2 ) + px - zazor;
					var cy = Math.sqrt ( Math.pow ( rv, 2 ) / 2 ) + py - zazor;
					var cxs = tx - glx - th - zazor - cx;
					var cys = ty - gly - th - zazor - cy;
					var c1 = Math.round ( Math.sqrt ( Math.pow ( cx, 2 ) + Math.pow ( cys, 2 ) ) );
					var c2 = Math.round ( Math.sqrt ( Math.pow ( cy, 2 ) + Math.pow ( cxs, 2 ) ) );
					ctx.imageSmoothingEnabled = false;
					//Otrisovka tumbi
					ctx.beginPath ( );
					ctx.moveTo ( ox, oy );
					ctx.lineTo ( ox + tx, oy );
					ctx.lineTo ( ox + tx, oy + gly );
					ctx.lineTo ( ox + tx - px, oy + gly );
					ctx.arc(ox + glx + rn, oy + gly + rn, rn, Math.PI*1.5, Math.PI, true);
					ctx.lineTo ( ox + glx, oy + ty );
					ctx.lineTo ( ox, oy+ ty);
					ctx.lineTo ( ox, oy );
					ctx.stroke();
					
					//Otrisovka fasada
					// ctx.beginPath ( );
					// ctx.moveTo ( ox + glx, oy + ty - zazor );
					// ctx.lineTo ( ox + glx + th, oy + ty - zazor);
					// ctx.lineTo ( ox + glx + th, oy + ty - py);
					// ctx.arc(ox + glx + rn, oy + gly + rn, rn, 0, Math.PI/2, true);
					// ctx.lineTo ( ox + tx - zazor, oy + gly + th);
					// ctx.lineTo ( ox + tx - zazor, oy + gly );
					// ctx.lineTo ( ox + tx - px, oy + gly );
					// ctx.arc(ox + glx + rn, oy + gly + rn, rn, Math.PI/2, 0, false);
					// ctx.lineTo ( ox + glx, oy + ty - zazor );
					// ctx.stroke();
					
					//Razmeri
					ctx.font = "15px Tahoma";
					ctx.fillText("Фасад: Hx" + okr + "x" + th + ", R" + rv, ox * 2 + tx + th, oy + 20);
					ctx.fillText("Хорда: " + horda, ox * 2 + tx + th, oy + 20 * 2);
					ctx.fillText("До центра по ширине: " + c1, ox * 2 + tx + th, oy + 20 * 3);
					ctx.fillText("До центра по высоте: " + c2, ox * 2 + tx + th, oy + 20 * 4);
					//ctx.fillText("Цоколь: Hx" + tokr + " R" + truetrv , ox * 2 + tx + th, oy + 20 * 3);
				};

				scope.$watchCollection('variables', function(variables){
					if (variables) {
						tx = parseInt(variables.tx);
						ty = parseInt(variables.ty);
						th = parseInt(variables.th);
						rv = parseInt(variables.rv);
						glx = parseInt(variables.glx);
						gly = parseInt(variables.gly);
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

