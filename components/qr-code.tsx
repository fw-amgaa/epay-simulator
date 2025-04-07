import { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import { QRCodeSVG } from "qrcode.react";
import { Textarea } from "./ui/textarea";

export const QRCodeToggle = ({ value }: { value: string }) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="cursor-pointer">
          <QRCodeSVG value={value} size={30} />
        </div>
      </DialogTrigger>
      <DialogContent className="flex flex-col justify-center items-center gap-8">
        <DialogTitle>Нэхэмжлэхийн QR Code</DialogTitle>
        <QRCodeSVG value={value} size={350} />
        <Textarea className="resize-none" readOnly value={value} />
      </DialogContent>
    </Dialog>
  );
};
