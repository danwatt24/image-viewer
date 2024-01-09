import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import AddImage from "./AddImage";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4
};

export default function EditImage({ image, closeEditing, saveChanges }) {
  const open = !!image;
  image = { ...image };

  function save(id, file, fileName, text) {
    saveChanges({ id, file, fileName, text });
    closeEditing();
  }

  return (
    <Modal open={open} onClose={closeEditing}>
      <Box sx={style}>
        <AddImage
          saveImage={save}
          imageData={image}
          disableImageSelection
          cancellable={closeEditing}
        />
      </Box>
    </Modal>
  );
}
