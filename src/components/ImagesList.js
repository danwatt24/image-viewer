import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Grid, IconButton } from "@mui/material";

export default function ImagesList({ images, onDeleteImage, onEditImage }) {
  return (
    <>
      {images.map((img, idx) => (
        <Grid key={idx} container item xs={3}>
          <Grid container justifyContent="center" item xs={12}>
            <IconButton>
              <img
                src={URL.createObjectURL(img.file)}
                alt=""
                height={150}
                width={150}
              />
            </IconButton>
          </Grid>
          <Grid container justifyContent="center" item xs={12}>
            <IconButton
              aria-label="edit"
              size="large"
              onClick={() => onEditImage(img.id)}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              aria-label="delete"
              size="large"
              onClick={() => onDeleteImage(img.id)}
            >
              <DeleteIcon />
            </IconButton>
          </Grid>
        </Grid>
      ))}
    </>
  );
}
