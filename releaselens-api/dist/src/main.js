"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");

async function bootstrap() {
  // ✅ Turn on verbose Nest logging so errors show up in Render logs
  const app = await core_1.NestFactory.create(app_module_1.AppModule, {
    logger: ["error", "warn", "log", "debug", "verbose"],
  });

  // ✅ Log unhandled exceptions to Render logs (while still returning generic 500)
  app.useGlobalFilters({
    catch(exception, host) {
      try {
        const ctx = host.switchToHttp();
        const req = ctx.getRequest?.();
        const url = req?.url;
        const method = req?.method;

        // Print the real error + stack
        console.error("UNHANDLED_EXCEPTION", {
          method,
          url,
          message: exception?.message,
          name: exception?.name,
          stack: exception?.stack,
          exception,
        });
      } catch (e) {
        console.error("UNHANDLED_EXCEPTION_LOGGING_FAILED", e);
      }

      // Let Nest handle HttpExceptions normally; fallback to generic 500 for unknown
      try {
        const ctx = host.switchToHttp();
        const res = ctx.getResponse?.();

        // If it's a Nest HttpException, preserve its status/message
        if (exception && typeof exception.getStatus === "function") {
          const status = exception.getStatus();
          const response = exception.getResponse?.() ?? { message: exception?.message };
          return res.status(status).json(
            typeof response === "object" ? response : { message: response }
          );
        }

        return res.status(500).json({ statusCode: 500, message: "Internal server error" });
      } catch {
        // If we can't write response, do nothing
      }
    },
  });

  app.useGlobalPipes(
    new common_1.ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );

  app.enableCors({
    origin: true,
    credentials: true,
  });

  const config = new swagger_1.DocumentBuilder()
    .setTitle("ReleaseLens API")
    .setDescription("ReleaseLens ingestion and reporting API")
    .setVersion("1.0.0")
    .addBearerAuth()
    .build();

  const document = swagger_1.SwaggerModule.createDocument(app, config);
  swagger_1.SwaggerModule.setup("docs", app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  const port = process.env.PORT ? Number(process.env.PORT) : 3000;
  await app.listen(port);

  console.log(`🚀 ReleaseLens API running on http://localhost:${port}`);
  console.log(`📘 Swagger UI: http://localhost:${port}/docs`);
  console.log(`📄 OpenAPI JSON: http://localhost:${port}/docs-json`);
}

bootstrap();
//# sourceMappingURL=main.js.map