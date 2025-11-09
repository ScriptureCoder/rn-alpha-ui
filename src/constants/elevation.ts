export const elevation =(key:number)=> {
    let value;
    switch (key){
        case 1:
            value = {
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 1,//"/2 floor/d 1"
                },
                shadowOpacity: 0.18, //"2/4"
                shadowRadius: 1.00,
                elevation: 1,
            };
            break;
        case 2:
            value = {
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 1,
                },
                shadowOpacity: 0.20,
                shadowRadius: 1.41, // 0.41
                elevation: 2,
            };
            break;
        case 3:
            value = {
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 1,
                },
                shadowOpacity: 0.22,
                shadowRadius: 2.22, // 0.81
                elevation: 3,
            };
            break;
        case 4:
            value = {
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.23,
                shadowRadius: 2.62, // 0.40
                elevation: 4,
            };
            break;
        case 5:
            value = {
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84, // 1.22
                elevation: 5,
            };
            break;
        case 6:
            value = {
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 3,
                },
                shadowOpacity: 0.27,
                shadowRadius: 4.65, // 0.81
                elevation: 6,
            };
            break;
        case 7:
            value = {
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 3,
                },
                shadowOpacity: 0.29,
                shadowRadius: 4.65, // 0
                elevation: 7,
            };
            break;
        case 8:
            value = {
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 4,
                },
                shadowOpacity: 0.30,
                shadowRadius: 4.65, // 0
                elevation: 8,
            };
            break;
        case 9:
            value = {
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 4,
                },
                shadowOpacity: 0.32,
                shadowRadius: 5.46, //0.81
                elevation: 9,
            };
            break;
        case 10:
            value = {
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 5,
                },
                shadowOpacity: 0.34,
                shadowRadius: 6.27, // 0.81 0.41 0.81
                elevation: 10,
            };
            break;
        default:
            value = {};
    }
    return value;
};
