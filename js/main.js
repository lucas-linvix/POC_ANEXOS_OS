import { validarArquivos } from "./fileHandler.js";
import { enviarArquivos } from "./uploader.js";

const fileInput = document.getElementById("fileInput");
const preview = document.getElementById("previewContainer");
const btnEnviar = document.getElementById("btnEnviar");

let arquivosSelecionados = [];

fileInput.addEventListener("change", (e) => {

  try {
    arquivosSelecionados = validarArquivos(e.target.files);
    renderizarPreview(arquivosSelecionados);
  } catch (err) {
    alert(err.message);
    fileInput.value = "";
    preview.innerHTML = "";
  }
});

btnEnviar.addEventListener("click", async () => {

  try {
    const resposta = await enviarArquivos(arquivosSelecionados);
    alert("Arquivos enviados com sucesso!");
    console.log(resposta);
  } catch (err) {
    alert(err.message);
  }
});

function renderizarPreview(files) {

  preview.innerHTML = "";

  for (let file of files) {

    const div = document.createElement("div");
    div.classList.add("preview-item");

    if (file.type.startsWith("image")) {
      const img = document.createElement("img");
      img.src = URL.createObjectURL(file);
      div.appendChild(img);
    } else {
      div.innerHTML += `<p>📄 ${file.name}</p>`;
    }

    preview.appendChild(div);
  }
}