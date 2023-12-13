let projects = document.querySelectorAll('.project');
projects.forEach(project =>{
  let randomNum = Math.floor(Math.random() * 20) - 10;
  project.style.rotate = `${randomNum}deg`;
})

//

let bodyHeight = document.documentElement.scrollHeight;
console.log(bodyHeight);
let viewportHeight = document.documentElement.clientHeight;
console.log(viewportHeight);
let scrollTop = document.documentElement.scrollTop;
let percentage = scrollTop / (bodyHeight - viewportHeight);

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