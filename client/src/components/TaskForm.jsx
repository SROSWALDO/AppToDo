import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function TaskForm() {
  const navigate = useNavigate();
  const params = useParams();

  const [task, setTask] = useState({
    title: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    if(editing) {
      try {
        await axios.put(`http://localhost:3000/tasks/${params.id}`, task);
        console.log("Solicitud PUT exitosa");
      } catch (error) {
        console.error("Error al enviar la solicitud PUT", error);
      }
    } else {
      try {
        const response = await axios.post("http://localhost:3000/tasks", task);
        console.log("Solicitud POST exitosa", response.data);
      } catch (error) {
        console.error("Error al enviar la solicitud POST", error);
      }
    }
    setLoading(false);
    navigate("/");
  };

  const handleChange = (event) => {
    setTask({ ...task, [event.target.name]: event.target.value });
  };

  const loadTask = async (id) => {
    try {
      const { data } = await axios.get(`http://localhost:3000/tasks/${id}`);
      setTask({title: data.title, description: data.description});
      setEditing(true);
    } catch (error) {
      console.error("Error al cargar la tarea", error);
    }
  };

  useEffect(() => {
    if (params.id) {
      loadTask(params.id);
    }
  }, [params.id]);
  

  return (
    <div>
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Grid item xs={3}>
          <Card
            sx={{ mt: 5 }}
            style={{ backgroundColor: "#1e272e", padding: "1rem" }}
          >
            <Typography variant="h5" textAlign="center" color="white">
              { editing ? "Edit Task" : "Create Task" }
            </Typography>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <TextField
                  onChange={handleChange}
                  name="title"
                  value={task.title}
                  variant="filled"
                  label="Write your title"
                  sx={{ display: "block", margin: ".5rem 0" }}
                  inputProps={{ style: { color: "white" } }}
                  InputLabelProps={{ style: { color: "white" } }}
                />

                <TextField
                  onChange={handleChange}
                  name="description"
                  value={task.description}
                  variant="filled"
                  label="Write your description"
                  multiline
                  rows={4}
                  sx={{ display: "block", margin: ".5rem 0" }}
                  InputProps={{ style: { color: "white" } }}
                  InputLabelProps={{ style: { color: "white" } }}
                />

                <Button variant="contained" color="primary" type="submit" disabled={!task.title || !task.description} > 
                  {loading ? (
                    <CircularProgress color="inherit" size={24} />
                  ) : (
                    "Save"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
