const inputfile = document.querySelector(".file-input"),
imageframe=document.querySelector(".preview-img img"),
inputbutton=document.querySelector(".choose-img"),
filters=document.querySelectorAll(".filter input"),
reset=document.querySelector(".reset-filter"),
filteralert1 = document.querySelector(".slider1 input"),
filteralert2 = document.querySelector(".slider2 input"),
filteralert3 = document.querySelector(".slider3 input"),
filteralert4 = document.querySelector(".slider4 input"),
filtersindex1=document.querySelector(".filter-info1 .value"),
filtersindex2=document.querySelector(".filter-info2 .value"),
filtersindex3=document.querySelector(".filter-info3 .value"),
filtersindex4=document.querySelector(".filter-info4 .value"),
filtertype=document.querySelector(".filter-info .gs");
save=document.querySelector(".save-img");

  let gs="0" ,blur="0" ,huerotate="0" ,sepia="0",gsval,blurval,huerotateval,sepiaval;

  const loadImage = () =>{
    let file = inputfile.files[0];
    imageframe.src=URL.createObjectURL(file);
    imageframe.addEventListener("load", () => {
      document.querySelector(".container").classList.remove("disable");
    });
  }

  let targetimage,inputrange;
   targetimage = document.getElementById("targetimage");
   inputrange = document.querySelectorAll(".slider1");
  for(let i=0; i<=inputrange.length-1; i++ ){
      inputrange[i].addEventListener('input', editimage);
  }
   targetimage = document.getElementById("targetimage");
   inputrange = document.querySelectorAll(".slider2");
  for(let i=0; i<=inputrange.length-1; i++ ){
      inputrange[i].addEventListener('input', editimage);
  }
   targetimage = document.getElementById("targetimage");
   inputrange = document.querySelectorAll(".slider3");
  for(let i=0; i<=inputrange.length-1; i++ ){
      inputrange[i].addEventListener('input', editimage);
  }
   targetimage = document.getElementById("targetimage");
   inputrange = document.querySelectorAll(".slider4");
  for(let i=0; i<=inputrange.length-1; i++ ){
      inputrange[i].addEventListener('input', editimage);
  }

  function editimage(){
     gs = document.getElementById('gs');
     blur = document.getElementById('blur');
     huerotate = document.getElementById('hue-rotate');
     sepia = document.getElementById('sepia');

     gsval = gs.value;
     blurval = blur.value;
     huerotateval = huerotate.value;
     sepiaval = sepia.value;
     targetimage.style.transform=`rotate(${huerotateval}deg)`
     targetimage.style.filter = 'grayscale('+gsval+'%) blur('+blurval+'px)  sepia('+sepiaval+'%)';

  }


const  resetFilter = () =>{

   gs = document.getElementById('gs');
   blur = document.getElementById('blur');
   huerotate = document.getElementById('hue-rotate');
   sepia = document.getElementById('sepia');

   gsval = gs.value=0;
   blurval = blur.value=0;
   huerotateval = huerotate.value=0;
   sepiaval = sepia.value=0;
   filtersindex1.innerText="0%";
   filtersindex2.innerText="0px";
   filtersindex3.innerText="0%";
   filtersindex4.innerText="0%";
   targetimage.style.filter = 'grayscale('+gsval+'%) blur('+blurval+'px)  sepia('+sepiaval+'%)';
}

const saveImage = () => {
  const printscreen =document.createElement("canvas");
  const current=printscreen.getContext("2d");
  printscreen.width = imageframe.naturalWidth;
  printscreen.height = imageframe.naturalHeight;
  // current.translate(printscreen.width/2, printscreen.height/2);
  // current.transform=`rotate(${huerotateval}deg)`;
  // current.filter ='grayscale('+gsval+'%) blur('+blurval+'px)  sepia('+sepiaval+'%)';
  current.drawImage(imageframe, -printscreen.width/2, printscreen.height/2, printscreen.width,  printscreen.height);

  const thread=document.createElement("a");
  thread.download ="image.jpg";
  thread.href = printscreen.toDataURL();
  thread.click();
}

const updateFilter = () => {
  filtersindex1.innerText=`${filteralert1.value}%`;
}
const updateFilter1 = () => {
  filtersindex2.innerText=`${filteralert2.value}px`;
}
const updateFilter2 = () => {
  filtersindex3.innerText=`${filteralert3.value}deg`;
}
const updateFilter3 = () => {
  filtersindex4.innerText=`${filteralert4.value}%`;
}

  filteralert1.addEventListener("input",updateFilter);
  filteralert2.addEventListener("input",updateFilter1);
  filteralert3.addEventListener("input",updateFilter2);
  filteralert4.addEventListener("input",updateFilter3);

  save.addEventListener("click",saveImage);
  inputfile.addEventListener("change",loadImage);
  reset.addEventListener("click",resetFilter);
  inputbutton.addEventListener("click", () => inputfile.click());
