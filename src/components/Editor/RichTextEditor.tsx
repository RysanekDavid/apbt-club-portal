import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Box, Typography } from "@mui/material";

interface RichTextEditorProps {
  label?: string;
  value: string;
  onChange: (data: string) => void;
  error?: string;
  height?: string;
}

const RichTextEditor = ({
  label,
  value,
  onChange,
  error,
  height = "300px",
}: RichTextEditorProps) => {
  return (
    <Box sx={{ mb: 2 }}>
      {label && (
        <Typography variant="subtitle1" gutterBottom>
          {label}
        </Typography>
      )}
      <Box
        sx={{
          border: (theme) =>
            error
              ? `1px solid ${theme.palette.error.main}`
              : `1px solid ${theme.palette.divider}`,
          borderRadius: 1,
          overflow: "hidden",
          "& .ck-editor__editable": {
            minHeight: height,
            maxHeight: "600px",
          },
        }}
      >
        <CKEditor
          editor={ClassicEditor}
          data={value}
          onChange={(_event, editor) => {
            const data = editor.getData();
            onChange(data);
          }}
          config={{
            toolbar: [
              "heading",
              "|",
              "bold",
              "italic",
              "link",
              "bulletedList",
              "numberedList",
              "|",
              "outdent",
              "indent",
              "|",
              "blockQuote",
              "insertTable",
              "mediaEmbed",
              "undo",
              "redo",
            ],
            language: "cs",
          }}
        />
      </Box>
      {error && (
        <Typography variant="caption" color="error">
          {error}
        </Typography>
      )}
    </Box>
  );
};

export default RichTextEditor;
