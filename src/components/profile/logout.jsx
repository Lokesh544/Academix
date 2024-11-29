import { Button } from "@/components/ui/button";
import { localdata } from "@/localdata";
import { LogOutIcon } from "lucide-react";

export async function logout() {
  localdata.removeUsername();
  localdata.removeUserpassword();
  setTimeout(() => {
    window.location.href = "/";
  }, 1000);
}

export default function Logout({ withButton }) {
  if (withButton)
    return (
      <Button onClick={logout}>
        <LogOutIcon className="mr-2" />
        <span>Logout</span>
      </Button>
    );
  return (
    <>
      <LogOutIcon className="mr-2" />
      <span>Logout</span>
    </>
  );
}
