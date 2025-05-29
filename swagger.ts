import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My API",
      version: "1.0.0",
      description: "API documentation",
    },
    servers: [
      {
        url: "http://localhost:3001",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Enter JWT token like: Bearer <token>",
        },
      },
      schemas: {
        User: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            name: { type: "string", example: "John Doe" },
            email: {
              type: "string",
              format: "email",
              example: "john@example.com",
            },
            username: { type: "string", example: "john_doe" },
            password: { type: "string", example: "hashed_password" },
            plates: {
              type: "array",
              items: { $ref: "#/components/schemas/RegistrationPlate" },
            },
            roles: {
              type: "array",
              items: { $ref: "#/components/schemas/Role" },
            },
          },
          required: ["name", "email", "username", "password"],
        },
        RegistrationPlate: {
          type: "object",
          properties: {
            plateNumber: { type: "string", example: "ABC1234" },
            userId: { type: "integer", example: 1 },
            // To avoid circular references, you can skip embedding user here or use $ref carefully
          },
          required: ["plateNumber", "userId"],
        },
        Role: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            name: { type: "string", example: "Admin" },
            // users can be omitted or defined as array of User references if needed
          },
          required: ["name"],
        },
        Ticket: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            price: { type: "number", format: "float", example: 15.5 },
            startTime: {
              type: "string",
              format: "date-time",
              example: "2025-05-29T10:00:00Z",
            },
            endTime: {
              type: "string",
              format: "date-time",
              example: "2025-05-29T12:00:00Z",
            },
            isActive: { type: "boolean", example: true },
            payments: {
              type: "array",
              items: { $ref: "#/components/schemas/Payment" },
            },
          },
          required: ["price", "startTime", "endTime", "isActive"],
        },
        Payment: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            spotId: { type: "integer", example: 10 },
            ticketId: { type: "integer", example: 1 },
            plateNumber: { type: "string", example: "ABC1234" },
            amount: { type: "number", format: "float", example: 7.25 },
            transactionTime: {
              type: "string",
              format: "date-time",
              example: "2025-05-29T11:00:00Z",
            },
          },
          required: [
            "spotId",
            "ticketId",
            "plateNumber",
            "amount",
            "transactionTime",
          ],
        },
        ParkingZone: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            name: { type: "string", example: "Downtown Zone" },
            price: { type: "number", format: "float", example: 2.5 },
            spots: {
              type: "array",
              items: { $ref: "#/components/schemas/ParkingSpot" },
            },
          },
          required: ["name", "price"],
        },
        ParkingSpot: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            street: { type: "string", example: "Main St" },
            isOccupied: { type: "boolean", example: false },
            zoneId: { type: "integer", example: 1 },
          },
          required: ["street", "isOccupied", "zoneId"],
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./routes/routes.ts"],
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;
