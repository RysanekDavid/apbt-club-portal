import { useState, useRef } from "react";
import { uploadToCloudinary } from "../../services/cloudinary";
import {
  Box,
  Button,
  CircularProgress,
  Typography,
  LinearProgress,
  IconButton,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";

interface CloudinaryUploadProps {
  folder: string;
  onUploadComplete: (url: string, fileName: string) => void;
  acceptedFileTypes?: string;
  maxFileSizeMB?: number;
  label?: string;
  buttonText?: string;
  existingUrl?: string;
  existingFileName?: string;
}

const CloudinaryUpload = ({
  folder,
  onUploadComplete,
  acceptedFileTypes = "image/*",
  maxFileSizeMB = 5,
  label = "Nahrát soubor",
  buttonText = "Vybrat soubor",
  existingUrl,
  existingFileName,
}: CloudinaryUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const [fileUrl, setFileUrl] = useState(existingUrl || "");
  const [fileName, setFileName] = useState(existingFileName || "");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check file size
    if (file.size > maxFileSizeMB * 1024 * 1024) {
      setError(
        `Soubor je příliš velký. Maximální velikost je ${maxFileSizeMB} MB.`
      );
      return;
    }

    // Reset states
    setError("");
    setUploading(true);
    setProgress(0);

    try {
      // Simulate progress for better UX
      const progressInterval = setInterval(() => {
        setProgress((prevProgress) => {
          const newProgress = prevProgress + 5;
          return newProgress >= 90 ? 90 : newProgress;
        });
      }, 200);

      // Upload to Cloudinary
      const result = await uploadToCloudinary(file, folder);

      clearInterval(progressInterval);
      setProgress(100);

      // Set the file URL and name
      setFileUrl(result.url);
      setFileName(file.name);

      // Call the callback
      onUploadComplete(result.url, file.name);

      // Reset uploading state
      setUploading(false);
    } catch (error) {
      console.error("Upload error:", error);
      setError("Chyba při nahrávání souboru. Zkuste to znovu.");
      setUploading(false);
      setProgress(0);
    }
  };

  const handleRemoveFile = () => {
    setFileUrl("");
    setFileName("");
    onUploadComplete("", "");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const isImage =
    fileUrl &&
    (fileUrl.includes(".jpg") ||
      fileUrl.includes(".jpeg") ||
      fileUrl.includes(".png") ||
      fileUrl.includes(".gif") ||
      fileUrl.includes(".webp"));

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="subtitle1" gutterBottom>
        {label}
      </Typography>

      {!fileUrl && (
        <Button
          variant="outlined"
          component="label"
          startIcon={<CloudUploadIcon />}
          disabled={uploading}
          sx={{ mb: 2 }}
        >
          {uploading ? <CircularProgress size={24} /> : buttonText}
          <input
            ref={fileInputRef}
            type="file"
            hidden
            accept={acceptedFileTypes}
            onChange={handleFileChange}
          />
        </Button>
      )}

      {uploading && (
        <Box sx={{ width: "100%", mt: 2 }}>
          <LinearProgress variant="determinate" value={progress} />
          <Typography variant="body2" color="text.secondary" align="center">
            {Math.round(progress)}%
          </Typography>
        </Box>
      )}

      {error && (
        <Typography variant="body2" color="error" sx={{ mt: 1 }}>
          {error}
        </Typography>
      )}

      {fileUrl && (
        <Box
          sx={{
            mt: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          {isImage ? (
            <Box
              component="img"
              src={fileUrl}
              alt={fileName}
              sx={{
                maxWidth: "100%",
                maxHeight: "200px",
                objectFit: "contain",
                mb: 1,
                border: "1px solid #ddd",
                borderRadius: 1,
              }}
            />
          ) : (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                p: 2,
                border: "1px solid #ddd",
                borderRadius: 1,
                mb: 1,
              }}
            >
              <Typography variant="body2">{fileName}</Typography>
            </Box>
          )}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="body2" sx={{ mr: 1 }}>
              {fileName}
            </Typography>
            <IconButton
              size="small"
              color="error"
              onClick={handleRemoveFile}
              aria-label="remove file"
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default CloudinaryUpload;
