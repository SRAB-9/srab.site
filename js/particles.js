window.onload = function () {
    Particles.init({
        selector: '.background',
        maxParticles: 100,
        speed: 1,
        color: '#8ACAFF',
        connectParticles: true,
        minDistance: 140,
        responsive: [
            {
                breakpoint:768,
                options: {
                    maxParticles: 200,
                    color: '#9400D3',
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
