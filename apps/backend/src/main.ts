import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const PORT = process.env.PORT || 3001;
  const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';
  app.enableCors({
    origin: FRONTEND_URL,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  await app.listen(PORT);

  console.log(`🚀 Backend running on: http://localhost:${PORT}`);
}
bootstrap();
