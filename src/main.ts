import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { swaggerConfig } from './core/config/swagger'
import { Logger, ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import chalk from 'chalk'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	const logger = new Logger()

	swaggerConfig(app)

	app.setGlobalPrefix('api')
	app.enableCors()
	app.useGlobalPipes(new ValidationPipe())

	const configService = app.get(ConfigService)

	const HOST = configService.getOrThrow<string>('HOST')
	const PORT = configService.getOrThrow<number>('PORT')

	await app.listen(process.env.PORT!)
	logger.log(chalk.cyan(`${chalk.underline(`\nDocs: ${HOST}:${PORT}/api/docs`)}`))
}

bootstrap()
