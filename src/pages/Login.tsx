import { SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

type FormData = {
  email: string;
  password: string;
};

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {};

  return (
    <div className="bg-primary h-screen flex items-center justify-center">
      <div className="bg-white  rounded-md py-5 px-10 w-[400px] h-[300px] justify-center">
        <h1 className="text-2xl text-center">ログイン</h1>
        <form className="mt-10 space-y-7" onSubmit={handleSubmit(onSubmit)}>
          <div className="relative">
            <input
              className={`form-input ${errors.email && 'error-form-input'}`}
              type="email"
              placeholder="メールアドレス"
              {...register('email', {
                required: 'メールアドレスを入力してください',
              })}
            />
            {errors.email && (
              <p className="error-form-msg">{errors.email.message}</p>
            )}
          </div>
          <div className="relative">
            <input
              className={`form-input ${errors.password && 'error-form-input'}`}
              type="password"
              placeholder="パスワード"
              {...register('password', {
                required: 'パスワードを入力してください',
                minLength: { value: 8, message: '8文字以上にしてください' },
                maxLength: { value: 15, message: '15文字以下にしてください' },
              })}
            />
            {errors.password && (
              <p className="error-form-msg">{errors.password.message}</p>
            )}
          </div>
          <button className="w-full bg-red-500 text-white py-2 rounded-md hover:scale-105 transition">
            ログイン
          </button>
        </form>
        <p className="text-center mt-1">
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
