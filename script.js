const Upload = document.querySelector(".upload-box"),
fileInput = Upload.querySelector("input"),
widthInput = document.querySelector(".width input"),
heightInput = document.querySelector(".height input"),
ratioInput = document.querySelector(".ratio input"),
DownloadImg = document.querySelector(".download-btn"),
QualityInput = document.querySelector(".quality input")
preview = Upload.querySelector("img");

let imgratio;

const loadFile = (e) =>{
    const file = e.target.files[0];
    if(!file)return;
    preview.src = URL.createObjectURL(file);
    preview.addEventListener("load", ()=>{
        widthInput.value = preview.naturalWidth;
        heightInput.value = preview.naturalHeight;
        imgratio = preview.naturalWidth / preview.naturalHeight;
        document.querySelector(".container").classList.add("active");
    });
}

widthInput.addEventListener("keyup", () =>{
    const height = ratioInput.checked ? widthInput.value / imgratio : heightInput.value;
    heightInput.value = Math.floor(height);
});
heightInput.addEventListener("keyup", () =>{
    const width = ratioInput.checked ? heightInput.value / imgratio : widthInput.value;
    widthInput.value = Math.floor(width);
});

const resizeAndDownload = () => {
const canvas = document.createElement("canvas");
const a = document.createElement("a");
const ctx = canvas.getContext("2d");
const imgQuality = QualityInput.checked ? 0.7 : 1.0;

canvas.width = widthInput.value;
canvas.height = heightInput.value;

ctx.drawImage(preview, 0, 0, canvas.width, canvas.height);
a.href = canvas.toDataURL("image/jpeg", imgQuality);
a.download = new Date().getTime;
a.click();

}
DownloadImg.addEventListener("click", resizeAndDownload);



fileInput.addEventListener("change", loadFile);
Upload.addEventListener("click", () => fileInput.click()); 

