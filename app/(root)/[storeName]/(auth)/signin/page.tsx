"use client";

import {
  Card,
  CardTitle,
  CardFooter,
  CardHeader,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { signIn } from "@/api";
import { FromData } from "@/types";
import { use, useState } from "react";
import { FaSync } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { signInSchema } from "@/lib/validations";

const SignIn = ({ params }: { params: Promise<{ storeName: string }> }) => {
  const { storeName } = use(params);
  const router = useRouter();
  const { toast } = useToast();
  const [formData, setFormData] = useState<FromData>({
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
    const result = signInSchema.safeParse(formData);
    if (result.success) {
      setErrors({});
      console.log("Form data:", formData);
      setIsLoading(true);
      try {
        const res = await signIn(formData);
        if (res?.status === 200) {
          toast({
            title: "Success",
            description: "Logged in successfully",
          });
          router.push(`/${storeName}`);
        } else {
          toast({
            title: "Error: something went wrong",
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
          <CardTitle>Sign in to Buy Sync</CardTitle>
          <CardDescription>
            This action will log you in to your account. Please provide valid
            information to access to store.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
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
            <p>Don&apos;t have an account?</p>
            <button
              className="text-base font-sans font-medium hover:underline"
              onClick={() => router.push(`/${storeName}/signup`)}
            >
              Sign Up
            </button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignIn;
