import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import * as jwt_decode from "jwt-decode";
// import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

/*
  Generated class for the CurrentUserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CurrentUserProvider {

  public curretUser: any;

  constructor(private storage: Storage) {
  }

  setCurrentUserDetails(userTokens): void {
    // let userDetails = jwt_decode(userTokens.accessToken);
    // let userId = userDetails.sub;
    // this.sqlite.create({
    //   name: userId+'.db',
    //   location: 'default'
    // }).then((db: SQLiteObject) => {
    //     db.executeSql('CREATE TABLE IF NOT EXIST session(rowId INTEGER PRIMARY KEY, idToken TEXT, accessToken TEXT, refreshToken TEXT)')
    //       .then(() => {
    //         db.executeSql('INSERT INTO session (idToken, accessToken, refreshToken) VALUES (userDetails.idToken, userDetails.accessToken, userDetails.refreshToken)')
    //         .then(()=>{
    //           console.log("user data added");
    //         })
    //       })
    //       .catch(e => console.log(e));
    //   })
    //   .catch(e => console.log(e));
    this.curretUser = userTokens;
    this.storage.set('tokens', JSON.stringify(userTokens));
  }

  getCurrentUserData(): any {
    const currentUser = this.curretUser ? jwt_decode(this.curretUser.accessToken) : null
    return currentUser
  }

  getDecodedAccessToken(token) {
    return jwt_decode(token);
  }

  removeUser() {
    this.curretUser = "";
    this.storage.remove('tokens');
    this.storage.remove('schools');
    this.storage.remove('images');
    this.storage.remove('parentDetails');
    this.storage.remove('schoolsDetails');
    this.storage.remove('allImageList');
    this.storage.remove('genericQuestionsImages');
    this.storage.remove('generalQuestions');
  }

  fetchUser(): void {
    this.storage.get('tokens').then((session) => {
      this.curretUser = JSON.parse(session);
      return JSON.parse(session)
    });
  }

  deactivateActivateSession(status): void {
    this.curretUser.isDeactivated = status;
    this.setCurrentUserDetails(this.curretUser);
  }

  checkForTokens(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.storage.get('tokens').then((tokens) => {
        if (tokens) {
          this.curretUser = JSON.parse(tokens);
          resolve(this.curretUser);
        } else {
          reject(this.curretUser);
        }
      });
    })
  }

  checkForValidToken(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.storage.get('tokens').then((tokens) => {
        if (tokens) {
          let current_tokens = JSON.parse(tokens);
          let access_token = jwt_decode(current_tokens.accessToken);
          let access_token_expire_time = parseInt(access_token.exp);
          if (access_token_expire_time > (Date.now() / 1000)) {
            resolve("Valid token")
          } else {
            reject("Problem authenticating with Sunbird");
          }
        } else {
          reject("Problem authenticating with Sunbird");
        }
        // this.curretUser = JSON.parse(session);
        // return JSON.parse(session)
      });

    });
  }

  refreshToken() {

  }
}
