export function validarArquivos(files) {

  const MAX_ARQUIVOS = 10;
  const MAX_BYTES = 10 * 1024 * 1024;
  const TIPOS_PERMITIDOS = [
    "image/jpeg",
    "image/png",
    "application/pdf"
  ];

  if (files.length === 0) {
    throw new Error("Selecione ao menos um arquivo.");
  }

  if (files.length > MAX_ARQUIVOS) {
    throw new Error(`Máximo de ${MAX_ARQUIVOS} arquivos permitido.`);
  }

  for (let file of files) {

    if (!TIPOS_PERMITIDOS.includes(file.type)) {
      throw new Error(`Tipo não permitido: ${file.name}`);
    }

    if (file.size > MAX_BYTES) {
      throw new Error(`Arquivo excede 10MB: ${file.name}`);
    }
  }

  return Array.from(files);
}