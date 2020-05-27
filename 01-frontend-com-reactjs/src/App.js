import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./App.css";

/**
 * Component
 * Propriedade
 * Estado & Imutabilidade
 */
import Header from "./components/Header";

export function App() {
  const [projects, setProject] = useState([]);

  useEffect(() => {
    api.get("projects").then((res) => {
      setProject(res.data);
    });
  }, []);

  async function handlerAddProject() {
    // setProject([...projects, `Novo projeto ${Date.now()}`]);

    const response = await api.post("projects", {
      title: `Novo projeto ${Date.now()}`,
      owner: "Jadilson Guedes",
    });

    const project = response.data;
    setProject([...projects, project]);
  }

  return (
    <>
      <Header title="Projects">
        <ul>
          {projects.map(({ id, title }) => (
            <li key={id}>{title}</li>
          ))}
        </ul>

        <button type="button" onClick={handlerAddProject}>
          {" "}
          Adicionar projeto
        </button>
      </Header>
    </>
  );
}
