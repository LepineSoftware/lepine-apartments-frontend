const calculateUnitType = (numOfBeds, officeDen) => {
    let unitType = 'One Bedroom';

    switch (true) {
        case numOfBeds === 1 && !officeDen:
            unitType = 'One Bedroom';
            break;

        case numOfBeds === 1 && officeDen:
            unitType = 'One Bedroom + Den';
            break;
    
        case numOfBeds === 2 && !officeDen:
            unitType = 'Two Bedroom';
            break;

        case numOfBeds === 2 && officeDen:
            unitType = 'Two Bedroom + Den';
            break;

        case numOfBeds === 3 && !officeDen:
            unitType = 'Three Bedroom';
            break;
    
        case numOfBeds === 3 && officeDen:
            unitType = 'Three Bedroom';
            break;

        case numOfBeds === 4 && !officeDen:
            unitType = 'Four Bedroom';
            break;
    
        case numOfBeds === 4 && officeDen:
            unitType = 'Four Bedroom';
            break;
    
        default:
            unitType = 'One Bedroom';
            break;
    }

    return unitType;
}

export default calculateUnitType;