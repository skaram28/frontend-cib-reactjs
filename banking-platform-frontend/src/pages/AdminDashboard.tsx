import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  Button,
  Stack,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import usersData from "../data/adminUsers.json";

interface User {
  id: number;
  name: string;
  email: string;
  contactNo: string;
  address: string;
}

const AdminDashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");

  const [newUser, setNewUser] = useState<User>({
    id: 0,
    name: "",
    email: "",
    contactNo: "",
    address: "",
  });

  useEffect(() => {
    setUsers(usersData);
  }, []);

  const handleAddUser = () => {
    if (newUser.name && newUser.email && newUser.contactNo && newUser.address) {
      const updatedUsers = [...users, { ...newUser, id: users.length + 1 }];
      setUsers(updatedUsers);
      setNewUser({ id: 0, name: "", email: "", contactNo: "", address: "" });
    }
  };

  const handleDeleteUser = (id: number) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
  };

  const filteredUsers = users.filter((user) =>
    Object.values(user).some((val) =>
      String(val).toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" mb={3}>
        Admin Dashboard
      </Typography>

      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" mb={2}>
          Add New User
        </Typography>
        <Stack direction="row" spacing={2} flexWrap="wrap">
          <TextField
            label="Name"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          />
          <TextField
            label="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          />
          <TextField
            label="Contact No"
            value={newUser.contactNo}
            onChange={(e) =>
              setNewUser({ ...newUser, contactNo: e.target.value })
            }
          />
          <TextField
            label="Address"
            value={newUser.address}
            onChange={(e) =>
              setNewUser({ ...newUser, address: e.target.value })
            }
          />
          <Button variant="contained" onClick={handleAddUser}>
            Add User
          </Button>
        </Stack>
      </Paper>

      <Paper sx={{ p: 2 }}>
        <TextField
          label="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />

        <Table sx={{ border: "1px solid #ccc" }}>
          <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Contact No</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.contactNo}</TableCell>
                <TableCell>{user.address}</TableCell>
                <TableCell>
                  <IconButton
                    color="error"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {filteredUsers.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No users found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
};

export default AdminDashboard;
