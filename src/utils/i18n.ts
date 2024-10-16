import { getLocales } from "expo-localization";
import { I18n } from "i18n-js";

const i18n = new I18n({
  en: {
    search: "Search your logs",
    memolog: "MemoLog",
    export: "Export",
    import: "Import",
    settings: "Settings",
    account: "Account",
    email: 'Email address',
    plan: 'Your plan',
    free: 'free',
    pro: 'Pro',
    signOut: 'sign out',
    confirmSignOut: 'Are you sure you want to sign out?',
    edit: 'Edit',
    delete: 'Delete',
    restore: 'Restore',
    cancel: 'Cancel',
    trashEmpty: 'The trash is empty',
    save: 'Save',
    done: 'Done',
    cancelEdit: 'Cancel Edit',
    upgrade: 'upgrade',
    exportFinished: 'The file "{{fileName}}" has been successfully saved to your Google Drive. Please import it on your new device.',
    importFinished: 'The file "${{fileName}}" has been successfully imported to this device.',
    upgradeRequiresSignUp: 'You need to sign up before upgrading.',
  },
  ja: {
    search: "メモを検索",
    memolog: "メモログ",
    export: "エクスポート",
    import: "インポート",
    settings: "設定",
    account: "アカウント",
    email: 'メールアドレス',
    plan: '現在のプラン',
    free: 'フリー',
    pro: 'プロ',
    signOut: 'ログアウト',
    confirmSignOut: '本当にログアウトしますか？',
    edit: '編集',
    delete: '削除',
    restore: '復元',
    cancel: 'キャンセル',
    trashEmpty: 'ゴミ箱は空です',
    save: '保存',
    done: '完了',
    cancelEdit: '編集破棄',
    upgrade: 'アップグレード',
    exportFinished: 'ファイル「{{fileName}}」が正常にGoogleドライブに保存されました。新しいデバイスでインポートしてください。',
    importFinished: 'ファイル「{{fileName}}」がこのデバイスに正常にインポートされました！',
    upgradeRequiresSignUp: 'アップグレードする前にサインアップが必要です。',
  },
});

i18n.locale = getLocales()[0].languageCode ?? "en";
i18n.enableFallback = true;

export const isJapanese = getLocales()[0].languageCode === "ja";

export default i18n;
