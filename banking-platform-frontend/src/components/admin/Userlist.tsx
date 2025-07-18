import React, { useState } from "react";
import {
  Container,
  Typography,
  Paper,
  IconButton,
  Stack,
  Tooltip,
  Snackbar,
  Alert,
  Modal,
  Box,
  TextField,
  Button,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef, GridRenderCellParams } from "@mui/x-data-grid/models";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import userlist from "../../data/UserList.json";

interface User {
  id: number;
  name: string;
  email: string;
  contactNo: string;
  address: string;
}

// const initialRows: User[] = [
//   { id: 1, name: "John Doe", email: "john@example.com", contactNo: "1234567890", address: "ABC" },
//   { id: 2, name: "Jane Smith", email: "jane@example.com", contactNo: "1234567891", address: "PQR" },
//   { id: 3, name: "Alice Brown", email: "alice@example.com", contactNo: "1234567892", address: "XYZ" },
//   { id: 4, name: "Devika Karki", email: "devikarki@example.com", contactNo: "1234567893", address: "QWE" },
//   { id: 5, name: "Divya A", email: "divyaa@example.com", contactNo: "1234567894", address: "RTY" },
// ];

const UserList: React.FC = () => {
  const [rows, setRows] = useState<User[]>(userlist);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "info" | "error">("info");

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editUser, setEditUser] = useState<User | null>(null);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleEditOpen = (user: User) => {
    setEditUser(user);
    setEditModalOpen(true);
  };

  const handleEditClose = () => {
    setEditModalOpen(false);
    setEditUser(null);
  };

  const handleEditSave = () => {
    if (editUser) {
      setRows((prevRows) =>
        prevRows.map((row) => (row.id === editUser.id ? editUser : row))
      );
      setSnackbarMessage(`${editUser.name} has been updated`);
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      handleEditClose();
    }
  };

  const handleDelete = (id: number) => {
    const user = rows.find((u) => u.id === id);
    if (user && confirm(`Are you sure you want to delete ${user.name}?`)) {
      setRows((prevRows) => prevRows.filter((row) => row.id !== id));
      setSnackbarMessage(`${user.name} has been deleted`);
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    }
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 130 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "contactNo", headerName: "Contact No", width: 200 },
    { field: "address", headerName: "Address", width: 200 },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      sortable: false,
      filterable: false,
      renderCell: (params: GridRenderCellParams) => (
        <Stack direction="row" spacing={1}>
          <Tooltip title="Edit">
            <IconButton
              color="primary"
              size="small"
              onClick={() => handleEditOpen(params.row as User)}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton
              color="error"
              size="small"
              onClick={() => handleDelete(params.row.id)}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Stack>
      ),
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      <Typography variant="h4" fontWeight="bold">
        Admin
      </Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        Welcome To Admin Page!
      </Typography>

      <Paper sx={{ height: 450, width: "100%", mt: 4 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pagination
          pageSizeOptions={[5, 10]}
          initialState={{
            pagination: { paginationModel: { pageSize: 5 } },
          }}
          sx={{
            border: 0,
            "& .MuiDataGrid-columnHeaders": { backgroundColor: "#f5f5f5", fontWeight: "bold" },
            "& .MuiDataGrid-row:hover": {
              backgroundColor: "#e0f7fa",
              cursor: "pointer",
            },
          }}
        />
      </Paper>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>

      <Modal open={editModalOpen} onClose={handleEditClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography variant="h6">Edit User</Typography>
          {editUser && (
            <>
              <TextField
                label="Name"
                value={editUser.name}
                onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
              />
              <TextField
                label="Email"
                value={editUser.email}
                onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
              />
              <TextField
                label="Contact No"
                value={editUser.contactNo}
                onChange={(e) => setEditUser({ ...editUser, contactNo: e.target.value })}
              />
              <TextField
                label="Address"
                value={editUser.address}
                onChange={(e) => setEditUser({ ...editUser, address: e.target.value })}
              />
              <Stack direction="row" spacing={2} justifyContent="flex-end">
                <Button onClick={handleEditClose}>Cancel</Button>
                <Button variant="contained" onClick={handleEditSave}>
                  Save
                </Button>
              </Stack>
            </>
          )}
        </Box>
      </Modal>
    </Container>
  );
};

export default UserList;