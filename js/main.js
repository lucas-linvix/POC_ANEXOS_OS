import { validarArquivos } from "./fileHandler.js";
import { enviarArquivos } from "./uploader.js";

const fileInput = document.getElementById("fileInput");
const preview = document.getElementById("previewContainer");
const btnEnviar = document.getElementById("btnEnviar");

let arquivosSelecionados = [];

fileInput.addEventListener("change", (e) => {
    try {
        const novosArquivos = validarArquivos(e.target.files);

        arquivosSelecionados = [...arquivosSelecionados, ...novosArquivos];

        renderizarPreview(arquivosSelecionados);
        

        fileInput.value = ""; // importante para permitir selecionar o mesmo arquivo novamente
    } catch (err) {
        alert(err.message);
        fileInput.value = "";
    }
});

btnEnviar.addEventListener("click", async () => {
    try {
        const resposta = await enviarArquivos(arquivosSelecionados);
        alert("Arquivos enviados com sucesso!");
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
            const objectURL = URL.createObjectURL(file);

            img.src = objectURL;

            img.onload = () => {
                URL.revokeObjectURL(objectURL);
            };

            div.appendChild(img);
        } else {
            div.innerHTML += `<p> ${file.name}</p>`;
        }

        preview.appendChild(div);
    }
}
