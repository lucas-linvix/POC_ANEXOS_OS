export function gerarNomeUnico(nome) {
  const timestamp = Date.now();
  return `${timestamp}_${nome}`;
}

export function validarTipo(file) {
  const permitidos = ["image/jpeg", "image/png", "application/pdf"];
  return permitidos.includes(file.type);
}

export function validarTamanho(file, maxMB = 10) {
  const maxBytes = maxMB * 1024 * 1024;
  return file.size <= maxBytes;
}