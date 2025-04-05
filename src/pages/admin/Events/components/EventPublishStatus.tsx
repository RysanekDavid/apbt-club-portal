import React from "react";
import { Controller, Control } from "react-hook-form";
import { Grid, Divider, FormControlLabel, Switch } from "@mui/material";
import { EventFormData } from "../EventForm";
import * as styles from "../EventForm.styles"; // Import styles if needed for Divider

interface EventPublishStatusProps {
  control: Control<EventFormData>;
  submitting: boolean;
}

const EventPublishStatus: React.FC<EventPublishStatusProps> = ({
  control,
  submitting,
}) => {
  return (
    <Grid item xs={12}>
      <Divider sx={styles.formDivider} /> {/* Use imported style */}
      <Controller
        name="published"
        control={control}
        render={({ field }) => (
          <FormControlLabel
            control={
              <Switch
                checked={field.value}
                onChange={(e) => field.onChange(e.target.checked)}
                disabled={submitting}
              />
            }
            label="Publikovat"
          />
        )}
      />
    </Grid>
  );
};

export default EventPublishStatus;
