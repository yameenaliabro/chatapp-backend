export type userProps = {
    username: string;
    email: string;
    password: string,
    retypepassword: string,
    description: string,
    skill: string,
    image: string,
    contactNumber: string,
    friend: string,
}


export type GetUserByIdQuery = {
    user_id: string;
}
