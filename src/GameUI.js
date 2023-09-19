//* functions for the grids selection and coloring
let gridCells = document.querySelectorAll(".grid-cell");
let subGridMap = document.querySelectorAll(".sub-grid-map");
let gridCellsAndSubMaps = document.querySelectorAll(
  ".sub-grid-map, .grid-cell"
);
let mouseDown = false;
let chosenNum = "";
let chosenGrid = undefined;
let numHolder = document.querySelectorAll(".num-holder");

const numCoords = {
  1: {x: "76.6px", y: "-64.28px"},
  2: {x: "100px", y: "0"},
  3: {x: "76.6px", y: "64.28px"},
  4: {x: "17.36px", y: "98.48px"},
  5: {x: "-50px", y: "86.6px"},
  6: {x: "-93.97px", y: "34.2px"},
  7: {x: "-93.97px", y: "-34.2px"},
  8: {x: "-50px", y: "-86.6px"},
  9: {x: "17.36px", y: "-98.48px"}
}

//* START OF On Mouse Down (making sure the numbers appear around the chosen grid position)
document.onmousedown = (event) => {
  if (event.target.id != "") {
    chosenGrid = event.target.id;
    mouseDown = true;
    //* console.log(event.target.id);
    let numHolder = document.querySelectorAll(".num-holder");


    numHolder.forEach((e) => {
      document.getElementById(e.id).style.cssText = `
    transform: translateX(${numCoords[e.id].x}) translateY(${numCoords[e.id].y});
    background-color: rgba(250, 250, 250, 255);
    color: rgba(0, 0, 0, 255);
    border: solid black 2px;
    user-select: all;
    pointer-events: all;
    `;
    });
  console.log(document.getElementById(event.target.id).getBoundingClientRect().right);
    document.getElementById("num-center").style.cssText= `
    left: ${(document.getElementById(event.target.id).getBoundingClientRect().x)-12}px;
    top: ${(document.getElementById(event.target.id).getBoundingClientRect().y)-10}px;

    `;

  }
};
//* END OF On Mouse Down (making sure the numbers appear around the chosen grid position)

//* START OF On Mouse Up (making sure the numbers disappear around the chosen grid position, and also see if any number was chosen)
document.onmouseup = (event) => {

    mouseDown = false;
    numHolder.forEach((e) => {
      document.getElementById(e.id).style.cssText = `
    transform: translateX(0px) translateY(0px);
    background-color: rgba(250, 250, 250, 0);
    color: rgba(0, 0, 0, 0);
    border: none;
    user-select: none;
    pointer-events: none;
    `;
    });

    //Add num you chose
    document.getElementById(chosenGrid).innerHTML = `<span>${chosenNum}</span>`
  


  chosenGrid= undefined;
};
//* END OF On Mouse Up (making sure the numbers disappear around the chosen grid position, and also see if any number was chosen)


//* START OF number choice
let nums = document.querySelectorAll(".num-holder")

nums.forEach(e => {

  e.addEventListener('mouseenter', (event)=> {
    if(mouseDown){
      document.getElementById(e.id).style.backgroundColor = "limegreen";
      chosenNum = e.id;
  }
  });
  e.addEventListener('mouseleave', (event)=> {
    if(mouseDown){
      document.getElementById(e.id).style.backgroundColor = "white";
      chosenNum = "";
    }
  });
})
//* END OF number choice



//* removing of all colors if mouse leaves the main grid, and default mouseDown variable
document.querySelector("#grid-map").addEventListener("mouseleave", () => {
  gridCellsAndSubMaps.forEach((element) => {
    element.classList.remove("grid-cell-hover");
    element.classList.remove("rc-grid-hover");
    element.classList.remove("sub-grid-map-hover");
  });
});
//* remove the colors if mouse leaves the grid, and default mouseDown variable

//* START OF looping through sub grids

subGridMap.forEach((subGrid) => {
  subGrid.addEventListener("mouseenter", (event) => {
    if (!mouseDown) {
      let drop = document.querySelector(".sub-grid-map-hover");
      if (drop != null) {
        drop.classList.remove("sub-grid-map-hover");
      } else {
      }
      subGrid.classList.add("sub-grid-map-hover");
    }
  });
});
//* END OF looping through sub grids

//* START OF looping through grid cells
gridCells.forEach((cell) => {
  //* START OF Mouse Enter gridcell
  cell.addEventListener("mouseenter", (event) => {
    if (!mouseDown) {
      //* Remove color from the row and columns from before
      let drops = document.querySelectorAll(".rc-grid-hover");

      drops.forEach((drop) => {
        drop.classList.remove("rc-grid-hover");
      });
      gridCells.forEach((_cell) => {
        _cell.classList.remove("grid-cell-hover");
      });

      //* coloring the row and column connected to the cell
      let RMarkings = document.querySelectorAll(`.r${event.target.id[0]}`);
      let CMarkings = document.querySelectorAll(`.c${event.target.id[1]}`);

      for (let i = 0; i < RMarkings.length; i++) {
        RMarkings[i].classList.add("rc-grid-hover");
        CMarkings[i].classList.add("rc-grid-hover");
      }
      cell.classList.remove("rc-grid-hover");
      cell.classList.add("grid-cell-hover");
    }
  });
  //* END OF Mouse Enter gridcell

  //* START OF Mouse pressed down in grid cell
  cell.addEventListener("mousedown", (event) => {
    //*Mouse down event here later on
  });
  //* END OF Mouse pressed down in grid cell

  //* START OF Mouse pressed down in grid cell
  cell.addEventListener("mouseup", (event) => {
    document
      .querySelector(".num-holder")
      .classList.remove("num-holder-disabled");
  });
  //* END OF Mouse pressed down in grid cell
});
//* END OF looping through grid cells
