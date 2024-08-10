import { User } from "~/server/models/User";

export default defineEventHandler((event) => {
    const id = getRouterParam(event,'id');
    return User.findOne({_id: id }).select('currentLevel');
})