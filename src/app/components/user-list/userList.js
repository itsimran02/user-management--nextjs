"use client";

import { deleteUser, getUsers } from "@/app/actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { useState } from "react";

export default function () {
  const [userData, setUserData] = useState([]);
  const [updateData, setUpdateData] = useState({});

  const getUsersFromAction = async () => {
    try {
      const getUsersData = await getUsers();
      setUserData(getUsersData.data);
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    getUsersFromAction();
  }, []);

  const handleDeleteUser = async (id) => {
    const { message, success } = await deleteUser(id);
    if (!success) {
      return toast.error(message);
    }

    window.location.reload;

    return toast.success(message);
  };

  const handleEditProfile = (userInputData) => {
    setUpdateData(userInputData);
  };
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-10 py-2 px-5 ">
        {/* div to be mapped  */}
        {userData &&
          userData.map((user) => {
            return (
              <div
                key={user._id}
                className="shadow-md hover:shadow-lg hover:scale-105 transition-all duration-100 py-2 px-5"
              >
                <div className="flex gap-2">
                  <h1 className="font-bold text-lg">
                    {user.firstName}
                  </h1>
                  <p className="font-bold text-lg">
                    {user.lastName}
                  </p>
                </div>

                <div className="flex gap-2 flex-col mb-5">
                  <p>{user.email}</p>
                  <p>{user.address}</p>
                </div>
                <div className="flex justify-between">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        onClick={() => {
                          handleEditProfile(user);
                        }}
                      >
                        Edit Profile
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>
                          Edit profile
                        </DialogTitle>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="">
                          <Label
                            htmlFor="firstName"
                            className="text-right"
                          >
                            first Name
                          </Label>
                          <Input
                            id="firstName"
                            className="col-span-3"
                            value={updateData.firstName}
                          />
                        </div>
                        <div className="">
                          <Label
                            htmlFor="lastName"
                            className="text-right"
                          >
                            last Name
                          </Label>
                          <Input
                            id="lastName"
                            className="col-span-3"
                            value={updateData.lastName}
                          />
                        </div>
                        <div className="">
                          <Label
                            htmlFor="email"
                            className="text-right"
                          >
                            Email
                          </Label>
                          <Input
                            id="email"
                            className="col-span-3"
                            value={updateData.email}
                          />
                        </div>
                        <div className="">
                          <Label
                            htmlFor="address"
                            className="text-right"
                          >
                            address
                          </Label>
                          <Input
                            id="address"
                            className="col-span-3"
                            value={updateData.address}
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit">
                          Save changes
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  <Button
                    onClick={() => {
                      handleDeleteUser(user._id);
                    }}
                  >
                    Delete User
                  </Button>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
