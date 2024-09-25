import AddUser from "../components/add-user/AddUser";
import UserList from "../components/user-list/userList";

export default function () {
  return (
    <div className="p-20 max-w-6xl">
      <div className="flex justify-between">
        <h1>Manage users here </h1>
        <AddUser />
      </div>
      <UserList />
    </div>
  );
}
