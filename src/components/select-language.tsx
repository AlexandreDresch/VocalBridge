import * as Select from "@radix-ui/react-select";
import { languages } from "../utils/languages";
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
        className="bg-slate-800 p-3 flex gap-2 items-center justify-center relative disabled:cursor-wait disabled:bg-slate-800/50"
        disabled={isLoading}
      >
        <Select.Icon>
          {getLanguageFlag(language)}
          {language.length === 0 && "Select a language"}
        </Select.Icon>

        <Select.Value aria-label={language}>
          {getLanguageName(language)}
        </Select.Value>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content className="z-20 bg-slate-500 rounded-sm overflow-hidden inset-0 fixed md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 outline-none">
          <Select.ScrollUpButton />
          <Select.Viewport className="flex flex-col gap-1">
            {languages.map((language) => (
              <Select.Item
                value={language.slug}
                key={language.slug}
                className="hover:bg-slate-400 text-sm w-full text-center"
              >
                <Select.ItemText>
                  {language.flag} {language.name} - {language.nativeName}
                </Select.ItemText>
                <Select.ItemIndicator />
              </Select.Item>
            ))}
            <Select.Separator />
          </Select.Viewport>
          <Select.ScrollDownButton />
          <Select.Arrow />
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}
