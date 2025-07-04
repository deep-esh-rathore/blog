import conf from "../conf/conf";
import { Client,Account,ID } from "appwrite";

export class AuthService{
    client = new Client();
    account;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProject)
        this.account = new Account(this.client)
    }

    async createAccount({email, password , name}){
        try {
            const userAccount = await this.account.create(ID.unique(),email,password,name);
            if (userAccount) {
                return this.login(email,password)
            } else {
                return userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    async login ({email,password}){
        try {
            const session =await this.account.createEmailPasswordSession(email,password)
            return session;
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            console.log( error.message);
        }
        return null;
    }

    async logout(){
        try {
            await this.account.deleteSessions()
        } catch (error) {
            console.log("appwrite service :: logout :: error", error)
        }
    }


}

const authservice = new AuthService();

export default authservice