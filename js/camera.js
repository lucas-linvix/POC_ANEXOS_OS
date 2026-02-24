let stream;

export async function iniciarCamera(videoElement) {
  try {
    // Se já existir stream, encerra antes
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }

    stream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: { ideal: "user" },
      },
      audio: false,
    });

    videoElement.srcObject = stream;
  } catch (error) {
    console.error("Erro ao iniciar câmera:", error);
  }
}

export function tirarFoto(videoElement) {
  const canvas = document.createElement("canvas");
  canvas.width = videoElement.videoWidth;
  canvas.height = videoElement.videoHeight;

  const ctx = canvas.getContext("2d");
  ctx.drawImage(videoElement, 0, 0);

  return new Promise((resolve) => {
    canvas.toBlob(
      (blob) => {
        resolve(
          new File([blob], `foto_${Date.now()}.jpg`, {
            type: "image/jpeg",
          }),
        );
      },
      "image/jpeg",
      0.8,
    );
  });
}
