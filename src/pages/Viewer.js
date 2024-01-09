import ArrowLeftIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import ArrowRightIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import PlayIcon from "@mui/icons-material/PlayCircleFilledWhiteOutlined";
import StopIcon from "@mui/icons-material/StopCircleOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import { useEffect, useState } from "react";
import { Grid } from "@mui/material";

import img1 from "../imgs/10_11_13.jpg";
import img2 from "../imgs/360_F_75003191_A5NvCvUAsuIBuQ80PaJiaQRDLK3iagqb.jpg";
import img3 from "../imgs/fun slug.jpeg";
import img4 from "../imgs/funny-slug-cartoon-outlined-character-260nw-437079028.webp";

import SettingsModal from "../components/SettingsModal";
import { IconButton } from "@mui/material";

const slides = [
  { image: img1 },
  { image: img2 },
  { image: img3 },
  { image: img4 }
];

const control = {
  fontSize: "3rem",
  color: "#fff"
};

const settings = {
  ...control,
  position: "fixed",
  bottom: "10px",
  right: "10px"
};

let timeout;
export default function Viewer() {
  const [current, setCurrent] = useState(0);
  const [isPlaying, setPlaying] = useState(false);
  const [openSettings, setSettingsOpen] = useState(false);
  const length = slides.length;

  const nextSlide = () => setCurrent(current === length - 1 ? 0 : current + 1);
  const prevSlide = () => setCurrent(current === 0 ? length - 1 : current - 1);
  const togglePlay = (play) => {
    clearTimeout(timeout);
    setPlaying(play);
    const refreshRate = parseInt(localStorage.getItem("refreshRate") || "5");
    if (play) timeout = setTimeout(nextSlide, refreshRate * 1000);
  };
  useEffect(() => {
    if (isPlaying) togglePlay(true);
  });

  return (
    <>
      <div style={{ display: "flex", flexFlow: "column", height: "99vh" }}>
        <div
          style={{
            display: "flex",
            flex: 1,
            overflow: "auto",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <img
            src={slides[current].image}
            alt=""
            style={{ maxWidth: "100%", maxHeight: "100%" }}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <IconButton onClick={prevSlide}>
            <ArrowLeftIcon sx={control} />
          </IconButton>
          {isPlaying && (
            <IconButton onClick={() => togglePlay(false)}>
              <StopIcon sx={control} />
            </IconButton>
          )}
          {!isPlaying && (
            <IconButton onClick={() => togglePlay(true)}>
              <PlayIcon sx={control} />
            </IconButton>
          )}
          <IconButton onClick={nextSlide}>
            <ArrowRightIcon sx={control} />
          </IconButton>
        </div>
      </div>
      <IconButton onClick={() => setSettingsOpen(true)}>
        <SettingsIcon sx={settings} />
      </IconButton>
      <SettingsModal
        open={openSettings}
        onClose={() => setSettingsOpen(false)}
      />
    </>
  );
}
