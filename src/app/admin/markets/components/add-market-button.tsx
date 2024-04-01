"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddMarketForm from "./add-market-form";

export default function AddMarketButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="!bg-yellow">Add Market</Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-white">Add a Market</DialogTitle>
        </DialogHeader>
        <AddMarketForm />
      </DialogContent>
    </Dialog>
  );
}
