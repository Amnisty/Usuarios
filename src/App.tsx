import "./App.css";
import Swal from 'sweetalert2'

import React, { useState } from "react";

interface User {
  id: number;
  name: string;
  email: string;
}

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState<User>({ id: 1, name: "", email: "" });
  const deleteUser = (id: number) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
  };

  const editUser = (id: number) => {
    const userToEdit = users.find((user) => user.id === id);
    if (userToEdit) {
      setNewUser({ ...userToEdit });
      deleteUser(id);
    }
  };

  const addUser = () => {
    if (newUser.name === "" || newUser.email === "") {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Los campos son obligatorios no pueden estar vacios',
      })
    }else{
      setUsers((prevUsers) => [
        ...prevUsers,
        { ...newUser, id: prevUsers.length + 1 },
      ]);
      setNewUser({ id: newUser.id + 1, name: "", email: "" });
    }

  };

  return (
    <div id="container">
      <div id='container_register'>
        <h1 id="title">Registro de Usuarios</h1>
        <div id="container_input"> 
          <input id="input_pp1"
            type="text"
            placeholder="Nombre"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          />
          <input id="input_pp"
            type="email"
            placeholder="Correo electrónico"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          />
          <button id="Register" onClick={addUser}>Registrar</button>
        </div>
        <div>
        <h2 id="subtitle">Usuarios Registrados</h2>
          <ul className="list-group">
            {users.map((user) => (
              <li className="list-group-item" key={user.id}>
                {user.name} - {user.email}
                <div>
                  <div>
                    <button id="button_edit" onClick={() => editUser(user.id)}>Editar</button>
                    <button id="button_delete" onClick={() => deleteUser(user.id)}>Eliminar</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;
