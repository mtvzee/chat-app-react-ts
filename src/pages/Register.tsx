import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { HiOutlinePhotograph } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { auth, db, storage } from '../firebase';

type FormData = {
  displayName: string;
  email: string;
  password: string;
  file: File[];
};

const Register = () => {
  const [error, setError] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      // 新しくアカウントを作成
      await createUserWithEmailAndPassword(auth, data.email, data.password);

      // Cloud Storageにアバター画像をアップロード
      const avatarRef = ref(storage, `avatar/${auth.currentUser?.uid}`);
      await uploadBytes(avatarRef, data.file[0]);

      if (auth.currentUser) {
        // Authenticationにユーザーの情報を追加する(ユーザー名、プロフィール画像のURL)
        const downloadURL = await getDownloadURL(avatarRef);
        await updateProfile(auth.currentUser, {
          displayName: data.displayName,
          photoURL: downloadURL,
        });
        // 他のユーザーが自分のユーザー情報を参照できるようにfirestoreにユーザー情報を作成
        await setDoc(doc(db, `userInfo/${auth.currentUser.uid}`), {
          displayName: data.displayName,
          email: data.email,
          photoURL: downloadURL,
          // uid: auth.currentUser.uid,
        });
      }
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className="bg-primary h-screen flex items-center justify-center">
      <div className="bg-white  rounded-md py-5 px-10 w-[400px] h-[425px] justify-center">
        <h1 className="text-2xl text-center">アカウントを登録する</h1>
        <form className="mt-8 space-y-7" onSubmit={handleSubmit(onSubmit)}>
          <div className="relative">
            <input
              className={`form-input ${
                errors.displayName && 'error-form-input'
              }`}
              type="text"
              placeholder="名前"
              {...register('displayName', {
                required: '名前を入力してください',
                minLength: { value: 3, message: '3文字以上にしてください' },
                maxLength: { value: 10, message: '10文字以下にしてください' },
              })}
            />
            {errors.displayName && (
              <p className="error-form-msg">{errors.displayName.message}</p>
            )}
          </div>
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
          <div className="relative">
            <input
              className={`form-input ${errors.file && 'error-form-input'}`}
              type="file"
              id="file"
              style={{ display: 'none' }}
              {...register('file', {
                required: 'アイコン画像を選択してください',
              })}
            />
            <label
              htmlFor="file"
              className="flex items-center space-x-2 cursor-pointer max-w-fit"
            >
              <HiOutlinePhotograph className="w-8 h-8" />
              <span>アイコン画像を追加</span>
            </label>
            {errors.file && (
              <p className="error-form-msg">{errors.file.message}</p>
            )}
          </div>
          <button className="w-full bg-red-500 text-white py-2 rounded-md hover:scale-105 transition">
            登録
          </button>
          {error && (
            <span className="text-sm text-red-600">登録できません</span>
          )}
        </form>
        <p className="mt-2 text-sm">
          既にアカウントを持っている。
          <Link to="/login" className="underline">
            ログイン
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
