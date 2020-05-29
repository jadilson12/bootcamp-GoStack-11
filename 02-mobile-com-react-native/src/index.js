import React, { useState, useEffect } from "react";

import {
  SafeAreaView,
  Text,
  StyleSheet,
  StatusBar,
  FlatList,
  TouchableOpacity,
} from "react-native";

import api from "./services/api";

// Não possuem valor semântico (significado)
// Não possuem estilização própria
// Todos componens possuem "display: flex"

// View: div, footer, header, main, aside
// Text: p, span, strong

export default function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get("projects").then((res) => {
      setProjects(res.data);
    });
  }, []);

  async function handlerAddProject() {
    const response = await api.post("projects", {
      title: `novo projeto ${Date.now()}`,
      owner: "Jadilson Guedes",
    });

    const project = response.data;

    setProjects([...projects, project]);
  }
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>
        <FlatList
          data={projects}
          keyExtractor={(project) => project.id}
          renderItem={({ item: { title, owner } }) => (
            <Text style={styles.title}>
              {title} - {owner}
            </Text>
          )}
        />
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={handlerAddProject}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Adicionar projeto</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },

  title: {
    color: "#fff",
    fontSize: 20,
  },

  button: {
    backgroundColor: "#fff",
    margin: 20,
    height: 50,
    borderRadius: 4,

    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    fontWeight: "bold",
    fontSize: 16,
  },
});
