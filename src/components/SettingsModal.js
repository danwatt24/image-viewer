import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button, TextField } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4
};

let _refreshRate = localStorage.getItem("refreshRate") || "5";

export default function SettingsModal({ open, onClose }) {
  const [refreshRate, setRefreshRate] = useState(_refreshRate);
  const handleSave = () => {
    localStorage.setItem("refreshRate", (_refreshRate = refreshRate));
    onClose();
  };

  const onRefreshRateChange = (e) => setRefreshRate(e.target.value);

  return (
    <>
      <Modal open={open} onClose={onClose}>
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Settings
          </Typography>

          <div style={{ minHeight: "80px" }}>
            <TextField
              inputProps={{ min: "1" }}
              label="Refresh Rate (in seconds)"
              variant="standard"
              onChange={onRefreshRateChange}
              value={refreshRate}
              type="number"
              helperText={_refreshRate !== refreshRate && "Unsaved Changes"}
            />
          </div>
          <Button variant="text" href="/manager">
            Go To Manager
          </Button>
          <div style={{ float: "right" }}>
            <Button variant="contained" onClick={handleSave}>
              Save
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
}
