//* functions for the grids selection and coloring
let gridCells = document.querySelectorAll(".grid-cell");
let subGridMap = document.querySelectorAll(".sub-grid-map");
let gridCellsAndSubMaps = document.querySelectorAll(
  ".sub-grid-map, .grid-cell"
);
let mouseDown = false;

console.log(gridCellsAndSubMaps);

document.onmousedown = () => {
  mouseDown = true;
  console.log(mouseDown);
};
document.onmouseup = () => {
  mouseDown = false;
  console.log(mouseDown);
};

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
      console.log(drop);
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
  //*  console.log(event.target);

  });
  //* END OF Mouse pressed down in grid cell

  //* START OF Mouse pressed down in grid cell
  cell.addEventListener("mouseup", (event) => {
 //*console.log("something here later on")
  });
  //* END OF Mouse pressed down in grid cell
});
//* END OF looping through grid cells
