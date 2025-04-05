import React from "react";
import { Controller, Control, FieldErrors } from "react-hook-form";
import { Grid, TextField } from "@mui/material";
import { DatePicker, TimePicker } from "@mui/x-date-pickers"; // Import TimePicker
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { cs } from "date-fns/locale";
import { EventFormData } from "../EventForm";

interface EventDateTimeLocationProps {
  control: Control<EventFormData>;
  errors: FieldErrors<EventFormData>;
  submitting: boolean;
}

const EventDateTimeLocation: React.FC<EventDateTimeLocationProps> = ({
  control,
  errors,
  submitting,
}) => {
  return (
    // Wrap the entire group in LocalizationProvider
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={cs}>
      <React.Fragment>
        {" "}
        {/* Explicit Fragment */}
        {/* Date */}
        <Grid item xs={12} md={6}>
          <Controller
            name="date"
            control={control}
            rules={{ required: "Datum je povinné" }}
            render={({ field }) => (
              <DatePicker
                label="Datum"
                value={field.value}
                onChange={(newValue: Date | null) => field.onChange(newValue)}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    error: !!errors.date,
                    helperText: errors.date?.message,
                  },
                }}
                disabled={submitting}
              />
            )}
          />
          {/* Removed commented out provider */}
        </Grid>
        {/* Location */}
        <Grid item xs={12} md={6}>
          <Controller
            name="location"
            control={control}
            rules={{ required: "Místo je povinné" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Místo"
                fullWidth
                error={!!errors.location}
                helperText={errors.location?.message}
                disabled={submitting}
              />
            )}
          />
        </Grid>
        {/* Start Time Picker */}
        <Grid item xs={6} md={3}>
          <Controller
            name="startTime" // Control startTime
            control={control}
            render={({ field }) => (
              <TimePicker
                label="Čas od"
                value={field.value}
                onChange={(newValue) => field.onChange(newValue)}
                slotProps={{ textField: { fullWidth: true } }}
                ampm={false} // Use 24-hour format
                disabled={submitting}
              />
            )}
          />
        </Grid>
        {/* End Time Picker */}
        <Grid item xs={6} md={3}>
          <Controller
            name="endTime" // Control endTime
            control={control}
            render={({ field }) => (
              <TimePicker
                label="Čas do"
                value={field.value}
                onChange={(newValue) => field.onChange(newValue)}
                slotProps={{ textField: { fullWidth: true } }}
                ampm={false} // Use 24-hour format
                disabled={submitting}
              />
            )}
          />
        </Grid>
      </React.Fragment>{" "}
      {/* Close Fragment */}
    </LocalizationProvider> // Close the provider here
  );
};

export default EventDateTimeLocation;
