"use client";

import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function AudioAmbience() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);

  const toggleAudio = () => {
    if (isPlaying) {
      // Fade out
      if (gainNodeRef.current && audioCtxRef.current) {
        gainNodeRef.current.gain.setTargetAtTime(0, audioCtxRef.current.currentTime, 0.4);
        setTimeout(() => {
          oscillatorsRef.current.forEach((osc) => {
            try {
              osc.stop();
              osc.disconnect();
            } catch {}
          });
          oscillatorsRef.current = [];
          setIsPlaying(false);
        }, 500);
      }
    } else {
      try {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioContextClass();
        audioCtxRef.current = ctx;

        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(0, ctx.currentTime);
        masterGain.gain.setTargetAtTime(0.045, ctx.currentTime, 0.8);
        masterGain.connect(ctx.destination);
        gainNodeRef.current = masterGain;

        // Frequencies evoking warm meditative tanpura drone (D2, A2, D3, F#3)
        const frequencies = [73.42, 110.0, 146.83, 185.0];

        const newOscs = frequencies.map((freq, i) => {
          const osc = ctx.createOscillator();
          const filter = ctx.createBiquadFilter();

          osc.type = i % 2 === 0 ? "sine" : "triangle";
          osc.frequency.setValueAtTime(freq, ctx.currentTime);

          // Subtle LFO drift for breath-like motion
          const lfo = ctx.createOscillator();
          const lfoGain = ctx.createGain();
          lfo.frequency.setValueAtTime(0.12 + i * 0.04, ctx.currentTime);
          lfoGain.gain.setValueAtTime(1.2, ctx.currentTime);
          lfo.connect(lfoGain);
          lfoGain.connect(osc.frequency);
          lfo.start();

          filter.type = "lowpass";
          filter.frequency.setValueAtTime(450, ctx.currentTime);

          osc.connect(filter);
          filter.connect(masterGain);
          osc.start();
          return osc;
        });

        oscillatorsRef.current = newOscs;
        setIsPlaying(true);
      } catch (e) {
        console.warn("Web Audio not permitted or initialized yet", e);
      }
    }
  };

  useEffect(() => {
    return () => {
      if (audioCtxRef.current && audioCtxRef.current.state !== "closed") {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <button
      onClick={toggleAudio}
      data-cursor="SOUND"
      className="fixed bottom-6 right-6 z-[990] flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#141212]/85 backdrop-blur-md border border-[#c5a059]/25 text-[#fbf9f5] hover:border-[#c5a059] transition-all duration-300 text-[10px] tracking-[0.25em] font-modern uppercase shadow-xl group"
      aria-label={isPlaying ? "Mute fashion film atmosphere" : "Play fashion film atmosphere"}
    >
      <span className="relative flex h-2 w-2">
        {isPlaying && (
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c5a059] opacity-75" />
        )}
        <span
          className={`relative inline-flex rounded-full h-2 w-2 ${
            isPlaying ? "bg-[#c5a059]" : "bg-white/30"
          }`}
        />
      </span>
      {isPlaying ? (
        <Volume2 className="w-3.5 h-3.5 text-[#c5a059]" />
      ) : (
        <VolumeX className="w-3.5 h-3.5 text-white/50" />
      )}
      <span className="hidden sm:inline text-white/80 group-hover:text-white">
        {isPlaying ? "SOUND ON" : "AMBIENCE"}
      </span>
    </button>
  );
}
