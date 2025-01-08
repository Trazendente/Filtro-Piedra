import { bootstrapCameraKit } from "@snap/camera-kit";

// API Token
// Group ID 2aa5e7f8-0284-4a55-94a7-7af387ced334
// Lens Id 1f75380a-c1ad-4137-94fe-4b6b0ea9674b
(async function() {
  const cameraKit = await bootstrapCameraKit({ apiToken: 'eyJhbGciOiJIUzI1NiIsImtpZCI6IkNhbnZhc1MyU0hNQUNQcm9kIiwidHlwIjoiSldUIn0.eyJhdWQiOiJjYW52YXMtY2FudmFzYXBpIiwiaXNzIjoiY2FudmFzLXMyc3Rva2VuIiwibmJmIjoxNzI1OTk1ODg4LCJzdWIiOiJmZTBlYTZkNS0wNjkyLTQ3MGEtYmVlNi1kNDQ1NDkyY2ZhNzd-U1RBR0lOR34zNTMzYzE1Ny1lZTM1LTRjNGYtYmVjZC0xODgwZGY1NTlmODcifQ.ljYneRMTS0ujT7H6VcPC-3Mw3gAa8zqx4XDzoOLhNv8'})
  const liveRenderTarget = document.getElementById('canvas') as HTMLCanvasElement;
  const session = await cameraKit.createSession({ liveRenderTarget });
  const mediaStream = await navigator.mediaDevices.getUserMedia ({ video: true });

  await session.setSource(mediaStream);

  await session.play();

  const lens = await cameraKit.lensRepository.loadLens (
    '1f75380a-c1ad-4137-94fe-4b6b0ea9674b',
    '2aa5e7f8-0284-4a55-94a7-7af387ced334'
  );

  await session.applyLens(lens);
})();