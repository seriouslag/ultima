/* tslint:disable */

interface Dimensions {
  height: number;
  width: number;
}

interface Options {
  accept: string | null;
  maxSize: string | null;
  read: boolean;
  thumbnailSize: undefined | number;
}

interface ErrorText {
  commong?: string;
  type?: string;
  size?: string;
}

export class FileData {
  public static fromRaw: (fileDataRaw: any, options: any) => Promise<any>;
  public static fromRawArray: (filesDataRaw: any[], options: any) => Promise<any[]>;
  public static toRawArray: (filesData: any) => any[];
  public static readFile: (fileData: any) => Promise<any>;
  public static readFiles: (filesData: any) => Promise<any[]>;
  public raw: any;
  public url: null | string;
  public urlResized: null | string;
  public _progress: ProgressEvent | boolean;
  public accept: string;
  public dimensions: Dimensions;
  public error: boolean;
  public file: File | any;
  public height: undefined | number | string;
  public width: undefined | number | string;
  public id: string;
  public image: HTMLImageElement;
  public imageColor: number[];
  public isPlayingAv: false;
  public lastKnownSrc: null | string;
  public maxSize: null | string;
  public options: Options;
  public read: boolean;
  public thumbnailSize: number;
  public upload: any;
  public videoThumbnail: any;
  public populate: (data: any, options: any) => void;
  public hasProgress: () => boolean;
  public progress: (value: undefined | number) => any | number;
  public size: () => number | '';
  public src: () => string;
  public ext: () => string;
  public name: () => string;
  public isDarkColor: () => boolean;
  public color: () => string;
  public isImage: () => boolean;
  public isVideo: () => boolean;
  public isPlayableVideo: () => boolean;
  public isAudio: () => boolean;
  public isPlayableAudio: () => boolean;
  public isText: () => boolean;
  public setUrl: (url: string) => Promise<any>;
  public imageResized: (resized: any) => void;
  public resizeImage: () => Promise<void>;
  public icon: () => any;
  public getErrorMessage: (errorText: string) => ErrorText;
  public toRaw: () => any;
  public validate: () => void;
}

export { Dimensions, Options };
