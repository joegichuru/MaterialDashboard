class ModelUser {
    constructor(id, name, email, active, created, image, role) {
        this.id = id;
        this.email = email;
        this.active = active;
        this.created = created;
        this.image = image;
        this.role = role;
    }

    getUser(){
        let u={
            id:this.id,
            email:this.email,
            active:this.active?"True":"False",
            created:new Date(this.created),
            image:this.image,
            role:this.role
        };
        return u;
    }
}