import React from "react";
import { Controller, Control, FieldErrors } from "react-hook-form";
import { Grid, TextField } from "@mui/material";
import { EventFormData } from "../EventForm"; // Assuming EventFormData is exported from EventForm

interface EventBasicInfoProps {
  control: Control<EventFormData>;
  errors: FieldErrors<EventFormData>;
  submitting: boolean;
}

const EventBasicInfo: React.FC<EventBasicInfoProps> = ({
  control,
  errors,
  submitting,
}) => {
  return (
    <Grid item xs={12}>
      <Controller
        name="title"
        control={control}
        rules={{ required: "Název je povinný" }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Název"
            fullWidth
            error={!!errors.title}
            helperText={errors.title?.message}
            disabled={submitting}
          />
        )}
      />
    </Grid>
  );
};

export default EventBasicInfo;
