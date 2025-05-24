import React, { useState, useEffect } from 'react'
import appwriteservice from '../appwrite/config'
import { Container, Button } from '../components'
import parse from 'html-react-parser'
import { useSelector } from 'react-redux'
import { useParams, useNavigate, Link } from 'react-router-dom'

function Post() {
    const [posts, setPosts] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = posts && userData ? posts.userId === userData.$id : false;
    useEffect(() => {
        if (slug) {
            appwriteservice.getPost(slug).then((posts) => {
                if (posts) {
                    setPosts(posts);
                } else {
                    navigate('/');
                }
            });
        } else {
            navigate('/');
        }
    }, [slug, navigate]);

    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Post