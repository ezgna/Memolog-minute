import { Entry } from "@/src/database/types";
import { GDrive, MimeTypes } from "@robinbobin/react-native-google-drive-api-wrapper";
import { SQLiteDatabase } from "expo-sqlite";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

// let GoogleSignin: any;

// if ( Platform.OS === 'ios') {
//   GoogleSignin = require('@react-native-google-signin/google-signin');
// } else {
//   console.log("Running on unsupported platform for native modules");
// }

export const initializeGdrive = async (accessToken: string) => {
  const gdrive = new GDrive();
  gdrive.accessToken = accessToken;
  gdrive.fetchTimeout = 60000;
  return gdrive;
};

export const signinGoogle = async () => {
  try {
    await GoogleSignin.configure({
      iosClientId: "110368176913-u7anooc46iggk9n2ksi81pii7e5uqaas.apps.googleusercontent.com",
      webClientId: "110368176913-a1dugf9t7o4dgi52q5bl3mj7qnntcklo.apps.googleusercontent.com",
      scopes: ["https://www.googleapis.com/auth/drive.file"],
    });

    await GoogleSignin.hasPlayServices();

    const userInfo = await GoogleSignin.signIn();
    if (userInfo.type === "cancelled") {
      return;
    }

    const tokens = await GoogleSignin.getTokens();
    if (tokens.accessToken) {
      const gdrive = await initializeGdrive(tokens.accessToken);
      return gdrive;
    }
  } catch (e) {
    console.error(e);
  }
};

export const uploadFileToGoogleDrive = async (gdrive: GDrive, dataList: object) => {
  const jsonData = JSON.stringify(dataList);
  const formattedDate = new Date()
    .toLocaleString("ja-JP")
    .replace(/\//g, "-")
    .replace(/:/g, "-")
    .replace(" ", "_");
  try {
    const response = await gdrive.files
      .newMultipartUploader()
      .setData(jsonData, MimeTypes.JSON)
      .setRequestBody({ name: `ExportedMemoLog_${formattedDate}` })
      .execute();
    return response.name;
  } catch (e) {
    console.error("Upload error", e);
  }
};

export const downloadFileFromGoogleDrive = async (gdrive: GDrive, fileId: string) => {
  try {
    const data = await gdrive.files.getJson(fileId);
    return data;
  } catch (e) {
    console.error(e);
  }
};

export const listFilesInDrive = async (gdrive: GDrive) => {
  try {
    const response = await gdrive.files.list({
      q: "mimeType='application/json' and trashed=false",
      fields: "files(id, name)",
    });
    return response.files;
  } catch (e) {
    console.error(e);
  }
};

export const handleFileSelect = async (fileId: string) => {
  const gdrive = await signinGoogle();
  if (gdrive) {
    const dataList = await downloadFileFromGoogleDrive(gdrive, fileId);
    return dataList;
  }
};

export const ExportGDrive = async (db: SQLiteDatabase) => {
  try {
    const gdrive = await signinGoogle();
    if (gdrive) {
      const dataList: Entry[] = await db.getAllAsync("SELECT * FROM entries ORDER BY created_at DESC");
      const fileName = await uploadFileToGoogleDrive(gdrive, dataList);
      return fileName;
    }
  } catch (e) {
    console.error(e);
  } finally {
    await GoogleSignin.signOut(); // iosだとこれなくても絶対毎回ログイン必要だが、androidエミュだとこれないと一度ログインしたらずっとそのアカウントで自動実行される
  }
};

export const ImportGDrive = async () => {
  try {
    const gdrive = await signinGoogle();
    if (gdrive) {
      const fileList = await listFilesInDrive(gdrive);
      return fileList;
    }
  } catch (e) {
    console.error(e);
  } finally {
    await GoogleSignin.signOut();
  }
};
