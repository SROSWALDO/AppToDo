import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import { Container } from "@mui/material";
import Navbar from "./components/navbar";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Container>
          <Routes>
            <Route path="/" element={<TaskList />} />
            <Route path="/task/new" element={<TaskForm />} />
            <Route path="/task/:id/edit" element={<TaskForm />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </>
  );
}

export default App;
