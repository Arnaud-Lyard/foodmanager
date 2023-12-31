import Image from "next/image";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
import { UploadAvatar } from "../components/UploadAvatar";
import { useUser } from "../hooks/auth/useUser";
import { useLogout } from "../hooks/auth/useLogout";

export default function Profile() {
  const [editMode, setEditMode] = useState(false);
  const [newAvatarUrl, setNewAvatarUrl] = useState("");
  const { user: currentUser } = useUser();
  const { logout } = useLogout();
  const router = useRouter();

  const getNewAvatarUrl = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setEditMode(true);
      setNewAvatarUrl(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <p className="font-bold text-2xl">Welcome back</p>
      <div className="font-semibold">You are: {currentUser?.name}</div>
      {currentUser?.photo && (
        <img alt="" className="max-w-120 max-h-80" src={currentUser.photo} />
      )}
      <input
        type="file"
        accept="image/png, image/jpeg, image/jpg"
        onChange={getNewAvatarUrl}
        className="mt-2 border border-solid border-black py-2 px-4 rounded cursor-pointer"
      />
      <button
        onClick={() => {
          logout();
          router.push("/login");
        }}
        className="mt-2 border border-solid border-black py-2 px-4 rounded cursor-pointer"
      >
        Logout
      </button>
      {editMode && (
        <UploadAvatar
          // refetchUser={refetchUser}
          cancelEdit={() => setEditMode(false)}
          userId={currentUser?.id || ""}
          avatarUrl={newAvatarUrl}
        />
      )}
    </div>
  );
}
