import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { auth } from "../firebase";

type FormData = {
  email: string;
  password: string;
};

const Login = () => {
  const [error, setError] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
    } catch (err) {
      console.error(err);
      setError(true);
    }
  };

  return (
    <div className="bg-primary h-screen flex items-center justify-center">
      <div className="bg-white  rounded-lg py-5 px-10 w-[400px] h-[350px] justify-center">
        <h1 className="text-3xl text-center">ログイン</h1>
        <form className="mt-[25px]" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-10">
            <div className="relative">
              <input
                className="form-input"
                placeholder=" "
                type="email"
                {...register("email", {
                  required: "メールアドレスを入力してください",
                })}
              />
              <span className="form-span">メールアドレス</span>
              <i className="form-i" />
              {errors.email && (
                <p className="error-form-msg">{errors.email.message}</p>
              )}
            </div>
            <div className="relative">
              <input
                className={`form-input`}
                placeholder=" "
                type="password"
                {...register("password", {
                  required: "パスワードを入力してください",
                  minLength: { value: 8, message: "8文字以上にしてください" },
                  maxLength: { value: 15, message: "15文字以下にしてください" },
                })}
              />
              <span className="form-span">パスワード</span>
              <i className="form-i" />
              {errors.password && (
                <p className="error-form-msg">{errors.password.message}</p>
              )}
            </div>
          </div>
          <div className="relative mt-7">
            <button className=" bg-primary text-white py-2 px-6 rounded-md font-bold hover:scale-105 transition">
              ログイン
            </button>
            {error && (
              <span className="text-sm text-red-600 absolute -bottom-5 left-0">
                ログインできません
              </span>
            )}
          </div>
        </form>
        <p className="text-sm mt-5">
          アカウントを持っていない？
          <Link to="/register" className="underline">
            作成
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
