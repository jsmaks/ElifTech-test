import { RegisterForm } from "./components/register-form";

const RegisterPage = () => {
  return (
    <div className="p-5 ">
      <h2 className="text-center font-bold text-xl xl:text-2xl mb-10">Register Form</h2>
      <div className="h-full w-full flex items-center justify-center">
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;
