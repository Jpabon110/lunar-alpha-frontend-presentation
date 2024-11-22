import React, { useEffect, useState } from "react";
import { getTasks, createTasks, updateTask, removeTask } from '../redux/actions/task.actions';
import { AppDispatch } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { users, loadingUsers } from "../redux/users.selectors";
import { getUsers } from "../redux/actions/user.actions";

const MemberCrewTable: React.FC = () => {

  const dispatch: AppDispatch = useDispatch();
  const usersAvalible = useSelector(users);
  const loadingUsersAvalible = useSelector(loadingUsers);

  useEffect(()=>{
    dispatch(getTasks());
    dispatch(getUsers());
  },[]);

  return (
    <>
      {
        (loadingUsersAvalible) ? (
          <></>
        ) : (
        <>
          <div className="overflow-x-auto p-4 rounded-[1.5rem]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-blue-800 text-white">
                  <th className="p-4">ID</th>
                  <th className="p-4">Name</th>
                  <th className="p-4">Email</th>
                </tr>
              </thead>
              <tbody>
                {usersAvalible.map((row, index) => (
                  <tr
                    key={index}
                    className="border-b last:border-none hover:bg-blue-50"
                  >
                   <td className="p-4">{row.id}</td>
                    <td className="p-4">{row.name}</td>
                    <td className="p-4">{row.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
        )
      }
    </>
  );
};

export default MemberCrewTable;
