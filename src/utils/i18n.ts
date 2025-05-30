import { getLocales } from "expo-localization";
import { I18n } from "i18n-js";

const i18n = new I18n({
  en: {
    search: "Search your logs",
    memolog: "Memolog",
    export: "Export",
    import: "Import",
    settings: "Settings",
    account: "Account",
    email: "Email address",
    new_email: 'New Email Address',
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
    username_already_taken: "This username is already taken.",
    email_already_registered: "This email address is already registered. Please use a different one.",
    confirmation_email_sent: "A confirmation email has been sent to your new address. Please check your inbox.",
    username: 'Username',
    memoLog_overview_question: "About this app",
    memoLog_overview_answer: "MemoLog is a memo app optimized for easy browsing.\nMemos are saved in chronological order, so it can also be used like a diary.",
    view_notes_home_question: "How to view notes (Home screen)",
    view_notes_home_answer: "On the home screen (the first screen when you open the app), you can swipe to view all your memos in reverse chronological order.",
    view_notes_tabs_question: "How to view notes (Tabs)",
    view_notes_tabs_answer: "By tapping the three-line icon at the top left of the home screen, year, month, and day folders will automatically appear under 'MemoLog' (folders without memos are not shown).\nTap year, then month, and then day to view memos for a specific date.",
    search_notes_question: "Search Notes",
    search_notes_answer: "You can search for notes by entering keywords in the search bar on the home screen.\nThe search will display notes that match the keywords in the title or body.\nIn English, uppercase and lowercase letters are treated the same (e.g., searching for 'A' will display memos containing both 'a' and 'A').",
    edit_delete_notes_question: "Editing and deleting notes",
    edit_delete_notes_answer: "By tapping the three-dot menu at the top right of each note, you can edit or delete the note.\nDeleted notes are stored in the trash for 7 days and can be restored at any time from there.\nAfter 7 days, they will be permanently deleted from the device and cannot be recovered.\nTo restore a note from the trash, tap the three-dot menu in the same way.",
    security_info_question: "Is it secure?",
    security_info_answer: "Notes are stored only on your device. Unless your device is physically accessed by a third party, the contents of your notes will not be exposed.\nIf you’re concerned, you can add a lock to the app by long-pressing the app icon and selecting Require Face ID.",
    device_transfer_question: "How to transfer data when changing devices",
    device_transfer_answer: "This feature is available on both iOS and Android.\nPlease export your data from the Settings page (a Google account is required as it uses Google Drive).\nAfter exporting, make sure the file has been saved to your Google Drive, then import it on your new device.\nYou may be prompted to log in multiple times—this is normal behavior.",
    sign_up_login_question: "Do I need to create an account?",
    sign_up_login_answer: "You don't need an account to save memos, but registration is required to subscribe to the Pro plan.\nIt is used to synchronize data automatically across multiple devices, ensuring secure and seamless access by simply logging in.",
    email_recovery_question: "Forgot or cannot use your email address",
    email_recovery_answer: "Log in with your username.\nIf neither your email address nor username is available, account recovery is not possible. Please take note.",
    password_recovery_question: "Forgot your password",
    password_recovery_answer: "Go to Settings → Account → Register/Login → Forgot Password, and enter the email address you used to sign up.\nIf you enter the correct registered email address, a password reset link will be sent to you (no link will be sent for incorrect email addresses).",
    language_settings_question: "Language settings",
    language_settings_answer: "Both Japanese and English are supported.\nYou can change the language from Settings → Customization → Language.",
    freePlan: "Free Plan",
    manualBackup: "✔︎ Manual Backup",
    manualDataTransfer: "✔︎ Manual Data Transfer",
    adsEnabled: "✔︎ Ads Enabled",
    upgradeToPro: "Upgrade to Pro",
    proPlan: "Pro Plan🔥",
    autoBackup: "✔︎ Auto Backup",
    autoBackupDescription: "Your daily notes are securely saved to a backup system, so even if you lose your device, you can easily recover them.",
    cloudSync: "✔︎ Cloud Sync",
    cloudSyncDescription: "Access your data across all devices.",
    adFree: "✔︎ Ad-Free",
    adFreeDescription: "Enjoy faster navigation and a more professional feel without being interrupted by pop-ups or banner ads.",
    currentPlan: "Current Plan",
    unsubscribe: "Unsubscribe",
    seePlan: "See plan",
    monthlySubscription: "Monthly subscription",
    subscriptionPlans: 'Subscription Settings',
    change: 'Change',
    reset: 'Reset',
    setup: 'Setup',
    email_not_verified: "Your email has not been verified. Would you like to resend the verification email?",
    email_resent: "The confirmation email has been resent.",
    email_not_received: "If you do not receive the email after multiple attempts, please register again with a different email address.",
    resend_email: "Resend Email",
    email_sent: "The confirmation email has been sent. Please check your inbox and click the link.",
    subscription_price: "$2.99/mo",
    privacy_policy: "Privacy Policy",
    terms_of_use: "Terms of Use",
    email_or_username: 'Email or Username',
    send_email: 'Send email',
    go_to_settings: "Go to settings↑",
    no_memo_yet: "No memo yet😢",
    registered_email: "Registered email address",
    sign_up_required: "You need to sign up",
    username_unset: 'Set a username as an alternative way to log in',
    username_already_in_use: "You’re already using this username!",
    invalid_username: "Invalid username",
    confirm_deletion: "Confirm Deletion",
    delete_entry_message: "Are you sure you want to delete your entry?",
    external_link: "External Link",
    external_link_message: "You are about to leave the app and visit an external site.",
    content_cannot_be_empty: "Content cannot be empty.",
    incorrect_login_credentials: "Login credentials are incorrect",
    customization: 'Customization',
    auto_show_keyboard: "Auto-Show Keyboard",
    language: 'Language',
    memo_amount: "Memo amount",
    used_days: "Used days",
    remove_ads: "Remove Ads",
    restore_purchase: "Restore Purchase"
    },
  ja: {
    search: "メモを検索",
    memolog: "メモログ",
    export: "エクスポート",
    import: "インポート",
    settings: "設定",
    account: "アカウント",
    email: "メールアドレス",
    new_email: '新しいメールアドレス',
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
    password_reset_instructions: "ご登録のメールアドレスにパスワード再発行リンクをお送りしました（登録済みの場合）。受信箱をご確認ください！",
    confirm_password_reset_title: "操作を確認",
    confirm_password_reset_message: "本当にパスワードをリセットしますか？",
    password_reset_email_sent: "現在のメールアドレスにパスワードリセットリンクをお送りしました。受信箱をご確認ください！",
    password_reset_only: "パスワードの再発行のみ可能です",
    forget_password: "パスワード再発行",
    already_have_account: "アカウントをお持ちですか？",
    dont_have_account: "アカウントをお持ちでないですか？",
    username_requirement: "4〜16文字、英字または数字のみ",
    username_already_taken: "このユーザーネームは既に使用されています。",
    email_already_registered: "このメールアドレスは既に登録されています。他のメールアドレスを使用してください。",
    confirmation_email_sent: "確認メールが新しいアドレスに送信されました。受信ボックスをご確認ください。",
    username: 'ユーザーネーム',
    memoLog_overview_question: 'このアプリについて',
    memoLog_overview_answer: 'メモログは、ブロックを積むようにメモができる、見やすさにフォーカスを当てたメモアプリです。\nメモは時系列順に保存されるため、日記のように使うこともできます。',
    view_notes_home_question: 'メモの閲覧（ホーム画面）',
    view_notes_home_answer: 'ホーム画面（アプリを開いた際の最初の画面）で上にスワイプすると、すべてのメモを遡って見ることができます。',
    view_notes_tabs_question: 'メモの閲覧（タブ）',
    view_notes_tabs_answer: 'ホーム画面左上の三本線アイコンをタップすると、「メモログ」の下に年・月・日のフォルダが自動で表示されます（メモがない場合は非表示）。\n順にタップしていくと、指定の日付のメモが一覧で表示されます。',
    search_notes_question: "メモの検索",
    search_notes_answer: 'ホーム画面右上の検索バーから、特定のキーワードを含むメモを検索できます。\n日本語ではひらがなとカタカナが区別されます（例:「あ」と検索すると「あ」を含むメモが表示され、「ア」は表示されません）。\n英語では大文字と小文字の区別はありません（例:「A」と検索すると「a」と「A」を含むメモが表示されます）',
    edit_delete_notes_question: 'メモの編集・削除',
    edit_delete_notes_answer: "各メモの右上の三点リーダをタップすると、編集や削除ができます。削除したメモはゴミ箱に7日間保存され、ゴミ箱（タブ内）からいつでも復元できます。7日を過ぎると、端末から完全に削除され、復元はできません。\nゴミ箱内のメモを復元するには、同じように三点リーダをタップしてください。",
    security_info_question: 'セキュリティは大丈夫ですか？',
    security_info_answer: 'メモは端末内にのみ保存されます。端末が直接第三者に渡った場合を除き、メモの内容が漏洩することはありません。\nアプリアイコン長押し→FaceIDを必要にする、からアプリにロックをかけることもできます。',
    device_transfer_question: '機種変更時の操作',
    device_transfer_answer: 'iOSとandroidの両方に対応しています。\n設定ページからエクスポートしてください（Googleドライブを使用するためGoogleアカウント必須）。\nエクスポート後、Googleドライブにファイルが保存されていることを確認し、新しい端末でインポートします。\n何度もログイン認証確認が表示される可能性がありますが、正常な動作です。',
    sign_up_login_question: 'アカウント登録は必要ですか？',
    sign_up_login_answer: '基本不要です。フリープランの方はデータ移行時、バックアップ時にのみ必要となります。ただし、プロプランへの加入時には登録が求められます。\nメモを複数端末で自動同期するために使用され、ログインするだけで全ての端末で安全に同期できるようになります。',
    email_recovery_question: 'メールアドレスを忘れた、又は使えない',
    email_recovery_answer: 'ユーザーネームでログインしてください。\nどちらも使用できない場合、アカウントの復元はできません。ご注意ください。',
    password_recovery_question: 'パスワードを忘れた',
    password_recovery_answer: '設定→アカウント→登録→ログインはこちら→パスワード再発行に進み、\nサインアップ時に使用したメールアドレスを入力してください。正しい登録済みのメールアドレスを送信すると再発行用リンクが送られてきます（間違ったメールアドレスには送信されません）。',
    language_settings_question: '言語設定',
    language_settings_answer: '日本語と英語に対応しています。\n設定→カスタマイズ→言語から変更できます。',
    freePlan: "フリープラン",
    manualBackup: "✔︎ 手動バックアップ",
    manualDataTransfer: "✔︎ 手動データ移行",
    adsEnabled: "✔︎ 広告あり",
    upgradeToPro: "プロプランにアップグレード",
    proPlan: "プロプラン🔥",
    autoBackup: "✔︎ 自動バックアップ",
    autoBackupDescription: "日々のメモがバックアップシステムに自動的に保存されます。デバイスを紛失しても簡単に復元可能です。",
    cloudSync: "✔︎ クラウド同期",
    cloudSyncDescription: "すべてのデバイスでデータにアクセス可能です。",
    adFree: "✔︎ 広告なし",
    adFreeDescription: "ポップアップやバナー広告に邪魔されることなく、より快適でプロフェッショナルな操作感をお楽しみいただけます。",
    currentPlan: "現在のプラン",
    unsubscribe: "解約",
    seePlan: "プランを確認",
    monthlySubscription: "月額プラン",
    subscriptionPlans: 'プラン設定',
    change: '変更',
    reset: 'リセット',
    setup: '設定',
    email_not_verified: "メールが確認されていません。確認メールを再送しますか？",
    email_resent: "確認メールを再送しました。",
    email_not_received: "何度送ってもメールが届かない場合は、他のメールアドレスで再登録してください。",
    resend_email: "確認メールを再送する",
    email_sent: "確認メールを送信しました。受信トレイを確認してリンクをクリックしてください。",
    subscription_price: "¥500/月",
    privacy_policy: "プライバシーポリシー",
    terms_of_use: "利用規約",
    email_or_username: 'メールアドレスまたはユーザーネーム',
    send_email: 'メール送信',
    go_to_settings: "設定に移動↑",
    no_memo_yet: "メモがありません😢",
    registered_email: '登録済みメールアドレス',
    sign_up_required: "アカウント登録が必要です",
    username_unset: 'ユーザーネームを設定すると、ログインに使用できます。',
    username_already_in_use: "このユーザーネームはすでに使用中です！",
    invalid_username: "無効なユーザー名です",
    confirm_deletion: "削除の確認",
    delete_entry_message: "本当にこのメモを削除しますか？",
    external_link: "外部リンク",
    external_link_message: "アプリを離れ、外部サイトに移動しようとしています。",
    content_cannot_be_empty: "メモを入力してください",
    incorrect_login_credentials: "ログイン情報が正しくありません。",
    customization: 'カスタマイズ',
    auto_show_keyboard: 'キーボードの自動表示',
    language: '言語',
    memo_amount: "メモ数",
    used_days: "書いた日数",
    remove_ads: "広告削除",
    restore_purchase: "購入復元"
  },
});

// i18n.locale = getLocales()[0]?.languageCode ?? "en";
 // webだとgetLocales()[0]がundefinedになってエラー？
// i18n.enableFallback = true;

// export const isJapanese = getLocales()[0]?.languageCode === "ja";
// webだとgetLocales()[0]がundefinedになってエラー？

export default i18n;
