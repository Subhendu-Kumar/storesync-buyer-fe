"use client";

import { Address } from "@/types";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import AddAddress from "./AddAddress";
import { useToast } from "@/hooks/use-toast";
import { getBuyerDetails } from "@/lib/utils";
import { FaCircleNotch } from "react-icons/fa6";
import { MdDeleteForever } from "react-icons/md";
import { addAddress, deleteAddress, getAddresses } from "@/api";
import React, { useEffect, useState } from "react";
import AlertDialogLoader from "./AlertDialogLoader";
import { AddressFormValues, addressSchema } from "@/lib/validations";
import ConfirmDialog from "./ConfirmDialog";

const ShowAllAddresses = () => {
  const { toast } = useToast();
  const [fetching, setFetching] = useState<boolean>(false);
  const [deleting, setDeleting] = useState<boolean>(false);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [addressIdToDelete, setAddressIdToDelete] = useState<string>("");
  const [filteredAddresses, setFilteredAddresses] = useState<Address[]>([]);
  const [openConfirmationDialog, setOpenConfirmationDialog] =
    useState<boolean>(false);
  const [openAddAddressDialog, setOpenAddAddressDialog] =
    useState<boolean>(false);
  const [errors, setErrors] = useState<{
    [key in keyof AddressFormValues]?: string;
  }>({});
  const [buyerDetails, setBuyerDetails] = useState<{
    name: string;
    id: string;
  } | null>(getBuyerDetails());
  const [formValues, setFormValues] = useState<AddressFormValues>({
    name: "",
    mobileNo: "",
    email: "",
    address: "",
    area: "",
    landmark: "",
    pinCode: "",
    city: "",
    state: "",
  });

  console.log(addresses);

  useEffect(() => {
    const buyerDetails = getBuyerDetails();
    setBuyerDetails(buyerDetails);
  }, []);

  const fetchAddresses = async () => {
    setFetching(true);
    try {
      const res = await getAddresses(buyerDetails?.id || "");
      console.log(res);
      if (res?.status === 200) {
        setAddresses(res?.data);
      } else {
        toast({
          title: "Error: failed to fetch addresses",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Error: failed to fetch addresses",
        variant: "destructive",
      });
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, [buyerDetails, toast]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = (): boolean => {
    const result = addressSchema.safeParse(formValues);
    if (result.success) {
      setErrors({});
      return true;
    } else {
      const fieldErrors: { [key in keyof AddressFormValues]?: string } = {};
      result.error.errors.forEach((err) => {
        if (err.path[0] in formValues) {
          fieldErrors[err.path[0] as keyof AddressFormValues] = err.message;
        }
      });
      setErrors(fieldErrors);
      return false;
    }
  };

  const onSubmit = async () => {
    if (validateForm()) {
      setIsLoading(true);
      try {
        const res = await addAddress(buyerDetails?.id || "", formValues);
        if (res?.status === 201) {
          toast({
            title: "Success",
            description: "Successfully added address",
          });
          fetchAddresses();
        } else {
          toast({
            title: "Error: Failed to add address",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.log(error);
        toast({
          title: "Error: Failed to add address",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
        setOpenAddAddressDialog(false);
        setFormValues({
          name: "",
          mobileNo: "",
          email: "",
          address: "",
          area: "",
          landmark: "",
          pinCode: "",
          city: "",
          state: "",
        });
      }
    }
  };

  useEffect(() => {
    if (searchQuery) {
      const filtered = addresses.filter(
        (address) =>
          address.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          address.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
          address.area.toLowerCase().includes(searchQuery.toLowerCase()) ||
          address.pinCode
            .toString()
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
      );
      setFilteredAddresses(filtered);
    } else {
      setFilteredAddresses(addresses);
    }
  }, [searchQuery, addresses]);

  const handleDeleteAddress = async () => {
    setDeleting(true);
    setIsLoading(true);
    try {
      const res = await deleteAddress(
        buyerDetails?.id || "",
        addressIdToDelete
      );
      if (res?.status === 200) {
        toast({
          title: "Success",
          description: "Successfully deleted address",
        });
        fetchAddresses();
      } else {
        toast({
          title: "Error: Failed to delete address",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Error: Failed to delete address",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setOpenConfirmationDialog(false);
      setDeleting(false);
    }
  };

  return (
    <div className="w-full h-auto">
      <AlertDialogLoader
        open={isLoading}
        title={`${
          deleting ? "Deleting address from server" : "Adding address to server"
        }`}
        onOpenChange={setIsLoading}
      />
      <AddAddress
        open={openAddAddressDialog}
        onOpenChange={setOpenAddAddressDialog}
        formValues={formValues}
        onInputChange={handleInputChange}
        onSubmit={onSubmit}
        errors={errors}
      />
      <ConfirmDialog
        action={handleDeleteAddress}
        open={openConfirmationDialog}
        onOpenChange={setOpenConfirmationDialog}
        title="This will permanently delete the address and remove all data from our servers."
      />
      <div className="w-full h-auto flex items-end justify-between">
        <div className="w-full h-auto flex flex-col items-start justify-start gap-3">
          <h1 className="text-2xl font-sans font-semibold">All my Addresses</h1>
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search my addresses"
            className="w-96 border-gray-500"
          />
        </div>
        <Button
          className="text-lg font-medium"
          onClick={() => setOpenAddAddressDialog(true)}
        >
          Add new address
        </Button>
      </div>
      {fetching ? (
        <div className="w-full h-96 flex items-center justify-center">
          <FaCircleNotch className="animate-spin text-7xl" />
        </div>
      ) : addresses.length === 0 ? (
        <div className="w-full h-96 flex flex-col items-center justify-center mt-8 ">
          <p className="text-3xl text-gray-400 font-sans font-semibold">
            No addresses found
          </p>
        </div>
      ) : (
        <div className="w-full h-auto grid grid-cols-2 gap-4 mt-6">
          {filteredAddresses.map((data, idx) => {
            return (
              <div
                key={idx}
                className="w-full h-auto border border-gray-500 rounded-lg p-4 flex flex-col items-start justify-start gap-1 relative"
              >
                <p className="text-lg font-medium capitalize">{data.name}</p>
                <p className="text-sm font-medium font-sans text-gray-600">
                  Mobile No. {data.mobileNo}
                </p>
                <p className="text-sm font-medium font-sans text-gray-600">
                  Email: {data.email}
                </p>
                <p className="text-sm font-medium font-sans text-gray-600">
                  Address: {data.address} . {data.area} . {data.landmark} .{" "}
                  {data.pinCode}
                </p>
                <button
                  className="absolute top-2 right-2 p-1 rounded-full text-xl text-red-500 bg-gray-300"
                  onClick={() => {
                    setAddressIdToDelete(data?.id.toString());
                    setOpenConfirmationDialog(true);
                  }}
                >
                  <MdDeleteForever />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ShowAllAddresses;
