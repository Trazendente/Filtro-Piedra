import { bootstrapCameraKit } from "@snap/camera-kit";

// API Token
// Group ID 2aa5e7f8-0284-4a55-94a7-7af387ced334
// Lens Id 1f75380a-c1ad-4137-94fe-4b6b0ea9674b

(async function() {
  const cameraKit = await bootstrapCameraKit({
    apiToken: 'eyJhbGciOiJIUzI1NiIsImtpZCI6IkNhbnZhc1MyU0hNQUNQcm9kIiwidHlwIjoiSldUIn0.eyJhdWQiOiJjYW52YXMtY2FudmFzYXBpIiwiaXNzIjoiY2FudmFzLXMyc3Rva2VuIiwibmJmIjoxNzI1OTk1ODg4LCJzdWIiOiJmZTBlYTZkNS0wNjkyLTQ3MGEtYmVlNi1kNDQ1NDkyY2ZhNzd-U1RBR0lOR34zNTMzYzE1Ny1lZTM1LTRjNGYtYmVjZC0xODgwZGY1NTlmODcifQ.ljYneRMTS0ujT7H6VcPC-3Mw3gAa8zqx4XDzoOLhNv8'
  });

  const liveRenderTarget = document.getElementById('canvas') as HTMLCanvasElement;
  const session = await cameraKit.createSession({ liveRenderTarget });
  const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });

  await session.setSource(mediaStream);
  await session.play();

  const lens = await cameraKit.lensRepository.loadLens(
    '1f75380a-c1ad-4137-94fe-4b6b0ea9674b',
    '2aa5e7f8-0284-4a55-94a7-7af387ced334'
  );
  await session.applyLens(lens);

  // Variables para grabación de video
  let mediaRecorder: MediaRecorder | null = null;
  let recordedChunks: Blob[] = [];

  // Función para capturar foto
  document.getElementById('capturePhoto')!.addEventListener('click', () => {
    const photo = liveRenderTarget.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = photo;
    link.download = `photo_${Date.now()}.png`;
    link.click();
  });

  // Función para iniciar/detener grabación de video
  document.getElementById('startStopRecording')!.addEventListener('click', () => {
    if (!mediaRecorder || mediaRecorder.state === 'inactive') {
      recordedChunks = [];
      mediaRecorder = new MediaRecorder(liveRenderTarget.captureStream()!, { mimeType: 'video/webm' });

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunks.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const videoBlob = new Blob(recordedChunks, { type: 'video/webm' });
        const downloadButton = document.getElementById('downloadVideo')!;
        downloadButton.style.display = 'block';
        downloadButton.onclick = () => {
          const link = document.createElement('a');
          link.href = URL.createObjectURL(videoBlob);
          link.download = `video_${Date.now()}.webm`;
          link.click();
        };
      };

      mediaRecorder.start();
      document.getElementById('startStopRecording')!.innerText = 'Stop Recording';
    } else {
      mediaRecorder.stop();
      document.getElementById('startStopRecording')!.innerText = 'Start Recording';
    }
  });
})();
