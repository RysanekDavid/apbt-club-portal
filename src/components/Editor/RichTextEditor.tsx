import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Box, Typography, useTheme } from "@mui/material"; // Import useTheme
import * as styles from "./RichTextEditor.styles"; // Import styles

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
  const theme = useTheme(); // Get theme object

  return (
    <Box sx={styles.rootBox}>
      {label && (
        <Typography variant="subtitle1" gutterBottom>
          {label}
        </Typography>
      )}
      <Box sx={styles.editorWrapper(theme, error, height)}>
        <CKEditor
          editor={ClassicEditor as any} // Cast to any to bypass type mismatch
          data={value}
          onChange={(_event, editor) => {
            const data = editor.getData();
            onChange(data);
          }}
          config={
            {
              // Cast the whole config object to any
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
              // Cast only the link configuration part to 'any'
              link: {
                // Automatically add target="_blank" and rel="noopener noreferrer" to all links
                decorators: {
                  addTargetToExternalLinks: {
                    mode: "automatic",
                    // Add type annotation for url parameter
                    callback: (url: string | undefined) =>
                      /^(https?|ftp):\/\//.test(url || ""), // Apply to external links
                    attributes: {
                      target: "_blank",
                      rel: "noopener noreferrer",
                    },
                  },
                },
              },
            } as any
          } // Close the cast here
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
