export async function enviarArquivos(files) {
    const formData = new FormData();

    for (let file of files) {
        formData.append("arquivo", file);
    }

    // Simulação de envio - substitua pela URL real do seu backend
    /*  const response = await fetch("http://localhost:3000/upload", {
    method: "POST",
    body: formData
  });

  if (!response.ok) {
    throw new Error("Erro ao enviar arquivos.");
  } */

    return {};
}
