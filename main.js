let projects = document.querySelectorAll('.project');
projects.forEach(project =>{
  let randomNum = Math.floor(Math.random() * 20) - 10;
  project.style.rotate = `${randomNum}deg`;
})

// let pageProj = document.querySelector('.page-projects');
// pageProj.scrollLeft = 200;

//

let bodyHeight = document.documentElement.scrollHeight;
console.log(bodyHeight);
let scrollTop = document.documentElement.scrollTop;
let viewportHeight = document.documentElement.clientHeight;
// console.log(viewportHeight);
let percentage = scrollTop / (bodyHeight - viewportHeight);



let movable1 = [...document.querySelectorAll('.movable1')];
let projects1 = [...document.querySelectorAll('.project')];
let floatable1 = [...document.querySelectorAll('.floatable')];


// -------------
// let movable1 = document.querySelectorAll('.movable1');
// moveRotate(movable1, 4, 10, 10, 'ease');

window.addEventListener('scroll', ()=>{
  scrollTop = document.documentElement.scrollTop;
  // console.log(scrollTop);
  // console.log(scrollTop / (bodyHeight - viewportHeight));
  percentage = scrollTop / (viewportHeight) * 100;
  console.log(percentage);

  // changeStyle(10, 70, '.port-text-1', 'left', 120, 0, '','%');
  // changeStyle(32, 70, '.port-text-2', 'left', -120, 0, '', '%');
  changeStyle(10, 88, '.text-skew-1', 'transform', 120, 0, 'skew(-5deg) translate(','%, 0)');
  changeStyle(35, 88, '.text-skew-2', 'transform', -120, 0, 'skew(-2deg) translate(','%, 0)');
  // gradAbove(10, 80, 'portfolio-text', 'left', 120, -10);
  
  // -------------
  if(percentage > 90){
    movable1.forEach(elem => elem.style.display = 'none');
    floatable1.forEach(elem => elem.style.display = 'block');
  }
  else if(percentage < 90){
    movable1.forEach(elem => elem.style.display = 'block');
    floatable1.forEach(elem => elem.style.display = 'none');
  }

  if(percentage > 180){
    projects1.forEach(elem => elem.style.display = 'none');
  }
  else if(percentage < 180){
    projects1.forEach(elem => elem.style.display = 'block');
  }
})

function changeStyle(firstPerc, secPerc, element, attr, firstVal, secVal, preVal='', postVal=''){
  let newElement = document.querySelector(element);
  if(percentage > firstPerc && percentage < secPerc){
    newElement.style[attr] = preVal + (firstVal - ((firstVal - secVal) * ((percentage - firstPerc) / (secPerc - firstPerc)))) + postVal;
    // percentage between 10 & 80 1st= 20% 2nd = 40% let's say we are at 20%
    // (percentage - firstPerc / (secPerc - firstPerc)) * the difference between secVal and firstVal
    // (20-10) / 70 = 1/7 * (firstVal - secVal)
    // console.log(newElement.style[attr]);
  }
  else if(percentage > secPerc){
    newElement.style[attr] = preVal + secVal + postVal;
  }
}

// Page project container


// https://www.youtube.com/watch?v=C9EWifQ5xqA

const sliders = document.querySelectorAll('.page-project-container');
let isDown = false;
let startX, scrollLeft;

/*
mousedown
mouseleave
mouseup
mousemove

since it works fine on mobile etc we can do mouse instead of pointer
*/

sliders.forEach(slider =>{

  slider.addEventListener('mousedown', (e)=>{
    // console.log(slider.offsetWidth);
    e.preventDefault();
    isDown = true;
    
    startX = e.pageX - slider.offsetLeft; // remove any margin if there is any
    scrollLeft = slider.scrollLeft; // get the scrolling value
    // srollRight = slider.scrollRight;
    slider.style.cursor = 'grabbing';
  });

  slider.addEventListener('mouseleave', ()=>{
    // this is when mouse leaves the page-project-container div which I don't think I'd use
  });

  slider.addEventListener('mouseup', ()=>{
    isDown = false;
    slider.style.cursor = 'pointer';
  });

  slider.addEventListener('mousemove', (e)=>{
    if(!isDown) return; // if you move mouse in slider without clicking it will return
    e.preventDefault(); // will stop selecting any text inside the div
    const currentX = e.pageX - slider.offsetLeft;
    const differenceRight = startX - currentX;
    const differenceLeft = (startX - currentX) * -1;

    slider.scrollLeft = scrollLeft - differenceLeft;
    
    // if(slider.classList[1] == "page-proj-right"){
    //   slider.scrollLeft = scrollLeft - differenceLeft;
    // }
    // else if(slider.classList[1] == "page-proj-left"){
    //   slider.scrollLeft = scrollLeft - differenceLeft;
    // }
  });

})



// ---------------



function moveRotate(arrayVal, duration, translateVal, rotateVal, ease){
  arrayVal.forEach(val => {
    setInterval(()=>{
      val.style.transition = `translate ${duration}s ${ease}, rotate ${duration}s ${ease}`;
      val.style.translate = `${Math.trunc(Math.random()*(translateVal+1) - (translateVal/2))}% ${Math.trunc(Math.random()*(translateVal+1) - (translateVal/2))}%`;
      val.style.rotate = `${Math.trunc(Math.random()*(rotateVal+1) - (rotateVal / 2))}deg`;
      // Math.random() * 10 // is random number between 0 and 10 
    }, `${duration}000`);
  });
}

// moveRotate(movable1, 4, 10, 10, 'ease');

// console.log(`${Math.trunc(Math.random()*(10+1) - (10/2))}% ${Math.trunc(Math.random()*(10+1) - (10 /2))}%`);

function moveRotateKeyframes(elemName, numOfSteps, duration, translateVal, rotateVal, ease, classListNum){
  let element;
  if(!Array.isArray(elemName)){
    singleElement = document.querySelector(`.${elemName}`);
    element = [singleElement]
    console.log(element);
  }
  else{
    element = elemName;
  }
  element.forEach(elem =>{
    let style = document.querySelector('style');
    let perc = 100 / numOfSteps;
    style.innerHTML += `@keyframes ${elem.classList[classListNum]}{\n`;
    style.innerHTML += `0%{transform: translate(0, 0) rotate(0deg)}\n`;
    for(let i = 1; i < numOfSteps; i++){
      // console.log("i");
      style.innerHTML += `${i*perc}%{transform: translate(${Math.trunc(Math.random()*(translateVal+1) - (translateVal/2))}%, ${Math.trunc(Math.random()*(translateVal+1) - (translateVal/2))}%) rotate(${Math.trunc(Math.random()*(rotateVal+1) - (rotateVal / 2))}deg)}\n`;
    }
    style.innerHTML += `100%{transform: translate(0, 0) rotate(0deg)}\n}\n`;
    elem.style.animation = `${elem.classList[classListNum]} ${duration}s ${ease} infinite forwards`
  })  
}


// let movable1 = [...document.querySelectorAll('.movable1')];
// let projects1 = [...document.querySelectorAll('.project')];
// let floatable1 = [...document.querySelectorAll('.floatable')];
// They already exist at the top

moveRotateKeyframes(movable1, 10, 50, 20, 20, 'ease', 0);
moveRotateKeyframes(projects1, 10, 80, 10, 20, 'ease', 1);
moveRotateKeyframes(floatable1, 10, 50, 10, 10, 'ease', 0);

// (elemName, numOfSteps, duration, translateVal, rotateVal, ease, classListNum)
