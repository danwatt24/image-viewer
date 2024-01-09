import { useState } from "react";

import { Button, Grid } from "@mui/material";
import AddImage from "../components/AddImage";
import ImagesList from "../components/ImagesList";
import EditImage from "../components/EditImage";
import axios from "axios";

export default function Manager() {
  const [imagesState, setImages] = useState([]);
  const images = [...imagesState];
  const [editImage, setEditing] = useState(null);

  async function saveImage(id, file, fileName, text) {
    const image = { id, file, fileName, text };
    // send image to server
    await saveToServer(image);
    images.push(image);
    setImages(images);
  }

  function deleteImage(id) {
    setImages(images.filter((img) => img.id !== id));
  }

  function saveChanges(image) {
    const idx = images.findIndex((img) => img.id === image.id);
    images[idx] = image;
    setImages(images);
  }

  return (
    <>
      <Grid container rowSpacing={2} padding>
        <Grid item xs={12}>
          <AddImage saveImage={saveImage} />
        </Grid>
        <ImagesList
          images={images}
          onDeleteImage={deleteImage}
          onEditImage={(id) => setEditing(images.find((img) => img.id === id))}
        />
      </Grid>
      <EditImage
        image={editImage}
        closeEditing={() => setEditing()}
        saveChanges={saveChanges}
      />
      <Button variant="text" href="/" sx={{ position: "fixed", bottom: "0px" }}>
        Go To Viewer
      </Button>
    </>
  );
}

async function saveToServer(image) {
  const data = new FormData();
  data.append("image", image.file);
  data.append("text", image.text);
  const response = await axios.post("https://wg8mg3-3000.csb.app/upload", data);
  console.log("blah", response);
}
