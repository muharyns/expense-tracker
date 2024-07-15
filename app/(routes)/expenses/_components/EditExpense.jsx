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
import { Trash, Pen } from "lucide-react";

import { predefinedCategories } from "@/utils/schema";
import CreatableSelect from "react-select/creatable";
import { changeToDate } from "@/lib/utils";

function EditExpense({ dataEdit, refreshData }) {
  const [emojiIcon, setEmojiIcon] = useState(dataEdit.icon);
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);

  const { user } = useUser();
  const [category, setCategory] = useState({
    label: dataEdit.category,
    value: dataEdit.category,
  });

  const [newData, setnewData] = useState(dataEdit);

  const [icon, setIcon] = useState("");
  const [message, setMessage] = useState("");

  const handleCategoryChange = (val) => {
    setCategory(val);
  };

  const onUpdateExpense = async () => {
    // console.log("newData.createdAt", newData.createdAt);
    // return;
    const updatedExpense = {
      name: newData.name,
      amount: newData.amount,
      category: category?.label,
      createdAt: newData.createdAt,
      icon: emojiIcon,
    };

    try {
      const response = await axios.put(
        `/api/expenses/${newData.id}`,
        updatedExpense
      );
      if (response) {
        refreshData();
        toast("Expense Updated!");
      }
    } catch (error) {
      toast(
        `Error: ${error.response ? error.response.data.message : error.message}`
      );
    }
  };
  const handleChange = (e) => {
    setnewData({ ...newData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Pen className="text-blue-600 cursor-pointer" />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Expense</DialogTitle>
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
                      //handleChange;
                      setOpenEmojiPicker(false);
                    }}
                    name="icon"
                  />
                </div>
                <div className="mt-2">
                  <h2 className="text-black font-medium my-1">Expense Name</h2>
                  <Input
                    placeholder="e.g. Home Decor"
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
                    placeholder="e.g. $1000"
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
                    onChange={handleCategoryChange}
                    name="category"
                    defaultValue={{
                      label: newData.category,
                      value: newData.category,
                    }}
                    // className="block w-full rounded-md"
                  />
                </div>
                <div className="mt-2">
                  <h2 className="text-black font-medium my-1">Date</h2>
                  <Input
                    //  type="datetime-local"

                    type="date"
                    value={changeToDate(newData.createdAt)}
                    onChange={handleChange}
                    name="createdAt"
                    style={{ display: "block" }}
                  />
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button
                onClick={() => onUpdateExpense()}
                //disabled={!(name && amount && category && createdAt)}
                className="mt-5 w-full"
              >
                Update Expense
              </Button>
              {/* {message && <p>{message}</p>} */}
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default EditExpense;
