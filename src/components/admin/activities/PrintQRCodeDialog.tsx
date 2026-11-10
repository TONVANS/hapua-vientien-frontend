import React, { useRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Printer } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { Activity } from '@/types';

interface PrintQRCodeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  activity: Activity | null;
}

export function PrintQRCodeDialog({ isOpen, onClose, activity }: PrintQRCodeDialogProps) {
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    if (printRef.current) {
      const printContents = printRef.current.innerHTML;
      const printWindow = window.open('', '_blank');
      
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>Print QR Code - ${activity?.name}</title>
              <style>
                body {
                  font-family: 'Inter', system-ui, sans-serif;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  height: 100vh;
                  margin: 0;
                  text-align: center;
                }
                .container {
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  gap: 24px;
                }
                .title {
                  font-size: 32px;
                  font-weight: bold;
                  color: #0a1f66;
                  margin-bottom: 8px;
                }
                .subtitle {
                  font-size: 18px;
                  color: #747781;
                }
                svg {
                  width: 300px;
                  height: 300px;
                }
              </style>
            </head>
            <body>
              <div class="container">
                ${printContents}
              </div>
              <script>
                window.onload = () => {
                  window.print();
                  setTimeout(() => window.close(), 500);
                }
              </script>
            </body>
          </html>
        `);
        printWindow.document.close();
      }
    }
  };

  if (!activity) return null;

  // URL for the public check-in page
  const checkInUrl = `${window.location.origin}/activities/${activity.qrCode || activity.id}`;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md bg-brand-surface border-brand-line">
        <DialogHeader>
          <DialogTitle className="text-brand-icewhite">Print QR Code</DialogTitle>
          <DialogDescription className="text-brand-muted">
            Print this QR code for delegates to scan and register their attendance.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center justify-center p-6 bg-brand-darknavy rounded-xl border border-brand-line my-4">
          <div ref={printRef} className="flex flex-col items-center justify-center p-8 bg-brand-contrast rounded-xl print:p-0 print:w-full print:h-screen print:justify-center">
            {/* The QR Code */}
            <div className="p-4 bg-white rounded-2xl shadow-sm border border-brand-darktext/10 print:border-none print:shadow-none">
              <QRCodeSVG
                value={checkInUrl}
                size={256}
                level="H"
                includeMargin={true}
                fgColor="#0a1f66"
              />
            </div>
            
            {/* Activity Info */}
            <div className="mt-6 text-center max-w-[300px]">
              <h2 className="text-xl font-bold text-brand-darktext print:text-4xl">{activity.name}</h2>
              <p className="text-sm text-slate-600 mt-2 print:text-xl print:mt-4">
                Scan this QR code to check in
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose} className="rounded-xl">
            Cancel
          </Button>
          <Button onClick={handlePrint} className="bg-brand-electric hover:bg-brand-royal text-white rounded-xl">
            <Printer className="w-4 h-4 mr-2" />
            Print QR Code
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
