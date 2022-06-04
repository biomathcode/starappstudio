// upload image preview ✅

// add image to canvas ✅

// re-render the canvas when image changes ✅

// Color Select ✅

// download the canvas with the logo

// downlaod function

var files;

var selectedItem;

const selectItemsData = [
  {
    name: "black",
    color: "#2d2926",
    highlightColor: "#eee",
    fileUrl: "asserts/pink_umbrella.png",
  },
  {
    name: "purple",
    color: "#003057",
    highlightColor: "#79a5c8",
    fileUrl: "asserts/pink_umbrella.png",
  },
  {
    name: "yellow",
    color: "#ffc107",
    highlightColor: "#fefbee",
    fileUrl: "asserts/yellow_umbrella.png",
  },
  {
    name: "blue",
    color: "#00a2e0",
    highlightColor: "#e7f6fd",
    fileUrl: "asserts/blue_umbrella.png",
  },
  {
    name: "pink",
    color: "#d0016f",
    highlightColor: "#ffb6c1",
    fileUrl: "asserts/pink_umbrella.png",
  },
  {
    name: "orange",
    color: "#e77723",
    highlightColor: "#ffdb9a",
    fileUrl: "asserts/pink_umbrella.png",
  },
  {
    name: "grey",
    color: "#707372",
    highlightColor: "#cccccc",
    fileUrl: "asserts/pink_umbrella.png",
  },
  {
    name: "red",
    color: "#ef333f",
    highlightColor: "#ff9a9a",
    fileUrl: "asserts/pink_umbrella.png",
  },
];

const selectColor = document.getElementById("select");

selectItemsData.map((el) => {
  const item = document.createElement("li");

  item.style.width = "15px";
  item.style.height = "15px";
  item.style.borderRadius = "50%";
  item.style.backgroundColor = el.color;
  item.style.cursor = "pointer";
  item.style.border = `3px solid ${el.highlightColor}`;

  item.addEventListener("click", () => {
    const container = document.getElementById("container");
    const loader = document.getElementById("loader");
    const canvas = document.getElementById("viewport");
    loader.style.display = "block";
    loader.style.fill = el.color;

    selectedItem = el;

    container.style.background = el.highlightColor;

    canvas.style.display = "none";

    setTimeout(() => {
      console.log("this is the files data", files);
      make_base(el.fileUrl, files);
      canvas.style.animation = "fadeIn 1s ease-in";
      canvas.style.display = "block";

      loader.style.display = "none";
    }, 2000);
  });
  selectColor.appendChild(item);

  console.log(selectColor);
});

const root = document.querySelector(":root");
const colors = getComputedStyle(root);
var canvas = document.getElementById("viewport");

var context = canvas.getContext("2d");
console.log("this si working css", colors.getPropertyValue("--bg-yellow"));

document.body.style.background = `${colors.getPropertyValue("--bg-yellow")}`;

var download = function () {
  var link = document.createElement("a");
  link.download = "filename.png";
  link.href = document.getElementById("viewport").toDataURL();
  link.click();
};

// loadfunction
var loadFile = function (event) {
  var logo_image = new Image();

  logo_image.src = URL.createObjectURL(event.target.files[0]);
  console.log("this is the object source", logo_image.src);

  if (files === undefined) {
    files = URL.createObjectURL(event.target.files[0]);
    console.log("this is the file", files);
    logo_image.onload = function () {
      context.drawImage(
        logo_image,
        canvas.width / 2 - 22,
        canvas.width / 2 + 70,
        50,
        50
      );
    };
  } else {
    console.log(event.target.files[0]);
    files = URL.createObjectURL(event.target.files[0]);
    make_base(
      selectedItem ? selectedItem?.fileUrl : "asserts/blue_umbrella.png",
      files
    );
  }
};

//loader svg change

// re-render the canvas element

function make_base(src = "asserts/blue_umbrella.png", data) {
  if (data === undefined) {
    var base_image = new Image();

    base_image.width = "100px";

    base_image.height = "100px";

    base_image.src = src;
    console.log("no file data");
    base_image.onload = function () {
      context.drawImage(
        base_image,
        canvas.width / 2 - 150,
        canvas.height / 2 - 150,
        300,
        300
      );
    };
  } else {
    context.clearRect(0, 0, canvas.width, canvas.height);

    console.log("file data is passed ");

    new Promise((res, rej) => {
      var base_image = new Image();

      base_image.width = "100px";

      base_image.height = "100px";
      base_image.src = src;
      base_image.onload = function () {
        console.log("base image is rendered");
        context.drawImage(
          base_image,
          canvas.width / 2 - 150,
          canvas.height / 2 - 150,
          300,
          300
        );
        res("this is resolved");
      };
    }).then(() => {
      var logo_image = new Image();

      logo_image.src = data;

      logo_image.onload = function () {
        console.log("logo is rendered");
        context.drawImage(
          logo_image,
          canvas.width / 2 - 22,
          canvas.width / 2 + 70,
          50,
          50
        );
      };
    });
  }
}

make_base();
