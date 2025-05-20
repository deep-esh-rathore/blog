import React, { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { Button, RTE, Input, Select } from './index'
import appwriteService from '../appwrite/config'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, getValues, control } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.slug || "",
            content: post?.content || "",
            status: post?.status || "active",
        }
    })
    const navigate = useNavigate()
    const userData = useSelector((state) => state.auth.userData)
    const submit = async (data) => {
        if (post) {
            const file = post.image[0] ? await appwriteService.uploadFile(post.image[0]) : null

            if (file) {
                await appwriteService.deleteFile(post.featuredImage)
            }
            const dbPost = await appwriteService.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined,
            })

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`)
            }
        }else {
            const file = await appwriteService.uploadFile(data.featuredImage[0]);
            if(file){
                const fileId= file.$id
                data.featuredImage = fileId
                const dbPost = await appwriteService.createPost({...data,userId:userData.$id})
                if(dbPost){
                    navigate(`/post/${dbPost.$id}`)
                }
            }
        }
    }

    return (
        <div>PostForm</div>
    )
}

export default PostForm