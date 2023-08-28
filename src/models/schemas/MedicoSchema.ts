import { Collection, Db } from "mongodb";

class MedicoSchema{
    public database: Db;
    public entity: string;
    public collection: Collection;

    constructor(database: Db) {
        this.database = database;
        this.entity = 'medico';
        this.collection = this.database.collection(this.entity);
    }

    // public async generateCollection(): Promoise<void>{
    //     try {
    //         })
    //     } catch (error) {
            
    //     }
    // }
}