import { comment, Post } from "app/entity";
import { IPostRepositry } from "../interface/IPostRepositry";
import { PostModel } from '../app/Database/PostSchema/PostModel'
import { injectable } from "inversify";
import { commentModel } from "../app/Database/PostSchema/CommentModel";
import axios from "axios";

const API = axios.create({ baseURL: "http://127.0.0.1:3005" })

@injectable()
export class  PostRepositry implements IPostRepositry {

    async CreatePost(input: Post): Promise<Post> {
        const pro = new PostModel(input)
        const data = await pro.save()
        return data
    }
    async GetAllPosts(): Promise<Post[]> {
        const data = await PostModel.find()
        if (data) {
            return data
        }
    }
    async getOnePost(input: Post): Promise<Post[]> {
        const data = await PostModel.find({ user: input })
        return data
    }

    async likePost(userId: number, postId: any) {
        const post = await PostModel.findById(postId)
        if (!post.likes.includes(userId)) {
            const up = await post.updateOne({
                $push: {
                    likes: userId
                }
            })
            if (up.modifiedCount) {
                const notification = {

                }
            }
            return
        } else {
            const up = await post.updateOne({
                $pull: {
                    likes: userId
                }
            })
            return
        }
    }

    async CreateComment(input: any): Promise<comment> {
        const comment = new commentModel(input)
        const data = await comment.save()
        if (data.userId) {
            const post = await PostModel.findById(input.postId)
            const update = await post.updateOne({
                $push: {
                    comments: input.userId
                }
            })
            await API.get('/user/admin/getAllUser').then((data) => {
                console.log(data.data);
            })
        }
        return data
    }

    async getPost(input: any): Promise<Post> {
        const data = await PostModel.findById(input)
        return data
    }

    async getComment(input: any): Promise<comment[]> {
        const data = await commentModel.find(input)
        return data
    }
} 