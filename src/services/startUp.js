const ADMIN_UID = 'admin';


export default function startUp(uid) {

    let result;

    switch (uid) {
        case ADMIN_UID:
            result = ADMIN_UID;
            break;
        default:
            result=null
            break;
    }

    return result;

}

