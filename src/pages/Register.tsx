import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { HiOutlinePhotograph } from "react-icons/hi";
import { Link } from "react-router-dom";
import { auth, db, storage } from "../firebase";

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
        });
        // 空のfriendListを作成
        await setDoc(doc(db, "friendList", auth.currentUser.uid), {});
      }
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className="bg-primary h-screen flex items-center justify-center">
      <div className="bg-white  rounded-lg py-5 px-10 w-[450px] h-[500px] justify-center">
        <h1 className="text-2xl text-center">アカウントを登録</h1>
        <form className="mt-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-10">
            <div className="relative">
              <input
                className="form-input"
                placeholder=" "
                type="text"
                {...register("displayName", {
                  required: "名前を入力してください",
                  minLength: { value: 3, message: "3文字以上にしてください" },
                  maxLength: { value: 10, message: "10文字以下にしてください" },
                })}
              />
              <span className="form-span">名前</span>
              <i className="form-i" />
              {errors.displayName && (
                <p className="error-form-msg">{errors.displayName.message}</p>
              )}
            </div>
            <div className="relative">
              <input
                className="form-input"
                type="email"
                placeholder=" "
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
                className="form-input"
                type="password"
                placeholder=" "
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
          <div className="relative mt-5">
            <input
              type="file"
              id="file"
              style={{ display: "none" }}
              {...register("file", {
                required: "アイコン画像を選択してください",
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
          <div className="relative mt-7">
            <button className="bg-primary text-white py-2 px-6 rounded-md font-bold hover:scale-105 transition">
              登録
            </button>
            {error && (
              <span className="text-sm text-red-600 absolute -bottom-5 left-0">
                アカウントを登録できません
              </span>
            )}
          </div>
        </form>
        <p className="mt-5 text-sm">
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
