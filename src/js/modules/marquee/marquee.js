// export const home = () => {

//     marquee('.js-marquee', 0.3)
// }

export function init() {
    // if (selector == undefined) return
    
    const marqueeArray = document.querySelectorAll('.js-marquee')
    
    let i = 0;
    let speed = 0.2
    
    marqueeArray?.forEach(marquee => {
        
        const clone = marquee.innerHTML;
        const firstElement = marquee.children[0];
    
        marquee.insertAdjacentHTML('beforeend', clone);
        marquee.insertAdjacentHTML('beforeend', clone);
      
        setInterval(function () {
          firstElement.style.marginLeft = `-${i}px`;
          if (i > firstElement.clientWidth) {
            i = 0;
          }
          i = i + speed;
        }, 0);
    })

}