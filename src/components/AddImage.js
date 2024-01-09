import { Box, Button, Grid, TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useRef, useState } from "react";

export default function AddImage({
  saveImage,
  imageData,
  disableImageSelection,
  cancellable,
}) {
  const { id, file: dFile, fileName: dFileName, text: dText } = imageData || {};
  const inputFileRef = useRef();
  const [image, setImage] = useState(dFile || "");
  const [fileName, setFileName] = useState(dFileName || "");
  const [text, setText] = useState(dText || "");
  const [saving, setSaving] = useState(false);

  function previewImage(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    e.target.value = null;
    setImage(file);
    setFileName(file.name);
  }

  async function addImage() {
    if (!saveImage) return;
    setSaving(true);
    await saveImage(id || Date.now(), image, fileName, text);
    setImage("");
    setFileName("");
    setText("");
    setSaving(false);
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <Box
          sx={{ width: "100%", height: "100%", border: "1px solid white" }}
          onClick={() => !disableImageSelection && inputFileRef.current.click()}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <img
            src={image && URL.createObjectURL(image)}
            alt=""
            style={{ maxWidth: "100%", maxHeight: "100%" }}
          />
        </Box>
        <input
          type="file"
          ref={inputFileRef}
          onChange={previewImage}
          accept="image/*"
          hidden
        />
      </Grid>
      <Grid container spacing={2} item xs={8}>
        <Grid item xs={12}>
          <TextField
            size="small"
            label="File Name"
            fullWidth
            InputLabelProps={{ shrink: true }}
            InputProps={{ readOnly: true }}
            value={fileName}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            size="small"
            label="Image text"
            fullWidth
            InputLabelProps={{ shrink: true }}
            multiline
            minRows={5}
            maxRows={5}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <LoadingButton
            loading={saving}
            variant="contained"
            onClick={addImage}
            disabled={!image || !text}
          >
            Save
          </LoadingButton>
          {cancellable && (
            <Button
              variant="contained"
              onClick={cancellable}
              sx={{ marginLeft: 1 }}
            >
              Cancel
            </Button>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}
