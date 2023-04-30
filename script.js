const inputfile = document.querySelector(".file-input"),
imageframe=document.querySelector(".preview-img img"),
inputbutton=document.querySelector(".choose-img"),
filters=document.querySelectorAll(".filter button"),
filteralert = document.querySelector(".slider input"),
filtersindex=document.querySelector(".filter-info .value"),
filtertype=document.querySelector(".filter-info .name"),
Rotate_Image=document.querySelectorAll(".rotate button"),
reset=document.querySelector(".reset-filter"),
save=document.querySelector(".save-img");


let brightness = "100", saturation = "100",inversion = "0", grayscale="0";
let rotate=0, horizontalflipping=1, verticalflipping=1;
const applyFilters = () => {
  imageframe.style.transform = `rotate(${rotate}deg) scale(${horizontalflipping}, ${verticalflipping})`;
  imageframe.style.filter= `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
}

const loadImage = () =>{
  let file = inputfile.files[0];
  imageframe.src=URL.createObjectURL(file);
  imageframe.addEventListener("load", () => {
    reset.click();
    document.querySelector(".container").classList.remove("disable");
  });

}

filters.forEach(option => {
  option.addEventListener("click", () => {
    document.querySelector(".active").classList.remove("active");
    option.classList.add("active");
    filtertype.innerText=option.innerText;

    switch(option.id) {
      case "brightness":
        filteralert.max="200";
        filteralert.value = brightness;
        filtersindex.innerText=`${brightness}%`;
        break;
      case "saturation":
        filteralert.max="200";
        filteralert.value = saturation;
        filtersindex.innerText=`${saturation}%`;
        break;
      case "inversion":
        filteralert.max="100";
        filteralert.value = inversion;
        filtersindex.innerText=`${inversion}%`;
        break;
      case "grayscale":
        filteralert.max="100";
        filteralert.value = grayscale;
        filtersindex.innerText=`${grayscale}%`;
        break;
      default:
    }
  });
});

const updateFilter = () => {
  filtersindex.innerText=`${filteralert.value}%`;
  const filter_selected=document.querySelector(".filter .active");

  switch(filter_selected.id) {
    case "brightness":
      brightness = filteralert.value;
      break;
    case "saturation":
      saturation = filteralert.value;
      break;
    case "inversion":
      inversion = filteralert.value;
      break;
    case "grayscale":
      grayscale = filteralert.value;
      break;
    default:
  }
  applyFilters();
}

Rotate_Image.forEach(option => {
  option.addEventListener("click",()=>{

    switch(option.id) {
      case "left":
        rotate-=90;
        break;
      case "right":
        rotate+=90;
        break;
      case "horizontal":
        horizontalflipping=horizontalflipping === 1 ? -1 : 1;
        break;
      case "vertical":
        verticalflipping=verticalflipping === 1 ? -1 : 1;
        break;
      default:
    }
    applyFilters();
  });
});

const resetFilter =() =>{
   brightness = "100";
   saturation = "100";
   inversion = "0";
   grayscale="0";
   rotate=0;
   horizontalflipping=1;
   verticalflipping=1;
   filters[0].click();
   applyFilters();
}

const saveImage = () => {
  const printscreen =document.createElement("canvas");
  const current=printscreen.getContext("2d");
  printscreen.width = imageframe.naturalWidth;
  printscreen.height = imageframe.naturalHeight;
  if (rotate!==0) {
    current.rotate(rotate*Math.PI / 180);
  }
  current.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
  current.translate(printscreen.width/2, printscreen.height/2);
  current.scale(horizontalflipping, verticalflipping);
  current.drawImage(imageframe, -printscreen.width/2, printscreen.height/2, printscreen.width,  printscreen.height);
  const thread=document.createElement("a");
  thread.download ="image.jpg";
  thread.href = printscreen.toDataURL();
  thread.click();
}

filteralert.addEventListener("input",updateFilter);
reset.addEventListener("click",resetFilter);
save.addEventListener("click",saveImage);
inputfile.addEventListener("change",loadImage);
inputbutton.addEventListener("click", () => inputfile.click());
