'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { modules } from '@/lib/pricing-data';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface OfferRequestDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedModules: string[];
  userCount: number;
  estimatedPrice: number;
}

export function OfferRequestDialog({
  open,
  onOpenChange,
  selectedModules,
  userCount,
  estimatedPrice,
}: OfferRequestDialogProps) {
  const { t, locale } = useLanguage();
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    email: user?.email || '',
    companyName: '',
    phone: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/request-offer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          selectedModules,
          userCount,
          estimatedPrice,
        }),
      });

      if (response.ok) {
        toast({
          title: t.contact.success,
          variant: 'default',
        });
        onOpenChange(false);
        setFormData({
          fullName: '',
          email: user?.email || '',
          companyName: '',
          phone: '',
          message: '',
        });
      } else {
        throw new Error('Failed to submit');
      }
    } catch (error) {
      toast({
        title: t.contact.error,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const getTranslation = (key: string) => {
    const parts = key.split('.');
    let value: any = t;
    for (const part of parts) {
      value = value[part];
    }
    return value;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t.pricing.requestOffer}</DialogTitle>
          <DialogDescription>
            {t.contact.subtitle}
          </DialogDescription>
        </DialogHeader>

        <div className="mb-4 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold text-[#32406f] mb-2">
            {t.pricing.summary}
          </h4>
          <ul className="space-y-1 text-sm">
            {selectedModules.map((moduleId) => {
              const module = modules.find((m) => m.id === moduleId);
              if (!module) return null;
              return (
                <li key={moduleId}>• {getTranslation(module.nameKey)}</li>
              );
            })}
          </ul>
          <p className="mt-2 text-sm">
            {t.pricing.users}: <strong>{userCount}</strong>
          </p>
          {userCount <= 500 && (
            <p className="mt-1 text-sm">
              {t.pricing.estimatedPrice}:{' '}
              <strong className="text-[#f6821f]">
                {new Intl.NumberFormat('hu-HU').format(estimatedPrice)} Ft/{locale === 'hu' ? 'hó' : 'month'}
              </strong>
            </p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">{t.contact.fullName} *</Label>
              <Input
                id="fullName"
                required
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">{t.contact.email} *</Label>
              <Input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="companyName">{t.contact.companyName}</Label>
              <Input
                id="companyName"
                value={formData.companyName}
                onChange={(e) =>
                  setFormData({ ...formData, companyName: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">{t.contact.phone}</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">{t.contact.message}</Label>
            <Textarea
              id="message"
              rows={4}
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              {locale === 'hu' ? 'Mégse' : 'Cancel'}
            </Button>
            <Button
              type="submit"
              className="bg-[#f6821f] hover:bg-[#e5771e] text-white"
              disabled={loading}
            >
              {loading ? t.contact.sending : t.contact.send}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
