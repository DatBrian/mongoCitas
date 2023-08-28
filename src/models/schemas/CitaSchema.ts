import { Collection, Db, ObjectId } from "mongodb";

class CitaSchema {
  public database: Db;
  public entity: string;
  public collection: Collection;

  constructor(database: Db) {
    this.database = database;
    this.entity = "cita";
    this.collection = this.database.collection(this.entity);
  }

  public async generateCollection(): Promise<void> {
    try {
      await this.database.createCollection(this.entity, {
        capped: true,
        size: 16000,
        max: 100,
        validator: {
          $jsonSchema: {
            bsonType: "object",
            required: ["fecha", "estado", "medico", "usuario"],
            properties: {
              _id: {
                bsonType: "objectId",
              },
              fecha: {
                bsonType: "string",
                pattern: "/^d{4}-d{2}-d{2}$/",
              },
              estado: {
                bsonType: "string",
                pattern: "^[A-Za-z\\s]+$",
              },
              medico: {
                bsonType: "objectId",
              },
              usuario: {
                bsonType: "objectId",
              },
            },
          },
        },
      });
    } catch (error) {
      throw error;
    }
  }

  public async createData(): Promise<void> {
    try {
      await this.collection.insertMany([
        {
          fecha: "2023-06-10",
          estado: "Pendiente",
          medico: new ObjectId("60a1f5facc4ef300154ba9b2"),
          usuario: new ObjectId("60a1f5facc4ef300154ba9b3"),
        },
        {
          fecha: "2023-06-15",
          estado: "Confirmada",
          medico: new ObjectId("60a1f5facc4ef300154ba9b4"),
          usuario: new ObjectId("60a1f5facc4ef300154ba9b5"),
        },
        {
          fecha: "2023-06-20",
          estado: "Cancelada",
          medico: new ObjectId("60a1f5facc4ef300154ba9b6"),
          usuario: new ObjectId("60a1f5facc4ef300154ba9b7"),
        },
      ]);
    } catch (error) {
        throw error;
    }
  }
}
export default CitaSchema;