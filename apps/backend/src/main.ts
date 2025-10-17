import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const PORT = process.env.PORT || 3001;
  const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

  const config = new DocumentBuilder()
    .setTitle('Antares Task API')
    .setDescription('API documentation for the Antares Task management system')
    .setVersion('1.0')
    .addBearerAuth() // 👈 Para incluir autenticación JWT
    .build();

  const document = SwaggerModule.createDocument(app, config);

  app.enableCors({
    origin: FRONTEND_URL,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  SwaggerModule.setup('api/docs', app, document);

  await app.listen(PORT);

  console.log(`🚀 Backend running on: http://localhost:${PORT}`);
}
bootstrap();
