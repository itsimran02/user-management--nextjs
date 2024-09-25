"use client";

import { addNewUser } from "@/app/actions";
import {
  addNewUserFormControls,
  addNewUserformInitialState,
} from "@/app/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { revalidatePath } from "next/cache";
import { useState } from "react";
import toast from "react-hot-toast";

const AddUser = () => {
  const [openPopUp, setOpenPopUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState(
    addNewUserformInitialState
  );
  // console.log(userData);

  const getData = async () => {
    setIsLoading(true);
    try {
      // Call the addNewUser function, which will handle server-side revalidation
      const res = await addNewUser(userData, "/user-management");
      
      if (res.success) {
        // Close the dialog after successful user addition
        setOpenPopUp(false);
      }
      
      toast.success(res.message);
      
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div>
      <Button
        onClick={() => {
          setOpenPopUp(true);
        }}
      >
        Add New User
      </Button>
      <Dialog
        open={openPopUp}
        onOpenChange={() => {
          setOpenPopUp((prev) => !prev);
        }}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add new user</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {addNewUserFormControls.map((user) => {
              return (
                <div className="" key={user.name}>
                  <Label
                    htmlFor={user.label}
                    className="text-right"
                  >
                    {user.label}
                  </Label>
                  <Input
                    name={user.name}
                    id={user.name}
                    className="col-span-3"
                    placeholder={user.placeholder}
                    value={userData[user.name]}
                    onChange={(e) => {
                      setUserData({
                        ...userData,
                        [user.name]: e.target.value,
                      });
                    }}
                  />
                </div>
              );
            })}
          </div>
          <DialogFooter>
            <Button
              type="submit"
              onClick={getData}
              onOpenChange={() => {
                setOpenPopUp;
              }}
            >
              {!isLoading
                ? "save the user"
                : "saving the user..."}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddUser;
