export default class AdminAPI {
    constructor(admin){
        this.admin = admin;
    }

    getUsers = async () => {
        fetch("http://localhost:3010/api/users/allUsers")
          .then((data) => data.json())
          // .then(usersInfo => setUsers(usersInfo))
          .catch((e) => console.log("Ошибка при получении списка пользователей"));
      };
}
