import { useCallback, useEffect, useState } from "react";
import { loadUsers } from "./api";
import { UserListItem } from "./UserListItem";

export function UserList() {
  const [userPage, setUserPage] = useState({
    content: [],
    last: false,
    first: false,
    number: 0,
  });

  const getUsers = useCallback(async (page) => {
    const response = await loadUsers(page);
    setUserPage(response.data);
  });

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="card">
      <div className="card-header text-center fs-4">User List</div>
      <ul className="list-group list-group-flush">
      {userPage.content.map((user) => {
        return <UserListItem key={user.id} user={user}/>
            })}
      </ul>
     <div className="card-footer">
     {!userPage.first && (
        <button className="btn btn-outline-secondary btn-sm" onClick={() => getUsers(userPage.number - 1)}>Previous</button>
      )}
      {!userPage.last && (
        <button className="btn btn-outline-secondary btn-sm float-end" onClick={() => getUsers(userPage.number + 1)}>Next</button>
      )}
     </div>
    </div>
  );
}
