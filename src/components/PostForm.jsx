import React, { useCallback ,useEffect} from 'react'
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

    const slugTransform = useCallback((e) => {
        if(e && e.type === string){
            return e.trim()
            .toLowerCase()
            .replace(/^[a-zA-z\d\s]+/g,'-')
            .replace(/[^a-zA-Z\d-]+/g,'-').replace(/\s+/g,'-')

            return''

        }
    },[])

    useEffect(() => {
        const subscription = watch((value,{name}) => {
            if(name === 'title'){
                setValue('slug',slugTransform(value.title,{shouldvalidate:true}))
            }
        })
        return () => {
            subscription.unsubscribe()
        }
    },[watch,slugTransform,setValue])

    return (
        <form onSubmit={handleSubmit(submit)} className='flex flex-wrap'>
            <div className="w-2/3 px-2">
                <Input
                    label="Title"
                    Placeholder="Title"
                    className="mb-4"
                    {...register('title', { required: true })}
                    
                />
                <input
                    label="Slug"
                    Placeholder="Slug"
                    className="mb-4"
                    {...register('slug', { required: true })}
                    onInput={(e) => {
                        setValue('slug', slugTransform(e.target.value),{ shouldValidate: true })
                    }}
                />
                <RTE
                    label="Content"
                    name='content'
                    control={control}
                    defaultValue={getValues('content')}
                />
            </div>
            <div className="w-1/3 px-2">
                <input
                label="Featured Image"
                type='file'
                className='mb-4'
                accept='image/png, image/jpeg image/jpg image/gif'
                {...register('image', { required: !post})}
                />
                {post && (
                    <div className='w-full mb-4'>
                        <img src={appwriteService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className='rounded-lg' />
                    </div>
                )}
                <select
                    options={["active","inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register('status', { required: true })}
                >
                    <button type='submit' bgColor={post ? "bg-green-500" : undefined}
                    className="w-full">
                        {post ? 'Update' : 'Submit'}
                    </button>
                </select>
            </div>
        </form>
    )
}

export default PostForm