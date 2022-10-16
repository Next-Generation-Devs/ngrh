export interface DownloadOptions {
  /**
   * the url of the source.
   */
  url: string;
  /**
   * the name of the file (should include the extension. _defaults to the source name_).
   */
  fileName?: string;
  /**
   * the id to identify the file (used in `getLoadingById` and `downloadToLocal`).
   */
  id: string;
  /**
   * a flag to determine if the file will be downloaded automatically after being downloaded to the borwser or not (_defaults to false_).
   */
  withAutoDownload?: string;
}

export interface HookFiles {
  /**
   * the id of the file.
   */
  id: string;
  /**
   * the chunks of the files.
   */
  chunks: Array<Uint8Array>;
  /**
   * the name of the file.
   */
  fileName: string;
  /**
   * the downloading state.
   */
  loading: number;
}

export interface UseDownloadMediaReturnObject {
  /**
   * a function used to download sources to browser and from there will be ready to download locally.
   */
  download: (
    /** the options of the download function. */ options: DownloadOptions
  ) => Promise<void>;
  /**
   * gets the download progress.
   */
  getLoadingById: (/** the id of the downloaded file. */ id: string) => number;
  /**
   * the files array.
   */
  files: Array<HookFiles>;
  /**
   * a function used to download sources locally.
   */
  downloadToLocal: (/** the id of the downloaded file. */ id: string) => void;
}

export type UseDownloadMedia = () => UseDownloadMediaReturnObject;
