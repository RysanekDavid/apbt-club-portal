import React from "react";
import { Controller, Control, UseFormWatch } from "react-hook-form";
import { Grid, Typography } from "@mui/material";
import CloudinaryUpload from "../../../../components/CloudinaryUpload/CloudinaryUpload";
import { EventFormData } from "../EventForm";

interface EventImageUploadProps {
  control: Control<EventFormData>;
  watch: UseFormWatch<EventFormData>;
  onUploadComplete: (url: string, fileName: string) => void;
}

const EventImageUpload: React.FC<EventImageUploadProps> = ({
  control,
  watch,
  onUploadComplete,
}) => {
  return (
    <Grid item xs={12}>
      <Typography variant="subtitle1" gutterBottom>
        Obrázek
      </Typography>
      <Controller
        name="imageUrl"
        control={control}
        render={({ field }) => (
          <CloudinaryUpload
            folder="events"
            onUploadComplete={onUploadComplete}
            acceptedFileTypes="image/*"
            label="Obrázek akce"
            existingUrl={field.value}
            existingFileName={watch("imageName")} // Watch imageName for display
          />
        )}
      />
    </Grid>
  );
};

export default EventImageUpload;
