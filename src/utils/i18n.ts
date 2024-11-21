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
    email: "Email address",
    plan: "Your plan",
    free: "free",
    pro: "Pro🔥",
    signOut: "sign out",
    confirmSignOut: "Are you sure you want to sign out?",
    edit: "Edit",
    delete: "Delete",
    restore: "Restore",
    cancel: "Cancel",
    trashEmpty: "The trash is empty",
    save: "Save",
    done: "Done",
    cancelEdit: "Cancel Edit",
    upgrade: "upgrade",
    exportFinished: 'The file "{{fileName}}" has been successfully saved to your Google Drive. Please import it on your new device.',
    importFinished: 'The file "${{fileName}}" has been successfully imported to this device.',
    upgradeRequiresLogin: "You need to login before upgrading.",
    register: "Register",
    createAnAccount: "Create an account",
    loginHere: "Login here",
    registerHere: "Register here",
    login: "Login",
    continue: "Continue",
    email_verification_propmt: "Check your inbox to complete the email verification.",
    password: "Password",
    theme: "Theme",
    faq: "FAQ",
    password_reset_instructions: "If the email is registered, you will receive a password reset email. Please check your inbox!",
    confirm_password_reset_title: "Confirm your action",
    confirm_password_reset_message: "Are you sure you want to reset your password?",
    password_reset_email_sent: "A password reset email has been sent to your current email address. Please check your inbox!",
    password_reset_only: "You can only reset your password",
    forget_password: "Forget password",
    already_have_account: "Already have an account?",
    dont_have_account: "Don't have an account?",
    username_requirement: "4-16 characters, letters or numbers only",
    username_already_taken: "This username is already taken. Please choose another one.",
    email_already_registered: "This email address is already registered. Please use a different one.",
    confirmation_email_sent: "A confirmation email has been sent to your new address. Please check your inbox.",
    username: 'username',

    memoLog_overview_question: 'What is MemoLog?',
    memoLog_overview_answer: 'MemoLog is an app for efficiently recording quick notes.\nNotes are saved chronologically, allowing it to function like a diary.',
    
    view_notes_home_question: 'How do I view my notes? (Home Screen)',
    view_notes_home_answer: 'Swipe on the home screen (first screen upon opening the app) to browse all notes.\nYou can also use the search bar at the top right to find notes containing specific keywords.\nIn Japanese, hiragana and katakana are treated differently (“あ” displays notes with “あ”, but not “ア”).\nIn English, uppercase and lowercase are not distinguished (“A” will display both “a” and “A”).',
    
    view_notes_tabs_question: 'How do I view notes? (Tabs)',
    view_notes_tabs_answer: 'Tap the three-line icon at the top left of the home screen.\nBelow the “MemoLog” title, folders for Year, Month, and Day are automatically organized (if there are notes).\nBy selecting Year > Month > Day, you can view notes for each specific date.',
    
    edit_delete_notes_question: 'How do I edit or delete a note?',
    edit_delete_notes_answer: "On the Home or Tab screen, tap the three dots at the top right of a note to edit or delete it.\nFor Free users: No trash feature, but a confirmation alert appears before deletion. The note disappears from view but is retained internally.\nFor Pro users: Deleted notes go to Trash for 7 days. During this time, you can restore them. After 7 days, notes are permanently deleted from both the device and cloud storage.\nTo restore a note, tap the three dots again in Trash.",
    
    security_info_question: 'Is my data secure?',
    security_info_answer: 'For Free users: Notes are saved on your device only, making them safe unless someone has access to the device itself.\nFor Pro users: Notes are saved on both the device and cloud database with encrypted uploads,\nensuring only the device holder can access the data.',
    
    device_transfer_question: 'What should I do when switching devices?',
    device_transfer_answer: 'Currently, only iOS is supported. Data cannot be transferred to Android (planned for release soon).\nFor Free users: Export data from the settings page. A Google account is required.\nAfter export, verify the file in Google Drive and import on your new device.\nFor Pro users: Just log in with the same account to sync notes automatically.',
    
    sign_up_login_question: 'Do I need to sign up or log in?',
    sign_up_login_answer: 'Saving memos itself doesn’t require logging in, but banner ads are hidden when the user is logged in. Additionally, logging in is required to become a Pro user. It is used to automatically sync data across multiple devices.',
    
    platform_availability_question: 'Will there be an Android or PC version?',
    platform_availability_answer: 'Development is underway.\nThe Android version is expected within a few months, with a web version planned for release by 2025.',
    
    email_recovery_question: 'What if I forgot or can’t use my email address?',
    email_recovery_answer: 'Use your registered username to log in.\nIf both are unavailable, account recovery is not possible.',
    
    password_recovery_question: 'What if I forgot my password?',
    password_recovery_answer: 'If you’ve forgotten your password, go to Settings → Account → Login → Reset Password and enter the email used at signup to reset your password.',
    
    language_settings_question: 'How do I change the language setting?',
    language_settings_answer: 'Currently, MemoLog supports Japanese and English.\nThe language is based on your device settings, so adjust it in your device’s settings app.',
  },
  ja: {
    search: "メモを検索",
    memolog: "メモログ",
    export: "エクスポート",
    import: "インポート",
    settings: "設定",
    account: "アカウント",
    email: "メールアドレス",
    plan: "現在のプラン",
    free: "フリー",
    pro: "プロ🔥",
    signOut: "ログアウト",
    confirmSignOut: "本当にログアウトしますか？",
    edit: "編集",
    delete: "削除",
    restore: "復元",
    cancel: "キャンセル",
    trashEmpty: "ゴミ箱は空です",
    save: "保存",
    done: "完了",
    cancelEdit: "編集破棄",
    upgrade: "アップグレード",
    exportFinished: "ファイル「{{fileName}}」が正常にGoogleドライブに保存されました。新しいデバイスでインポートしてください。",
    importFinished: "ファイル「{{fileName}}」がこのデバイスに正常にインポートされました！",
    upgradeRequiresLogin: "アップグレードするにはログインしてください",
    register: "登録",
    createAnAccount: "アカウント作成",
    loginHere: "ログインはこちら",
    registerHere: "登録はこちら",
    login: "ログイン",
    continue: "続ける",
    email_verification_propmt: "メールの認証を完了するため、受信箱を確認してください",
    password: "パスワード",
    theme: "テーマ",
    faq: "よくある質問",    
    password_reset_instructions: "ご登録のメールアドレスにパスワードリセットのメールをお送りしました。受信箱をご確認ください！",
    confirm_password_reset_title: "操作を確認",
    confirm_password_reset_message: "本当にパスワードをリセットしますか？",
    password_reset_email_sent: "現在のメールアドレスにパスワードリセットのメールをお送りしました。受信箱をご確認ください！",
    password_reset_only: "パスワードのリセットのみ可能です",
    forget_password: "パスワードリセット",
    already_have_account: "アカウントをお持ちですか？",
    dont_have_account: "アカウントをお持ちでないですか？",
    username_requirement: "4〜16文字、英字または数字のみ",
    username_already_taken: "このユーザーネームは既に使用されています。他のものを選んでください。",
    email_already_registered: "このメールアドレスは既に登録されています。他のメールアドレスを使用してください。",
    confirmation_email_sent: "確認メールが新しいアドレスに送信されました。受信ボックスをご確認ください。",
    username: 'ユーザーネーム',

    memoLog_overview_question: 'メモログとは何ですか？',
    memoLog_overview_answer: 'メモログは、その瞬間に思いついたことを効率的に記録できるアプリです。\nメモは時系列順に保存されるため、日記のように使うこともできます。',
    
    view_notes_home_question: 'メモの閲覧方法（ホーム画面）',
    view_notes_home_answer: 'ホーム画面（アプリを開いた際の最初の画面）でスワイプすると、すべてのメモを遡って見ることができます。\nまた、画面右上の検索バーを使用すれば、特定のキーワードを含むメモも検索できます。\n日本語ではひらがなとカタカナが区別されます（例:「あ」と検索すると「あ」を含むメモが表示され、「ア」は表示されません）。\n英語では大文字と小文字の区別はありません（例:「A」と検索すると「a」と「A」を含むメモが表示されます）。',
    
    view_notes_tabs_question: 'メモの閲覧方法（タブ）',
    view_notes_tabs_answer: 'ホーム画面左上の三本線アイコンをタップすると、「メモログ」の下に年・月・日のフォルダが自動で表示されます（メモがない場合は非表示）。\n年・月・日の順でタップしていくと、指定の日付のメモが閲覧できます。',
    
    edit_delete_notes_question: 'メモの編集・削除方法',
    edit_delete_notes_answer: "ホーム画面またはタブ画面で、メモの右上の三点リーダをタップすると、編集や削除が可能です。\nフリーユーザー: ゴミ箱機能はありませんが、削除前に確認アラートが表示されます。削除後、画面からは消えますが、内部には保持されます。\nプロユーザー: 削除したメモはゴミ箱に7日間保存され、復元可能です。7日を過ぎると、端末とクラウドの両方から完全に削除され、復元はできません。\nゴミ箱内のメモを復元するには、同じように三点リーダをタップしてください。",
    
    security_info_question: 'セキュリティは大丈夫ですか？',
    security_info_answer: 'フリーユーザー：メモは端末内にのみ保存され、直接端末が見られない限り安全です。\nプロユーザー：メモは端末とクラウドに保存されます。\nクラウドへのアップロード時には暗号化が施され、開発者を含む第三者には閲覧できません。\n端末が第三者に渡った場合を除き、メモの内容が漏洩することはありません。',
    
    device_transfer_question: '機種変更時の操作',
    device_transfer_answer: 'iOSのみ対応しています。 Androidへのデータ移行はできません（近日公開予定）。\nフリーユーザー：設定ページからエクスポートしてください。Googleアカウントが必要です。\nエクスポート後、Googleドライブにファイルが保存されていることを確認し、新しい端末でインポートします。\nプロユーザー：同じアカウントでログインすると、メモが自動で同期されます。',
    
    sign_up_login_question: 'サインアップやログインは必要ですか？',
    sign_up_login_answer: 'メモの保存自体には不要ですが、バナー広告はログイン状態では非表示になります。また、プロユーザーになるにはログインが必須です。\nデータを複数端末で自動同期するために使用されます。',
    
    platform_availability_question: 'Android版やPC版はありますか？',
    platform_availability_answer: '現在開発中です。\nAndroid版は数ヶ月以内に公開予定で、PC（ウェブ）版は2025年内の公開を予定しています。',
    
    email_recovery_question: 'メールアドレスを忘れた、または使用できない',
    email_recovery_answer: 'ユーザーネームでログインしてください。\nどちらも使用できない場合、アカウントの復元はできません。',
    
    password_recovery_question: 'パスワードを忘れた場合',
    password_recovery_answer: 'パスワードを再発行するには、設定→アカウント→ログイン→パスワード再発行から、\nサインアップ時に使用したメールアドレスを入力してリセットしてください。',
    
    language_settings_question: '言語設定について',
    language_settings_answer: '日本語と英語に対応しています。\n端末の設定に準拠しており、変更したい場合は端末の設定から行ってください。\nアプリ内の言語も自動的に切り替わります。',
  },
});

i18n.locale = getLocales()[0].languageCode ?? "en";
i18n.enableFallback = true;

export const isJapanese = getLocales()[0].languageCode === "ja";

export default i18n;
