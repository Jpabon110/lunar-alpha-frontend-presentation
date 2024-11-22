import React, { useEffect, useState } from "react";
import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  SelectChangeEvent,
  FormHelperText,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { AppDispatch } from "../redux/store";
import { users, loadingUsers } from "../redux/users.selectors";
import { getUsers } from "../redux/actions/user.actions";
import { useSelector, useDispatch } from "react-redux";
import { Task } from "../interfaces/interfaces";

interface TaskInfoDialogParams {
  open: boolean;
  handleClose(): void;
  handleOpen(): void;
  formValues: Task;
  createNewTask(): Promise<void>;
  handleInputChange(e: React.ChangeEvent<HTMLInputElement>): void;
  handlePriorityChange(e: SelectChangeEvent<string>): void;
  handleMenberCrewChange(e: SelectChangeEvent<string>): void;
  handleAddTask(): void;
}

const ModalReUseIt = (params: TaskInfoDialogParams) => {
  const {
    open,
    handleClose,
    handleOpen,
    formValues,
    handleInputChange,
    handlePriorityChange,
    handleMenberCrewChange,
    handleAddTask,
  } = params;

  const dispatch: AppDispatch = useDispatch();
  const usersAvalible = useSelector(users);
  const loadingUsersAvalible = useSelector(loadingUsers);

  const [errors, setErrors] = useState({
    title: "",
    description: "",
    priority: "",
    userId: "",
  });

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const validateFields = (): boolean => {
    const newErrors = { title: "", description: "", priority: "", userId: "" };

    if (!formValues.title) {
      newErrors.title = "Title is required";
    }
    if (!formValues.description) {
      newErrors.description = "Description is required";
    } else if (formValues.description.length < 10) {
      newErrors.description = "Description must be at least 10 characters";
    }
    if (!formValues.priority) {
      newErrors.priority = "Priority is required";
    }
    if (!formValues.userId) {
      newErrors.userId = "Member Crew is required";
    }

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => !error);
  };

  const handleSubmit = () => {
    if (validateFields()) {
      handleAddTask();
    }
  };

  return (
    <>
      <div className="flex ml-[1.5%]">
        <IconButton size="small" color="primary" onClick={handleOpen}>
          Add Task <EditIcon fontSize="medium" />
        </IconButton>
      </div>

      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle className="text-center text-xl font-bold">
          Add New Task
        </DialogTitle>
        <DialogContent className="flex flex-col space-y-4">
          {/* Title Field */}
          <TextField
            label="Title"
            name="title"
            value={formValues.title}
            onChange={handleInputChange}
            fullWidth
            error={!!errors.title}
            helperText={errors.title}
          />
          {/* Description Field */}
          <TextField
            label="Description"
            name="description"
            value={formValues.description}
            onChange={handleInputChange}
            fullWidth
            multiline
            rows={3}
            error={!!errors.description}
            helperText={errors.description}
          />
          {/* Priority Select */}
          <FormControl fullWidth error={!!errors.priority}>
            <InputLabel>Priority</InputLabel>
            <Select
              label="Priority"
              name="priority"
              value={formValues.priority}
              onChange={handlePriorityChange}
            >
              <MenuItem value="low">Low</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="high">High</MenuItem>
            </Select>
            <FormHelperText>{errors.priority}</FormHelperText>
          </FormControl>
          {/* Member Crew Select */}
          {loadingUsersAvalible ? (
            <></>
          ) : (
            <FormControl fullWidth error={!!errors.userId}>
              <InputLabel>Member Crew</InputLabel>
              <Select
                label="Member Crew"
                name="memberCrew"
                value={String(formValues.userId)}
                onChange={handleMenberCrewChange}
              >
                {usersAvalible.map((user, index) => (
                  <MenuItem value={user.id} key={index}>
                    {user.name}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>{errors.userId}</FormHelperText>
            </FormControl>
          )}
        </DialogContent>
        <DialogActions className="flex justify-end space-x-2 p-4">
          <Button
            variant="outlined"
            onClick={handleClose}
            className="bg-gray-200 hover:bg-gray-300"
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Add Task
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ModalReUseIt;
