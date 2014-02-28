// console.log(a);

(function(){
    var BUFFER_SIZE = 128,
        SAMPLE_RATE = 8000,
        AMP = 0.8,
        STRETCH = 8,
        WINDOW = 2.5,
        DURATION = 20,
        windowsize = 32; //WINDOW * SAMPLE_RATE but power-of-two and >= 16

    var M = Math,
        P = M.PI,
        C = M.cos,
        S = M.sin;

 
    var real = [], //len - windowsize
        imag = [], //
        spectrum = [], //len - windowsize / 2 + 1
        reverse = [],
        i = windowsize;

    while (i--) {
        real[i]=imag[i]=spectrum[i] = 0;
    }


    //hardcode this shizz
    // set up the bit reversing table
    reverse[0] = 0;
    for (var limit = 1, bit = windowsize / 2; limit < windowsize; limit <<= 1, bit >>= 1) {
        for (var i = 0; i < limit; i++) {
            reverse[i + ~~limit] = reverse[i] + ~~bit;
        }
    }

    // performs an in-place fft on the data in the real and imag arrays
    //TODO: has no optimizations applied...
    function fft(real, imag) {
        for (var halfSize = 1; halfSize < real.length; halfSize *= 2) {
             var k = -P/halfSize;
            // phase shift step
             var phaseShiftStepR = C(k);
             var phaseShiftStepI = S(k);

            // current phase shift
            var currentPhaseShiftR = 1.0;
            var currentPhaseShiftI = 0.0;
            for (var fftStep = 0; fftStep < halfSize; fftStep++) {
                for (var i = fftStep; i < real.length; i += 2 * halfSize) {
                    var off = i + halfSize;
                    var tr = (currentPhaseShiftR * real[off])
                            - (currentPhaseShiftI * imag[off]);
                    var ti = (currentPhaseShiftR * imag[off])
                            + (currentPhaseShiftI * real[off]);
                    real[off] = real[i] - tr;
                    imag[off] = imag[i] - ti;
                    real[i] += tr;
                    imag[i] += ti;
                }
                var tmpR = currentPhaseShiftR;
                currentPhaseShiftR = (tmpR * phaseShiftStepR)
                        - (currentPhaseShiftI * phaseShiftStepI);
                currentPhaseShiftI = (tmpR * phaseShiftStepI)
                        + (currentPhaseShiftI * phaseShiftStepR);
            }
        }
    }


    function synth(t) {
        return ((t*(5+((t>>11)&5)))&(t>>7))
    }


    function stretch(S) {
        
        return S;
    }

    for(var t=0, S='RIFF_oO_WAVEfmt '+atob('EAAAAAEAAQBAHwAAQB8AAAEACAA')+'data'; ++t<1e5; )
            S += String.fromCharCode(  stretch(synth(t))&255  );


    (S=new Audio( 'data:audio/wav;base64,'+btoa(S) ));
    // S.loop=true;S.volume=0.5;S.play();
})();


//var softSynth = function(f){for(var t=0,S='RIFF_oO_WAVEfmt '+atob('EAAAAAEAAQBAHwAAQB8AAAEACAA')+'data';++t<3e5;)S+=String.fromCharCode(eval(f));return S};
    
//new Audio( 'data:audio/wav;base64,'+btoa( softSynth( '(t<<3)*[8/9,1,9/8,6/5,4/3,3/2,0][[0xd2d2c8,0xce4088,0xca32c8,0x8e4009][t>>14&3]>>(0x3dbe4688>>((t>>10&15)>9?18:t>>10&15)*3&7)*3&7]&255' ) ) ).play();







// "rgb(255,255,255)"
// "hsl(0,0%,"+~~(c*100)+"%)"

// c.fillStyle="hsl(0,0%,"+c+"%)";
// c.fillStyle="#"+Array(4).join( (r).toString(16) );

// var s = 256,
//     H = ~~(Math.random()*360),
//     L = ~~(Math.random()*100)/2,
//     t = 0;

// var mouseX, mouseY;

// window.onmousemove = function(e) {
//     mouseX = e.clientX;
//     mouseY = e.clientY;
//     // console.log(mouseX);
// }

// function R() {
//     var i = s*s,
//         x, y;
    
//     t+=0.01;

//     //resize our canvas back to normal
//     //This also clears the canvas
//     a.style.cssText=a.width=a.height=s;
    
    
//     requestAnimationFrame(R);
// };
// R();
// requestAnimationFrame(R);

//Dot shader effect
// while (i--) {
//     var y = i%s,
//         x = ~~(i/s),
//         u = x/s;

//     var n = 8*u;
//     c.fillStyle = "hsl("+H+",50%,"+L+"%)";
//     c.fillRect(x*4,y*4,n,n);
// }