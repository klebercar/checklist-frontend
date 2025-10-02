import { useEffect, useRef, useState } from 'react';
export default function CameraCapture({onCapture}:{onCapture:(f:File)=>void}){
  const videoRef=useRef<HTMLVideoElement>(null); const canvasRef=useRef<HTMLCanvasElement>(null); const [stream,setStream]=useState<MediaStream|null>(null);
  useEffect(()=>{ (async()=>{ try{ const s=await navigator.mediaDevices.getUserMedia({video:true}); setStream(s); if(videoRef.current){ videoRef.current.srcObject=s; await (videoRef.current as HTMLVideoElement).play(); } }catch{} })(); return ()=>{ stream?.getTracks().forEach(t=>t.stop()); } },[]);
  const capture=()=>{ const v=videoRef.current!, c=canvasRef.current!; if(!v) return; c.width=v.videoWidth; c.height=v.videoHeight; const ctx=c.getContext('2d')!; ctx.drawImage(v,0,0); c.toBlob(b=>{ if(b) onCapture(new File([b],`photo-${Date.now()}.jpg`,{type:'image/jpeg'})); },'image/jpeg',0.9); };
  return (
    <div className="space-y-2">
      <video ref={videoRef} className="w-full rounded" playsInline/>
      <canvas ref={canvasRef} className="hidden"/>
      <div className="flex gap-2">
        <button className="btn-outline" onClick={capture}>Capturar da câmera</button>
        <input type="file" accept="image/*" onChange={e=>{ const f=e.target.files?.[0]; if(f) onCapture(f); }} />
      </div>
    </div>
  );
}
