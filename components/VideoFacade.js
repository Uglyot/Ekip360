"use client";

import { useState } from "react";

const videoId = "kMWxBpM-MSA";

export default function VideoFacade() {
  const [isPlaying, setIsPlaying] = useState(false);

  if (isPlaying) {
    return (
      <iframe
        id="VideoMain"
        name="VideoMain"
        width="100%"
        height="506"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1&showinfo=0&rel=0&loop=1`}
        title="Ekip 360 sanal tur tanıtım videosu"
        frameBorder="0"
        allow="autoplay; encrypted-media; picture-in-picture"
        allowFullScreen
      />
    );
  }

  return (
    <button
      type="button"
      className="VideoFacade"
      onClick={() => setIsPlaying(true)}
      aria-label="Tanıtım videosunu oynat"
    >
      <img
        src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
        alt="Ekip 360 sanal tur tanıtım videosu"
        loading="lazy"
        width="480"
        height="360"
      />
      <span className="VideoFacadePlay" aria-hidden="true" />
    </button>
  );
}
