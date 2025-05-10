const conf ={
    appwriteUrl : String(import.meta.env.VITE_APPWRITE_ENDPOINT),
    appwriteProject : String(import.meta.env.VITE_APPWRITE_PROJECT),
    appwriteDatabase : String(import.meta.env.VITE_APPWRITE_DATABASE),
    appwriteCollection : String(import.meta.env.VITE_APPWRITE_COLLECTION),
    appwriteBucket : String(import.meta.env.VITE_APPWRITE_BUCKET)
}

export default conf