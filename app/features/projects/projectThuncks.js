import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "axios";

export const fetchProjects = createAsyncThunk(
  "projects/fetchProjects",
  async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get("http://localhost:3000/projects", {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      return response.data;
    } catch (error) {
      if (error.response.data.error) {
        return error.response.data;
      } else {
        toast.error(error.response.data);
      }
    }
  }
);

export const fetchProjectById = createAsyncThunk(
  "projects/fetchProjectById",
  async (id) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`http://localhost:3000/projects/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const createProject = createAsyncThunk(
  "projects/createProject",
  async (project) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        "http://localhost:3000/projects",
        project,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );
      toast.success(response.data.message);
      return response.data.project;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const updateProject = createAsyncThunk(
  "projects/updateProject",
  async ({ project, id }) => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.put(
        `http://localhost:3000/projects/${id}`,
        project,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );
      toast.success("Project updated successfully");
      return response.data.project;
    } catch (error) {
        return error.response.data;
    }
  }
);

export const deleteProject = createAsyncThunk(
  "projects/deleteProject",
  async (id) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.delete(
        `http://localhost:3000/projects/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );
      toast.success("Project deleted successfully");
      return response.data;
    } catch (error) {
      toast.error("Error deleting project");
    }
  }
);
