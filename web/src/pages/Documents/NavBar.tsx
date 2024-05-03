import { useState } from "react";
import { useUserContext } from "../../contexts/UserContextProvider/hooks";

export const NavBar = () => {
  const { user, usersList, toggleUser } = useUserContext();
  const [showToggleUser, setShowToggleUser] = useState(true);

  return (
    <div className="h-full w-80 bg-purple-900 p-6 flex flex-col gap-4">
      <div className="flex flex-col">
        <span className="text-yellow-500 text-lg">{usersList[0].name}</span>
        <span className="text-yellow-500 text-lg">{usersList[1].name}</span>

        <p className="text-white text-lg mt-4">Signed in as {user?.name}</p>
      </div>

      <button className="text-white bg-purple-700 py-2 text-xl font-semibold">
        Documents
      </button>

      <button
        onClick={() => {
          setShowToggleUser((old) => !old);
        }}
        className="border border-gray-100 px-3 py-1 rounded-md text-white"
      >
        Change account
      </button>

      {showToggleUser && (
        <div className="flex flex-col gap-2">
          <span className="text-white text-lg font-semibold">
            Select a user to simulate sign in
          </span>

          <select
            onChange={(e) => {
              toggleUser(+e.target.value);
            }}
            defaultValue={user?.id}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-blue-500 dark:border-blue-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            {usersList.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};
