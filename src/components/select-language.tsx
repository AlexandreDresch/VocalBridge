import * as Select from "@radix-ui/react-select";
import { languages } from "../constants/languages";
import { getLanguageFlag, getLanguageName } from "../utils/language-functions";
import { useContext } from "react";
import { NotesContext } from "../providers/notes-context";

interface SelectLanguageButtonProps {
  isLoading: boolean;
}

export default function SelectLanguageButton({
  isLoading,
}: SelectLanguageButtonProps) {
  const { language, setLanguage } = useContext(NotesContext);

  return (
    <Select.Root value={language} onValueChange={setLanguage}>
      <Select.Trigger
        className="bg-transparent border border-tertiary p-3 flex gap-2 items-center justify-center relative disabled:cursor-wait disabled:bg-tertiary/50"
        disabled={isLoading}
      >
        <Select.Icon>{getLanguageFlag(language)}</Select.Icon>

        <Select.Value aria-label={language} placeholder="Select a language">
          {getLanguageName(language)}
        </Select.Value>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content className="z-20 bg-primary rounded-sm overflow-hidden inset-0 fixed md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 outline-none">
          <Select.ScrollUpButton />
          <Select.Viewport className="flex flex-col items-center justify-center gap-1 p-3">
            <Select.Group>
              <Select.Label className="text-center text-lg my-2 font-medium text-secondary tracking-wide">
                LANGUAGES
              </Select.Label>

              {languages.map((language) => (
                <Select.Item
                  value={language.slug}
                  key={language.slug}
                  className="hover:bg-tertiary hover:cursor-pointer text-sm w-full text-center outline-none"
                >
                  <Select.ItemText>
                    {language.flag} {language.name} - {language.nativeName}
                  </Select.ItemText>
                  <Select.ItemIndicator />
                </Select.Item>
              ))}
            </Select.Group>

            <Select.Separator />
          </Select.Viewport>
          <Select.ScrollDownButton />
          <Select.Arrow />
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}
