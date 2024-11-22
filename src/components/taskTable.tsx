import React, { useEffect, useState } from "react";
import { IconButton, SelectChangeEvent } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { getTasks, createTasks, updateTask, removeTask } from '../redux/actions/task.actions';
import { taskAvalibles, taskAvaliblesloading } from '../redux/tasks.selectors';
import { AppDispatch } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import moment from 'moment';
import ModalReUseIt from "./modalReuseit";
import DeleteDialogs from "./modalDeleteAsk";
import { Task } from "../interfaces/interfaces";

const TaskTable: React.FC = () => {

  const dispatch: AppDispatch = useDispatch();
  const tasksAvalibles = useSelector(taskAvalibles);
  const loading = useSelector(taskAvaliblesloading);
  const [open, setOpen] = useState(false);
  const [formValues, setFormValues] = useState<Task>({
    id: 0,
    title: "",
    description: "",
    priority: "low",
    userId: 0,
    edit: false
  });

  useEffect(()=>{
    dispatch(getTasks());
  },[]);

  const createNewTask = async () => {
    if (formValues.title && formValues.description && formValues.priority && formValues.userId) {
        if(!formValues.edit){
            handleClose();
            await dispatch(createTasks({
              userId: formValues.userId,
              title: formValues.title,
              description: formValues.description,
              priority: formValues.priority
            }));
            setFormValues({ userId: 0,title: '', description: '', priority:'', edit: false });
           await  dispatch(getTasks());
        } else {
          handleClose(); 
          await dispatch(updateTask(formValues));
          setFormValues({ userId: 0,title: '', description: '', priority:'', edit: false });
          await  dispatch(getTasks());
        }

    } else {
        console.log("all fields are required");
    }
};

const handleOpen = () => setOpen(true);
const handleClose = () => setOpen(false);

const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  setFormValues({ ...formValues, [name]: value });
};

const handlePriorityChange = (e: SelectChangeEvent<string>) => {
  setFormValues({ ...formValues, priority: e.target.value });
};

const handleMenberCrewChange = (e: SelectChangeEvent<string>) => {
  setFormValues({ ...formValues, userId: Number(e.target.value) });
};

const handleAddTask = () => {
  createNewTask();
  setOpen(false);
};

const updateUserOn = (task: Task) => {
  setFormValues({ ...task, edit: true });
  handleOpen();
}

const deleteUserOn = (task: Task) => {
  setFormValues({ ...task });
  handleClickOpenDelete();
}

const [openDelete, setOpenDelete] = useState(false);
const handleClickOpenDelete = () => {
    setOpenDelete(true);
  };
const handleCloseDelete = () => {
    setFormValues({ userId: 0,title: '', description: '', priority:'', edit: false });
    setOpenDelete(false);
  };

  const confirmDeleteTask = async () => {
    if (formValues.id) {
        handleCloseDelete();
        await dispatch(removeTask(formValues));
        setFormValues({ userId: 0,title: '', description: '', priority:'', edit: false });
        await dispatch(getTasks());
    } else {
        console.log("all fields are required");
    }
};
  return (
    <>
      {
        (loading) ? (
          <></>
        ) : (
        <>
          <ModalReUseIt
            createNewTask={createNewTask}
            open={open}
            formValues={formValues}
            handleOpen={handleOpen}
            handleClose={handleClose}
            handleInputChange={handleInputChange}
            handlePriorityChange={handlePriorityChange}
            handleMenberCrewChange={handleMenberCrewChange}
            handleAddTask={handleAddTask}
          />
          <DeleteDialogs
            openDelete={openDelete}
            handleCloseDelete={handleCloseDelete}
            confirmDeleteTask={confirmDeleteTask}
          />
          <div className="overflow-x-auto p-4 rounded-[1.5rem]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-blue-800 text-white">
                  <th className="p-4">ID</th>
                  <th className="p-4">Title</th>
                  <th className="p-4">Description</th>
                  <th className="p-4">Priority</th>
                  <th className="p-4">Crew Member</th>
                  <th className="p-4">Created Date</th>
                  <th className="p-4">Options</th>
                </tr>
              </thead>
              <tbody>
                {tasksAvalibles.map((row, index) => (
                  <tr
                    key={index}
                    className="border-b last:border-none hover:bg-blue-50"
                  >
                    <td className="p-4">{row.id}</td>
                    <td className="p-4">{row.title}</td>
                    <td className="p-4">{row.description}</td>
                    <td className="p-4">
                      <span
                        className={`px-2 py-1 rounded text-white ${row.priority === "high"
                            ? "bg-red-500"
                            : row.priority === "medium"
                              ? "bg-yellow-500"
                              : "bg-green-500"
                          }`}
                      >
                        {row.priority}
                      </span>
                    </td>
                    <td className="p-4">{(row.assignedTo) ? row.assignedTo.name : ''}</td>
                    <td className="p-4">{moment(row.createdAt).format('YYYY-MM-DD HH:mm')}</td>
                    <td className="p-4">
                      <div className="flex space-x-2">
                        <IconButton size="small" color="primary" onClick={()=> updateUserOn(row)}>
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton size="small" color="error" onClick={()=> deleteUserOn(row)}>
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
        )
      }
    </>
  );
};

export default TaskTable;
