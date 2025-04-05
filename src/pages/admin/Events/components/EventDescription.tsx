import React from "react";
import { Controller, Control, FieldErrors } from "react-hook-form";
import { Grid } from "@mui/material";
import RichTextEditor from "../../../../components/Editor/RichTextEditor";
import { EventFormData } from "../EventForm";

interface EventDescriptionProps {
  control: Control<EventFormData>;
  errors: FieldErrors<EventFormData>;
}

const EventDescription: React.FC<EventDescriptionProps> = ({
  control,
  errors,
}) => {
  return (
    <Grid item xs={12}>
      <Controller
        name="description"
        control={control}
        rules={{ required: "Popis je povinný" }}
        render={({ field }) => (
          <RichTextEditor
            label="Popis"
            value={field.value}
            onChange={field.onChange}
            error={errors.description?.message}
          />
        )}
      />
    </Grid>
  );
};

export default EventDescription;
