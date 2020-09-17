import React, { useState, FormEvent, useEffect } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import logoImg from '../../assets/logo.svg';
import api from '../../services/api';

import { Title, Form, Repositories, Error } from './styles';

interface Repository {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}
const Dashboard: React.FC = () => {
  const [inputErro, setInputErro] = useState('');
  const [newRepo, setNewRepo] = useState('');
  const [repositories, setRepositories] = useState<Repository[]>(() => {
    const storedRepositories = localStorage.getItem(
      '@GithubExplorer:respositories',
    );
    if (storedRepositories) {
      return JSON.parse(storedRepositories);
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem(
      '@GithubExplorer:respositories',
      JSON.stringify(repositories),
    );
  }, [repositories]);

  async function handleAddRepositories(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();
    if (!newRepo) {
      setInputErro('Digite o autor/nome do repositório');
      return;
    }

    try {
      const response = await api.get<Repository>(`repos/${newRepo}`);

      const repository = response.data;

      setRepositories([...repositories, repository]);
      setNewRepo('');
      setInputErro('');
    } catch {
      setInputErro('Erro na buscar por esse repositório');
    }
  }
  return (
    <>
      <img src={logoImg} alt="Gitguh Explorer" />
      <Title>Explore repositório no GitHub</Title>

      <Form hasError={!!inputErro} onSubmit={handleAddRepositories}>
        <input
          type="text"
          value={newRepo}
          onChange={(e) => setNewRepo(e.target.value)}
          placeholder="Digite o repositório"
        />
        <button type="submit">Pesquisar</button>
      </Form>

      {inputErro && <Error>{inputErro}</Error>}

      <Repositories>
        {repositories.map((repository) => {
          return (
            <Link
              key={repository.full_name}
              to={`/repositories/${repository.full_name}`}
            >
              <img
                src={repository.owner.avatar_url}
                alt={repository.owner.login}
              />
              <div>
                <strong>{repository.full_name}</strong>
                <p>{repository.description}</p>
              </div>
              <FiChevronRight size="20px" />
            </Link>
          );
        })}
      </Repositories>
    </>
  );
};

export default Dashboard;
