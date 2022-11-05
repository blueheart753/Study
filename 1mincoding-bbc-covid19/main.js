(() => {

    const stepElems = document.querySelectorAll('.step');
    const graphicElems = document.querySelectorAll('.graphic-item');
    let currentItem = graphicElems[0];

    const io = new IntersectionObserver((entries, observer)=>{
        console.log(entries[0].target.dataset.index*1);
    });
    
    for (let i = 0; i < stepElems.length; i++) {
        io.observe(stepElems[i]);
        stepElems[i].dataset.index = i;
        graphicElems[i].dataset.index = i;
    }

    function activate(){
        currentItem.classList.add('visible');
    }

    function inactivate(){
        currentItem.classList.remove('visible');
    }

    window.addEventListener('scroll', () => {
        let step;
        let boundingRect;
        for (let i = 0; i < stepElems.length; i++) {
            step = stepElems[i];
            boundingRect = step.getBoundingClientRect();

            if (boundingRect.top < window.innerHeight * 0.8 && boundingRect.top > window.innerHeight * 0.1) {
                graphicElems[step.dataset.index].classList.add('visible');
                
                inactivate();
                currentItem = graphicElems[step.dataset.index];
                activate();
            }
        };
    });
    activate();

})(); //<== 전역변수를 믹기 위한 지역변수 함수