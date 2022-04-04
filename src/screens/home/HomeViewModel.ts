import { RefObject } from "react";
import { makeAutoObservable } from "mobx";
import Logcat from "../../logcat/Logcat";
import { UserStore as user } from "../../stores/user/userStore";

export class HomeViewModel {
  private galleryRef?: RefObject<HTMLInputElement>;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  init = async (ref?: RefObject<HTMLInputElement>) => {
    this.galleryRef = ref;
    await user.fetchProfile();
  };

  openFileExplorer = () => {
    this.galleryRef?.current?.click();
  };

  onFileChoose = (event: any) => {
    event.preventDefault();
    let file = event.target.files[0];
    Logcat.log("file...", file);
    // let form = new FormData();
    // form.append('file', this.state.file);
  };
}