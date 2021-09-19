import _ from "lodash";


class Tools {

    static checkKeyExistAndNotEmpty( dataForCheck, keysForCheck ) {
        let check = true;

        check = keysForCheck.every( ( element ) => {
            if ( !_.has( dataForCheck, element ) ) {
                return false;
            }
            return true;
        } );
        return check;
    }

}
module.exports = Tools;
