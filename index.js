import avatar from "./public/avatar.png";

// document.getElementById("root").innerHTML = "hello I am world";

const img = document.createElement("img");
img.src = avatar;
img.width = 200;
img.height = 200;

document.getElementById("root").appendChild(img);
