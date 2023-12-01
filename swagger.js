import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { config } from "dotenv";
config();
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'API BABY THAMIRES',
      description: 'API de Votação Documentação',
      contact: {
        name: 'Nacelio M. Barbosa'
      },
      servers: [`http://localhost:${process.env.PORT || 3000}`]
    }
  },
  apis: ['./src/controllers/*.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

export { swaggerUi, swaggerDocs };