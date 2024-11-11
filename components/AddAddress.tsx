import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
} from "@/components/ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { AddressFormValues } from "@/lib/validations";

const AddAddress = ({
  open,
  onOpenChange,
  formValues,
  onInputChange,
  onSubmit,
  errors,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  formValues: AddressFormValues;
  onInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onSubmit: () => void;
  errors: { [key in keyof AddressFormValues]?: string };
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[50rem] h-[40rem]">
        <DialogHeader className={"hidden"}>
          <DialogTitle />
        </DialogHeader>
        <div className="w-full h-full">
          <h1 className="text-xl font-sans font-medium hidden">Add address</h1>
          <div className="w-full absolute h-[calc(100%-28px)] overflow-y-scroll left-0 bottom-0 flex flex-col items-start justify-start px-6 pt-4 pb-8">
            <div className="w-full h-auto flex flex-col items-start justify-start gap-1 mt-3">
              <p>Name</p>
              <Input
                type="text"
                name="name"
                value={formValues.name}
                onChange={onInputChange}
                className={`border-gray-500 h-10 `}
                placeholder="Enter name"
              />
              {errors.name && (
                <span className="text-red-500">{errors.name}</span>
              )}
            </div>
            <div className="w-full h-auto flex flex-col items-start justify-start gap-1 mt-3">
              <p>Email</p>
              <Input
                type="email"
                name="email"
                value={formValues.email}
                onChange={onInputChange}
                className={`border-gray-500 h-10 `}
                placeholder="Enter email"
              />
              {errors.email && (
                <span className="text-red-500">{errors.email}</span>
              )}
            </div>
            <div className="w-full h-auto flex items-center justify-center gap-4 mt-3">
              <div className="w-[50%] h-auto flex flex-col items-start justify-start gap-1">
                <p>Mobile no.</p>
                <Input
                  type="text"
                  name="mobileNo"
                  value={formValues.mobileNo}
                  onChange={onInputChange}
                  className={`border-gray-500 h-10`}
                  placeholder="Enter mobile number"
                />
                {errors.mobileNo && (
                  <span className="text-red-500">{errors.mobileNo}</span>
                )}
              </div>
              <div className="w-[50%] h-auto flex flex-col items-start justify-start gap-1">
                <p>Pin code</p>
                <Input
                  type="text"
                  name="pinCode"
                  value={formValues.pinCode}
                  onChange={onInputChange}
                  className={`border-gray-500 h-10 `}
                  placeholder="Enter pin code"
                />
                {errors.pinCode && (
                  <span className="text-red-500">{errors.pinCode}</span>
                )}
              </div>
            </div>
            <div className="w-full h-auto flex flex-col items-start justify-start gap-1 mt-3">
              <p>Address</p>
              <Textarea
                name="address"
                value={formValues.address}
                onChange={onInputChange}
                placeholder="Enter your address"
                className={`min-h-20 max-h-60 border-gray-500 `}
              />
              {errors.address && (
                <span className="text-red-500">{errors.address}</span>
              )}
            </div>
            <div className="w-full h-auto flex flex-col items-start justify-start gap-1 mt-3">
              <p>Area</p>
              <Input
                type="text"
                name="area"
                value={formValues.area}
                onChange={onInputChange}
                className={`border-gray-500 h-10 `}
                placeholder="Enter area"
              />
              {errors.area && (
                <span className="text-red-500">{errors.area}</span>
              )}
            </div>
            <div className="w-full h-auto flex flex-col items-start justify-start gap-1 mt-3">
              <p>Landmark</p>
              <Input
                type="text"
                name="landmark"
                value={formValues.landmark}
                onChange={onInputChange}
                className={`border-gray-500 h-10 `}
                placeholder="Enter landmark"
              />
              {errors.landmark && (
                <span className="text-red-500">{errors.landmark}</span>
              )}
            </div>
            <div className="w-full h-auto flex items-center justify-center gap-4 mt-3">
              <div className="w-[50%] h-auto flex flex-col items-start justify-start gap-1">
                <p>City</p>
                <Input
                  type="text"
                  name="city"
                  value={formValues.city}
                  onChange={onInputChange}
                  className={`border-gray-500 h-10`}
                  placeholder="Enter your city"
                />
                {errors.city && (
                  <span className="text-red-500">{errors.city}</span>
                )}
              </div>
              <div className="w-[50%] h-auto flex flex-col items-start justify-start gap-1">
                <p>State</p>
                <Input
                  type="text"
                  name="state"
                  value={formValues.state}
                  onChange={onInputChange}
                  className={`border-gray-500 h-10 `}
                  placeholder="Enter state"
                />
                {errors.state && (
                  <span className="text-red-500">{errors.state}</span>
                )}
              </div>
            </div>
            <div className="w-full h-auto mt-4">
              <Button className="w-full" onClick={onSubmit}>
                Submit
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddAddress;
