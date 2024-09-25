const addNewUserFormControls = [
  {
    name: "firstName",
    label: "First Name",
    placeholder: "Enter your first name",
  },
  {
    name: "lastName",
    label: "Last Name",
    placeholder: "Enter your last name",
  },
  {
    name: "email",
    label: "email",
    placeholder: "Enter your email",
  },
  {
    name: "address",
    label: "address",
    placeholder: "Enter your address ",
  },
];

const addNewUserformInitialState = {
  firstName: "",
  lastName: "",
  email: "",
  address: "",
};

export {
  addNewUserFormControls,
  addNewUserformInitialState,
};
