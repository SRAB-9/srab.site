window.onload = function () {
    Particles.init({
        selector: '.background',
        maxParticles: 100,
        speed: 1,
        color: '#aa32bd',
        connectParticles: true,
        minDistance: 140,
        responsive: [
            {
                breakpoint:768,
                options: {
                    maxParticles: 200,
                    color: '#ffffff',
                    connectParticles: false
                }
            }, {
                breakpoint:425,
                options: {
                    maxParticles:100,
                    connectParticles:true
                }
            }, {
                breakpoint:320,
                options: {
                    maxParticles:0
                }
            }
        ]

    })
}
