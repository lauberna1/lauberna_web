import React, { useEffect, useState } from "react";
import { hashtags } from "../data/hashtags";

// Rotador minimalista de hashtags para aportar dinamismo al perfil.
const Hashtag = () => {
  const [text, setText] = useState(hashtags[0]);
  useEffect(() => {
    const interval = setInterval(() => {
      const currentIndex = hashtags.indexOf(text);
      const nextIndex = (currentIndex + 1) % hashtags.length;
      setText(hashtags[nextIndex]);
    }, 1400);

    return () => clearInterval(interval);
  }, [text]);
  return (
    <div style={{ marginTop: "px", fontSize: "20px", fontWeight: 700 }}>
      # {text}
    </div>
  );
};
export default Hashtag;
