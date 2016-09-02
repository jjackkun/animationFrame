window.requestAnimationFrame = function() {
	return window.requestAnimationFrame ||
	window.webkitRequestAnimationFrame ||
	window.mozRequestAnimationFrame ||
	window.msRequestAnimationFrame ||
	window.oRequestAnimationFrame ||
	function(f) {
		window.setTimeout(f,1e3/60);
	}
}();

var animationFrame = (function () {
	function animationFrame ( fps , callback ) {
		var fps = fps
		,	now
		,	then = Date.now()
		,	interval = 1000 / fps
		,	self = this
		,	delta
		;

		this.loop = true ; 
		this.counter = 0 ;

		var first = then ; 

		function draw () {
			if ( !self.loop ) return ; 
			window.requestAnimationFrame( draw ) ; 

			now = Date.now() ; 
			delta = now - then ; 
			if ( delta > interval ) {
				var time_el
				,	obj = {} ; 
				then = now - ( delta % interval ) ; 
				time_el = ( then - first ) / 1000 ; 

				/*
				counter : f. frame 이 도는 속도 
				timer : 현재 프레임이 실행된 시간 
				fps : 현재 프레임이 지속되는 속도
				*/
				obj = {
					counter : self.counter + 'f' , 
					time_el :  Math.ceil(time_el) + 's' , 
					fps : Math.ceil( self.counter / time_el ) + ' fps'
				} ; 

				callback( obj ) ; 
				++ self.counter ;  
			}
		}
		draw() ; 
	}

	animationFrame.prototype = {
		stop : function () {
			this.loop = false ; 
			this.counter = 0 ; 
		}
	} ; 

	return animationFrame ; 
}()) ; 

/*
function draw () {
	loop = new animationFrame( 30 , function ( timer ) {
		// console.log( timer ) ; 
	}) ; 
}
draw() ; 
*/