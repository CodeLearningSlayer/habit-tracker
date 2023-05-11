import React from "react";
import "./userList.scss"

const UserList = ({ users, deleteUser }) => {
  return (
    <>
      <h2 className="user-list__title">Список пользователей</h2>
      <ul className="user-list">
        {users.map((item) => {
          return (
              <li className="user-list__item" key={item._id}>
                {item.email} : {item.username}
                <button onClick={deleteUser} className="user-list__item-delete">Удалить пользователя</button>
              </li>
          );
        })}
      </ul>
    </>
  );
};

export default UserList;
