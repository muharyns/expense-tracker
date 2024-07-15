"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EmojiPicker from "emoji-picker-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { db } from "@/utils/dbConfig";
// import { Budgets } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import axios from "axios";

import { predefinedCategories } from "@/utils/schema";
import CreatableSelect from "react-select/creatable";

const optionsJobType = [
  { value: 1, label: "Contract" },
  { value: 2, label: "Full Time" },
  { value: 3, label: "Freelance or Gigs" },
  { value: 4, label: "Part Time" },
];

function CreateExpense({ refreshData }) {
  const [emojiIcon, setEmojiIcon] = useState("🔥");
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);

  const [category, setCategory] = useState("");
  const [newData, setnewData] = useState({});

  const handleCategoryChange = (val) => {
    setCategory(val);
  };

  const handleChange = (e) => {
    setnewData({ ...newData, [e.target.name]: e.target.value });
  };

  const onCreateExpense = async () => {
    try {
      const response = await axios.post("/api/expenses", {
        name: newData.name,
        amount: newData.amount,
        emojiIcon,
        category: category?.label,
        createdAt: newData.createdAt,
      });

      if (response) {
        refreshData();
        toast("New Budget Created!");
      } else {
        toast("Failed to Create New Budget!");
      }
      setnewData({});
    } catch (error) {
      toast(
        `Error: ${error.response ? error.response.data.message : error.message}`
      );
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <div className="bg-slate-100 p-10 rounded-md items-center flex flex-col border-2 border-dashed cursor-pointer hover:shadow-md">
            <h2 className="text-3xl">+</h2>
            <h2>Create New Expense</h2>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Expense</DialogTitle>
            <DialogDescription>
              <div className="mt-5">
                <Button
                  variant="outline"
                  className="text-lg"
                  onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
                >
                  {emojiIcon}
                </Button>

                <div className="absolute z-20">
                  <EmojiPicker
                    open={openEmojiPicker}
                    onEmojiClick={(e) => {
                      setEmojiIcon(e.emoji);
                      setOpenEmojiPicker(false);
                    }}
                    name="icon"
                  />
                </div>
                <div className="mt-2">
                  <h2 className="text-black font-medium my-1">Expense Name</h2>
                  <Input
                    placeholder="e.g. Home Decor"
                    //onChange={(e) => setName(e.target.value)}
                    onChange={handleChange}
                    value={newData.name}
                    name="name"
                  />
                </div>
                <div className="mt-2">
                  <h2 className="text-black font-medium my-1">
                    Expense Amount
                  </h2>
                  <Input
                    type="number"
                    placeholder="e.g. 1000"
                    // onChange={(e) => setAmount(e.target.value)}
                    name="amount"
                    onChange={handleChange}
                    value={newData.amount}
                  />
                </div>
                <div className="mt-2">
                  <h2 className="text-black font-medium my-1">Category</h2>
                  <CreatableSelect
                    isClearable
                    options={predefinedCategories}
                    name="category"
                    onChange={handleCategoryChange}
                    //onChange={handleChange}
                    styles={{
                      control: (provided) => ({
                        ...provided,

                        boxShadow: "none",
                        "&:hover": {
                          borderColor: "#000",
                          borderWidth: "2px",
                        },
                        "&:focus": {
                          outline: "none",
                          ring: "2px",
                          ringColor: "#3b82f6",
                        },
                      }),
                    }}
                    // className="block w-full rounded-md"
                  />
                </div>
                <div className="mt-2">
                  <h2 className="text-black font-medium my-1">Date</h2>
                  <Input
                    //  type="datetime-local"
                    type="date"
                    style={{ display: "block" }}
                    value={newData.createdAt}
                    // onChange={(e) => setCreatedAt(e.target.value)}
                    name="createdAt"
                    onChange={handleChange}
                  />
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button
                onClick={() => onCreateExpense()}
                disabled={
                  !(
                    newData.name &&
                    newData.amount &&
                    category &&
                    newData.createdAt
                  )
                }
                className="mt-5 w-full"
              >
                Create Expense
              </Button>
              {/* {message && <p>{message}</p>} */}
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateExpense;
