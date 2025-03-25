import { useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  IconButton,
  Tooltip,
  Typography,
  TextField,
  InputAdornment,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import SearchIcon from "@mui/icons-material/Search";

export interface Column<T> {
  id: keyof T | "actions";
  label: string;
  minWidth?: number;
  align?: "right" | "left" | "center";
  format?: (value: any, row: T) => React.ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  onView?: (item: T) => void;
  idField?: keyof T;
  title?: string;
  searchField?: keyof T;
}

const DataTable = <T extends object>({
  columns,
  data,
  onEdit,
  onDelete,
  onView,
  idField = "id" as keyof T,
  title,
  searchField,
}: DataTableProps<T>) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // Filter data based on search query if searchField is provided
  const filteredData = searchField
    ? data.filter((row) => {
        const fieldValue = row[searchField];
        if (typeof fieldValue === "string") {
          return fieldValue.toLowerCase().includes(searchQuery.toLowerCase());
        }
        return false;
      })
    : data;

  // Apply pagination
  const paginatedData = filteredData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <Box
        sx={{
          p: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {title && (
          <Typography variant="h6" component="div">
            {title}
          </Typography>
        )}

        {searchField && (
          <TextField
            size="small"
            placeholder="Hledat..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        )}
      </Box>

      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={String(column.id)}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.length > 0 ? (
              paginatedData.map((row) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={String(row[idField])}
                  >
                    {columns.map((column) => {
                      if (column.id === "actions") {
                        return (
                          <TableCell
                            key={String(column.id)}
                            align={column.align || "right"}
                          >
                            {onView && (
                              <Tooltip title="Zobrazit">
                                <IconButton
                                  size="small"
                                  color="primary"
                                  onClick={() => onView(row)}
                                >
                                  <VisibilityIcon />
                                </IconButton>
                              </Tooltip>
                            )}
                            {onEdit && (
                              <Tooltip title="Upravit">
                                <IconButton
                                  size="small"
                                  color="primary"
                                  onClick={() => onEdit(row)}
                                >
                                  <EditIcon />
                                </IconButton>
                              </Tooltip>
                            )}
                            {onDelete && (
                              <Tooltip title="Smazat">
                                <IconButton
                                  size="small"
                                  color="error"
                                  onClick={() => onDelete(row)}
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </Tooltip>
                            )}
                          </TableCell>
                        );
                      }

                      const value = row[column.id as keyof T];
                      return (
                        <TableCell key={String(column.id)} align={column.align}>
                          {column.format
                            ? column.format(value, row)
                            : String(value)}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  {searchQuery
                    ? "Žádné výsledky nenalezeny"
                    : "Žádná data k zobrazení"}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Řádků na stránku:"
        labelDisplayedRows={({ from, to, count }) => `${from}-${to} z ${count}`}
      />
    </Paper>
  );
};

export default DataTable;
