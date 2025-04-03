import { useState, useRef } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase/config";
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
import * as styles from "./FileUpload.styles"; // Import styles

interface FileUploadProps {
  folder: string;
  onUploadComplete: (url: string, fileName: string) => void;
  acceptedFileTypes?: string;
  maxFileSizeMB?: number;
  label?: string;
  buttonText?: string;
  existingUrl?: string;
  existingFileName?: string;
}

const FileUpload = ({
  folder,
  onUploadComplete,
  acceptedFileTypes = "image/*",
  maxFileSizeMB = 5,
  label = "Nahrát soubor",
  buttonText = "Vybrat soubor",
  existingUrl,
  existingFileName,
}: FileUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const [fileUrl, setFileUrl] = useState(existingUrl || "");
  const [fileName, setFileName] = useState(existingFileName || "");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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

    // Create a unique file name
    const timestamp = new Date().getTime();
    const uniqueFileName = `${timestamp}_${file.name}`;
    const storageRef = ref(storage, `${folder}/${uniqueFileName}`);

    // Upload file
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Monitor upload progress
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      (error) => {
        setError("Chyba při nahrávání souboru. Zkuste to znovu.");
        console.error("Upload error:", error);
        setUploading(false);
      },
      () => {
        // Upload completed successfully
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFileUrl(downloadURL);
          setFileName(file.name);
          onUploadComplete(downloadURL, file.name);
          setUploading(false);
        });
      }
    );
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
    <Box sx={styles.rootBox}>
      <Typography variant="subtitle1" gutterBottom>
        {label}
      </Typography>

      {!fileUrl && (
        <Button
          variant="outlined"
          component="label"
          startIcon={<CloudUploadIcon />}
          disabled={uploading}
          sx={styles.uploadButton}
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
        <Box sx={styles.progressBox}>
          <LinearProgress variant="determinate" value={progress} />
          <Typography variant="body2" color="text.secondary" align="center">
            {Math.round(progress)}%
          </Typography>
        </Box>
      )}

      {error && (
        <Typography variant="body2" color="error" sx={styles.errorText}>
          {error}
        </Typography>
      )}

      {fileUrl && (
        <Box sx={styles.filePreviewContainer}>
          {isImage ? (
            <Box
              component="img"
              src={fileUrl}
              alt={fileName}
              sx={styles.imagePreview}
            />
          ) : (
            <Box sx={styles.fileInfoBox}>
              <Typography variant="body2">{fileName}</Typography>
            </Box>
          )}
          <Box sx={styles.fileNameContainer}>
            <Typography variant="body2" sx={styles.fileNameText}>
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

export default FileUpload;
