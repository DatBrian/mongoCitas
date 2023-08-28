import { Collection, Db } from "mongodb";

class UsuarioSchema{
    public database: Db;
    public entity: string;
    public collection: Collection;

    constructor(database: Db) {
        this.database = database;
        this.entity = 'usuario';
        this.collection = database.collection(this.entity);
    }

    public async generateCollection(): Promise<void>{
        try {
            await this.database.createCollection(this.entity, {
              capped: true,
              size: 16000,
              max: 100,
              validator: {
                $jsonSchema: {
                  bsonType: "object",
                  required: [
                    "name",
                    "primer_apellido",
                    "phone",
                    "direccion",
                    "email",
                    "tipo_documento",
                    "genero",
                    "acudiente",
                  ],
                  properties: {
                    name: {
                      bsonType: "string",
                      pattern: "^[A-Za-z\\s]+$",
                    },
                    second_name: {
                      bsonType: "string",
                      pattern: "^[A-Za-z\\s]+$",
                    },
                    primer_apellido: {
                      bsonType: "string",
                      pattern: "^[A-Za-z\\s]+$",
                    },
                    segundo_apellido: {
                      bsonType: "string",
                      pattern: "^[A-Za-z\\s]+$",
                    },
                    phone: {
                      bsonType: "string",
                      pattern: "^[A-Za-z\\s]+$",
                      description: "Debe proporcionar un teléfono",
                    },
                    direccion: {
                      bsonType: "string",
                      pattern: "^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑüÜ,.#@\\s-]+$",
                    },
                    email: {
                      basonType: "string",
                      pattern:
                        "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
                    },
                    tipo_documento: {
                      bsonType: "string",
                      pattern: "^[A-Za-z\\s]+$",
                      },
                      genero: {
                        bsonType: "string",
                        pattern: "^[A-Za-z\\s]+$",
                      },
                      acudiente: {
                          bsonType: "object",
                          required: [
                              "name",
                              "phone",
                              "address"
                          ],
                          properties: {
                              name: {
                                  bsonType: "string",
                                  pattern: "^[A-Za-z\\s]+$",
                              },
                              phone: {
                                  bsonType: "string",
                                pattern: "^[A-Za-z\\s]+$",
                              },
                              address: {
                                  bsonType: "string",
                                pattern: "^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑüÜ,.#@\\s-]+$",
                              }
                          }
                      }
                    }
                  },
                },
            });
        } catch (error:any) {
            throw error;
        }
    }

    public async createData(): Promise<void>{
        try {
            await this.collection.insertMany([
                {
                    name: "Primer",
                    primer_apellido: "Usuario",
                    phone: "123456789",
                    direccion: "Calle 123",
                    email: "usuario1@gmail.com",
                    tipo_documento: "DNI",
                    genero: "Masculino",
                    acudiente: {
                        name: "Primer",
                        phone: "123456789",
                        address: "Calle 123"
                    }
                },
                {
                    name: "Segundo",
                    primer_apellido: "Usuario",
                    phone: "123456789",
                    direccion: "Calle 123",
                    email: "usuario2@gmail.com",
                    tipo_documento: "DNI",
                    genero: "Masculino",
                    acudiente: {
                        name: "Segundo",
                        phone: "123456789",
                        address: "Calle 123"
                    }
                },
                {
                    name: "Tercer Usuario",
                    second_name: "Segundo nombre",
                    primer_apellido: "Apellido",
                    segundo_aepllido: "Segundo",
                    phone: "123456789",
                    direccion: "Calle 123",
                    email: "usuario3@gmail.com",
                    tipo_documento: "DNI",
                    genero: "Femenino",
                    acudiente: {
                        name: "Tercer",
                        phone: "123456789",
                        address: "Calle 123"
                    }
                }
            ])
        } catch (error) {
            throw error;
        }
    }
}
export default UsuarioSchema;