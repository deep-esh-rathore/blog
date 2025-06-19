import conf from "../conf/conf";
import { Client,ID,Databases,Query,Storage } from "appwrite";

export class Service{
    client = new Client();
    databases;
    storage;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProject)
        this.databases = new Databases(this.client)
        this.storage = new Storage(this.client)
    }

    async createPost({title,content,featuredimage,status,userId,slug}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabase,
                conf.appwriteCollection,
                slug,
                {title,content,featuredimage,status,userId}
            )
        } catch (error) {
            console.log("Appwrite service :: createPost :: error",error)
        }
    }

    async updatePost(slug,{title,content,featuredimage,status}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabase,
                conf.appwriteCollection,
                slug,
                {title,content,featuredimage,status}
            )
        } catch (error) {
            console.log("Appwrite service :: updatePost :: error",error)
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabase,
                conf.appwriteCollection,
                slug
            )
            return true;
        } catch (error) {
            console.log("Appwrite service :: updatePost :: error",error)
            return false;
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabase,
                conf.appwriteCollection,
                slug
            )
        } catch (error) {
            console.log("Appwrite service :: getPost :: error",error)
            return false;
        }
    }

    async getPosts(queries = [Query.equal("status","active")]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabase,
                conf.appwriteCollection,
                queries,
            )
        } catch (error) {
            console.log( error.message);
            return false
        }
    }

    // file upload service

    async uploadFile(file){
        try {
            return await this.storage.createFile(
                conf.appwriteBucket,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite serive :: uploadFile :: error",error)
            return false
        }
    }

    async deleteFile(fileId){
        try {
            await this.storage.deleteFile(
                conf.appwriteBucket,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deleteFile :: error",error)
            return false
        }
    }

    getFileURL(fileId){
        return this.storage.getFileView(
            conf.appwriteBucket,
            fileId
        )
    }
}

const service = new Service();
export default service;