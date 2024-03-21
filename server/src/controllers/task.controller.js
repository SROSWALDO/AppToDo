const db = require("../db");

const getAllTasks = async (req, res) => {
  try {
    const allTasks = await db.query("SELECT * FROM task");
    res.json(allTasks.rows);
  } catch (error) {
    next(error);
  }
};

const getTask = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query("SELECT * FROM task WHERE id = $1", [id]);

    if (result.rows.length === 0)
      return res.status(404).json({
        message: "Task not found",
      });

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

const createTask = async (req, res) => {
  const { title, description } = req.body;

  try {
    const result = await db.query(
      "INSERT INTO task (title, description) VALUES ($1, $2) RETURNING *",
      [title, description]
    );

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.query("DELETE FROM task WHERE id = $1", [id]);

    if (result.rowCount === 0)
      return res.status(404).json({
        message: "Task not found",
      });

    return res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

const updateTask = async (req, res) => {
  const { id } = req.params;

  try {
    const { title, description } = req.body;

    const result = await db.query(
      "UPDATE task SET title = $1, description = $2 WHERE id = $3 RETURNING *", //el returrning* te retorna todo el objeto
      [title, description, id]
    );

    if (result.rows.length === 0)
      return res.status(404).json({
        message: "Task not found",
      });

    return res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  deleteTask,
  updateTask,
};
