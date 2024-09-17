import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import Login from "./Login";
import SignUp from "./SignUp";

export default function LoginDialog({ trigger }) {
  return (
    <Dialog>
      {typeof trigger == "string" ? (
        <DialogTrigger>{trigger}</DialogTrigger>
      ) : (
        <DialogTrigger asChild>{trigger}</DialogTrigger>
      )}
      <DialogContent>
        <DialogTitle />
        <DialogDescription>
          <Tabs defaultValue="login">
            <TabsList className="w-full">
              <TabsTrigger value="login" className="grow">
                Login
              </TabsTrigger>
              <TabsTrigger value="signUp" className="grow">
                Sign Up
              </TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <Login />
            </TabsContent>
            <TabsContent value="signUp">
              <SignUp />
            </TabsContent>
          </Tabs>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
