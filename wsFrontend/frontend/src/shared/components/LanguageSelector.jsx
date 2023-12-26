import { useTranslation } from "react-i18next";

export function LanguageSelector() {
  const { i18n } = useTranslation();

  const onSelectLanguage = (language) => {
    i18n.changeLanguage(language);
    localStorage.setItem("lang", language);
  };
  return (
    <>
      <img
        role="button"
        src="https://flagcdn.com/16x12/tr.png"
        width="16"
        height="12"
        alt="Turkce"
        onClick={() => onSelectLanguage("tr")}
      ></img>
      <img
        role="button"
        src="https://flagcdn.com/16x12/us.png"
        width="16"
        height="12"
        alt="English"
        onClick={() => onSelectLanguage("en")}
      ></img>
    </>
  );
}
