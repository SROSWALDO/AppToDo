import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { Button, Card, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function TaskList() {
  const [task, setTask] = useState([]);

  const navigate = useNavigate();

  const loadTask = async () => {
    const response = await axios.get("http://localhost:3000/tasks");
    const { data } = response;
    setTask(data);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3000/tasks/${id}`);
    setTask(task.filter(task => task.id !== id));
  };

  useEffect(() => {
    loadTask();
  }, []);

  return (
    <>
      <h1>Task List</h1>
      {task.map((task) => (
        <Card
          style={{
            marginBottom: ".7rem",
            backgroundColor: "#1e272e",
          }}
          key={task.id}
        >
          <CardContent
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div style={{ color: "white" }}>
              <Typography>{task.title}</Typography>
              <Typography>{task.description}</Typography>
            </div>

            <div>
              <Button
                variant="contained"
                color="inherit"
                onClick={() => navigate(`/task/${task.id}/edit`)}
              >
                Edit
              </Button>

              <Button
                variant="contained"
                color="warning"
                onClick={() => handleDelete(task.id) }
                style={{ marginLeft: ".5rem" }}
              >
                Delete
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
}
