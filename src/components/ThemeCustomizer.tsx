
import React from 'react';
import { useTheme, ThemeColor, ThemeMode, FontFamily } from '@/contexts/ThemeContext';
import { Check, Monitor, Moon, Sun } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

export const ThemeCustomizer: React.FC = () => {
  const { mode, color, font, setMode, setColor, setFont } = useTheme();

  const colors: { value: ThemeColor; label: string; bgClass: string }[] = [
    { value: 'blue', label: 'Blue', bgClass: 'bg-theme-blue' },
    { value: 'indigo', label: 'Indigo', bgClass: 'bg-theme-indigo' },
    { value: 'purple', label: 'Purple', bgClass: 'bg-theme-purple' },
    { value: 'pink', label: 'Pink', bgClass: 'bg-theme-pink' },
    { value: 'red', label: 'Red', bgClass: 'bg-theme-red' },
    { value: 'orange', label: 'Orange', bgClass: 'bg-theme-orange' },
    { value: 'green', label: 'Green', bgClass: 'bg-theme-green' },
  ];

  const modes: { value: ThemeMode; label: string; icon: React.ReactNode }[] = [
    { value: 'light', label: 'Light', icon: <Sun className="h-4 w-4" /> },
    { value: 'dark', label: 'Dark', icon: <Moon className="h-4 w-4" /> },
    { value: 'system', label: 'System', icon: <Monitor className="h-4 w-4" /> },
  ];

  const fonts: { value: FontFamily; label: string }[] = [
    { value: 'inter', label: 'Inter' },
    { value: 'poppins', label: 'Poppins' },
    { value: 'roboto', label: 'Roboto' },
    { value: 'montserrat', label: 'Montserrat' },
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Theme Mode</h3>
        <RadioGroup
          defaultValue={mode}
          onValueChange={(value) => setMode(value as ThemeMode)}
          className="flex items-center space-x-2"
        >
          {modes.map((modeOption) => (
            <div key={modeOption.value} className="flex items-center space-x-2">
              <RadioGroupItem
                value={modeOption.value}
                id={`mode-${modeOption.value}`}
                className="sr-only"
              />
              <Label
                htmlFor={`mode-${modeOption.value}`}
                className={cn(
                  "flex items-center justify-center rounded-md border-2 border-muted p-2 cursor-pointer hover:border-primary",
                  mode === modeOption.value && "border-primary"
                )}
              >
                {modeOption.icon}
                <span className="ml-2">{modeOption.label}</span>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-medium">Theme Color</h3>
        <RadioGroup
          defaultValue={color}
          onValueChange={(value) => setColor(value as ThemeColor)}
          className="grid grid-cols-4 gap-2"
        >
          {colors.map((colorOption) => (
            <div key={colorOption.value} className="flex items-center space-x-2">
              <RadioGroupItem
                value={colorOption.value}
                id={`color-${colorOption.value}`}
                className="sr-only"
              />
              <Label
                htmlFor={`color-${colorOption.value}`}
                className="cursor-pointer"
              >
                <div
                  className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center",
                    colorOption.bgClass
                  )}
                >
                  {color === colorOption.value && (
                    <Check className="h-6 w-6 text-white" />
                  )}
                </div>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-medium">Font Family</h3>
        <RadioGroup
          defaultValue={font}
          onValueChange={(value) => setFont(value as FontFamily)}
          className="grid grid-cols-2 gap-2"
        >
          {fonts.map((fontOption) => (
            <div key={fontOption.value} className="flex items-center space-x-2">
              <RadioGroupItem
                value={fontOption.value}
                id={`font-${fontOption.value}`}
                className="sr-only"
              />
              <Label
                htmlFor={`font-${fontOption.value}`}
                className={cn(
                  "flex w-full items-center justify-center rounded-md border-2 border-muted p-3 cursor-pointer hover:border-primary",
                  font === fontOption.value && "border-primary"
                )}
                style={{ fontFamily: fontOption.value }}
              >
                <span className="text-sm">{fontOption.label}</span>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
};
