let stream;

export async function iniciarCamera(videoElement, deviceId = null) {
  try {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }

    const constraints = {
      video: deviceId
        ? { deviceId: { exact: deviceId } }
        : { facingMode: { ideal: "environment" } }, // traseira por padrão
      audio: false,
    };

    stream = await navigator.mediaDevices.getUserMedia(constraints);

    videoElement.srcObject = stream;
    videoElement.playsInline = true; // IMPORTANTE para iOS
    await videoElement.play();

  } catch (error) {
    console.error("Erro ao iniciar câmera:", error);
    throw error;
  }
}
export function tirarFoto(videoElement) {
  const canvas = document.createElement("canvas");
  canvas.width = videoElement.videoWidth;
  canvas.height = videoElement.videoHeight;

  const ctx = canvas.getContext("2d");
  ctx.drawImage(videoElement, 0, 0);

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) return reject("Erro ao gerar imagem");
        resolve(
          new File([blob], `foto_${Date.now()}.jpg`, {
            type: "image/jpeg",
          })
        );
      },
      "image/jpeg",
      0.9
    );
  });
}
