declare module "markdown-it-sup";

interface Window {
  grecaptcha: any;
}

interface IBeaconSection {
  title?: string;
  enabled: boolean;
  content: string;
  urls?: string[];
  props: {
    verseRef?: string;
    autoFill?: boolean;
    translation?: string;
    email?: string;
    copyright?: string;
  }
}