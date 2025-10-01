import Todo from "../models/todo.js";

const createTodo = async (req, res) => {
  try {
    const userId = req.user.userId;

    const { title } = req.body;

    if (!title) {
      return res
        .status(400)
        .json({ success: false, message: "Title is required" });
    }

    const todo = new Todo({
      title,
      user: userId,
    });

    await todo.save();

    return res
      .status(201)
      .json({ success: true, message: "Todo created successfully", todo });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const getTodo = async (req, res) => {
  try {
    const userId = req.user.userId;
    const todos = await Todo.find({ user: userId });

    return res
      .status(200)
      .json({ success: true, message: "Todos fetch successfully", todos });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const updateTodo = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { id } = req.params;
    const { title, completed } = req.body;

    const updatedTodo = await Todo.findOneAndUpdate(
      { _id: id, user: userId },
      { title, completed },
      { new: true }
    );

    if (!updatedTodo) {
      return res
        .status(404)
        .json({ success: false, message: "Todo not found" });
    }

    return res.status(200).json({
      success: true,
      data: updatedTodo,
      message: "Todo updated successfully",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { id } = req.params;

    const deletedTodo = await Todo.findOneAndDelete({ _id: id, user: userId });

    if (!deletedTodo) {
      return res
        .status(404)
        .json({ success: false, message: "Todo not found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Todo deleted successfully" });
  } catch (error) {
    console.log(error);

    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export { createTodo, getTodo, updateTodo, deleteTodo };
