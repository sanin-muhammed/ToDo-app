import PropTypes from "prop-types";
import clsx from "clsx";
import { styled, css } from "@mui/system";
import { Modal as BaseModal } from "@mui/base/Modal";

import React, { useEffect, useState } from "react";
import editImg from "../assets/edit.svg";
import deleteImg from "../assets/trash.svg";
import { Link } from "react-router-dom";
import { add_task, all_tasks, delete_task, update_task } from "../../actions/actions";

const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const [taskId, setTaskId] = useState("");
    const [editOpen, setEditOpen] = useState(false);
    const [createOpen, setCreateOpen] = useState(false);
console.log({taskId});
    const [formData, setFormData] = useState({
        taskname: "",
        description: "",
    });

    const fetchTasks = async () => {
        const response = await all_tasks();
        if (response.status) {
            setTasks(response.data);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleEditOpen = (id) => {
        const task = tasks.find((item) => {
            return item._id === id;
        });
        console.log({ task });
        setFormData({
            taskname: task.taskname,
            description: task.description,
        });
        setTaskId(id);

        setEditOpen(true);
    };
    const handleEditClose = () => setEditOpen(false);
    const handleCreateOpen = () => setCreateOpen(true);
    const handleCreateClose = () => setCreateOpen(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await add_task(formData);
        if (response.status) {
            console.log("new task added");
        }
        fetchTasks();
        setCreateOpen(false);
    };
    const handleEdit = async (e) => {
        console.log({taskId});
        e.preventDefault();
        const response = await update_task(taskId,formData);
        if (response.status) {
            console.log(" task updated");
        }
        fetchTasks();
        setEditOpen(false);
    };

    const handleDelete = async (id) => {
        setTaskId(id);
        const response = await delete_task(id);
        if (response.status) {
            console.log(" task deleted");
        }
        fetchTasks();
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <div className="container">
            <h2>To-Do List</h2>
            <TriggerButton className="create_btn" type="button" onClick={handleCreateOpen}>
                Create
            </TriggerButton>
            <div className="tasks">
                <Modal aria-labelledby="unstyled-modal-title" aria-describedby="unstyled-modal-description" open={createOpen} onClose={handleCreateClose} slots={{ backdrop: StyledBackdrop }}>
                    <ModalContent sx={{ width: 600 }}>
                        <h2 className="modal-title">Create Task</h2>
                        <form onSubmit={handleSubmit} id="unstyled-modal-description" className=" modal-description">
                            <input type="text" name="taskname" onChange={handleInputChange} className="" placeholder="Enter task name" />
                            <input type="text" name="description" onChange={handleInputChange} className="" placeholder="Enter description" />
                            <button className="">Create</button>
                        </form>
                    </ModalContent>
                </Modal>
                {tasks.map((item, index) => (
                    <div className="box" key={index}>
                        <div className="task">
                            <h3>{item.taskname}</h3>
                            <p>{item.description}</p>
                        </div>
                        <div className="actions">
                            <TriggerButton type="button" onClick={() => handleEditOpen(item._id)}>
                                <img src={editImg} alt="Edit" className="action_btn" />
                            </TriggerButton>
                            <TriggerButton type="button" onClick={() => handleDelete(item._id)}>
                                <img src={deleteImg} alt="Delete" className="action_btn" />
                            </TriggerButton>
                        </div>
                    </div>
                ))}
                <Modal aria-labelledby="unstyled-modal-title" aria-describedby="unstyled-modal-description" open={editOpen} onClose={handleEditClose} slots={{ backdrop: StyledBackdrop }}>
                    <ModalContent sx={{ width: 600 }}>
                        <h2 className="modal-title">Edit Banner</h2>
                        <form onSubmit={handleEdit} id="unstyled-modal-description" className="edit modal-description">
                            <input type="text" name="taskname" onChange={handleInputChange} value={formData.taskname} placeholder="Enter task name" />
                            <input type="text" name="description" onChange={handleInputChange} value={formData.description} placeholder="Enter description" />
                            <button className="edit_btn">Edit</button>
                        </form>
                    </ModalContent>
                </Modal>
            </div>
        </div>
    );
};

export default Tasks;

const Backdrop = React.forwardRef((props, ref) => {
    const { open, className, ...other } = props;
    return <div className={clsx({ "base-Backdrop-open": open }, className)} ref={ref} {...other} />;
});

Backdrop.propTypes = {
    className: PropTypes.string.isRequired,
    open: PropTypes.bool,
};

const blue = {
    200: "#99CCFF",
    300: "#66B2FF",
    400: "#3399FF",
    500: "#007FFF",
    600: "#0072E5",
    700: "#0066CC",
};

const grey = {
    50: "#F3F6F9",
    100: "#E5EAF2",
    200: "#DAE2ED",
    300: "#C7D0DD",
    400: "#B0B8C4",
    500: "#9DA8B7",
    600: "#6B7A90",
    700: "#434D5B",
    800: "#303740",
    900: "#1C2025",
};

const Modal = styled(BaseModal)`
    position: fixed;
    z-index: 1300;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const StyledBackdrop = styled(Backdrop)`
    z-index: -1;
    position: fixed;
    inset: 0;
    background-color: rgb(0 0 0 / 0.5);
    -webkit-tap-highlight-color: transparent;
`;

const ModalContent = styled("div")(
    ({ theme }) => css`
        font-family: "IBM Plex Sans", sans-serif;
        font-weight: 500;
        text-align: start;
        position: relative;
        display: flex;
        flex-direction: column;
        gap: 8px;
        overflow: hidden;
        background-color: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
        border-radius: 8px;
        border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
        box-shadow: 0 4px 12px ${theme.palette.mode === "dark" ? "rgb(0 0 0 / 0.5)" : "rgb(0 0 0 / 0.2)"};
        padding: 24px;
        color: ${theme.palette.mode === "dark" ? grey[50] : grey[900]};

        & .modal-title {
            margin: 0;
            line-height: 1.5rem;
            margin-bottom: 8px;
        }

        & .modal-description {
            margin: 0;
            line-height: 1.5rem;
            font-weight: 400;
            color: ${theme.palette.mode === "dark" ? grey[400] : grey[800]};
            margin-bottom: 4px;
        }
    `
);

const TriggerButton = styled("button")(
    ({ theme }) => css`
        font-family: "IBM Plex Sans", sans-serif;
        font-weight: 600;
        font-size: 0.875rem;
        line-height: 1.5;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 8px;
        transition: all 150ms ease;
        cursor: pointer;
        background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
        border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
        color: ${theme.palette.mode === "dark" ? grey[200] : grey[900]};
        box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);

        &:hover {
            background: ${theme.palette.mode === "dark" ? grey[800] : grey[50]};
            border-color: ${theme.palette.mode === "dark" ? grey[600] : grey[300]};
        }

        &:active {
            background: ${theme.palette.mode === "dark" ? grey[100] : grey[100]};
        }

        &:focus-visible {
            box-shadow: 0 0 0 4px ${theme.palette.mode === "dark" ? blue[300] : blue[200]};
            outline: none;
        }
    `
);
