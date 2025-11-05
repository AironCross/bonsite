'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { modules, calculatePrice } from '@/lib/pricing-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { OfferRequestDialog } from './OfferRequestDialog';
import * as Icons from 'lucide-react';

export function PricingPageContent() {
  const { t, locale } = useLanguage();
  const [step, setStep] = useState(1);
  const [selectedModules, setSelectedModules] = useState<string[]>([]);
  const [userCount, setUserCount] = useState(10);
  const [showDialog, setShowDialog] = useState(false);

  const getTranslation = (key: string) => {
    const parts = key.split('.');
    let value: any = t;
    for (const part of parts) {
      value = value[part];
    }
    return value;
  };

  const getIcon = (iconName: string) => {
    const Icon = (Icons as any)[iconName];
    return Icon ? <Icon className="h-6 w-6" /> : null;
  };

  const handleModuleToggle = (moduleId: string) => {
    setSelectedModules((prev) =>
      prev.includes(moduleId)
        ? prev.filter((id) => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const estimatedPrice = calculatePrice(selectedModules, userCount);
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('hu-HU').format(price);
  };

  const canProceedFromStep1 = selectedModules.length > 0;

  return (
    <div className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-[#32406f] sm:text-5xl mb-4">
            {t.pricing.title}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t.pricing.subtitle}
          </p>
        </div>

        <div className="mb-12">
          <div className="flex items-center justify-center space-x-4">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full ${
                    step >= s
                      ? 'bg-[#f6821f] text-white'
                      : 'bg-gray-200 text-gray-600'
                  } transition-colors`}
                >
                  {step > s ? <CheckCircle2 className="h-6 w-6" /> : s}
                </div>
                {s < 3 && (
                  <div
                    className={`h-1 w-16 ${
                      step > s ? 'bg-[#f6821f]' : 'bg-gray-200'
                    } transition-colors`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-[#32406f] mb-6 text-center">
              {t.pricing.step1}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {modules.map((module) => (
                <Card
                  key={module.id}
                  className={`cursor-pointer transition-all ${
                    selectedModules.includes(module.id)
                      ? 'border-[#f6821f] border-2 bg-[#f6821f]/5'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => handleModuleToggle(module.id)}
                >
                  <CardHeader>
                    <div className="flex items-start space-x-4">
                      <Checkbox
                        checked={selectedModules.includes(module.id)}
                        onCheckedChange={() => handleModuleToggle(module.id)}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <div className="text-[#f6821f]">
                            {getIcon(module.icon)}
                          </div>
                          <CardTitle className="text-lg">
                            {getTranslation(module.nameKey)}
                          </CardTitle>
                        </div>
                        <CardDescription>
                          {getTranslation(module.descriptionKey)}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
            {!canProceedFromStep1 && (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{t.pricing.noModules}</AlertDescription>
              </Alert>
            )}
            <div className="flex justify-end">
              <Button
                size="lg"
                className="bg-[#f6821f] hover:bg-[#e5771e] text-white"
                disabled={!canProceedFromStep1}
                onClick={() => setStep(2)}
              >
                {t.pricing.next}
              </Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-[#32406f] mb-6 text-center">
              {t.pricing.step2}
            </h2>
            <Card>
              <CardHeader>
                <CardTitle>
                  {userCount} {t.pricing.users}
                </CardTitle>
                <CardDescription>
                  {locale === 'hu'
                    ? 'Húzza a csúszkát a kívánt felhasználószámhoz'
                    : 'Drag the slider to the desired number of users'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Slider
                  value={[userCount]}
                  onValueChange={(value) => setUserCount(value[0])}
                  min={1}
                  max={500}
                  step={1}
                  className="mb-4"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>1</span>
                  <span>500</span>
                </div>
              </CardContent>
            </Card>

            {userCount > 500 && (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{t.pricing.customOfferNote}</AlertDescription>
              </Alert>
            )}

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(1)}>
                {t.pricing.back}
              </Button>
              <Button
                size="lg"
                className="bg-[#f6821f] hover:bg-[#e5771e] text-white"
                onClick={() => setStep(3)}
              >
                {t.pricing.next}
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-[#32406f] mb-6 text-center">
              {t.pricing.step3}
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>{t.pricing.selectedModules}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {selectedModules.map((moduleId) => {
                      const module = modules.find((m) => m.id === moduleId);
                      if (!module) return null;
                      return (
                        <li
                          key={moduleId}
                          className="flex items-center justify-between py-2 border-b"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="text-[#f6821f]">
                              {getIcon(module.icon)}
                            </div>
                            <span className="font-medium">
                              {getTranslation(module.nameKey)}
                            </span>
                          </div>
                          <span className="text-sm text-gray-600">
                            {formatPrice(
                              module.basePrice + module.pricePerUser * userCount
                            )}{' '}
                            Ft
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                  <div className="mt-4 pt-4 border-t">
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>
                        {t.pricing.users}:
                      </span>
                      <span>{userCount}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-[#f6821f] border-2">
                <CardHeader className="bg-gradient-to-br from-[#32406f] to-[#3d4d7e] text-white">
                  <CardTitle className="text-2xl">
                    {t.pricing.estimatedPrice}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  {userCount <= 500 ? (
                    <>
                      <div className="text-5xl font-bold text-[#f6821f] mb-2">
                        {formatPrice(estimatedPrice)}
                      </div>
                      <div className="text-gray-600 mb-6">Ft / {locale === 'hu' ? 'hó' : 'month'}</div>
                    </>
                  ) : (
                    <Alert className="mb-4">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        {t.pricing.customOffer}
                      </AlertDescription>
                    </Alert>
                  )}
                  <Button
                    size="lg"
                    className="w-full bg-[#f6821f] hover:bg-[#e5771e] text-white"
                    onClick={() => setShowDialog(true)}
                  >
                    {t.pricing.requestOffer}
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-start">
              <Button variant="outline" onClick={() => setStep(2)}>
                {t.pricing.back}
              </Button>
            </div>
          </div>
        )}
      </div>

      <OfferRequestDialog
        open={showDialog}
        onOpenChange={setShowDialog}
        selectedModules={selectedModules}
        userCount={userCount}
        estimatedPrice={estimatedPrice}
      />
    </div>
  );
}
