"use client";

import {
  Card,
  CardTitle,
  CardFooter,
  CardHeader,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { signUp } from "@/api";
import { FromData } from "@/types";
import { use, useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { signUpSchema } from "@/lib/validations";
import { FaSync } from "react-icons/fa";

const SignUp = ({ params }: { params: Promise<{ storeName: string }> }) => {
  const { storeName } = use(params);
  const router = useRouter();
  const { toast } = useToast();
  const [formData, setFormData] = useState<FromData>({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<{ [key in keyof FromData]?: string }>(
    {}
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = signUpSchema.safeParse(formData);
    if (result.success) {
      setErrors({});
      console.log("Form data:", formData);
      setIsLoading(true);
      try {
        const res = await signUp(formData);
        if (res?.status === 200) {
          toast({
            title: "Success",
            description: "Account created successfully",
          });
          router.push(`/${storeName}/signin`);
        } else {
          toast({
            title:
              "Error: if you are resgistered with same email in seller portal then use same password as seller portal",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.log(error);
        toast({
          title: "Error: something went wrong",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    } else {
      const errorMessages: { [key in keyof FromData]?: string } = {};
      result.error.errors.forEach((err) => {
        errorMessages[err.path[0] as keyof FromData] = err.message;
      });
      setErrors(errorMessages);
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Card className="w-96 bg-zinc-50">
        <CardHeader>
          <CardTitle>Sign up to Buy Sync</CardTitle>
          <CardDescription>
            This action will create a new account for you. Please provide valid
            information to set up your profile and access to store.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  className="h-10"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                />
                {errors?.name && (
                  <p className="text-red-500 text-sm">{errors?.name}</p>
                )}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  className="h-10"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                />
                {errors?.email && (
                  <p className="text-red-500 text-sm">{errors?.email}</p>
                )}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  className="h-10"
                  onChange={handleChange}
                  value={formData.password}
                  placeholder="Enter your password"
                />
                {errors?.password && (
                  <p className="text-red-500 text-sm">{errors?.password}</p>
                )}
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="w-full h-auto flex items-center justify-center flex-col gap-4">
          <div className="w-full h-auto flex items-center justify-between">
            <Button
              variant="outline"
              onClick={() => router.push(`/${storeName}`)}
            >
              Cancel
            </Button>
            <Button onClick={handleSubmit} className="w-24">
              {isLoading ? (
                <FaSync className="text-white animate-spin" />
              ) : (
                <p>Submit</p>
              )}
            </Button>
          </div>
          <div className="flex items-center justify-center gap-2">
            <p>Already have an account?</p>
            <button
              className="text-base font-sans font-medium hover:underline"
              onClick={() => router.push(`/${storeName}/signin`)}
            >
              Sign In
            </button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignUp;
